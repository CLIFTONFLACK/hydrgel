import type { ReactNode } from 'react'

/**
 * The page gutter. This exact class string was repeated 23 times across the
 * app, which meant the site's horizontal rhythm could drift one section at a
 * time. Changing the measure now happens in one place.
 */
export default function Container({
  children,
  width = 'wide',
  className = '',
}: {
  children: ReactNode
  /** `wide` for grids and layout; `text` for anything meant to be read. */
  width?: 'wide' | 'text'
  className?: string
}) {
  const max = width === 'text' ? 'max-w-3xl' : 'max-w-7xl'
  return <div className={`${max} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}
