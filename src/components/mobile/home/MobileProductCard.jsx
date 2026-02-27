// storefront/src/components/mobile/home/MobileProductCard.jsx
"use client";
import { Heart } from "lucide-react";

export default function MobileProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm">
      <div className="relative bg-gray-100 rounded-xl p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-36 object-contain"
        />

        <button className="absolute top-3 right-3">
          <Heart size={18} className="text-gray-600" />
        </button>
      </div>

      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold text-gray-900">
            ₹{product.price}
          </span>

          <div className="flex items-center text-yellow-500 text-sm">
            ⭐ {product.rating}
          </div>
        </div>
      </div>
    </div>
  );
}