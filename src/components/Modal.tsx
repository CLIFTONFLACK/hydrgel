import { useEffect, useRef, useCallback, type ReactNode } from 'react'
import { X } from 'lucide-react'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

let openCount = 0

/**
 * Accessible dialog primitive: focus moves in on open and returns to the
 * trigger on close, Tab is trapped, Escape and backdrop both dismiss, and
 * background scroll is locked with scrollbar-width compensation so the page
 * behind does not shift.
 */
export default function Modal({
  onClose,
  labelledBy,
  accent,
  children,
  size = 'lg',
}: {
  onClose: () => void
  /** id of the element naming this dialog — required for screen readers. */
  labelledBy: string
  /** Optional gradient classes for the top rule. */
  accent?: string
  children: ReactNode
  size?: 'md' | 'lg'
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
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

    // Ref-count so nested or rapidly-swapped dialogs cannot strand the lock.
    const { overflow, paddingRight } = document.body.style
    if (openCount === 0) {
      const gap = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      if (gap > 0) document.body.style.paddingRight = `${gap}px`
    }
    openCount++

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      openCount--
      if (openCount === 0) {
        document.body.style.overflow = overflow
        document.body.style.paddingRight = paddingRight
      }
      restoreRef.current?.focus?.()
    }
  }, [handleKeyDown])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className={`relative bg-white w-full ${
          size === 'md' ? 'sm:max-w-lg' : 'sm:max-w-2xl'
        } max-h-[92vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col overflow-hidden`}
      >
        {accent && <div className={`h-2 flex-shrink-0 bg-gradient-to-r ${accent}`} />}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 z-10 p-1.5 text-gray-500 hover:text-gray-900 bg-white/80 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  )
}
