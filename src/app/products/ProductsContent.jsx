// storefront/src/app/products/ProductsContent.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/shared/layout/Header";
import Footer from "@/components/shared/layout/Footer";
import HeroSection from "@/components/desktop/home/HeroSection";
import WishlistButton from "@/components/shared/ui/WishlistButton";

const API = process.env.NEXT_PUBLIC_API_URL;
const MEDIA = process.env.NEXT_PUBLIC_MEDIA_URL || process.env.NEXT_PUBLIC_API_URL;

if (!API) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined in environment variables.");
}

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const [heroData, setHeroData] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= HERO ================= */
  useEffect(() => {
    fetch(`${API}/api/home`)
      .then(res => res.json())
      .then(sections => {
        const hero = sections.find(s => s.section_key === "hero");
        if (hero?.data) setHeroData(hero.data);
      })
      .catch(err => console.error("Hero fetch error:", err));
  }, []);

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    fetch(`${API}/api/categories`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch(err => console.error("Category fetch error:", err));
  }, []);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();

    if (q) params.append("q", q);
    if (category) params.append("category", category);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    fetch(`${API}/api/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch(err => {
        console.error("Products fetch error:", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));

  }, [q, category, minPrice, maxPrice]);

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value !== "" && value !== null && value !== undefined) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/products?${params.toString()}`);
  };

  const normalized = useMemo(() => {
    return products.map(p => {
      const images = p.media?.filter(m => m.type === "image") || [];

      return {
        ...p,
        img1: images[0]
          ? `${MEDIA}${images[0].url}`
          : "/placeholder.png",
          img2: images[1]
  ? `${MEDIA}${images[1].url}`
  : null

      };
    });
  }, [products]);

  return (
    <>
      <Header />
      {/*
      {heroData && <HeroSection data={heroData} />}
*/}
      <main className="bg-[#f6f6f6]">
        <div className="max-w-7xl mx-auto px-6 py-16">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-semibold text-gray-800">
              Products
            </h2>
          </div>

          {/* FILTER BAR */}
          <div className="bg-white rounded-2xl shadow-sm px-6 py-4 mb-12 flex flex-wrap items-center gap-6 justify-between">

            {/* CATEGORY BUTTONS */}
            <div className="flex flex-wrap gap-3 items-center">

              <button
                onClick={() => updateQuery("category", "")}
                className={`px-4 py-2 rounded-full text-[#1a1a1a] text-sm transition ${
                  !category
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                All Products
              </button>

              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => updateQuery("category", cat.slug)}
                  className={`px-4 py-2 rounded-full text-sm text-[#1a1a1a] transition ${
                    category === cat.slug
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}

            </div>

            {/* PRICE FILTER */}
            <PriceFilter
              updateQuery={updateQuery}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />

          </div>

          {/* PRODUCTS */}
          {loading && (
            <div className="text-center py-24 text-gray-400">
              Loading products...
            </div>
          )}

          {!loading && normalized.length === 0 && (
            <div className="text-center py-24 text-gray-400">
              No products found.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {normalized.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

/* ================= PRODUCT CARD ================= */

function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition relative">

      <WishlistButton productId={product.id} />

      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square bg-gray-100 rounded-xl mb-5 overflow-hidden relative">

          {/* FIRST IMAGE */}
          <img
            src={product.img1}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 opacity-100 group-hover:opacity-0"
          />

          {/* SECOND IMAGE (ON HOVER) */}
          {product.img2 && (
            <img
              src={product.img2}
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            />
          )}

        </div>
      </Link>

      <h3 className="text-sm font-medium text-gray-800 mb-1">
        {product.name}
      </h3>

      <p className="text-gray-900 font-semibold mb-3">
        ₹{Number(product.price).toLocaleString()}
      </p>

      <div className="flex justify-between text-xs text-gray-500">
        <span>
         {/*  Stock: <span className="font-semibold">{product.available_stock ?? 0}</span> */}
        </span>
      </div>

    </div>
  );
}


/* ================= PRICE FILTER ================= */

function PriceFilter({ updateQuery, minPrice, maxPrice }) {

  const [min, setMin] = useState(Number(minPrice) || 0);
  const [max, setMax] = useState(Number(maxPrice) || 50000);

  const applyFilter = () => {
    if (min > max) return;
    updateQuery("minPrice", min);
    updateQuery("maxPrice", max);
  };

  return (
    <div className="flex items-center gap-4 flex-wrap">

      <div className="text-sm text-gray-600 whitespace-nowrap">
        ₹{min.toLocaleString()} — ₹{max.toLocaleString()}
      </div>

      <div className="w-40">
        <input
          type="range"
          min="0"
          max="100000"
          step="500"
          value={max}
          onChange={e => setMax(Number(e.target.value))}
          className="w-full accent-rose-600"
        />
      </div>

      <button
        onClick={applyFilter}
        className="px-4 py-2 rounded-full bg-gray-800 text-white text-sm"
      >
        Apply
      </button>

    </div>
  );
}
