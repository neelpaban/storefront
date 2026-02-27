// storefront/src/components/emotions/EmotionalProductStream.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;
if (!API) {
  throw new Error("NEXT_PUBLIC_API_URL not defined.");
}

export default function EmotionalProductStream({ mood }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!mood) return;

    fetch(`${API}/api/emotions/${mood.slug}/products`)
      .then(res => res.json())
      .then(setProducts);
  }, [mood]);

  if (!mood) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h3 className="text-3xl font-light mb-12">
        {mood.title}
      </h3>

      <div className="space-y-20">
        {products.map(product => (
          <div
            key={product.id}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <img
              src={`${API}${product.image}`}
              alt={product.name}
              className="rounded-xl w-full h-[420px] object-cover"
            />

            <div>
              <h4 className="text-2xl font-light">{product.name}</h4>
              <p className="mt-3 text-gray-600 max-w-md">
                {product.intent}
              </p>
              <p className="mt-6 text-xl">₹{product.price}</p>

              <Link
                href={`/products/${product.slug}`}
                className="inline-block mt-8 border px-6 py-3 text-sm hover:bg-black hover:text-white transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
