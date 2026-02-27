// components/home/VideoBannerSection.jsx

const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_URL || "";

export default function VideoBannerSection({ data = {} }) {
  const {
    heading,
    subheading,
    ctaText,
    ctaLink,
    media = [],
  } = data;

  const video = Array.isArray(media) ? media[0] : null;

  if (!heading || !video) return null;

  return (
    <section className="relative w-full h-[50vh] sm:h-[80vh] overflow-hidden bg-white">

      {/* ===== VIDEO ===== */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={`${MEDIA_BASE}${video.url}`}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* ===== SOFT OVERLAY ===== */}
      <div className="absolute inset-0 bg-rose-900/20" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl text-white">

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight">
              {heading}
            </h2>

            <p className="mt-6 text-base sm:text-lg text-rose-100 leading-relaxed">
              {subheading}
            </p>

            <a
              href={ctaLink}
              className="inline-block mt-8 border border-white px-8 py-3 text-sm tracking-wide
                         hover:bg-white hover:text-gray-900 transition"
            >
              {ctaText}
            </a>

          </div>
        </div>
      </div>

    </section>
  );
}
