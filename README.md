# TSS DropDesk

A trend-to-shelf command center for The Souled Store. It answers one brief: when a fast-moving
cultural moment appears, take it from discovery to a live decision in hours instead of weeks, and
know within 24 hours whether it is actually working.

This is a React app with realistic mock data, built to run locally, deploy on Vercel, and read
clearly on its own. There is also a companion version of this same dashboard published as a
Claude artifact, kept in sync with this repo, for quick viewing without a local setup.

## Where to look for what

| You want to... | Go to |
| --- | --- |
| Change any number, label, or table row | `src/data.js`. Every tab reads from this one file. |
| Change how a tab is laid out | `src/tabs/*.jsx`, one file per tab |
| Change a chart | `src/components/charts.jsx` |
| Change the pipeline board | `src/components/Kanban.jsx` |
| Change the top bar, ticker, or tab buttons | `src/components/Layout.jsx` |
| Change shared pieces (cards, stat tiles, badges, tables) | `src/components/ui.jsx` |
| Change colors, fonts, spacing tokens | `tailwind.config.js` |
| Add your own images | `public/images/` (see below) |

## The six tabs

1. **Command Center** — every trend opportunity right now, and which stage of the pipeline it is
   stuck at. A live kanban board with real-time SLA timers.
2. **Speed Benchmark** — the old process (21 days) against the fast-track process (11.5 hours),
   stage by stage, and what specifically makes each stage compressible.
3. **24-Hr War Room** — one opportunity, OPP-021 "Retro Varsity Jacket," followed end to end from
   the moment it was spotted through its first hours live, ending in an interim scale, hold, or
   kill verdict.
4. **Cohort & Retention** — whether the people who bought during the trend come back and buy
   again, tracked against a normal new-customer baseline.
5. **Catalog & Governance** — whether price and product data agree across web, app, ads, and
   search, plus the automated checks and alerts running in the background.
6. **AI Copilot** — where automated assistance actually sits in the process: anomaly detection,
   drafted ad copy, sentiment summaries, and the exact scale/hold/kill rule it applies, with a
   human always signing off.

Every number in this app is illustrative case-study data. It is built to show how the dashboard
would read once wired to real GA4, Meta, Google Ads, and CRM data, not as a claim about The
Souled Store's actual performance.

## Design

- **Colors:** Souled Store red (`#e5352b`) and white, with a warm charcoal as the third structural
  color for text and the "rights-gated" track badge. Status colors are kept separate from the
  brand palette on purpose: green for a healthy signal, amber for something that needs attention
  soon, and a neon red with a soft glow for anything urgent, specifically chosen so it never reads
  as the same red as the brand accent. All tokens live in `tailwind.config.js`.
- **Chart series colors** (the 5 to 8 colors used to distinguish bars/lines in a single chart) are
  a separate, colorblind-checked palette, deliberately kept independent of the brand and status
  colors so a chart is never mistaken for an alert.
- **Fonts:** Archivo for headings and big numbers, IBM Plex Sans for body text, IBM Plex Mono for
  timestamps, counters, and anything tabular.
- Dark mode follows the visitor's OS setting automatically (`prefers-color-scheme`).

## Adding your own images

The app works with zero images added, it just shows text and charts. Drop files into these
folders and they show up automatically on next load, no code changes needed:

- `public/images/brand/` — the Souled Store logo (already added from your file) and an optional
  favicon.
- `public/images/hero/` — one image, `opp-021-varsity-jacket.jpg`, shown at the top of the War
  Room tab.
- `public/images/products/` — up to eight thumbnails for the Command Center cards, named
  `OPP-018.jpg` through `OPP-026.jpg`. See the README inside that folder for the full list.

Each of these READMEs is disposable, delete them once you have added your real images.

## Running it locally

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

## Deploying to Vercel

This is a standard Vite + React app, Vercel detects it automatically.

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New Project**, import that repository.
3. Leave the framework preset on **Vite** (auto-detected), build command `npm run build`, output
   directory `dist`. No environment variables are required.
4. Deploy. Every push to the main branch redeploys automatically.

## Stack

- [Vite](https://vitejs.dev) + [React 18](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com) for styling, with a custom brand theme
- [Recharts](https://recharts.org) for the area, bar, and line charts
- No backend and no API keys. All data is local mock data in `src/data.js`, structured so it is
  straightforward to swap for real API calls later.

## Replacing mock data with real data later

Every tab imports its numbers from `src/data.js` as plain JavaScript objects and arrays. To wire
this up to real systems, the shape to fill is already there: replace the exported constants in
that file with values fetched from GA4, Meta, Google Ads, your feed management tool, and your CRM,
either at build time or via a small API layer. No component code needs to change as long as the
shape of each object stays the same.
