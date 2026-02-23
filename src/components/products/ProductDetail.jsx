"use client";

import { useState } from "react";

const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_URL || "";

export default function ProductDetail({ product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const media = product.media || [];
  const activeMedia = media[activeIndex];

  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* ===== MEDIA ===== */}
        <div>
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
            {activeMedia ? (
              activeMedia.type === "video" ? (
                <video
                  src={`${MEDIA_BASE}${activeMedia.url}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img
                  src={`${MEDIA_BASE}${activeMedia.url}`}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )
            ) : null}
          </div>

          {/* THUMBNAILS */}
          {media.length > 1 && (
            <div className="flex gap-3 mt-4">
              {media.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-16 h-20 rounded overflow-hidden border ${
                    i === activeIndex
                      ? "border-gray-900"
                      : "border-gray-200"
                  }`}
                >
                  {m.type === "image" ? (
                    <img
                      src={`${MEDIA_BASE}${m.url}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={`${MEDIA_BASE}${m.url}`}
                      muted
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ===== INFO ===== */}
        <div>
          <h1 className="text-4xl font-light text-gray-900">
            {product.name}
          </h1>

          <p className="mt-4 text-xl text-rose-600 font-medium">
            ₹{product.price}
          </p>

          <p className="mt-6 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* META */}
          <div className="mt-8 text-sm text-gray-500 space-y-1">
            <div>Category: {product.category}</div>
            <div>Collection: {product.collection}</div>
            <div>
              Availability:{" "}
              {product.available_stock > 0
                ? "In Stock"
                : "Out of Stock"}
            </div>
          </div>

          {/* ACTION */}
          <button
            disabled={product.available_stock <= 0}
            className="mt-10 bg-gray-900 text-white px-10 py-4 rounded
                       hover:bg-gray-800 transition disabled:opacity-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
