// storefront/src/app/products/[slug]/components/SimilarProductsSection.jsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_URL || "";
const FALLBACK_IMAGE = "/placeholder.jpg"; // make sure this exists in /public

export default function SimilarProductsSection({ products = [] }) {
  const scrollRef = useRef(null);

  if (!Array.isArray(products) || products.length === 0) return null;

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-32 bg-white">
      {/* ===== SECTION HEADING ===== */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-light tracking-wide text-gray-900">
          You May Also Love
        </h2>
        <p className="mt-6 text-gray-500 max-w-2xl mx-auto">
          Pieces selected from the same collection and craftsmanship story.
        </p>
      </div>

      {/* ===== SLIDER WRAPPER ===== */}
      <div className="relative max-w-7xl mx-auto px-6">
        {/* LEFT ARROW */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 hover:scale-110 transition"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 hover:scale-110 transition"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>

        {/* ===== PRODUCTS ROW ===== */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scroll-smooth pb-6 no-scrollbar"
        >
          {products.map((product) => (
            <SimilarProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= CARD ================= */

function SimilarProductCard({ product }) {
  const firstImage =
    product.media?.[0]?.url
      ? `${MEDIA_BASE}${product.media[0].url}`
      : product.image_url
      ? `${MEDIA_BASE}${product.image_url}`
      : FALLBACK_IMAGE;

  const secondImage =
    product.media?.[1]?.url
      ? `${MEDIA_BASE}${product.media[1].url}`
      : null;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="
        w-72
        flex-shrink-0
        bg-white
        rounded-2xl
        overflow-hidden
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-500
        group
      "
    >
      {/* IMAGE WRAPPER */}
      <div className="relative h-80 overflow-hidden">
        {/* FIRST IMAGE */}
        <img
          src={firstImage}
          alt={product.name}
          className={`
            absolute inset-0 w-full h-full object-cover
            transition-all duration-700 ease-in-out
            ${secondImage ? "group-hover:opacity-0 group-hover:scale-105" : ""}
          `}
        />

        {/* SECOND IMAGE (HOVER) */}
        {secondImage && (
          <img
            src={secondImage}
            alt={product.name}
            className="
              absolute inset-0 w-full h-full object-cover
              opacity-0
              group-hover:opacity-100
              transition-all duration-700 ease-in-out
              group-hover:scale-105
            "
          />
        )}
      </div>

      {/* INFO */}
      <div className="p-5">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        <p className="mt-2 text-sm text-rose-600 font-medium">
          ₹{Number(product.total_price || 0).toLocaleString()}
        </p>
      </div>
    </Link>
  );
}