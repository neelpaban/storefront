// storefront/src/components/home/CuratedGallery.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_URL || "";

export default function CuratedGallery({ data = {} }) {
  const {
    heading = "",
    subheading = "",
    media = [],
  } = data;

 // const [active, setActive] = useState(0);

  const total = media.length;

  
const [active, setActive] = useState(
  total > 0 ? Math.floor(total / 2) : 0
);

  if (!Array.isArray(media) || total === 0) return null;

  /* ================= NAVIGATION ================= */
  const prev = useCallback(() => {
    setActive(i => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setActive(i => (i + 1) % total);
  }, [total]);

  /* ================= KEYBOARD SUPPORT ================= */
  useEffect(() => {
    const onKey = e => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <section className="relative py-6 md:py-3 bg-white overflow-hidden">

      {/* ===== HEADING ===== */}
      <div className="text-center mb-20 px-6">
        {heading && (
          <h2 className="text-4xl md:text-5xl font-light tracking-wide text-gray-900">
            {heading}
          </h2>
        )}
        {subheading && (
          <p className="mt-6 text-gray-500 max-w-2xl mx-auto">
            {subheading}
          </p>
        )}
      </div>

      {/* ===== SLIDER ===== */}
      <div className="relative h-[640px] w-full">

        {/* LEFT ARROW */}
        <button
          onClick={prev}
          className="absolute left-6 md:left-12 top-1/3 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-4 hover:scale-110 transition"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={next}
          className="absolute right-6 md:right-12 top-1/3 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-4 hover:scale-110 transition"

        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>

        {/* ===== CARDS STACK ===== */}
        <div className="absolute inset-0 flex items-center justify-center -translate-y-1/9">
          {media.map((item, index) => {
            let offset = index - active;

// Circular wrap logic
if (offset > total / 2) offset -= total;
if (offset < -total / 2) offset += total;

const abs = Math.abs(offset);

// performance guard
if (abs > 3) return null;


            return (
              <GalleryCard
                key={index}
                item={item}
                active={offset === 0}
                style={{
                  transform: `
    translateX(${offset * 260}px)
    scale(${1 - abs * 0.12})
  `,
                  zIndex: 10 - abs,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= CARD ================= */

function GalleryCard({ item, active, style }) {
  return (
    <div
      className="
        absolute
        w-[400px]
        h-[560px]
        rounded-2xl
        overflow-hidden
        shadow-2xl
        transition-all
        duration-500
        bg-black
      "
      style={style}
    >
      {/* MEDIA */}
      {item.type === "video" ? (
        <video
          src={`${MEDIA_BASE}${item.url}`}
          muted
          loop
          playsInline
          autoPlay={active}
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={`${MEDIA_BASE}${item.url}`}
          alt={item.title || ""}
          className="w-full h-full object-cover"
        />
      )}

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* INFO */}
      {item.title && (
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <p className="text-sm opacity-80">
            {item.subtitle}
          </p>
          <h3 className="text-lg font-medium mt-1">
            {item.title}
          </h3>

          {item.ctaLink && (
            <a
              href={item.ctaLink}
              className="inline-flex items-center mt-3 text-sm underline underline-offset-4"
            >
              View Product →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
