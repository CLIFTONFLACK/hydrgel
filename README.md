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

## Deployment

Pushes to `main` deploy automatically via the connected Vercel project.
