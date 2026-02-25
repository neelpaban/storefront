// storefront/src/app/forgot-password/page.jsx
"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function ForgotPasswordPage() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await api("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email })
      });

      setMessage(res?.message || "If the email exists, reset link sent.");

    } catch (err) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg space-y-6">

        <h1 className="text-2xl font-semibold text-center text-black">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-4 py-3 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        {message && (
          <p className="text-sm text-center text-gray-600">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}