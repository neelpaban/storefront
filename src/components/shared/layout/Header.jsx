// storefront/src/components/layout/Header.jsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MagnifyingGlassIcon,
  UserIcon,
  HeartIcon,
  ShoppingBagIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;
if (!API) {
  throw new Error("NEXT_PUBLIC_API_URL not defined.");
}

const categories = [
  "Rings",
  "Necklaces",
  "Earrings",
  "Bracelets",
];

export default function Header() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  /* ================= SESSION CHECK ================= */
  useEffect(() => {
    fetch(`${API}/api/auth/me`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  /* ================= SEARCH ================= */
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMobileSearchOpen(false); // close mobile search after submit
    router.push(`/products?q=${encodeURIComponent(query.trim())}`);
  };

  /* ================= LOGOUT ================= */
  const logout = async () => {
    await fetch(`${API}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    router.refresh();
  };

  return (
    <header
      className="w-full border-b bg-white sticky top-0 z-50"
      style={{ borderColor: "#7b2d3a20" }}
    >
      {/* ================= TOP SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6">

        {/* ROW */}
        <div className="h-16 flex items-center justify-between gap-6">

          {/* LOGO */}
          <Link
            href="/"
            className="text-lg tracking-widest font-light text-gray-900"
          >
            TRINKETS
          </Link>

          {/* DESKTOP SEARCH */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex flex-1 max-w-xl relative"
          >
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jewellery, collections, materials..."
              className="w-full border border-rose-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-rose-300"
            />
          </form>

          {/* ICONS */}
          <div className="flex items-center gap-5 text-gray-700">

            {/* MOBILE SEARCH TOGGLE */}
            <button
              className="sm:hidden"
              onClick={() => setMobileSearchOpen(prev => !prev)}
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>

            <Link href="/account">
              <UserIcon className="w-5 h-5" />
            </Link>

            <Link href="/wishlist">
              <HeartIcon className="w-5 h-5" />
            </Link>

            <Link href="/cart">
              <ShoppingBagIcon className="w-5 h-5" />
            </Link>

            {user && (
              <button onClick={logout} title="Logout">
                <ArrowRightOnRectangleIcon className="w-5 h-5 text-rose-600" />
              </button>
            )}
          </div>
        </div>

        {/* MOBILE SEARCH BAR */}
        <div
          className={`
            sm:hidden overflow-hidden transition-all duration-300
            ${mobileSearchOpen ? "max-h-24 opacity-100 pb-4" : "max-h-0 opacity-0"}
          `}
        >
          <form onSubmit={handleSearch} className="relative mt-2">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jewellery..."
              className="w-full border border-rose-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-rose-300"
            />
          </form>
        </div>
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="border-t border-rose-100">
        <ul className="max-w-7xl mx-auto px-6 py-3 flex justify-center gap-8 text-sm text-gray-600 overflow-x-auto">
          {categories.map((item) => (
            <li key={item}>
              <Link href={`/products?category=${encodeURIComponent(item)}`}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
