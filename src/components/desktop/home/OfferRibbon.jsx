// storefront/src/components/home/OfferRibbon.jsx
"use client";

import { useEffect, useRef } from "react";

export default function OfferRibbon({ data = {} }) {
  const { items = [] } = data;
  const containerRef = useRef(null);

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="w-full h-6 md:h-8 bg-black text-white overflow-hidden flex items-center">
      <div
        ref={containerRef}
        className="flex whitespace-nowrap animate-offer-scroll"
      >
        {items.concat(items).map((item, index) => (
          <a
            key={index}
            href={item.link || "#"}
            className="px-8 py-2 text-sm hover:underline"
          >
            {item.text}
          </a>
        ))}
      </div>
    </div>
  );
}
