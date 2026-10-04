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
    /*
      Full bleed: the band runs edge to edge and the line keeps to the page
      column. The picture is pinned to the right at the band's full height and
      its natural width, so the pouch is never cropped top or bottom. A narrow
      screen cuts into the empty left of the picture; a very wide one shows the
      band's own colour beyond it, which is matched to the picture's left edge.
    */
    <section
      aria-label="What we believe"
      className="relative isolate w-full overflow-hidden bg-[#000107] h-56 md:h-72"
    >
      <img
        src="/images/belief-banner.webp"
        alt=""
        width={2432}
        height={576}
        loading="lazy"
        className="absolute right-0 top-0 -z-10 h-full w-auto max-w-none"
      />
      {/* On a phone the crop puts the pouch behind the line, so the left is darkened. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#000107] via-[#000107]/80 to-transparent md:hidden"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto flex h-full items-center px-4 sm:px-6 lg:px-8">
        <p className="max-w-[16rem] sm:max-w-md md:max-w-xl font-display text-xl sm:text-2xl md:text-4xl font-bold leading-tight tracking-tight text-white text-balance">
          We believe access to clean drinking water is a{' '}
          <span className="text-cyan-300">fundamental right.</span>
        </p>
      </div>
    </section>
  )
}
