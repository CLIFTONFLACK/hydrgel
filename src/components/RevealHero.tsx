import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ScrollText, Timer, Zap } from 'lucide-react'

const PROOF = [
  { Icon: ScrollText, label: 'Granted US patent' },
  { Icon: Timer, label: 'Clean water in 3 minutes' },
  { Icon: Zap, label: 'No power, no pump' },
]

/**
 * Full-bleed home hero for /new: a 5-second unveiling of the pouch, with the
 * headline over the dark left side of the frame.
 *
 * The clip plays once and holds on its last frame rather than looping. It is
 * a reveal, and looping back to darkness would undo it.
 *
 * The poster is the clip's dark FIRST frame, so there is no cut from a lit
 * pouch to darkness when playback starts. Anyone who should not see the
 * animation (reduced motion) or cannot (autoplay refused) gets the still of
 * the LAST frame instead, so the hero never sits on an empty dark stage.
 */
export default function RevealHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  // Read synchronously on first render. Defaulting to false and correcting in
  // an effect mounted the <video> and called play() once for reduced-motion
  // visitors before the swap to the poster.
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const showStill = reduceMotion || autoplayBlocked

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v || reduceMotion) return
    // The autoPlay attribute does the real work, and it also covers a tab that
    // opens in the background (Chrome pauses muted background video and
    // rejects play() with AbortError, then starts it once the tab is shown).
    // This call only surfaces a genuine refusal, NotAllowedError from
    // low-power mode or data saver, so the finished still can be shown.
    v.play().catch((e: unknown) => {
      if (e instanceof DOMException && e.name === 'NotAllowedError') setAutoplayBlocked(true)
    })
  }, [reduceMotion])

  return (
    <section id="hero" className="relative isolate overflow-hidden bg-slate-950 text-white">
      {/*
        Phones: the clip sits in the flow as a 16:9 band under the nav, with
        the copy below it, so the text never covers the pouch. From md up it
        becomes a full-bleed background and the copy sits over the dark left
        half of the frame, which was composed empty for it.
      */}
      <div className="relative mt-16 aspect-video md:mt-0 md:aspect-auto md:absolute md:inset-0 md:-z-10">
        {showStill ? (
          <img
            src="/images/focus/hero-reveal.webp"
            alt=""
            className="h-full w-full object-cover md:object-[70%_center]"
          />
        ) : (
          <video
            ref={videoRef}
            className="h-full w-full object-cover md:object-[70%_center]"
            poster="/images/focus/hero-reveal-start.webp"
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src="/video/hero-reveal.mp4" type="video/mp4" />
          </video>
        )}
        {/* Fades the band into the page on phones; darkens the copy side from md up. */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent md:bg-gradient-to-r md:from-slate-950/90 md:via-slate-950/40 md:to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 md:pt-40 md:pb-28 md:min-h-[88vh] flex md:items-center">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Introducing HYDRGEL
          </p>
          {/* Caps come from CSS so screen readers and search see normal text. */}
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight uppercase text-balance">
            Clean water, <span className="text-cyan-300">anywhere.</span>
            <br />
            In three minutes.
          </h1>
          <p className="mt-6 text-lg text-slate-200 leading-relaxed max-w-measure">
            A patented cryogel inside a reusable pouch treats the water while it sits. No power,
            no pump and no cartridge. One platform for travellers, for brands and for relief.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#focus"
              className="inline-flex items-center justify-center gap-2 font-display font-semibold bg-white text-slate-950 px-7 py-3 rounded-md hover:bg-cyan-100 transition-colors"
            >
              Find your HYDRGEL
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#why-hydrgel"
              className="inline-flex items-center justify-center font-display font-medium border border-white/40 text-white px-7 py-3 rounded-md hover:bg-white/10 transition-colors"
            >
              Why it is different
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-200">
            {PROOF.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
