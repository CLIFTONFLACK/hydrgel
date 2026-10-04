/**
 * Team portrait slot.
 *
 * Deliberately renders initials rather than a generated likeness — these are
 * real people, and inventing a face for someone is not acceptable. Drop a real
 * photograph into `public/images/team/` and set `src` to swap it in; the
 * initials remain the fallback if the file is missing or fails to load.
 */
import { useEffect, useState } from 'react'

export default function Avatar({
  name,
  src,
  size = 'md',
}: {
  name: string
  src?: string
  size?: 'md' | 'lg'
}) {
  const initials = name
    .replace(/^(Dr|Prof|Professor)\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  const dim = size === 'lg' ? 'h-28 w-28 text-3xl' : 'h-20 w-20 text-xl'

  const [failed, setFailed] = useState(false)
  // A different photo gets its own chance to load.
  useEffect(() => setFailed(false), [src])

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setFailed(true)}
        className={`${dim} rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-sm`}
      />
    )
  }

  return (
    <div
      className={`${dim} rounded-full flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-700 text-white font-display font-semibold flex items-center justify-center ring-2 ring-white shadow-sm select-none`}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}
