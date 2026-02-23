"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;
const MEDIA = process.env.NEXT_PUBLIC_MEDIA_URL;

export default function SimilarLuxury({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!category) return;

    fetch(`${API}/api/public/products?category=${category}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data.slice(0, 4));
        }
      });
  }, [category]);

  if (!products.length) return null;

  return (
    <section className="py-28 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-light mb-12">
          You May Also Like
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {products.map(p => (
            <Link key={p.id} href={`/products/${p.slug}`}>
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6">
                <img
                  src={`${MEDIA}${p.media?.[0]?.url}`}
                  className="h-56 w-full object-cover rounded-xl mb-4"
                />
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-gray-600">
                  ₹{Number(p.price).toLocaleString()}
                </div>
              </div>
            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}
