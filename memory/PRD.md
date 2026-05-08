# Awkwardish Podcast — Website PRD

## Original Problem Statement
Build a podcast page for **Awkwardish** (host: Ruby Tobor‑Vasquez) including:
- About section (podcast description + host bio)
- Embedded Spotify player
- Link to merch shop
- Episode highlights
- Contact / social links

## User Choices
- **Spotify Show:** https://open.spotify.com/show/0UChrcN9cdZc8ahsFmh7t5
- **Merch URL:** http://red-petal-project-inc.square.site/
- **Style:** Cozy/warm with soft colors and rounded edges
- **Palette:** Tan, plum, black, pink
- **Logo:** Provided
- **Host photo:** Provided
- **Featured episodes:**
  1. When The Spotlight Meets The Mind
  2. Anxiety Pulled Up On Me… Here's How I'm Coping
  3. Becoming Someone New Without Losing Who You Are
- **Socials:**
  - Instagram: @awkwardishpodcast
  - Threads: @awkwardishpodcast
  - Facebook: Awkwardish Podcasts
  - YouTube: @awkwardishpods

## Architecture
- **Stack:** React 19 (CRA + craco) + Tailwind + shadcn/ui base + lucide-react
- **Pages:** Single-page (`/pages/Home.jsx`) with anchor scrolling
- **Sections (in order):** Header → Hero → Marquee → About → Host (Ruby) → Listen (Spotify embed) → Episodes → Merch → Connect → Footer
- **Data layer:** All site content centralized in `/src/data/site.js` (single source of truth — easy to update copy)
- **Reveal animations:** `useReveal` hook with IntersectionObserver
- **Fonts:** Fraunces (display), Caveat (script accent), Figtree (body)
- **No backend used** — fully static frontend.

## Implemented (2025-12)
- [x] Header with sticky nav, logo, mobile drawer
- [x] Hero with layered logo cards, sticker tape, floating handwritten note, CTAs
- [x] Marquee tagline strip
- [x] About section with full podcast copy + manifesto callout card
- [x] Host bio section with Ruby's photo (decorated frame), 3-stat cards
- [x] Listen section with Spotify iframe embed
- [x] Episodes section (dark plum) with 3 specific episode cards linking to Spotify
- [x] Merch CTA section linking to Square shop
- [x] Connect section with all 4 social platform cards
- [x] Footer with manifesto line, copyright
- [x] Custom palette (tan #E1C9A7, plum #4F2247, pink #F0A6BF/#E0578F, ink #1F1216)
- [x] Cozy styling: rounded-[28px+], soft shadows, paper texture, grain overlay
- [x] data-testid on all interactive elements
- [x] Responsive (mobile drawer + grid reflow)

## Backlog / Next Steps
- P1: Newsletter signup form (Mailchimp/ConvertKit) under "Connect" — ✅ DONE 2025-12 (Mailchimp Marketing API)
- P1: Connect podcast feed to pull live episode list — ✅ DONE 2025-12 (Anchor RSS via feedparser, 10‑min cache)
- P2: Patreon / "Support the show" tip option
- P2: Episode detail pages with show notes
- P2: Season/Archive view if catalog grows
- P2: Optional CMS (Sanity / Notion) so Ruby can self-edit episode highlights
- P2: Welcome email automation in Mailchimp (Campaign → Customer Journey)
- P2: Persist Mailchimp 4xx errors (typo'd email) in admin log

## Newsletter Integration
- Endpoint: `POST /api/newsletter/subscribe` { email, first_name? } → idempotent PUT to Mailchimp `lists/{audience}/members/{md5(email)}`
- Stores local copy in MongoDB collection `newsletter_subscribers` for redundancy
- Server prefix `us17`, audience `81a842d641`
- Env keys: `MAILCHIMP_API_KEY`, `MAILCHIMP_SERVER_PREFIX`, `MAILCHIMP_AUDIENCE_ID`

## RSS Episodes Integration
- Endpoint: `GET /api/episodes?limit=N` returns parsed RSS feed
- Source: `PODCAST_RSS_URL` env (Anchor.fm)
- 10-minute in-memory cache (single-pod fine; revisit if scaled horizontally)
- Auto-tag inference from title keywords (Mental Health, Coping & Care, Identity & Growth, etc.)

## Key Files
- `/app/frontend/src/data/site.js` — all copy & links (single edit point)
- `/app/frontend/src/pages/Home.jsx` — page composition
- `/app/frontend/src/components/sections/*` — section components
- `/app/frontend/src/hooks/useReveal.js` — scroll reveal
- `/app/frontend/src/index.css` — palette tokens & cozy utilities
