// storefront/src/components/home/HeroSection.jsx
"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_URL || "";

export default function HeroSection({ data = {} }) {
  const { media = [], image, title, subtitle, ctaText, ctaLink } = data;
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  /* ================= SPLIT MULTI-LINE FIELDS ================= */
  const titles = title
    ? title.split(",").map(t => t.trim())
    : [];

  const subtitles = subtitle
    ? subtitle.split(",").map(s => s.trim())
    : [];

  const ctaTexts = ctaText
    ? ctaText.split(",").map(c => c.trim())
    : [];

  const ctaLinks = ctaLink
    ? ctaLink.split(",").map(l => l.trim())
    : [];


  /* ================= NORMALIZE SLIDES ================= */
  const banners = useMemo(() => {
    if (Array.isArray(media) && media.length > 0) {
      return media.map((item, index) => ({
        type: item.type || "image",
        src: `${MEDIA_BASE}${item.url}`,
        title: titles[index] || titles[0] || null,
        subtitle: subtitles[index] || subtitles[0] || null,
        ctaText: ctaTexts[index] || null,
        ctaLink: ctaLinks[index] || null,
      }));
    }

    if (image) {
      return [
        {
          type: "image",
          src: `${MEDIA_BASE}${image}`,
          title: titles[0] || null,
          subtitle: subtitles[0] || null,
          ctaText: ctaTexts[0] || null,
          ctaLink: ctaLinks[0] || null,
        },
      ];
    }

    return [];
  }, [media, image, titles, subtitles, ctaTexts, ctaLinks]);

  if (!banners.length) return null;

  /* ================= NAVIGATION ================= */
  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % banners.length);

  const prevSlide = () =>
    setCurrent((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [banners.length]);


  return (
    <section className="relative w-full h-[22svh] md:h-[72vh] overflow-hidden bg-black">

      {/* ===== SLIDER TRACK ===== */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={index} className="min-w-full h-full relative">

            {/* ===== MEDIA ===== */}
            {banner.type === "video" ? (
              <video
                src={banner.src}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <img
                src={banner.src}
                alt={banner.title || "Hero banner"}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* ===== OVERLAY CONTENT ===== */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center"> {/* bg-black/40 */}
              <div className="max-w-7xl mx-auto px-6 text-white">

                {banner.title && (
                  <h1 className="text-4xl sm:text-5xl font-light max-w-xl leading-tight">
                    {banner.title}
                  </h1>
                )}

                {banner.subtitle && (
                  <p className="mt-4 text-lg text-gray-200 max-w-md">
                    {banner.subtitle}
                  </p>
                )}

                {banner.ctaText && banner.ctaLink && (
                  <button
                    onClick={() => router.push(banner.ctaLink)}
                    className="mt-6 px-6 py-3 bg-white text-black text-sm tracking-wide uppercase hover:bg-gray-200 transition"
                  >
                    {banner.ctaText}
                  </button>
                )}

              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ===== ARROWS ===== */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20
                       bg-white/20 backdrop-blur-md
                       hover:bg-white/30
                       border border-white/40
                       text-white
                       w-12 h-12 rounded-full
                       flex items-center justify-center
                       transition-all duration-300"
          >
            ‹
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20
                       bg-white/20 backdrop-blur-md
                       hover:bg-white/30
                       border border-white/40
                       text-white
                       w-12 h-12 rounded-full
                       flex items-center justify-center
                       transition-all duration-300"
          >
            ›
          </button>
        </>
      )}
    </section>
  );
}
