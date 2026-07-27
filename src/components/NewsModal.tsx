import { useEffect, useRef, useCallback, useState } from 'react'
import { X, ExternalLink, Calendar, MapPin } from 'lucide-react'
import { CATEGORY_STYLES, type NewsItem } from '../data/news'

interface Props {
  item: NewsItem
  onClose: () => void
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default function NewsModal({ item, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  /** Element that had focus before opening, so we can hand it back on close. */
  const restoreRef = useRef<HTMLElement | null>(null)

  const style = CATEGORY_STYLES[item.category]

  /*
    Story bodies are a large, growing blob of text — every word of every
    story, for an index a scheduled agent appends to indefinitely. Loading
    that eagerly made the whole newsroom pay for content it may never show,
    so it lives in its own chunk fetched the first time a modal opens.
    Vite caches the module, so subsequent opens are instant.
  */
  const [paragraphs, setParagraphs] = useState<string[] | null>(null)

  useEffect(() => {
    let cancelled = false
    setParagraphs(null)
    import('../data/stories')
      .then((m) => {
        if (!cancelled) setParagraphs(m.STORIES[item.id] ?? [item.summary])
      })
      .catch(() => {
        // Network failure on the chunk: fall back to the excerpt we already have.
        if (!cancelled) setParagraphs([item.summary])
      })
    return () => {
      cancelled = true
    }
  }, [item.id, item.summary])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      // Trap Tab inside the panel so focus cannot escape to the page behind.
      if (e.key !== 'Tab' || !panelRef.current) return
      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((n) => n.offsetParent !== null)
      if (nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    },
    [onClose],
  )

  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    document.addEventListener('keydown', handleKeyDown)

    // Lock background scroll without the page jumping as the scrollbar goes.
    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      restoreRef.current?.focus?.()
    }
  }, [handleKeyDown])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="news-modal-title"
    >
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className="relative bg-white w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col overflow-hidden"
      >
        <div className={`h-2 flex-shrink-0 bg-gradient-to-r ${style.tile}`} />

        <div className="flex items-start justify-between gap-4 px-6 pt-5 flex-shrink-0">
          <span className={`text-xs px-2 py-1 rounded-full ${style.chip}`}>{item.category}</span>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close story"
            className="p-1 -m-1 text-gray-500 hover:text-gray-900 transition-colors rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 pb-6 pt-3">
          <h2 id="news-modal-title" className="text-2xl font-bold text-gray-900">
            {item.title}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={item.date}>{formatDate(item.date)}</time>
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {item.region}
            </span>
          </div>

          {paragraphs === null ? (
            /* Skeleton sized like real copy, so the panel does not jump. */
            <div className="mt-6 space-y-4" aria-live="polite" aria-busy="true">
              <span className="sr-only">Loading the full story</span>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3.5 bg-gray-100 rounded w-full" />
                  <div className="h-3.5 bg-gray-100 rounded w-full" />
                  <div className="h-3.5 bg-gray-100 rounded w-4/5" />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 space-y-5 prose-story">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-[1.0625rem] text-gray-700">
                  {p}
                </p>
              ))}
            </div>
          )}

          <div className="mt-8 pt-5 border-t">
            <p className="text-xs text-gray-500 mb-2">
              Written by HYDRGEL from reporting by the primary source below.
            </p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5 font-medium"
            >
              Read the original at {item.source}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
