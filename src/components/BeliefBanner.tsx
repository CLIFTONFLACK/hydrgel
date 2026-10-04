/**
 * Closing banner on the secondary pages: the hero's lit pouch on a shorter
 * stage, with the company's one-line belief.
 *
 * The picture (`belief-banner.webp`) is the home hero's final frame scaled down
 * and extended to the left, so the dark half is empty for the line. The line
 * is real text, not part of the image: it stays sharp, it reflows on a phone,
 * where the picture is cropped hard, and screen readers and search can read it.
 */
export default function BeliefBanner() {
  return (
    <section aria-label="What we believe" className="w-full bg-white pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-2xl bg-slate-950 h-56 md:h-72">
          <img
            src="/images/belief-banner.webp"
            alt=""
            width={2432}
            height={576}
            loading="lazy"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-right"
          />
          {/* On a phone the crop puts the pouch behind the line, so the left is darkened. */}
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent md:from-slate-950/60 md:via-transparent"
            aria-hidden="true"
          />
          <div className="flex h-full items-center px-6 sm:px-10 md:px-14">
            <p className="max-w-[16rem] sm:max-w-md md:max-w-xl font-display text-xl sm:text-2xl md:text-4xl font-bold leading-tight tracking-tight text-white text-balance">
              We believe access to clean drinking water is a{' '}
              <span className="text-cyan-300">fundamental right.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
