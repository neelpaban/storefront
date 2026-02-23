// storefront/src/app/login/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    try {
      const data = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password")
        })
      });

      if (!data || !data.success) {
        throw new Error(data?.message || "Login failed");
      }

      router.replace("/");

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      <div className="min-h-screen grid lg:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="hidden lg:flex bg-gradient-to-br from-rose-900 via-rose-800 to-pink-700 text-white p-16">
          <div className="flex flex-col justify-between w-full">

            <div>
              <h1 className="text-3xl tracking-widest font-light">
                TRINKETS
              </h1>
              <p className="text-sm text-rose-200 mt-2">
                FINE JEWELLERY
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-light leading-tight">
                Timeless Craft.<br />Modern Elegance.
              </h2>
              <p className="mt-6 text-rose-100 max-w-md">
                Sign in to manage your orders, wishlist, and personal details.
              </p>
            </div>

            <p className="text-xs text-rose-300">
              © {new Date().getFullYear()} Trinkets Jewellery
            </p>

          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex items-center justify-center bg-rose-50 px-6">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">

            <h2 className="text-2xl font-light mb-2">
              Sign In
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Access your account
            </p>

            {error && (
              <p className="mb-4 text-sm text-red-600">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full border rounded-xl px-4 py-3 text-sm"
              />

              <input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full border rounded-xl px-4 py-3 text-sm"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-rose-700 to-pink-600 text-white py-3 rounded-xl text-sm transition-all duration-300 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

            </form>

            <p className="mt-6 text-sm text-gray-600 text-center">
              New here?{" "}
              <a
                href="/register"
                className="underline hover:text-black"
              >
                Create account
              </a>
            </p>

          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}
