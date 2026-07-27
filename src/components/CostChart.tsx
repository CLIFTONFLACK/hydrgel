/**
 * Cost per litre of clean drinking water — HYDRGEL against bottled water.
 * Figures from HYDRGEL's company presentation (v13.1).
 *
 * Highlight chart, not a categorical palette: the subject carries the brand
 * hue and the comparison sits in a recessive slate. Both bars are directly
 * labelled, so identity never rests on colour alone, and the table below
 * carries the same numbers for assistive tech.
 */

const DATA = [
  { label: 'HYDRGEL', value: 0.2, fill: '#3b82f6', labelInside: false },
  { label: 'Bottled water', value: 1.5, fill: '#64748b', labelInside: true },
]

const MAX = 1.5
const X0 = 8
const TRACK = 300
const BAR_H = 44
const RADIUS = 4

/** Square at the baseline, 4px rounded at the data end. */
function barPath(x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w)
  return [
    `M ${x} ${y}`,
    `H ${x + w - rr}`,
    `A ${rr} ${rr} 0 0 1 ${x + w} ${y + rr}`,
    `V ${y + h - rr}`,
    `A ${rr} ${rr} 0 0 1 ${x + w - rr} ${y + h}`,
    `H ${x}`,
    'Z',
  ].join(' ')
}

export default function CostChart() {
  return (
    <figure className="bg-white rounded-2xl p-6 shadow-sm">
      <figcaption className="text-sm font-semibold text-gray-900 mb-1">
        Cost per litre of clean drinking water
      </figcaption>
      <p className="text-xs text-gray-500 mb-6">Lower is better. USD per litre.</p>

      <svg viewBox="0 0 320 170" className="w-full h-auto" role="img" aria-label="Bar chart comparing cost per litre: HYDRGEL at 20 cents, bottled water at 1 dollar 50.">
        {DATA.map((d, i) => {
          const y = i * 86 + 22
          const w = Math.max((d.value / MAX) * TRACK, RADIUS)
          return (
            <g key={d.label}>
              <text x={X0} y={y - 8} className="fill-gray-500" fontSize="11">
                {d.label}
              </text>

              {/* recessive track */}
              <rect x={X0} y={y} width={TRACK} height={BAR_H} rx="4" fill="#f1f5f9" />

              <path d={barPath(X0, y, w, BAR_H, RADIUS)} fill={d.fill} />

              {d.labelInside ? (
                <text
                  x={X0 + w - 12}
                  y={y + BAR_H / 2 + 5}
                  textAnchor="end"
                  fill="#ffffff"
                  fontSize="15"
                  fontWeight="700"
                >
                  ${d.value.toFixed(2)}
                </text>
              ) : (
                <text
                  x={X0 + w + 10}
                  y={y + BAR_H / 2 + 5}
                  fill="#111827"
                  fontSize="15"
                  fontWeight="700"
                >
                  ${d.value.toFixed(2)}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      <p className="mt-4 text-xs text-gray-500">
        Roughly a <strong className="text-gray-900">7&times;</strong> difference per litre delivered.
      </p>
    </figure>
  )
}
