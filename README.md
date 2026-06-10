# CORTEX — AI Intelligence Dashboard

A real-time dashboard for monitoring the AI industry: live community signal, news wire, computed trending topics, and a model ranking that blends benchmark capability with live public momentum.

**Live:** deployed on Railway (primary) and [GitHub Pages](https://bacobjarton.github.io/cortex-dashboard/)

## Panels

| Panel | What it shows | Source |
|---|---|---|
| **Social Signal** | Hot posts from 5 AI subreddits, ranked by upvotes + recency; every card links to the thread | Reddit public JSON API |
| **AI Wire** | Live headlines, three-tier hierarchy (lead → featured → compact), auto-classified by topic and urgency | 8 RSS feeds via rss2json + Hacker News front page (Algolia API) |
| **Trending Topics** | Cross-platform discussion volume with a "why it's trending" line pulled from the top matching headline | Computed from live news + Reddit data |
| **Model Watch** | CORTEX Score ranking: 50% capability (GPQA/MMLU/HumanEval composite, curated) + 50% momentum (live news/Reddit/HuggingFace buzz with urgency weighting and 24h half-life decay) | Computed + HuggingFace API |

All data is live — there is no demo/fallback content. If a feed is unreachable the panel says so and retries every 5 minutes.

## Architecture

One file: [index.html](index.html). React 18 (production UMD, SRI-pinned) + Babel Standalone compile JSX in the browser — no build step by design. CSS is a hand-rolled design system (Apple dark-mode tokens + orange accent, WCAG-annotated).

Because there is no build step, CI runs a JSX parse gate (`npm run check`) so a syntax error can't ship as a blank page.

## Run locally

```sh
npm install
npm run check        # parse the in-browser JSX
python -m http.server 3333   # or any static server, then open http://localhost:3333
```

`npm start` (the Railway start command) uses POSIX `$PORT` and won't expand on Windows — use a static server locally instead.

## Deploy

Push to `main` → GitHub Actions runs the syntax gate; Railway and GitHub Pages each auto-deploy. Railway serves via [`serve`](https://www.npmjs.com/package/serve) (`npm start`).

## Notes for contributors

- Free-tier APIs only (rss2json, Reddit public JSON, Algolia HN, HuggingFace) — keep the 5-minute refresh cadence polite.
- Benchmark figures in `LEADERBOARD` are curated reference data; update them when models ship, with sources.
- Keyboard: `1/2/3` panels · `j/k` scroll · `/` search · `w` watchlist · `m` models table.
