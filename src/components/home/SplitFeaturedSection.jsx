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
    <section className="bg-rose-50 pt-14 pb-18">
      <div className="max-w-7xl mx-auto px-6">

        {/* ===== SECTION HEADING ===== */}
        <div className="mb-10 text-center">
  <h2 className="text-4xl sm:text-5xl font-light text-gray-900 whitespace-pre-line">
    {heading}
  </h2>

  {subheading && (
    <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
      {subheading}
    </p>
  )}
</div>


        {/* ===== CONTENT GRID ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ===== LEFT FEATURE BANNER ===== */}
          <div className="relative h-[420px] sm:h-[480px] rounded-xl overflow-hidden group">
            <img
              src={`${MEDIA_BASE}${featureMedia.url}`}
              alt={feature.title}
              className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-rose-900/35 flex items-end p-8">
              <div className="text-white">
                <h3 className="text-2xl font-light">
                  {feature.title}
                </h3>
                <a
                  href={feature.ctaLink}
                  className="inline-block mt-3 text-sm tracking-wide underline underline-offset-4 hover:opacity-80 transition"
                >
                  {feature.ctaText}
                </a>
              </div>
            </div>
          </div>

          {/* ===== RIGHT SCROLLING PRODUCTS ===== */}
          <div className="lg:col-span-2 lg:mt-10">
            <div className="flex gap-6 overflow-x-auto pb-6 scroll-smooth">
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

                        {/* SECOND IMAGE (ON HOVER) */}
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

        </div>
      </div>
    </section>
  );
}
