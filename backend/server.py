from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import hashlib
import base64
import time
import asyncio
import re
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import feedparser
import requests


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging early so it's available to all handlers
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Config
PODCAST_RSS_URL = os.environ.get('PODCAST_RSS_URL', '')
MAILCHIMP_API_KEY = os.environ.get('MAILCHIMP_API_KEY', '')
MAILCHIMP_SERVER_PREFIX = os.environ.get('MAILCHIMP_SERVER_PREFIX', '')
MAILCHIMP_AUDIENCE_ID = os.environ.get('MAILCHIMP_AUDIENCE_ID', '')

# Create the main app without a prefix
app = FastAPI(title="Awkwardish API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# --------- Models ---------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class Episode(BaseModel):
    id: str
    title: str
    description: str
    pub_date: Optional[str] = None
    duration: Optional[str] = None
    audio_url: Optional[str] = None
    spotify_url: Optional[str] = None
    image_url: Optional[str] = None
    episode_number: Optional[int] = None

class EpisodesResponse(BaseModel):
    show_title: Optional[str] = None
    show_description: Optional[str] = None
    show_image: Optional[str] = None
    spotify_url: Optional[str] = None
    episodes: List[Episode] = []
    cached_at: Optional[str] = None

class NewsletterSubscribe(BaseModel):
    email: EmailStr
    first_name: Optional[str] = None

class NewsletterResponse(BaseModel):
    success: bool
    message: str
    already_subscribed: bool = False


# --------- Helpers ---------
def _strip_html(html: str) -> str:
    if not html:
        return ""
    text = re.sub(r"<[^>]+>", " ", html)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


# RSS cache (in-memory)
_RSS_CACHE = {"data": None, "expires_at": 0}
RSS_TTL_SECONDS = 600  # 10 minutes


def _fetch_rss_blocking() -> dict:
    """Fetch and parse the podcast RSS feed (blocking)."""
    if not PODCAST_RSS_URL:
        raise RuntimeError("PODCAST_RSS_URL not configured")

    parsed = feedparser.parse(PODCAST_RSS_URL)
    if parsed.bozo and not getattr(parsed, "entries", None):
        raise RuntimeError(f"Failed to parse feed: {parsed.bozo_exception}")

    feed = parsed.feed
    show_title = getattr(feed, "title", None)
    show_description = _strip_html(getattr(feed, "summary", "") or getattr(feed, "subtitle", ""))
    show_image = None
    if getattr(feed, "image", None) and getattr(feed.image, "href", None):
        show_image = feed.image.href
    elif getattr(feed, "itunes_image", None):
        show_image = feed.get("itunes_image", {}).get("href")

    episodes = []
    total = len(parsed.entries)
    for idx, entry in enumerate(parsed.entries):
        # Audio
        audio_url = None
        for enc in entry.get("enclosures", []) or []:
            if "audio" in (enc.get("type") or ""):
                audio_url = enc.get("href") or enc.get("url")
                break

        # Episode image (fallback to show image)
        image_url = show_image
        if entry.get("image") and entry["image"].get("href"):
            image_url = entry["image"]["href"]

        # Episode number — derive from reverse order if not present
        ep_num_raw = entry.get("itunes_episode")
        try:
            ep_num = int(ep_num_raw) if ep_num_raw else (total - idx)
        except (TypeError, ValueError):
            ep_num = total - idx

        # Description
        description = _strip_html(
            entry.get("summary")
            or entry.get("subtitle")
            or entry.get("description")
            or ""
        )

        # Duration
        duration = entry.get("itunes_duration") or None

        # Pub date
        pub_date = entry.get("published") or entry.get("updated") or None

        # Build episode id (stable)
        ep_id = entry.get("id") or entry.get("guid") or entry.get("link") or f"ep-{ep_num}"
        ep_id = hashlib.md5(ep_id.encode()).hexdigest()[:12]

        episodes.append(
            Episode(
                id=ep_id,
                title=entry.get("title", "Untitled"),
                description=description,
                pub_date=pub_date,
                duration=duration,
                audio_url=audio_url,
                spotify_url=None,  # RSS doesn't include direct Spotify URL
                image_url=image_url,
                episode_number=ep_num,
            ).model_dump()
        )

    return {
        "show_title": show_title,
        "show_description": show_description,
        "show_image": show_image,
        "spotify_url": None,
        "episodes": episodes,
        "cached_at": datetime.now(timezone.utc).isoformat(),
    }


async def get_episodes_cached() -> dict:
    """Return episodes from cache if fresh, else refetch."""
    now = time.time()
    if _RSS_CACHE["data"] and _RSS_CACHE["expires_at"] > now:
        return _RSS_CACHE["data"]
    # Run blocking fetch in a thread
    data = await asyncio.to_thread(_fetch_rss_blocking)
    _RSS_CACHE["data"] = data
    _RSS_CACHE["expires_at"] = now + RSS_TTL_SECONDS
    return data


# --------- Routes ---------
@api_router.get("/")
async def root():
    return {"message": "Awkwardish API", "status": "ok"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.get("/episodes", response_model=EpisodesResponse)
async def list_episodes(limit: int = 20):
    """Return latest episodes parsed from the podcast RSS feed (cached)."""
    try:
        data = await get_episodes_cached()
        eps = data["episodes"][: max(1, min(limit, 100))]
        return EpisodesResponse(
            show_title=data.get("show_title"),
            show_description=data.get("show_description"),
            show_image=data.get("show_image"),
            spotify_url=data.get("spotify_url"),
            episodes=eps,
            cached_at=data.get("cached_at"),
        )
    except Exception as e:
        logger.exception("Episodes fetch failed")
        raise HTTPException(status_code=502, detail=f"Failed to fetch episodes: {e}")


# ----- Mailchimp -----
def _mailchimp_auth_header() -> dict:
    auth = base64.b64encode(f"anystring:{MAILCHIMP_API_KEY}".encode()).decode()
    return {"Authorization": f"Basic {auth}", "Content-Type": "application/json"}


def _mailchimp_subscribe_blocking(email: str, first_name: Optional[str]) -> dict:
    if not (MAILCHIMP_API_KEY and MAILCHIMP_SERVER_PREFIX and MAILCHIMP_AUDIENCE_ID):
        raise RuntimeError("Mailchimp not configured")

    subscriber_hash = hashlib.md5(email.lower().encode()).hexdigest()
    url = (
        f"https://{MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/"
        f"{MAILCHIMP_AUDIENCE_ID}/members/{subscriber_hash}"
    )
    payload = {
        "email_address": email,
        "status_if_new": "subscribed",
        "status": "subscribed",
        "merge_fields": {"FNAME": first_name or ""},
    }
    resp = requests.put(url, json=payload, headers=_mailchimp_auth_header(), timeout=12)
    return {"status_code": resp.status_code, "body": resp.json() if resp.content else {}}


@api_router.post("/newsletter/subscribe", response_model=NewsletterResponse)
async def newsletter_subscribe(payload: NewsletterSubscribe):
    """Subscribe an email to the Awkwardish Mailchimp audience."""
    try:
        result = await asyncio.to_thread(
            _mailchimp_subscribe_blocking, payload.email, payload.first_name
        )
        sc = result["status_code"]
        body = result["body"]

        # Persist locally for our own records (idempotent upsert)
        try:
            await db.newsletter_subscribers.update_one(
                {"email": payload.email.lower()},
                {
                    "$set": {
                        "email": payload.email.lower(),
                        "first_name": payload.first_name,
                        "mailchimp_status": body.get("status"),
                        "mailchimp_id": body.get("id"),
                        "updated_at": datetime.now(timezone.utc).isoformat(),
                    },
                    "$setOnInsert": {
                        "created_at": datetime.now(timezone.utc).isoformat(),
                    },
                },
                upsert=True,
            )
        except Exception:
            logger.exception("Failed to persist newsletter subscriber locally")

        if sc in (200, 201):
            return NewsletterResponse(
                success=True,
                message="You're in. Welcome to the messy middle ✿",
                already_subscribed=False,
            )

        title = (body.get("title") or "").lower()
        detail = body.get("detail") or ""

        if sc == 400 and ("member exists" in title or "already a list member" in detail.lower()):
            return NewsletterResponse(
                success=True,
                message="You're already on the list — see you in your inbox.",
                already_subscribed=True,
            )

        # Common Mailchimp errors
        msg = body.get("detail") or body.get("title") or "Could not subscribe right now."
        logger.warning("Mailchimp non-success: %s %s", sc, body)
        raise HTTPException(status_code=400, detail=msg)

    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Newsletter subscribe error")
        raise HTTPException(status_code=500, detail=f"Newsletter subscription failed: {e}")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
