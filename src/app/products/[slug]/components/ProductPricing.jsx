// storefront/src/app/products/[slug]/components/ProductPricing.jsx
"use client";

import useAnimatedNumber from "./AnimatedNumber";

export default function ProductPricing({ price = 0 }) {
  const basePrice = Number(price) || 0;

  // Always animate only the unit price (NOT quantity-based)
  const animated = useAnimatedNumber(basePrice);

  const mrp = Math.round(basePrice * 1.6);
  const discount =
    mrp > 0 ? Math.round(((mrp - basePrice) / mrp) * 100) : 0;

  return (
    <div className="space-y-3">

      {/* Price Row */}
      <div className="flex items-end gap-4 flex-wrap">

        <span className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight transition-all duration-300">
          ₹{animated.toLocaleString()}
        </span>

        {mrp > basePrice && (
          <>
            <span className="text-gray-400 line-through text-base md:text-lg">
              ₹{mrp.toLocaleString()}
            </span>

            <span className="text-[#7b2d3a] text-sm font-semibold">
              {discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* Tax Note */}
      <p className="text-xs md:text-sm text-gray-500">
        Inclusive of all taxes
      </p>

    </div>
  );
}