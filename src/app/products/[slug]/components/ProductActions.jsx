// storefront/src/app/products/[slug]/components/ProductActions.jsx
"use client";

import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ProductActions({ productId, qty, available, giftWrap }) {
  const router = useRouter();

  async function addToCart() {
    if (available < qty) {
      alert("Insufficient stock.");
      return;
    }

    const res = await fetch(`${API}/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        product_id: productId,
        quantity: qty,
        is_gift: giftWrap ? 1 : 0
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
      alert("Failed to add to cart.");
    }
  }

  return (
    <div className="pt-8">
      <button
        onClick={addToCart}
        disabled={available === 0}
        className={`w-full py-4 rounded-2xl font-medium transition-all duration-300 ${
          available === 0
            ? "bg-gray-300 text-gray-500"
            : "bg-rose-500 hover:bg-rose-600 text-white shadow-md hover:shadow-xl"
        }`}
      >
        {available === 0 ? "Out of Stock" : "Add To Cart"}
      </button>
    </div>
  );
}
