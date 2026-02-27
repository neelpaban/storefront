// storefront/src/components/common/WishlistButton.jsx
"use client";

import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;
if (!API) {
  throw new Error("NEXT_PUBLIC_API_URL not defined.");
}

export default function WishlistButton({ productId }) {
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= CHECK SESSION ================= */
  useEffect(() => {
    fetch(`${API}/api/auth/me`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setUser(data.user))
      .finally(() => setLoading(false));
  }, []);

  /* ================= CHECK IF ALREADY WISHLISTED ================= */
  useEffect(() => {
    if (!user) return;

    fetch(`${API}/api/wishlist`, { credentials: "include" })
      .then(res => res.json())
      .then(items => {
        const exists = items.some(i => i.id === productId);
        setLiked(exists);
      });
  }, [user, productId]);

  /* ================= TOGGLE ================= */
  const toggleWishlist = async e => {
    e.stopPropagation();

    if (!user) {
      alert("Please login to save items to your wishlist");
      return;
    }

    const res = await fetch(
      liked
        ? `${API}/api/wishlist/${productId}`
        : `${API}/api/wishlist`,
      {
        method: liked ? "DELETE" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: liked ? null : JSON.stringify({ productId }),
      }
    );

    if (!res.ok) {
      alert("Wishlist action failed");
      return;
    }

    setLiked(!liked);
  };

  if (loading) return null;

  return (
    <button
      onClick={toggleWishlist}
      className="
        absolute top-3 right-3 z-10
        bg-white/80 backdrop-blur
        rounded-full p-2
        shadow hover:scale-110 transition
      "
    >
      {liked ? (
        <HeartSolid className="w-5 h-5 text-rose-600" />
      ) : (
        <HeartIcon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
}
