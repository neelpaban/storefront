// src/app/products/[slug]/components/FloatingBuyBar.jsx
"use client";

import { useEffect, useState } from "react";

export default function FloatingBuyBar({ product }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product || !visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-2xl z-50 px-6 py-4 flex justify-between items-center transition-all duration-300">

      <div>
        <div className="font-medium text-sm text-gray-700">
          {product.name}
        </div>
        <div className="text-lg font-semibold">
          ₹{Number(product.total_price).toLocaleString()}
        </div>
      </div>

      <button className="px-8 py-3 bg-black text-white uppercase tracking-wider hover:opacity-90 transition">
        Add To Bag
      </button>

    </div>
  );
}
