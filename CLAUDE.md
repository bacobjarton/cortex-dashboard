# CORTEX — AI Intelligence Dashboard

## Project Overview
Single-file React dashboard for monitoring AI news in real time.
Deployed on GitHub Pages at: https://bacobjarton.github.io/cortex-dashboard/

## Key Files
| File | Purpose |
|------|---------|
| `index.html` | The entire app — React via CDN, no build step |
| `cortex-clean.html` | Earlier iteration (kept for reference) |

## Tech Stack
- React 18 + Babel standalone (no build step, single HTML file)
- CSS: Apple HIG dark mode tokens + Zapier orange accent
- Live data: RSS via rss2json.com, Hacker News Firebase API, Reddit public JSON API
- Deployed: GitHub Pages (`main` branch, repo root `index.html`)

## GitHub
- Repo: https://github.com/bacobjarton/cortex-dashboard
- Deploy: push to `main` → GitHub Pages auto-deploys (1–2 min lag)
- Push command: `git push origin main`

## Architecture
Three-panel layout (left / center / right):
- **Reddit Signal** — live posts from 5 AI subreddits
- **AI Wire** — live RSS headlines + trending topics section
- **Model Watch** — Arena ELO leaderboard (static/curated)

Mobile: single-panel view with bottom tab bar (< 1024px breakpoint)

## Design System
- Font: SF Pro (system-ui) for content, IBM Plex Mono for data/numbers
- Colors: Apple dark mode tokens (`--bg`, `--bg2`, `--tp`, `--ts`, `--td`, `--tl`)
- Accent: Zapier orange (`--cM: #ff6b2b`, `--cB: #ff8c55`)
- Urgency: luminance + shape coded (⚡ FLASH / ▲ PRIORITY / · ROUTINE)
- Radius: 12px cards, 8px chips, 6px badges

## Data Sources
- RSS feeds proxied through rss2json.com (free tier, no key)
- Hacker News: Firebase public API
- Reddit: public .json API (no auth)
- Refresh: auto every 10 min, manual ↺ button in AI Wire header

## currentDate
Keep this in mind: always check the actual date when relevant.
