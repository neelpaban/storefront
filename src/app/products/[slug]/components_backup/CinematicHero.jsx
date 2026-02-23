// src/app/products/[slug]/components/CinematicHero.jsx
"use client";

import { useState } from "react";

const MEDIA = process.env.NEXT_PUBLIC_MEDIA_URL;

export default function CinematicHero({ data }) {
  const { product, images } = data;
  const [active, setActive] = useState(0);

  if (!product || !images?.length) return null;

  return (
    <section className="relative min-h-[95vh] bg-[#faf8f5] overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center min-h-[95vh]">

        {/* ================= LEFT CONTENT ================= */}
        <div className="relative z-10 space-y-8">

          <div className="text-xs tracking-[0.4em] uppercase text-gray-500">
            Fine Jewellery
          </div>

          <h1 className="text-6xl font-light leading-[1.05] tracking-tight text-[#111]">
            {product.name}
          </h1>

          <div className="text-3xl font-medium text-[#111]">
            ₹{Number(product.total_price).toLocaleString()}
          </div>

          <p className="text-gray-600 max-w-md leading-relaxed">
            {product.description}
          </p>

          <button className="mt-6 px-10 py-4 bg-black text-white uppercase tracking-widest hover:opacity-90 transition duration-300">
            Add To Bag
          </button>

        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="relative flex justify-center items-center">

          <img
            src={`${MEDIA}${images[active]?.image_url}`}
            alt={product.name}
            className="max-h-[80vh] object-contain transition-transform duration-[1200ms] hover:scale-105"
          />

        </div>

      </div>

      {/* ================= THUMBNAILS ================= */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">

        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-16 h-16 rounded-lg overflow-hidden border transition ${
              active === i
                ? "border-black"
                : "border-gray-300"
            }`}
          >
            <img
              src={`${MEDIA}${img.image_url}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}

      </div>

      {/* ================= SOFT BACKGROUND GLOW ================= */}
      <div className="absolute right-0 top-0 w-[40%] h-full bg-gradient-to-l from-[#f0ebe4] to-transparent pointer-events-none" />

    </section>
  );
}
