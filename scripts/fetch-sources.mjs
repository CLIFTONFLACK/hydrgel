/**
 * Source pre-fetcher for the newsroom routine.
 *
 * The routine that appends to the newsroom runs in a cloud sandbox whose
 * egress policy denies every publisher we cite — who.int, unicef.org,
 * news.un.org, reliefweb.int, nature.com and the rest all answer 403 at the
 * proxy's CONNECT stage. The routine can still search (that runs server-side)
 * but it cannot fetch a page or confirm a URL returns 200, and its own rules
 * forbid publishing a figure it has not read at the source. So it stops.
 *
 * This script runs instead on a GitHub Actions runner, which has open egress.
 * It walks a list of feeds, keeps the water-relevant items, fetches each
 * article, and records the HTTP status, the final URL after redirects and the
 * article text. The workflow publishes the result to the `sources-cache`
 * branch, and the routine reads it from disk. Verification moves to the
 * runner; nothing else about the routine's standards changes.
 *
 * No dependencies on purpose — this has to keep working unattended, and a
 * feed parser is not worth a supply chain. Node 20+ for global fetch.
 *
 * Usage: node scripts/fetch-sources.mjs [outputDir]   (default .sources-out)
 */
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const OUT = path.resolve(process.argv[2] || '.sources-out')

/** Only items published within this window are considered. */
const WINDOW_DAYS = 14
/** Per feed, after the relevance filter. Keeps one noisy feed from crowding out the rest. */
const MAX_ITEMS_PER_FEED = 12
/**
 * Ceiling on articles fetched per run. With a general-news feed in the list the
 * per-feed cap alone is not enough — the cost is one HTTP request per item, and
 * the routine only ever publishes one story. Candidates are interleaved by feed
 * before this bites, so the cap trims the tail of every feed rather than
 * deleting whichever ones happen to sort last.
 */
const MAX_ARTICLES_TOTAL = 120
/** Article text is truncated to this many characters. Enough to verify a claim. */
const ARTICLE_CHARS = 6000
const FETCH_TIMEOUT_MS = 20000
const CONCURRENCY = 4

/**
 * Feeds are best-effort: publishers move and retire them without notice. A
 * feed that fails is recorded in index.json with its error and skipped, never
 * fatal. Check the `feeds` array in a run's index.json to see which are
 * actually resolving, and prune or replace the dead ones.
 *
 * Three kinds sit here on purpose:
 *
 *   primary    — the agencies and journals the newsroom prefers to cite.
 *                Worth keeping even when they are flaky, because an item from
 *                one of these beats the same story told second-hand.
 *   trade      — water-sector press. Narrow beat, so almost everything they
 *                publish clears the relevance filter.
 *   general    — BBC, Yahoo, Google News. These exist to catch the story the
 *                specialist feeds miss entirely: a contamination incident or a
 *                municipal failure that is front-page news locally and never
 *                reaches a UN situation report. They are noisy by nature and
 *                the keyword filter does the work.
 *
 * A note on Google News: its RSS links are wrapper URLs that redirect via
 * JavaScript, which `redirect: follow` cannot resolve. Expect those items to
 * come back HTTP 200 with very little text. That is not a failure — the index
 * records `text_chars`, and the routine is required to skip an item whose
 * stored text is too thin to verify. Treat the feed as a tip sheet: if it
 * surfaces something real, the story will also exist on a feed that fetches.
 */
/**
 * Every URL below was probed from the runner (scripts/probe-feeds.mjs) rather
 * than assumed. Retired outright, after every candidate path was tested:
 *
 *   UNICEF press releases     404 on /press-releases/rss.xml, /media/rss.xml,
 *                             /feeds/rss — no RSS survives.
 *   EurekAlert earth science  404 on /rss/earth_science.xml, /rss.xml,
 *                             /feed/earth_science.
 *   Smart Water Magazine      404 on /rss, /rss.xml, /feed.
 *   ReliefWeb updates+disasters  202 with an empty body to a named client; the
 *                             v1 API that replaced it answers 410 Gone.
 *   US EPA news releases      202 on the documented feed, 404 elsewhere.
 *   UN-Water                  403.
 *
 * Do not re-add these without probing first. Their absence is a measurement,
 * not an oversight.
 */
/** SOURCES_FEEDS overrides the list with the same JSON shape — used by the tests. */
const FEEDS = process.env.SOURCES_FEEDS ? JSON.parse(process.env.SOURCES_FEEDS) : [
  // --- primary -------------------------------------------------------------
  // WHO retired the DON RSS feed but still serves the same items from the
  // OData endpoint behind the DON page, so this reads that instead. The
  // adapter only builds the item list; article text and the HTTP status still
  // come from fetching the canonical who.int page, exactly as for a feed.
  { slug: 'who-don', kind: 'primary', format: 'who-odata', name: 'WHO Disease Outbreak News', url: 'https://www.who.int/api/news/diseaseoutbreaknews?$select=Title,Summary,UrlName,PublicationDate&$orderby=PublicationDate%20desc&$top=25' },
  { slug: 'who-news', kind: 'primary', name: 'WHO news', url: 'https://www.who.int/rss-feeds/news-english.xml' },
  { slug: 'un-news', kind: 'primary', name: 'UN News', url: 'https://news.un.org/feed/subscribe/en/news/all/rss.xml' },
  { slug: 'nature-water', kind: 'primary', name: 'Nature Water', url: 'https://www.nature.com/natwater.rss' },

  // --- science and trade ---------------------------------------------------
  { slug: 'phys-environment', kind: 'trade', name: 'Phys.org environment', url: 'https://phys.org/rss-feed/earth-news/environment-news/' },
  { slug: 'sciencedaily-water', kind: 'trade', name: 'ScienceDaily water', url: 'https://www.sciencedaily.com/rss/earth_climate/water.xml' },
  { slug: 'sciencedaily-drought', kind: 'trade', name: 'ScienceDaily drought', url: 'https://www.sciencedaily.com/rss/earth_climate/drought.xml' },
  { slug: 'circle-of-blue', kind: 'trade', name: 'Circle of Blue', url: 'https://www.circleofblue.org/feed/' },

  // --- general news --------------------------------------------------------
  { slug: 'bbc-science-env', kind: 'general', name: 'BBC science and environment', url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml' },
  { slug: 'bbc-world', kind: 'general', name: 'BBC world', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
  { slug: 'guardian-water', kind: 'general', name: 'The Guardian water', url: 'https://www.theguardian.com/environment/water/rss' },
  { slug: 'yahoo-news', kind: 'general', name: 'Yahoo News', url: 'https://news.yahoo.com/rss/' },
  { slug: 'aljazeera', kind: 'general', name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml' },
  { slug: 'npr-environment', kind: 'general', name: 'NPR environment', url: 'https://feeds.npr.org/1025/rss.xml' },

  // --- tips (listed, never fetched) ----------------------------------------
  // Google News earns its place on headlines alone: it was the only feed to
  // surface the algae bloom that took most of Israel's desalination capacity
  // offline. But its links are wrapper URLs that redirect via JavaScript and
  // resolve to roughly eleven characters of text, so they can never be cited
  // and are not worth an article fetch. Items land in `tips` for orientation;
  // the story itself has to be found on a feed that fetches.
  { slug: 'google-news-water', kind: 'tips', fetch: false, name: 'Google News water', url: 'https://news.google.com/rss/search?q=%22drinking+water%22+OR+%22water+crisis%22+OR+cholera+OR+desalination+when:14d&hl=en-US&gl=US&ceid=US:en' },
]

/**
 * An item must hit one of these to be fetched. The feeds above carry far more
 * than water — this is what keeps the snapshot small enough to force-push on
 * every run.
 *
 * A trailing `*` means prefix match, for stems that inflect in ways not worth
 * enumerating (`desalinat*` covers desalination and desalinated). Everything
 * else matches whole words only. That distinction is not cosmetic: a bare
 * substring test put `wash` inside Washington, and with general-news feeds in
 * the list that alone would have filled the snapshot with US politics.
 */
const KEYWORDS = [
  'water', 'waters', 'drought*', 'flood*', 'cholera', 'sanitation', 'wash',
  'hygiene', 'desalinat*', 'aquifer*', 'groundwater', 'reservoir*',
  'purif*', 'contaminat*', 'pfas', 'arsenic', 'lead pipe*', 'lead service line*',
  'wastewater', 'sewage', 'waterborne', 'typhoid', 'dysentery', 'diarrhoea*',
  // `river` and `basin` stay whole words on purpose: Rivera and Basinger are
  // common enough names to matter once a general-news feed is in the list.
  'diarrhea*', 'glacier*', 'glacial', 'snowpack', 'river', 'rivers',
  'riverbank*', 'riverbed*', 'basin', 'basins',
  'rainfall', 'monsoon*', 'cyclone*', 'hurricane*', 'typhoon*', 'irrigation',
  'scarcity', 'borehole*', 'well water', 'treatment plant*', 'utility',
  'utilities', 'hydrolog*', 'boil water', 'standpipe*', 'latrine*',
]

/** Compiled once. `\b` on the left always; on the right only for whole words. */
const KEYWORD_RES = KEYWORDS.map((k) => {
  const stem = k.endsWith('*')
  const body = (stem ? k.slice(0, -1) : k).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`\\b${body}${stem ? '' : '\\b'}`, 'i')
})

// --- small helpers ---------------------------------------------------------

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  ldquo: '"', rdquo: '"', lsquo: "'", rsquo: "'", mdash: '—', ndash: '–', hellip: '…',
}

const decode = (s = '') =>
  s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-zA-Z]+);/g, (m, n) => ENTITIES[n] ?? m)

const stripTags = (s = '') =>
  s
    .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')

/**
 * Must run before stripTags: a CDATA block holds no `>` until its terminator,
 * so the tag regex would otherwise swallow the block and its contents whole.
 */
const uncdata = (s = '') => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')

const tidy = (s = '') => decode(stripTags(uncdata(s))).replace(/\s+/g, ' ').trim()

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i'))
  return m ? m[1] : ''
}

const idFor = (url) => crypto.createHash('sha1').update(url).digest('hex').slice(0, 12)

async function fetchText(url) {
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: ctl.signal,
      headers: {
        // Some publishers 403 a bare client. Identify the fetcher honestly.
        'user-agent': 'hydrgel-newsroom-sourcebot/1.0 (+https://github.com/CLIFTONFLACK/hydrgel)',
        accept: 'text/html,application/xhtml+xml,application/xml,text/xml;q=0.9,*/*;q=0.8',
      },
    })
    const body = await res.text()
    return { status: res.status, finalUrl: res.url || url, body, error: null }
  } catch (err) {
    return { status: 0, finalUrl: url, body: '', error: String(err?.message || err) }
  } finally {
    clearTimeout(timer)
  }
}

/** Run tasks with a small concurrency cap, preserving input order. */
async function pooled(items, worker) {
  const out = new Array(items.length)
  let next = 0
  const runners = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (true) {
      const i = next++
      if (i >= items.length) return
      out[i] = await worker(items[i], i)
    }
  })
  await Promise.all(runners)
  return out
}

// --- feed parsing ----------------------------------------------------------

/** Handles both RSS <item> and Atom <entry>; returns whatever it can read. */
function parseFeed(xml) {
  const blocks = [
    ...[...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map((m) => m[1]),
    ...[...xml.matchAll(/<entry(?:\s[^>]*)?>([\s\S]*?)<\/entry>/gi)].map((m) => m[1]),
  ]

  return blocks
    .map((b) => {
      let link = tidy(tag(b, 'link'))
      if (!link) {
        // Atom puts the URL in an attribute, and often lists several rels.
        const alt = b.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["']/i)
        const any = b.match(/<link[^>]*href=["']([^"']+)["']/i)
        link = decode((alt?.[1] || any?.[1] || '').trim())
      }
      const raw =
        tidy(tag(b, 'pubDate')) || tidy(tag(b, 'published')) ||
        tidy(tag(b, 'updated')) || tidy(tag(b, 'dc:date'))
      const parsed = raw ? new Date(raw) : null
      return {
        title: tidy(tag(b, 'title')),
        link,
        published_raw: raw || null,
        published: parsed && !Number.isNaN(parsed.valueOf()) ? parsed.toISOString().slice(0, 10) : null,
        summary: tidy(tag(b, 'description') || tag(b, 'summary') || tag(b, 'content')).slice(0, 800),
      }
    })
    .filter((it) => it.link && /^https?:\/\//i.test(it.link))
}

/**
 * WHO's Disease Outbreak News, read from the OData endpoint that replaced the
 * feed. Returns the same item shape as parseFeed, so everything downstream —
 * relevance, window, dedupe, article fetch — is unchanged.
 *
 * `UrlName` is the DON reference (`2026-DON617`) and is the last segment of
 * the public page, which is the URL the newsroom cites and the one the article
 * stage fetches for its real HTTP status.
 */
const WHO_DON_BASE = 'https://www.who.int/emergencies/disease-outbreak-news/item/'

function parseWhoOdata(body) {
  let json
  try {
    json = JSON.parse(body)
  } catch {
    return []
  }
  const rows = Array.isArray(json?.value) ? json.value : []
  return rows
    .map((r) => {
      const name = (r.UrlName || '').trim()
      const raw = r.PublicationDate || null
      const parsed = raw ? new Date(raw) : null
      return {
        title: tidy(r.Title || r.OverrideTitle || ''),
        link: name ? WHO_DON_BASE + encodeURIComponent(name) : '',
        published_raw: raw,
        published: parsed && !Number.isNaN(parsed.valueOf()) ? parsed.toISOString().slice(0, 10) : null,
        summary: tidy(r.Summary || '').slice(0, 800),
      }
    })
    .filter((it) => it.link && it.title)
}

const parseSource = (feed, body) =>
  feed.format === 'who-odata' ? parseWhoOdata(body) : parseFeed(body)

const isRelevant = (it) => {
  const hay = `${it.title} ${it.summary}`
  return KEYWORD_RES.some((re) => re.test(hay))
}

const withinWindow = (it, cutoff) => {
  // Keep undated items: a missing pubDate is common and the agent can judge
  // from the page itself. Only drop things we know are old.
  if (!it.published) return true
  return it.published >= cutoff
}

// --- main ------------------------------------------------------------------

const startedAt = new Date()
const cutoff = new Date(startedAt.getTime() - WINDOW_DAYS * 86400000).toISOString().slice(0, 10)

fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(path.join(OUT, 'articles'), { recursive: true })

const feedReports = []
const candidates = []
const tips = []

for (const feed of FEEDS) {
  const res = await fetchText(feed.url)
  if (res.status !== 200 || !res.body) {
    feedReports.push({ ...feed, status: res.status, item_count: 0, error: res.error || `HTTP ${res.status}` })
    console.log(`  ${feed.slug}: FAILED (${res.error || `HTTP ${res.status}`})`)
    continue
  }

  const all = parseSource(feed, res.body)
  const kept = all.filter((it) => withinWindow(it, cutoff)).filter(isRelevant).slice(0, MAX_ITEMS_PER_FEED)

  feedReports.push({ ...feed, status: res.status, item_count: kept.length, parsed_total: all.length, error: null })

  if (feed.fetch === false) {
    for (const it of kept) tips.push({ feed: feed.slug, title: it.title, url: it.link, published: it.published })
    console.log(`  ${feed.slug}: ${kept.length} tips of ${all.length} parsed (not fetched)`)
    continue
  }

  for (const it of kept) candidates.push({ ...it, feed: feed.slug, feed_name: feed.name, feed_kind: feed.kind })
  console.log(`  ${feed.slug}: ${kept.length} relevant of ${all.length} parsed`)
}

// One entry per URL — the same story often appears in several feeds. Feeds are
// declared primary-first, so the first writer of a URL is the most citable one.
const byUrl = new Map()
for (const c of candidates) if (!byUrl.has(c.link)) byUrl.set(c.link, c)

// Interleave by feed before applying the global cap, so a prolific general
// feed cannot push a quiet primary one out of the snapshot entirely.
const queues = new Map()
for (const c of byUrl.values()) {
  if (!queues.has(c.feed)) queues.set(c.feed, [])
  queues.get(c.feed).push(c)
}
const interleaved = []
for (let round = 0; interleaved.length < byUrl.size; round++) {
  for (const q of queues.values()) if (q[round]) interleaved.push(q[round])
}
const unique = interleaved.slice(0, MAX_ARTICLES_TOTAL)
const dropped = interleaved.length - unique.length

console.log(
  `\nFetching ${unique.length} unique articles` +
    `${dropped > 0 ? ` (${dropped} over the ${MAX_ARTICLES_TOTAL} cap, dropped)` : ''}...`,
)

const articles = await pooled(unique, async (item) => {
  const res = await fetchText(item.link)
  const id = idFor(item.link)
  const text = res.status === 200 ? tidy(res.body).slice(0, ARTICLE_CHARS) : ''

  const record = {
    id,
    feed: item.feed,
    feed_name: item.feed_name,
    feed_kind: item.feed_kind,
    title: item.title,
    url: item.link,
    final_url: res.finalUrl,
    published: item.published,
    published_raw: item.published_raw,
    // This is the check the routine can no longer run for itself. 200 here
    // means the URL resolved from the runner at fetched_at.
    http_status: res.status,
    fetch_error: res.error,
    fetched_at: startedAt.toISOString(),
    summary: item.summary,
    text_chars: text.length,
    truncated: res.status === 200 && tidy(res.body).length > ARTICLE_CHARS,
    text,
  }

  fs.writeFileSync(path.join(OUT, 'articles', `${id}.json`), JSON.stringify(record, null, 2))
  return record
})

const index = {
  generated_at: startedAt.toISOString(),
  window_days: WINDOW_DAYS,
  cutoff_date: cutoff,
  article_char_limit: ARTICLE_CHARS,
  max_articles_total: MAX_ARTICLES_TOTAL,
  dropped_over_cap: dropped,
  feeds: feedReports,
  // Headlines only, from feeds whose links cannot be fetched. Use them to see
  // what is happening; never cite one. A story worth publishing has to be
  // found in `items`, where there is stored text to verify it against.
  tips,
  counts: {
    articles: articles.length,
    ok: articles.filter((a) => a.http_status === 200).length,
    failed: articles.filter((a) => a.http_status !== 200).length,
  },
  // Everything the routine needs to shortlist without opening a single
  // article file. Read the article file only for the item you settle on.
  items: articles.map((a) => ({
    id: a.id,
    feed: a.feed,
    feed_kind: a.feed_kind,
    title: a.title,
    url: a.url,
    final_url: a.final_url,
    published: a.published,
    http_status: a.http_status,
    text_chars: a.text_chars,
    file: `articles/${a.id}.json`,
  })),
}

fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify(index, null, 2))

const liveFeeds = feedReports.filter((f) => !f.error).length
console.log(
  `\n  Snapshot written to ${OUT} — ${liveFeeds}/${FEEDS.length} feeds live, ` +
    `${index.counts.ok} articles fetched OK, ${index.counts.failed} failed.`,
)

// A snapshot with nothing in it means every feed is dead, which is a problem
// worth failing loudly rather than quietly publishing an empty cache.
if (index.counts.ok === 0) {
  console.error('\n  No article fetched successfully — check the feed list.')
  process.exit(1)
}
