# CORTEX — AI Intelligence Dashboard

## Project Overview
Single-file React dashboard for monitoring AI news in real time. All data is
live — there is no demo/fallback content. Portfolio piece heading toward
public users.

## Key Files
| File | Purpose |
|------|---------|
| `index.html` | The entire app — React via CDN, no build step |
| `scripts/check-syntax.mjs` | JSX parse gate (`npm run check`) — CI runs it on every push |
| `package.json` | Railway start command (`serve`) + check script |
| `.github/workflows/ci.yml` | CI: `npm ci && npm run check` |

## Tech Stack
- React 18.3.1 production UMD + Babel Standalone 7.26.4, both SRI-pinned (no build step)
- CSS: Apple HIG dark mode tokens + Zapier orange accent
- Deployed: Railway (primary, `npm start` → `serve`) and GitHub Pages (mirror)

## GitHub
- Repo: https://github.com/bacobjarton/cortex-dashboard
- Push to `main` → CI syntax gate runs; Railway + GitHub Pages auto-deploy (1–2 min lag)
- IMPORTANT: run `npm run check` before every commit that touches index.html —
  JSX compiles in the browser, so a syntax error ships as a blank page

## Architecture
Three-panel layout (left / center / right):
- **Social Signal** — live posts from 5 AI subreddits; every card is an `<a>`
  linking to the thread. Per-panel status: loading skeleton → live → error
  state with retry (no fake content, ever)
- **AI Wire** — live RSS headlines (8 feeds via rss2json) + HN front page via
  Algolia (1 request); three-tier hierarchy + Trending Topics with computed
  "why it's trending" reasons
- **Model Watch** — CORTEX Score ranking = 50% capability (curated GPQA/MMLU/
  HumanEval composite in `LEADERBOARD`) + 50% live momentum (news mentions ×
  urgency × 24h half-life decay, log-scaled Reddit upvotes, HF trending bonus)

Mobile: single-panel view with bottom tab bar (< 1024px breakpoint)

## Data Sources & Limits
- All free-tier, no keys: rss2json.com, Reddit public JSON (staggered 250ms,
  sequential), Algolia HN, HuggingFace models API
- Refresh: news+social every 5 min; HF trending every 10 min; manual ↺ in
  AI Wire header. Keep the cadence ≥ 5 min — these APIs rate-limit per IP.
- Timestamps: rss2json dates are UTC without a marker — always parse through
  `parseFeedDate()`, never bare `new Date()`
- Outbound links: always wrap feed-supplied URLs in `safeUrl()` (http/https
  only) before they reach an href

## Design System
- Font: SF Pro (system-ui) for content, IBM Plex Mono for data/numbers
- Colors: Apple dark mode tokens (`--bg`, `--bg2`, `--tp`, `--ts`, `--td`, `--tl`)
- Accent: Zapier orange (`--cM: #ff6b2b`, `--cB: #ff8c55`)
- Urgency: luminance + shape coded (⚡ FLASH / ▲ PRIORITY / · ROUTINE)
- Radius: 12px cards, 8px chips, 6px badges

## currentDate
Keep this in mind: always check the actual date when relevant.
