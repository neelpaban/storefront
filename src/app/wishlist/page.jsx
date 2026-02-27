// storefront/src/app/wishlist/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/shared/layout/Header";
import Footer from "@/components/shared/layout/Footer";
import Link from "next/link";
import {
  HeartIcon,
  ShoppingBagIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const API = process.env.NEXT_PUBLIC_API_URL;
const MEDIA = process.env.NEXT_PUBLIC_MEDIA_URL;

if (!API || !MEDIA) {
  throw new Error("API or MEDIA URL not defined in environment variables.");
}

export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH WISHLIST ================= */
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const res = await fetch(`${API}/api/wishlist`, {
          credentials: "include",
        });

        if (res.status === 401) {
          window.location.href = "/login";
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch wishlist");
        }

        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);

      } catch (err) {
        console.error("Wishlist load error:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  /* ================= NORMALIZE MEDIA ================= */
  const normalized = useMemo(() => {
    return items.map(item => {
      const images =
        item.media?.filter(m => m.type === "image") || [];

      return {
        ...item,
        img1: images[0]
          ? `${MEDIA}${images[0].url}`
          : null,
        img2: images[1]
          ? `${MEDIA}${images[1].url}`
          : null,
      };
    });
  }, [items]);

  /* ================= REMOVE ================= */
  const removeItem = async (productId) => {
    try {
      await fetch(`${API}/api/wishlist/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });

      setItems(prev =>
        prev.filter(i => i.product_id !== productId)
      );
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  /* ================= ADD TO CART ================= */
  const addToCart = async (productId) => {
    try {
      const res = await fetch(`${API}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          product_id: productId,
          quantity: 1,
        }),
      });

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      window.location.href = "/cart";

    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  return (
    <>
      <Header />

      <main className="bg-rose-50/40">
        <div className="max-w-7xl mx-auto px-6 py-20">

          {/* ================= HEADER ================= */}
          <section className="mb-16">
            <h1 className="text-3xl font-light text-gray-900">
              My Wishlist
            </h1>
            <p className="mt-2 text-gray-600 max-w-xl">
              Pieces you’ve saved to consider at your own pace.
            </p>

            <div className="mt-6 text-sm text-gray-500">
              ✓ Saved securely • ✓ No price pressure • ✓ Easy access anytime
            </div>
          </section>

          {/* ================= LOADING ================= */}
          {loading && (
            <div className="text-center py-32 text-gray-500">
              Loading wishlist…
            </div>
          )}

          {/* ================= EMPTY ================= */}
          {!loading && normalized.length === 0 && (
            <section className="text-center py-32 text-gray-600">
              <HeartIcon className="w-10 h-10 mx-auto mb-6 text-rose-300" />
              <p className="text-lg">
                Your wishlist is currently empty.
              </p>
              <Link
                href="/products"
                className="inline-block mt-6 underline text-sm text-rose-700"
              >
                Explore the collection
              </Link>
            </section>
          )}

          {/* ================= GRID ================= */}
          {!loading && normalized.length > 0 && (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

              {normalized.map(item => (
                <div
                  key={item.id}
                  className="
                    group
                    bg-white
                    border border-rose-100
                    rounded-xl
                    p-4
                    shadow-sm
                    hover:shadow-md
                    transition-shadow
                  "
                >
                  {/* IMAGE */}
                  <Link href={`/products/${item.slug}`}>
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      {item.img1 && (
                        <img
                          src={item.img1}
                          alt={item.name}
                          className="
                            absolute inset-0
                            w-full h-full
                            object-cover
                            transition-opacity
                            duration-500
                            group-hover:opacity-0
                          "
                        />
                      )}

                      {item.img2 && (
                        <img
                          src={item.img2}
                          alt={`${item.name} hover`}
                          className="
                            absolute inset-0
                            w-full h-full
                            object-cover
                            opacity-0
                            transition-opacity
                            duration-500
                            group-hover:opacity-100
                          "
                        />
                      )}
                    </div>
                  </Link>

                  {/* INFO */}
                  <div className="mt-4 space-y-2">
                    <h3 className="font-light text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-gray-700 text-sm">
                      ₹{Number(item.price).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.availability || "In Stock"}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-6 flex items-center justify-between text-sm">
                    <Link
                      href={`/products/${item.slug}`}
                      className="underline text-gray-700 hover:text-rose-700 transition-colors"
                    >
                      View Details
                    </Link>

                    <div className="flex items-center gap-4 text-gray-500">
                      <button
                        onClick={() => addToCart(item.product_id)}
                        aria-label="Add to cart"
                        className="hover:text-rose-700 transition-colors"
                      >
                        <ShoppingBagIcon className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => removeItem(item.product_id)}
                        aria-label="Remove from wishlist"
                        className="hover:text-rose-700 transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}

            </section>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
