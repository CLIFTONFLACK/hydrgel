import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, Filter } from 'lucide-react'
import {
  NEWS_SORTED,
  YEARS,
  CATEGORIES,
  CATEGORY_STYLES,
  type Category,
  type NewsItem,
} from '../data/news'
import WaveDivider from '../components/WaveDivider'
import NewsModal from '../components/NewsModal'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const ALL = 'All'

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default function News() {
  useDocumentMeta(
    'Water Security Newsroom | HYDRGEL',
    'Crises, research, regulation and investment shaping global water security — with links to every primary source.',
    '/news',
  )
  const [year, setYear] = useState<string>(ALL)
  const [category, setCategory] = useState<Category | typeof ALL>(ALL)
  const [open, setOpen] = useState<NewsItem | null>(null)

  const items = useMemo(
    () =>
      NEWS_SORTED.filter(
        (n) =>
          (year === ALL || n.date.startsWith(year)) &&
          (category === ALL || n.category === category),
      ),
    [year, category],
  )

  return (
    <>
      <main className="pt-16">
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-500">water security newsroom</h1>
            <h2 className="text-xl md:text-2xl text-green-700 mt-4">
              the conversation HYDRGEL is built for
            </h2>
            <p className="mt-6 text-gray-600 max-w-3xl">
              A running record of the crises, research, regulation and investment shaping global
              water security. Every item links to its primary source. Dates reflect when the event
              occurred, or when the linked source was published.
            </p>
          </div>
        </section>

        {/*
          Sticky, so it must stay shallow — this was three stacked rows plus
          generous padding, which ate most of a phone viewport. Count now sits
          inline with the year chips, and the chips are 44px-tall touch targets.
        */}
        <section className="bg-gray-50/95 backdrop-blur py-3 sticky top-16 z-40 border-y">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-gray-500 text-sm mr-1">
                <Filter className="h-4 w-4" />
                <span className="tabular-nums">
                  <strong className="text-gray-900">{items.length}</strong>
                  <span className="hidden sm:inline"> of {NEWS_SORTED.length}</span>
                </span>
              </span>

              {[ALL, ...YEARS].map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  aria-pressed={year === y}
                  className={`min-h-[2.25rem] px-3 rounded-full text-sm transition-colors ${
                    year === y
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {[ALL, ...CATEGORIES].map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c as Category | typeof ALL)}
                  aria-pressed={category === c}
                  className={`min-h-[2.25rem] px-3 rounded-full text-sm transition-colors ${
                    category === c
                      ? 'bg-green-700 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {items.length === 0 ? (
              <p className="text-center text-gray-500 py-12">
                No items match that combination. Try widening the filters.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((n) => {
                  const style = CATEGORY_STYLES[n.category]
                  return (
                    <article
                      key={n.id}
                      onClick={() => setOpen(n)}
                      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden cursor-pointer"
                    >
                      <div className={`h-2 bg-gradient-to-r ${style.tile}`} />
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${style.chip}`}>
                            {n.category}
                          </span>
                          <time dateTime={n.date} className="text-xs text-gray-500">
                            {formatDate(n.date)}
                          </time>
                        </div>

                        {/*
                          The heading carries the real control, so the card is
                          reachable by keyboard and announced properly. The
                          click handler on the article is a mouse affordance
                          only — it duplicates this button, never replaces it.
                        */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setOpen(n)
                            }}
                            className="text-left hover:text-blue-500 transition-colors"
                          >
                            {n.title}
                          </button>
                        </h3>
                        <p className="text-sm text-gray-600 flex-1">{n.summary}</p>

                        <p className="mt-3 text-sm text-blue-600 font-medium">Read the full story</p>

                        <div className="mt-4 pt-4 border-t flex items-center justify-between gap-2">
                          <span className="text-xs text-gray-500">{n.region}</span>
                          <a
                            href={n.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                          >
                            {n.source}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Every one of these stories is a supply failure at the point of need.
            </h2>
            <p className="max-w-2xl mx-auto text-blue-50">
              That is precisely the gap HYDRGEL was built to close.
            </p>
            <Link
              to="/investors"
              className="inline-block mt-8 bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 font-semibold"
            >
              See the opportunity
            </Link>
          </div>
        </section>
      </main>

      <WaveDivider />

      {open && <NewsModal item={open} onClose={() => setOpen(null)} />}
    </>
  )
}
