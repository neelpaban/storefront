// storefront/src/components/products/ProductsGrid.jsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductsGrid({ products, initialQuery }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery || "");

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/products${query ? `?q=${query}` : ""}`);
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* ===== HEADER ===== */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-light text-gray-900">
              All Jewellery
            </h1>
            <p className="mt-2 text-gray-600">
              Thoughtfully crafted pieces for every occasion.
            </p>
          </div>

          {/* SEARCH */}
          <form onSubmit={handleSearch} className="w-full sm:w-80">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search jewellery..."
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-gray-900 transition"
            />
          </form>
        </div>

        {/* ===== GRID ===== */}
        {products.length === 0 ? (
          <p className="text-gray-500 text-center py-20">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
