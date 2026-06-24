"""Backend integration tests for Awkwardish API.
Covers: root, status, episodes (RSS), newsletter (Mailchimp).
"""
import os
import time
import uuid
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://in-progress-11.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="session")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --------- Existing routes ---------
class TestRoot:
    def test_root(self, api_client):
        r = api_client.get(f"{API}/")
        assert r.status_code == 200
        body = r.json()
        assert "message" in body
        assert body.get("status") == "ok"


class TestStatus:
    def test_create_and_list_status(self, api_client):
        client_name = f"TEST_{uuid.uuid4().hex[:8]}"
        r = api_client.post(f"{API}/status", json={"client_name": client_name})
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["client_name"] == client_name
        assert "id" in data and isinstance(data["id"], str)

        r2 = api_client.get(f"{API}/status")
        assert r2.status_code == 200
        items = r2.json()
        assert isinstance(items, list)
        assert any(it["client_name"] == client_name for it in items)


# --------- Episodes (RSS) ---------
class TestEpisodes:
    def test_episodes_default(self, api_client):
        r = api_client.get(f"{API}/episodes")
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("show_title") == "Awkwardish", f"Got show_title={data.get('show_title')}"
        eps = data.get("episodes")
        assert isinstance(eps, list) and len(eps) > 0
        ep0 = eps[0]
        for k in ("id", "title", "description", "episode_number"):
            assert k in ep0, f"Missing {k} in episode payload"
        assert isinstance(ep0["episode_number"], int)

    def test_episodes_limit(self, api_client):
        r = api_client.get(f"{API}/episodes", params={"limit": 3})
        assert r.status_code == 200
        eps = r.json()["episodes"]
        assert len(eps) == 3

    def test_episodes_cached(self, api_client):
        # Two consecutive requests should both succeed and be fast (cache hit)
        t0 = time.time()
        r1 = api_client.get(f"{API}/episodes", params={"limit": 5})
        t1 = time.time()
        r2 = api_client.get(f"{API}/episodes", params={"limit": 5})
        t2 = time.time()
        assert r1.status_code == 200 and r2.status_code == 200
        # Second should be much faster due to in-memory cache
        assert (t2 - t1) <= (t1 - t0) + 0.5


# --------- Newsletter (Mailchimp) ---------
TEST_EMAIL = f"qa+awktest{uuid.uuid4().hex[:8]}@gmail.com"


class TestNewsletter:
    def test_subscribe_success(self, api_client):
        r = api_client.post(
            f"{API}/newsletter/subscribe",
            json={"email": TEST_EMAIL, "first_name": "QA"},
        )
        assert r.status_code == 200, f"{r.status_code}: {r.text}"
        data = r.json()
        assert data["success"] is True
        assert "message" in data
        assert "already_subscribed" in data

    def test_subscribe_idempotent(self, api_client):
        # Resubscribe same email — should still be success (PUT is idempotent)
        r = api_client.post(
            f"{API}/newsletter/subscribe",
            json={"email": TEST_EMAIL, "first_name": "QA"},
        )
        assert r.status_code == 200, f"{r.status_code}: {r.text}"
        assert r.json()["success"] is True

    def test_subscribe_invalid_email(self, api_client):
        r = api_client.post(
            f"{API}/newsletter/subscribe",
            json={"email": "not-an-email", "first_name": "x"},
        )
        assert r.status_code == 422

    def test_subscribe_missing_email(self, api_client):
        r = api_client.post(
            f"{API}/newsletter/subscribe",
            json={"first_name": "x"},
        )
        assert r.status_code == 422
