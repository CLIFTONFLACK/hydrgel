# HYDRGEL

Marketing site for HYDRGEL PTE. LTD. — cryogel water purification at the point of need.

Live: [hydrgel.com](https://hydrgel.com)

## Stack

Vite · React 18 · TypeScript · Tailwind CSS 3 · React Router 6 · lucide-react

## Local development

```bash
npm install
npm run dev
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server on :5173 |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Type-check only |

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — product, HYDRLAB, use cases |
| `/news` | Water security newsroom |
| `/investors` | Investor information |

`vercel.json` rewrites all paths to `index.html` so client-side routes survive a
hard refresh.

## Content

- **`src/data/news.ts`** — the newsroom index. Every entry is a real, externally
  verifiable event or publication, dated to when it happened (or to the
  publication date of the linked source), with a link to the primary publisher.
  Summaries are written for this site; no source text is reproduced.
- **`src/data/investor.ts`** — investor-page content, drawn from HYDRGEL's own
  company presentation, executive summary and company summary.

### Content rules

Two constraints are deliberate and should be preserved:

1. **No personal data.** Nothing from the ACRA business profile's officer or
   shareholder tables — names, residential addresses, NRIC or passport numbers,
   shareholdings — belongs on a public page. Only company-level registry facts
   are used. The repo `.gitignore` also blocks `*.pdf` and `*.docx` so the source
   documents cannot be committed by accident.
2. **No public raise terms.** The current round, grant status and use of funds
   stay in the deck, released on request via the form on `/investors`. The page
   carries a non-solicitation notice.

Pilot partners are described by sector and geography only, because none has
approved public attribution.

## Newsroom automation

The newsroom is appended to by a scheduled agent (Mon/Wed/Fri, 06:00 UTC) that
adds at most one entry per run and commits straight to `main`.
`scripts/validate-news.mjs` runs first inside `npm run build`, so a malformed
entry fails the build rather than reaching the site.

### Source pre-fetching

That agent runs in a cloud sandbox whose egress policy denies every publisher
the newsroom cites — `who.int`, `unicef.org`, `news.un.org`, `reliefweb.int`,
`nature.com` and the rest all answer 403 at the proxy. It can still search,
because search runs server-side, but it cannot open a source or confirm a URL
resolves, and it is not permitted to publish a figure it has not read at the
source. Left alone it stops every run without writing anything.

So fetching happens on a GitHub Actions runner, which has open egress:

| Piece | Role |
| --- | --- |
| `scripts/fetch-sources.mjs` | Walks the feed list, keeps water-relevant items inside a 14-day window, fetches each article, records HTTP status, final URL and text |
| `.github/workflows/fetch-sources.yml` | Runs it at 05:30 UTC Mon/Wed/Fri, ~35 min ahead of the agent, and on manual dispatch |
| `sources-cache` branch | Where the snapshot lands — an orphan branch rewritten as a single commit each run |

The agent hydrates the snapshot into `.sources/` (git-ignored) and reads it from
disk. Verification moves to the runner: an `http_status` of 200 in the snapshot
is the check the agent can no longer run for itself, and the stored article text
is what its figures get checked against.

This is the same trick as `ingest-week.yml` in the `linkedin` repo, pointed
inward rather than outward.

Two things worth knowing:

- **Feeds rot.** A feed that fails is recorded in the snapshot's `index.json`
  with its error and skipped, never fatal. Check the `feeds` array after a run
  to see which are actually resolving; the job fails loudly only if *no* article
  could be fetched at all.
- **Discovery is bounded by the feed list.** If the agent finds a story via
  search whose URL is not in the snapshot, it still cannot verify it and will
  correctly decline to publish. Widening coverage means adding feeds to
  `FEEDS` in `scripts/fetch-sources.mjs`.

To refresh the snapshot by hand, run the workflow from the Actions tab, or
locally with `node scripts/fetch-sources.mjs .sources-out`.

## Deployment

Pushes to `main` deploy automatically via the connected Vercel project.
Snapshot refreshes do not touch `main`, so they never trigger a deploy.
