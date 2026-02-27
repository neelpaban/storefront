// components/home/CategoryGrid.jsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_URL || "";

export default function CategoryGrid({ data = {} }) {
  const {
    heading = "",
    subheading = "",
    categories = [],
  } = data;


  const total = categories.length;
  const [active, setActive] = useState(
    total > 0 ? Math.floor(total / 2) : 0
  );
//
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkScreen = () => {
    setIsMobile(window.innerWidth < 640);
  };

  checkScreen(); // initial check
  window.addEventListener("resize", checkScreen);
  return () => window.removeEventListener("resize", checkScreen);
}, []);

//

  if (!Array.isArray(categories) || total === 0) return null;

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
    <section className="relative py-6 md:py-10 bg-rose-50 overflow-hidden">

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

      {/* ===== SLIDER WRAPPER ===== */}
      <div className="relative h-[320px] sm:h-[540px] md:h-[640px] w-full">

        {/* LEFT ARROW */}
        <button
          onClick={prev}
          className="absolute left-6 md:left-10 top-1/3 -translate-y-1/2 z-30 bg-white shadow-xl rounded-full p-3 hover:scale-110 transition"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={next}
          className="absolute right-6 md:right-10 top-1/3 -translate-y-1/2 z-30 bg-white shadow-xl rounded-full p-3 hover:scale-110 transition"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>

        {/* ===== STACKED CARDS ===== */}
        <div className="absolute inset-0 flex items-center justify-center -translate-y-1/9">
          {categories.map((cat, index) => {

            let offset = index - active;

            // Wrap forward
            if (offset > total / 2) {
              offset -= total;
            }

            // Wrap backward
            if (offset < -total / 2) {
              offset += total;
            }

            const abs = Math.abs(offset);

            // Limit visible cards
            if (abs > 3) return null;

            const mediaItem = cat.media?.[0];
            if (!mediaItem) return null;


            const spacing = isMobile ? 180 : 260;

return (
  <CategoryCard
    key={index}
    category={cat}
    active={offset === 0}
    style={{
      transform: `
        translateX(${offset * spacing}px)
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

/* ================= CATEGORY CARD ================= */

function CategoryCard({ category, active, style }) {
  const mediaItem = category.media?.[0];

  return (
    <a
      href={category.link}
      className="
        absolute
        w-[260px] sm:w-[320px] md:w-[360px]
h-[400px] sm:h-[460px] md:h-[520px]
        rounded-2xl
        overflow-hidden
        shadow-2xl
        transition-all
        duration-500
        bg-black
        group
      "
      style={style}
    >
      {/* IMAGE */}
      <img
        src={`${MEDIA_BASE}${mediaItem.url}`}
        alt={category.title}
        className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
      />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* TEXT */}
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <h3 className="text-xl font-light tracking-wide">
          {category.title}
        </h3>

        <span className="inline-flex items-center mt-3 text-sm underline underline-offset-4">
          Explore →
        </span>
      </div>
    </a>
  );
}
