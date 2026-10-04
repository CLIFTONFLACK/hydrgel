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

On a Windows checkout with `core.autocrlf=true`, `npm run build` fails at
`scripts/validate-news.mjs` with "parsed zero news items" — `src/data/news.ts`
gets checked out with CRLF line endings, and the script's item regex matches on
a literal `\n` between fields, so it finds nothing. The Linux build on Vercel
checks the file out with LF and is unaffected.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — three audience doors (Consumer, Corporate, Humanitarian), a proof strip, the lab evidence table and an investor section |
| `/consumer` | Consumer audience page |
| `/corporate` | Corporate audience page |
| `/humanitarian` | Humanitarian audience page |
| `/news` | Water security newsroom |
| `/investors` | Investor information |
| `/new`, `/new/consumer`, `/new/corporate`, `/new/humanitarian` | Redirects to `/`, `/consumer`, `/corporate` and `/humanitarian`, so links shared while the site was under review at `/new` still work |

All nine pages are in `public/sitemap.xml`. The nav always shows a Markets menu
(Consumer, Corporate, Humanitarian) and an "Investor brief" button linking to
`/investors`. There is no Solution link and no Learn more button. The page
components for the home and audience pages still live in `src/pages/new/` for
now.

`vercel.json` rewrites all paths to `index.html` so client-side routes survive a
hard refresh.

## Content

- **`src/data/news.ts`** — the newsroom index. Every entry is a real, externally
  verifiable event or publication, dated to when it happened (or to the
  publication date of the linked source), with a link to the primary publisher.
  Summaries are written for this site; no source text is reproduced.
- **`src/data/investor.ts`** — investor-page content, drawn from HYDRGEL's own
  company presentation, executive summary and company summary.
- **`src/data/focus.ts`** — content for the home page and the three audience
  pages (`/consumer`, `/corporate`, `/humanitarian`): the three pillars, the
  three audience doors and the concept imagery sets. Claims rule: only bacteria
  removal is evidenced (the October 2020 lab reports behind `EFFICACY` in
  `investor.ts`), and only as a proof of concept; other contaminants are
  described as "in development" or "subject to testing", never claimed as
  proven, and the water is never described as meeting WHO or UNHCR standards.
  The same applies to `/investors`. The "Why HYDRGEL is different" section on
  the home page shows each pillar as a short slogan that animates in once, the
  first time it scrolls into view (`useInView` in `src/hooks/useInView.ts`,
  `SloganRow` in `src/components/Focus.tsx`). The slogan and supporting line for
  each pillar are the `slogan` and `line` fields of `PILLARS`, and the claims
  rule applies to them. Motion is collapsed for visitors who ask for reduced
  motion, by a global rule in `src/index.css`. The site shows no third-party brand. Partner
  imagery on `/corporate` uses a "YOUR BRAND" or "YOUR AIRLINE" placeholder. All
  pouch concept imagery carries `CONCEPT_NOTICE`, and imagery of the pouch in the
  field carries `ILLUSTRATIVE_NOTICE`.
- **Site icon** — the water drop alone, in `public/favicon.ico`,
  `public/favicon-32.png`, `public/favicon-192.png` and
  `public/apple-touch-icon.png`, all linked from `index.html`.
- **Humanitarian statistics** — each public statistic on `/humanitarian` is
  worded as its source words it and listed in the `SOURCES` array in
  `src/pages/new/Humanitarian.tsx` (WHO/UNICEF JMP 2025, WHO drinking-water fact
  sheet 2023, World Bank High and Dry 2016). The cost-per-litre comparison is
  HYDRGEL's own planning estimate against bottled water only, with no audited
  basis, and must stay labelled as such.

### Content rules

Three constraints are deliberate and should be preserved:

1. **No personal data.** Nothing from the ACRA business profile's officer or
   shareholder tables — names, residential addresses, NRIC or passport numbers,
   shareholdings — belongs on a public page. Only company-level registry facts
   are used. The repo `.gitignore` also blocks `*.pdf` and `*.docx` so the source
   documents cannot be committed by accident.
2. **No public raise terms.** The current round, grant status and use of funds
   stay in the deck, released on request via the form on `/investors`. The page
   carries a non-solicitation notice.
3. **No third-party brands.** No other company's name, logo, livery or trade
   dress appears on the site without the owner's written permission; a
   disclaimer is not a substitute.

Pilot partners are described by sector and region, because none has approved
public attribution. A country is left out where it would identify the partner
(see the comment above `PARTNERS` in `src/data/investor.ts`).

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
hydrgel.com is being moved to this Vercel project; until the DNS change is made,
the public domain may still serve an older build hosted elsewhere.

Snapshot refreshes do not touch `main`, so they never trigger a deploy.
