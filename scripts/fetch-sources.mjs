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
const MAX_ITEMS_PER_FEED = 25
/** Article text is truncated to this many characters. Enough to verify a claim. */
const ARTICLE_CHARS = 6000
const FETCH_TIMEOUT_MS = 20000
const CONCURRENCY = 4

/**
 * Feeds are best-effort: publishers move and retire them without notice. A
 * feed that fails is recorded in index.json with its error and skipped, never
 * fatal. Check the `feeds` array in a run's index.json to see which are
 * actually resolving, and prune or replace the dead ones.
 */
/** SOURCES_FEEDS overrides the list with the same JSON shape — used by the tests. */
const FEEDS = process.env.SOURCES_FEEDS ? JSON.parse(process.env.SOURCES_FEEDS) : [
  // Every entry below returned 200 and parsed on the 21 Aug 2026 runs. Feeds
  // that answered 404, 403 or 202 have been dropped rather than left to log a
  // failure every run: who.int/feeds/entity/csr/don, unicef.org (both
  // /media/rss.xml and /rss.xml), epa.gov news, eurekalert.org and
  // smartwatermagazine.com. See the humanitarian-sources note below.
  { slug: 'who-news', name: 'WHO news', url: 'https://www.who.int/rss-feeds/news-english.xml' },
  { slug: 'who-africa', name: 'WHO African Region', url: 'https://www.afro.who.int/rss.xml' },
  { slug: 'un-news', name: 'UN News', url: 'https://news.un.org/feed/subscribe/en/news/all/rss.xml' },
  { slug: 'nature-water', name: 'Nature Water', url: 'https://www.nature.com/natwater.rss' },
  { slug: 'phys-environment', name: 'Phys.org environment', url: 'https://phys.org/rss-feed/earth-news/environment-news/' },
  { slug: 'guardian-water', name: 'Guardian water', url: 'https://www.theguardian.com/environment/water/rss' },
  { slug: 'sciencedaily-water', name: 'ScienceDaily water', url: 'https://www.sciencedaily.com/rss/earth_climate/water.xml' },
  { slug: 'circle-of-blue', name: 'Circle of Blue', url: 'https://www.circleofblue.org/feed/' },
]

/*
 * Humanitarian sources are the gap in this list. UNICEF, WHO Disease Outbreak
 * News and ReliefWeb are the natural homes for cholera, displacement and WASH
 * emergency reporting — the stories this newsroom most wants — and none of
 * them is reachable by RSS from a runner. UNICEF answers 403, ReliefWeb 202;
 * both look like bot protection rather than a wrong path, so a different URL
 * is unlikely to help.
 *
 * The route worth taking is ReliefWeb's public JSON API at api.reliefweb.int,
 * which is built for programmatic access and aggregates UNICEF, WHO and OCHA
 * reporting in one place. That needs a JSON source type alongside the feed
 * parser, which is why it is a note here rather than an entry above.
 */

/**
 * An item must hit one of these to be fetched. The feeds above carry far more
 * than water — this is what keeps the snapshot small enough to force-push on
 * every run.
 */
const KEYWORDS = [
  'water', 'drought', 'flood', 'cholera', 'sanitation', 'wash', 'hygiene',
  'desalination', 'desalinat', 'aquifer', 'groundwater', 'reservoir',
  'purification', 'purif', 'contaminat', 'pfas', 'arsenic', 'lead pipe',
  'wastewater', 'sewage', 'waterborne', 'typhoid', 'dysentery', 'diarrhoea',
  'diarrhea', 'glacier', 'snowpack', 'river', 'basin', 'rainfall', 'monsoon',
  'cyclone', 'hurricane', 'typhoon', 'irrigation', 'scarcity', 'borehole',
  'well water', 'treatment plant', 'utility', 'hydrolog',
]

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

const isRelevant = (it) => {
  const hay = `${it.title} ${it.summary}`.toLowerCase()
  return KEYWORDS.some((k) => hay.includes(k))
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

for (const feed of FEEDS) {
  const res = await fetchText(feed.url)
  if (res.status !== 200 || !res.body) {
    feedReports.push({ ...feed, status: res.status, item_count: 0, error: res.error || `HTTP ${res.status}` })
    console.log(`  ${feed.slug}: FAILED (${res.error || `HTTP ${res.status}`})`)
    continue
  }

  const all = parseFeed(res.body)
  const kept = all.filter((it) => withinWindow(it, cutoff)).filter(isRelevant).slice(0, MAX_ITEMS_PER_FEED)

  feedReports.push({ ...feed, status: res.status, item_count: kept.length, parsed_total: all.length, error: null })
  for (const it of kept) candidates.push({ ...it, feed: feed.slug, feed_name: feed.name })
  console.log(`  ${feed.slug}: ${kept.length} relevant of ${all.length} parsed`)
}

// One entry per URL — the same story often appears in several feeds.
const byUrl = new Map()
for (const c of candidates) if (!byUrl.has(c.link)) byUrl.set(c.link, c)
const unique = [...byUrl.values()]

console.log(`\nFetching ${unique.length} unique articles...`)

const articles = await pooled(unique, async (item) => {
  const res = await fetchText(item.link)
  const id = idFor(item.link)
  const text = res.status === 200 ? tidy(res.body).slice(0, ARTICLE_CHARS) : ''

  const record = {
    id,
    feed: item.feed,
    feed_name: item.feed_name,
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
  feeds: feedReports,
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
