// /components/mobile/home/MobileHero.jsx
"use client";

import { useMemo, useState, useEffect } from "react";

const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_URL || "";

export default function MobileHero({ data = {} }) {
  const { media = [], image, title, subtitle, ctaText } = data;
  const [current, setCurrent] = useState(0);

  const banners = useMemo(() => {
    if (Array.isArray(media) && media.length > 0) {
      return media.map(item => ({
        type: item.type || "image",
        src: `${MEDIA_BASE}${item.url}`,
      }));
    }

    if (image) {
      return [{
        type: "image",
        src: `${MEDIA_BASE}${image}`,
      }];
    }

    return [];
  }, [media, image]);

  if (!banners.length) return null;

  const mainTitle = title ? title.split(",")[current] || title.split(",")[0] : "";
  const subTitle = subtitle ? subtitle.split(",")[current] || subtitle.split(",")[0] : "";
  const buttonText = ctaText ? ctaText.split(",")[current] || "Shop Now" : "Shop Now";

  /* Auto Slide */
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <section className="px-4 pt-4">
      <div className="relative rounded-3xl overflow-hidden bg-black h-[220px]">

        {/* Slider Track */}
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="min-w-full h-full relative">

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
                  alt="Hero"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

             {/* <div className="absolute inset-0 bg-black/25" /> */}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 text-white pointer-events-none">
          {mainTitle && (
            <h2 className="text-2xl font-semibold leading-tight max-w-[70%]">
              {mainTitle}
            </h2>
          )}

          {subTitle && (
            <p className="text-sm mt-2 text-white/90 max-w-[70%]">
              {subTitle}
            </p>
          )}

        {/*  <div className="absolute bottom-5 right-6 pointer-events-auto">
            <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium shadow-md">
              {buttonText}
            </button>
          </div> */} {/* Uncomment above block if you want a CTA button on mobile hero */}
        </div>

        {/* Dots */}
        {banners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition ${
                  index === current
                    ? "bg-white"
                    : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}