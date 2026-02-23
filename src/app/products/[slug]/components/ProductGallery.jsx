"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ProductGallery({ images, product }) {
  const [active, setActive] = useState(0);

  return (
    <aside className="relative lg:sticky lg:top-24 self-start">
      <div className="bg-white rounded-3xl shadow-sm p-4 transition hover:shadow-lg">

        <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative group">
          {images?.[active] && (
            <img
              src={`${API}${images[active].image_url}`}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            />
          )}
        </div>

        <div className="flex gap-3 mt-4">
          {images?.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-16 h-16 rounded-xl overflow-hidden border transition ${
                active === i
                  ? "border-rose-500"
                  : "border-gray-200"
              }`}
            >
              <img
                src={`${API}${img.image_url}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

      </div>
    </aside>
  );
}
