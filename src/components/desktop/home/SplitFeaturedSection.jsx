// components/home/SplitFeaturedSection.jsx
import SectionShell from "./SectionShell";

const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_URL || "";

export default function SplitFeaturedSection({ data = {} }) {
  const {
    heading,
    subheading,
    feature = {},
    items = [],
  } = data;

  if (!feature?.media?.length || items.length === 0) return null;

  const featureMedia = feature.media[0];

  return (
    <section className="bg-rose-50 pt-8 pb-18">
      <div className="max-w-7xl mx-auto px-6">

        {/* ===== SECTION HEADING ===== */}
        <div className="mb-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-light text-gray-900 whitespace-pre-line">
            {heading}
          </h2>

          {subheading && (
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        {/* ================================================= */}
        {/* ===== FEATURE BANNER (NO CROP VERSION) ===== */}
        {/* ================================================= */}

        <div className="relative w-full rounded-xl overflow-hidden bg-black mb-9">

          {/* Image container */}
          <div className="relative w-full h-[420px] sm:h-[520px] flex items-center justify-center">

            <img
              src={`${MEDIA_BASE}${featureMedia.url}`}
              alt={feature.title}
              className="max-h-full max-w-full object-contain transition duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end p-8">
              <div className="text-white">
                <h3 className="text-2xl md:text-3xl font-light">
                  {feature.title}
                </h3>

                {feature.ctaText && feature.ctaLink && (
                  <a
                    href={feature.ctaLink}
                    className="inline-block mt-3 text-sm tracking-wide underline underline-offset-4 hover:opacity-80 transition"
                  >
                    {feature.ctaText}
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ================================================= */}
        {/* ===== SCROLLABLE PRODUCT ROW ===== */}
        {/* ================================================= */}

        <div className="flex gap-6 overflow-x-auto pb-6 scroll-smooth justify-center">

          {items.map((p, i) => {
            const firstImage = p.media?.[0];
            const secondImage = p.media?.[1];

            if (!firstImage) return null;

            return (
              <div
                key={i}
                className="w-64 flex-shrink-0 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="h-64 relative overflow-hidden group">

                  <a
                    href={p.ctaLink}
                    className="block w-full h-full relative"
                  >
                    {/* FIRST IMAGE */}
                    <img
                      src={`${MEDIA_BASE}${firstImage.url}`}
                      alt={p.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                        secondImage
                          ? "group-hover:opacity-0 group-hover:scale-105"
                          : ""
                      }`}
                    />

                    {/* SECOND IMAGE */}
                    {secondImage && (
                      <img
                        src={`${MEDIA_BASE}${secondImage.url}`}
                        alt={p.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out group-hover:scale-105"
                      />
                    )}
                  </a>

                </div>

                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {p.title}
                  </h3>

                  <a
                    href={p.ctaLink}
                    className="block hover:opacity-80 transition"
                  >
                    <p className="mt-1 text-sm text-rose-600 font-medium">
                      ₹{p.price}
                    </p>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}