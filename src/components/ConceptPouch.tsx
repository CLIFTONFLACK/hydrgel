import { useId } from 'react'
import type { PouchShape } from '../data/focus'

/*
  Body outlines on a 400 x 500 canvas. Each leaves the top 90px clear for the
  spout and the fill cap, which are drawn once and shared by every shape.
*/
const BODY: Record<PouchShape, string> = {
  pouch:
    'M78 96 H322 Q346 96 346 120 L334 432 Q332 464 300 464 H100 Q68 464 66 432 L54 120 Q54 96 78 96 Z',
  round: 'M200 92 A186 186 0 1 1 199.9 92 Z',
  shield: 'M70 96 H330 Q346 96 346 114 V262 Q346 392 200 468 Q54 392 54 262 V114 Q54 96 70 96 Z',
  hexagon: 'M200 84 L352 172 Q362 178 362 190 V370 Q362 382 352 388 L200 476 L48 388 Q38 382 38 370 V190 Q38 178 48 172 Z',
}

/** How far the caps drop so they still meet an outline whose top edge slopes away. */
const CAP_DROP: Record<PouchShape, number> = { pouch: 0, round: 14, shield: 0, hexagon: 32 }

/**
 * An unbranded partner pouch, drawn rather than rendered.
 *
 * The partner's identity is deliberately a placeholder. The renders this
 * replaced carried real companies' logos and liveries, which the site must not
 * show without their written permission. Do not pass a real brand's mark or
 * colours into this to recreate them.
 */
export default function ConceptPouch({
  shape,
  face,
  shade,
  alt,
}: {
  shape: PouchShape
  face: string
  shade: string
  alt: string
}) {
  // Several pouches share a page, so gradient and clip ids must not collide.
  const uid = useId().replace(/:/g, '')
  const fill = `pouch-fill-${uid}`
  const sheen = `pouch-sheen-${uid}`
  const clip = `pouch-clip-${uid}`

  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={alt} className="w-full h-auto">
      <defs>
        <linearGradient id={fill} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={face} />
          <stop offset="1" stopColor={shade} />
        </linearGradient>
        <linearGradient id={sheen} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="0.35" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.18" />
        </linearGradient>
        <clipPath id={clip}>
          <path d={BODY[shape]} />
        </clipPath>
      </defs>

      {/* Drinking spout, top left, and the wider fill cap, top right. */}
      <g transform={`translate(0 ${CAP_DROP[shape]})`}>
        <g transform="rotate(-24 128 70)">
          <rect x="108" y="52" width="40" height="52" rx="6" fill="#2563eb" />
          <rect x="102" y="40" width="52" height="22" rx="7" fill="#1d4ed8" />
        </g>
        <rect x="236" y="50" width="62" height="54" rx="6" fill="#1f2937" />
        <rect x="230" y="36" width="74" height="26" rx="8" fill="#111827" />
      </g>

      <path d={BODY[shape]} fill={`url(#${fill})`} />
      <g clipPath={`url(#${clip})`}>
        <rect x="0" y="352" width="400" height="58" fill={shade} opacity="0.55" />
        <rect x="0" y="0" width="400" height="500" fill={`url(#${sheen})`} />
      </g>

      {/* Where the partner's own identity goes. */}
      <rect
        x="112"
        y="196"
        width="176"
        height="112"
        rx="14"
        fill="#ffffff"
        fillOpacity="0.1"
        stroke="#ffffff"
        strokeOpacity="0.85"
        strokeWidth="2.5"
        strokeDasharray="9 8"
      />
      <text
        x="200"
        y="248"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="Montserrat, sans-serif"
        fontSize="24"
        fontWeight="700"
        letterSpacing="2"
      >
        YOUR
      </text>
      <text
        x="200"
        y="278"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="Montserrat, sans-serif"
        fontSize="24"
        fontWeight="700"
        letterSpacing="2"
      >
        BRAND
      </text>

      {/* HYDRGEL stays as a small lockup, as it would on a partner pack. */}
      <path d="M162 142 C162 142 150 158 150 166 A12 12 0 0 0 174 166 C174 158 162 142 162 142 Z" fill="#ffffff" />
      <text
        x="182"
        y="170"
        fill="#ffffff"
        fontFamily="Montserrat, sans-serif"
        fontSize="17"
        fontWeight="600"
        letterSpacing="1.5"
      >
        HYDRGEL
      </text>
    </svg>
  )
}
