// /components/mobile/home/MobileRecommendation.jsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;
const MEDIA =
  process.env.NEXT_PUBLIC_MEDIA_URL ||
  process.env.NEXT_PUBLIC_API_URL;

export default function MobileRecommendation() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch(err =>
        console.error("Mobile recommendation fetch error:", err)
      );
  }, []);

  /* ================= RANDOM 6 ================= */
  const randomSix = useMemo(() => {
    if (!products.length) return [];

    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, [products]);

  /* ================= NORMALIZE MEDIA ================= */
  const normalized = useMemo(() => {
    return randomSix.map(p => {
      const images =
        p.media?.filter(m => m.type === "image") || [];

      return {
        ...p,
        img:
          images[0]
            ? `${MEDIA}${images[0].url}`
            : "/placeholder.png",
      };
    });
  }, [randomSix]);

  if (!normalized.length) return null;

  return (
    <section className="mt-10 pb-6">

      {/* Header */}
      <div className="flex justify-between items-center px-4 mb-4">
        <h3 className="text-xl font-semibold text-black">
          Recommendation
        </h3>

        <button
          onClick={() => router.push("/products")}
          className="text-sm text-gray-500"
        >
          See all
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 px-4">

        {normalized.map(product => (
          <div
            key={product.id}
            onClick={() =>
              router.push(`/products/${product.slug}`)
            }
            className="
              bg-white
              rounded-2xl
              p-3
              shadow-sm
              active:scale-[0.98]
              transition
              cursor-pointer
            "
          >
            {/* Image */}
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-3">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Name */}
            <h4 className="text-sm font-medium text-gray-800 line-clamp-2">
              {product.name}
            </h4>

            {/* Price */}
            <p className="mt-1 font-semibold text-gray-900">
              ₹{Number(product.price).toLocaleString()}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}