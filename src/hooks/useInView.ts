import { useEffect, useRef, useState } from 'react'

/**
 * True once the element has scrolled into view, and it stays true: this drives
 * one-off reveal animations, which should not replay every time the reader
 * scrolls back.
 *
 * It fires as soon as any part of the element is a little way inside the
 * viewport, rather than when some fraction of it is visible. A fraction can
 * never be reached by an element taller than the screen, such as a stacked
 * list on a phone held sideways, and the content would then stay hidden.
 *
 * Starts true where IntersectionObserver is missing, so content can never be
 * left hidden waiting for an event that will not come.
 */
export function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      // Any overlap counts, measured against a viewport shortened by 15% at the
      // bottom, so the reveal starts once the top of the element is well in.
      { threshold: 0, rootMargin: '0px 0px -15% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [inView])

  return { ref, inView }
}
