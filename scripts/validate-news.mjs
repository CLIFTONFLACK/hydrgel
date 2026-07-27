/**
 * Newsroom integrity gate. Runs as part of `npm run build`, so a malformed
 * news item fails the build rather than reaching the site.
 *
 * This matters because the newsroom is appended to by a scheduled agent that
 * commits straight to main. The build is the only thing standing between a
 * bad entry and production, so these checks are deliberately strict.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const dir = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(dir, '..', 'src', 'data')

const news = fs.readFileSync(path.join(dataDir, 'news.ts'), 'utf8')
const stories = fs.readFileSync(path.join(dataDir, 'stories.ts'), 'utf8')

const errors = []
const warn = (m) => errors.push(m)

const VALID_CATEGORIES = [
  'Crisis', 'Humanitarian', 'Technology', 'Policy',
  'Climate', 'Research', 'Industry', 'HYDRGEL',
]

// --- parse news items ------------------------------------------------------
const itemRe =
  / {4}id: '([^']+)',\n {4}date: '([^']+)',\n {4}title:\s*\n?\s*'((?:[^'\\]|\\.)*)',/g
const items = [...news.matchAll(itemRe)].map((m) => ({
  id: m[1],
  date: m[2],
  title: m[3],
}))

if (items.length === 0) warn('parsed zero news items — the file shape has changed')

// --- id and date integrity -------------------------------------------------
const seen = new Set()
const ID_RE = /^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/
const today = new Date().toISOString().slice(0, 10)

for (const it of items) {
  if (seen.has(it.id)) warn(`duplicate id: ${it.id}`)
  seen.add(it.id)

  if (!ID_RE.test(it.id)) warn(`id is not YYYY-MM-DD-slug: ${it.id}`)
  if (!it.id.startsWith(it.date)) warn(`id date prefix does not match date field: ${it.id}`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(it.date)) warn(`bad date format: ${it.date}`)
  if (Number.isNaN(Date.parse(it.date))) warn(`unparseable date: ${it.date}`)
  if (it.date > today) warn(`date is in the future: ${it.id} (${it.date} > ${today})`)
}

// --- categories and urls ---------------------------------------------------
for (const c of [...news.matchAll(/ {4}category: '([^']+)',/g)].map((m) => m[1])) {
  if (!VALID_CATEGORIES.includes(c)) warn(`unknown category: ${c}`)
}
const urls = [...news.matchAll(/ {4}url: '([^']+)',/g)].map((m) => m[1])
for (const u of urls) {
  if (!u.startsWith('https://')) warn(`url is not https: ${u}`)
}
if (urls.length !== items.length) {
  warn(`url count (${urls.length}) does not match item count (${items.length})`)
}

// --- stories ---------------------------------------------------------------
const storyKeys = [...stories.matchAll(/^ {2}'([^']+)': \[/gm)].map((m) => m[1])
const storySet = new Set(storyKeys)

if (storyKeys.length !== storySet.size) warn('stories.ts contains duplicate keys')

for (const it of items) {
  if (!storySet.has(it.id)) warn(`no story for news item: ${it.id}`)
}
for (const k of storyKeys) {
  if (!seen.has(k)) warn(`orphan story with no matching news item: ${k}`)
}

// --- 600-word cap ----------------------------------------------------------
const blocks = stories.split(/^ {2}'([^']+)': \[/gm)
for (let i = 1; i < blocks.length; i += 2) {
  const key = blocks[i]
  const body = blocks[i + 1].split(/^ {2}\],/m)[0]
  const text = [...body.matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((m) => m[1]).join(' ')
  const words = text.split(/\s+/).filter(Boolean).length
  if (words > 600) warn(`story exceeds 600-word cap: ${key} (${words} words)`)
  if (words < 120) warn(`story suspiciously short: ${key} (${words} words)`)
}

// --- report ----------------------------------------------------------------
if (errors.length) {
  console.error(`\n  Newsroom validation FAILED (${errors.length} problem(s)):\n`)
  for (const e of errors) console.error(`   - ${e}`)
  console.error('')
  process.exit(1)
}

console.log(`  Newsroom OK — ${items.length} items, ${storyKeys.length} stories, all within cap.`)
