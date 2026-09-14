/**
 * Feed probe for newsroom source maintenance.
 *
 * Publishers retire and move feeds without notice, and the sandbox the
 * newsroom routine runs in cannot reach any of them — every candidate URL
 * answers 000 at the proxy, so a URL cannot be tested where the feed list is
 * edited. This script runs on the Actions runner, which has open egress, and
 * answers the only question that matters when a feed goes dark: does this
 * candidate URL return a feed, and does it have anything in it?
 *
 * Usage:
 *   node scripts/probe-feeds.mjs <url> [url...]
 *   node scripts/probe-feeds.mjs --file candidates.txt
 *
 * Or dispatch the fetch-sources workflow with `probe_urls` set to a
 * whitespace- or newline-separated list; the result lands in the job summary.
 *
 * Exit status is 0 whether or not the candidates resolve — a dead candidate is
 * an answer, not a failure. It exits non-zero only when given nothing to do.
 */
import fs from 'fs'

const args = process.argv.slice(2)
const urls = []

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--file') {
    const body = fs.readFileSync(args[++i], 'utf8')
    urls.push(...body.split(/\s+/).filter(Boolean))
  } else {
    urls.push(args[i])
  }
}

if (urls.length === 0) {
  console.error('usage: node scripts/probe-feeds.mjs <url> [url...] | --file <path>')
  process.exit(2)
}

const TIMEOUT_MS = 20000

async function probe(url) {
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: ctl.signal,
      headers: {
        // Same identity the real fetcher uses, so a probe result means what it
        // says. A URL that only works for a spoofed browser is not a URL this
        // newsroom can rely on unattended.
        'user-agent': 'hydrgel-newsroom-sourcebot/1.0 (+https://github.com/CLIFTONFLACK/hydrgel)',
        accept: 'application/rss+xml,application/atom+xml,application/xml,text/xml;q=0.9,*/*;q=0.8',
      },
    })
    const body = await res.text()
    const items =
      (body.match(/<item(?:\s[^>]*)?>/gi) || []).length +
      (body.match(/<entry(?:\s[^>]*)?>/gi) || []).length
    // A feed that parses to zero items is still a live feed; a 200 that is
    // actually an HTML error page is not, and the item count is what separates
    // them.
    const looksLikeFeed = /<(rss|feed|rdf:RDF)[\s>]/i.test(body)
    return {
      url,
      status: res.status,
      final_url: res.url || url,
      content_type: res.headers.get('content-type') || '',
      bytes: body.length,
      items,
      feed: looksLikeFeed,
      error: null,
    }
  } catch (err) {
    return { url, status: 0, final_url: url, content_type: '', bytes: 0, items: 0, feed: false, error: String(err?.message || err) }
  } finally {
    clearTimeout(timer)
  }
}

const results = []
for (const url of urls) results.push(await probe(url))

const verdict = (r) =>
  r.error ? `ERROR ${r.error}`
  : !r.feed ? `NOT A FEED (${r.status}, ${r.bytes} bytes, ${r.content_type.split(';')[0]})`
  : r.items === 0 ? `LIVE but EMPTY (${r.status})`
  : `OK ${r.items} items (${r.status})`

console.log('')
for (const r of results) {
  console.log(`${verdict(r)}\n  ${r.url}`)
  if (r.final_url !== r.url) console.log(`  -> ${r.final_url}`)
}

const usable = results.filter((r) => r.feed && r.items > 0)
console.log(`\n${usable.length}/${results.length} candidates returned a feed with items.`)

if (process.env.GITHUB_STEP_SUMMARY) {
  const rows = results
    .map((r) => `| \`${r.url}\` | ${r.status || '—'} | ${r.items} | ${verdict(r)} |`)
    .join('\n')
  fs.appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    `### Feed probe\n\n| candidate | status | items | verdict |\n|---|---|---|---|\n${rows}\n`,
  )
}
