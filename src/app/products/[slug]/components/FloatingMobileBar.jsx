// storefront/src/app/products/[slug]/components/FloatingMobileBar.jsx
"use client";

import { useRouter } from "next/navigation";
import useAnimatedNumber from "./AnimatedNumber";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function FloatingMobileBar({
  productId,
  price = 0,
  qty = 1,
  available = 0,
  giftWrap = false,
}) {
  const router = useRouter();

  const basePrice = Number(price) || 0;
  const giftCharge = giftWrap ? 50 : 0;
  const finalPrice = basePrice * qty + giftCharge;

  const animated = useAnimatedNumber(finalPrice);

  async function handleAddToCart() {
    if (!productId) return;

    if (available < qty) {
      alert("Insufficient stock available.");
      return;
    }

    try {
      const res = await fetch(`${API}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          product_id: productId,
          quantity: qty,
          gift_wrap: giftWrap,
        }),
      });

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      const data = await res.json();

      if (data.success) {
        router.push("/cart");
      } else {
        alert(data.message || "Failed to add to cart.");
      }
    } catch {
      alert("Something went wrong.");
    }
  }

  if (!productId) return null;

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0
        lg:hidden
        z-50
        bg-white
        border-t border-gray-200
        px-4 py-3
        shadow-[0_-4px_20px_rgba(0,0,0,0.06)]
      "
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}
    >
      <div className="flex items-center justify-between gap-4">

        {/* Price Section */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">
            Total
          </span>

          <span className="text-lg font-semibold text-gray-900 tracking-tight">
            ₹{animated.toLocaleString()}
          </span>

          {giftWrap && (
            <span className="text-xs text-[#7b2d3a]">
              Includes ₹50 gift wrap
            </span>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handleAddToCart}
          disabled={available === 0}
          className={`
            flex-1
            py-3
            rounded-xl
            text-sm font-semibold
            transition-all duration-200
            ${
              available === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#eb2852] text-white hover:opacity-90 active:scale-95"
            }
          `}
        >
          {available === 0 ? "Out of Stock" : "Add to Cart"}
        </button>

      </div>
    </div>
  );
}
