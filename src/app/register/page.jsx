// storefront/src/app/register/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const API = process.env.NEXT_PUBLIC_API_URL;

if (!API) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined.");
}

export default function RegisterPage() {
  const router = useRouter();

  const [step, setStep] = useState("form"); // form | otp

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= REGISTER STEP ================= */

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Move to OTP step
      setStep("otp");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= OTP STEP ================= */

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/api/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          otp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Verification failed");
      }

      // Auto-login successful
      const meRes = await fetch(`${API}/api/auth/me`, {
  credentials: "include",
});

const meData = await meRes.json();

if (meData.needsAddress) {
  router.push("/account?setup=address");
} else {
  router.push("/");
}


    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="max-w-md mx-auto px-6 py-32">

        {/* ================= STEP 1: REGISTER ================= */}
        {step === "form" && (
          <>
            <h1 className="text-3xl font-light mb-8">
              Create Account
            </h1>

            {error && (
              <p className="mb-4 text-sm text-red-600">
                {error}
              </p>
            )}

            <form onSubmit={handleRegister} className="space-y-4">

              <input
                placeholder="Full Name"
                className="w-full border px-4 py-3"
                required
                onChange={(e) =>
                  setForm({ ...form, full_name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full border px-4 py-3"
                required
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                placeholder="Phone (optional)"
                className="w-full border px-4 py-3"
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full border px-4 py-3"
                required
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <button
                className="w-full bg-black text-white py-3"
                disabled={loading}
              >
                {loading ? "Sending OTP…" : "Register"}
              </button>
            </form>

            <p className="mt-6 text-sm text-gray-600">
              Already registered?{" "}
              <a href="/login" className="underline">
                Login
              </a>
            </p>
          </>
        )}

        {/* ================= STEP 2: OTP ================= */}
        {step === "otp" && (
          <>
            <h1 className="text-3xl font-light mb-6">
              Verify Your Email
            </h1>

            <p className="text-sm text-gray-600 mb-6">
              We’ve sent a 6-digit OTP to <strong>{form.email}</strong>
            </p>

            {error && (
              <p className="mb-4 text-sm text-red-600">
                {error}
              </p>
            )}

            <form onSubmit={handleVerify} className="space-y-4">

              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="w-full border px-4 py-3 text-center tracking-widest text-lg"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                className="w-full bg-black text-white py-3"
                disabled={loading}
              >
                {loading ? "Verifying…" : "Verify & Continue"}
              </button>
            </form>

            <button
              onClick={() => setStep("form")}
              className="mt-6 text-sm underline"
            >
              Change Email
            </button>
          </>
        )}

      </main>

      <Footer />
    </>
  );
}
