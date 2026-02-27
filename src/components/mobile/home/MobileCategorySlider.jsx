// /components/mobile/home/MobileCategorySlider.jsx
"use client";

import Link from "next/link";

const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_URL || "";

export default function MobileCategorySlider({ data = {} }) {
  const { heading = "Category", categories = [] } = data;

  if (!Array.isArray(categories) || categories.length === 0) {
    return null;
  }

  return (
    <section className="mt-6">

      {/* Heading */}
      <h3 className="px-4 text-xl font-semibold text-black mb-4">
        {heading}
      </h3>

      {/* Horizontal Scroll */}
      <div className="flex gap-6 px-4 overflow-x-auto scrollbar-hide">

        {categories.map((cat, index) => {
          const mediaItem = cat.media?.[0];
          if (!mediaItem || !cat.link) return null;

          return (
            <Link
              key={index}
              href={cat.link}
              className="flex flex-col items-center flex-shrink-0"
            >
              {/* Circle */}
              <div className="
                w-20 h-20
                rounded-full
                bg-[#f5f5f5]
                shadow-sm
                overflow-hidden
              ">
                <img
                  src={`${MEDIA_BASE}${mediaItem.url}`}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Label */}
              <span className="text-xs mt-3 text-black">
                {cat.title}
              </span>
            </Link>
          );
        })}

      </div>
    </section>
  );
}