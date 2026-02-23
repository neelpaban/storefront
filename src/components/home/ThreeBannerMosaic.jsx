// components/home/ThreeBannerMosaic.jsx
import SectionShell from "./SectionShell";

const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_URL || "";

function Banner({ media, title, subtitle, link }) {
  const item = Array.isArray(media) ? media[0] : null;

  if (!item) return null;

  return (
    <a
      href={link}
      className="relative block w-full h-full overflow-hidden group"
    >
      {/* IMAGE */}
      <img
        src={`${MEDIA_BASE}${item.url}`}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover
          transition-transform duration-700 group-hover:scale-105"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/35 flex items-end p-8">
        <div className="text-white max-w-[80%]">
          <h3 className="text-2xl font-light leading-tight">
            {title}
          </h3>
          <p className="mt-1 text-base text-gray-200">
            {subtitle}
          </p>
        </div>
      </div>
    </a>
  );
}

export default function ThreeBannerMosaic({ data = {} }) {
  const {
    heading,
    subheading,
    banners = [],
  } = data;

  if (!heading || banners.length < 3) return null;

  const [big, small1, small2] = banners;

  return (
    <section className="py-6 md:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADING */}
        <div className="mb-20 text-center flex flex-col items-center">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl 
            font-medium text-gray-900 max-w-4xl leading-[1.15]">
            {heading}
          </h2>

          <p className="mt-6 font-sans text-base sm:text-lg 
            text-gray-600 max-w-2xl leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* MOSAIC GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 -mt-16">


          {/* LEFT — BIG */}
          <div className="lg:col-span-3 h-[520px]">
            <Banner {...big} />
          </div>

          {/* RIGHT — STACKED */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="h-[255px]">
              <Banner {...small1} />
            </div>
            <div className="h-[255px]">
              <Banner {...small2} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
