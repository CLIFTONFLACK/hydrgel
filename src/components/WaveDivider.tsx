export default function WaveDivider() {
  return (
    <section className="relative w-full overflow-hidden" aria-hidden="true">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <img
          src="/images/wave.jpg"
          alt=""
          width={1200}
          height={300}
          loading="lazy"
          className="w-full h-48 md:h-64 object-cover object-bottom rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20" />
      </div>
    </section>
  )
}
