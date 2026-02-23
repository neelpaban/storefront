// storefront/src/app/products/[slug]/components/ProductReviews.jsx
"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  /* ================= FETCH REVIEWS ================= */

  const fetchReviews = async () => {
    const res = await fetch(`${API}/api/products/${productId}/reviews`);
    const data = await res.json();
    if (data.success) {
      setReviews(data.reviews);
      setSummary(data.summary);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  /* ================= SUBMIT REVIEW ================= */

  const submitReview = async () => {
    setError("");

    const res = await fetch(`${API}/api/products/${productId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ rating, title, comment }),
    });

    const data = await res.json();

    if (!data.success) {
      setError(data.message || "Submission failed");
      return;
    }

    setShowModal(false);
    setTitle("");
    setComment("");
    fetchReviews();
  };

  return (
    <section className="pt-16 border-t">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-light text-[#1a1a1a]">Customer Reviews</h3>
            {summary && (
              <p className="text-sm text-gray-500 mt-1">
                ⭐ {summary.average} · {summary.total} reviews
              </p>
            )}
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2 border border-black text-[#1a1a1a] text-sm hover:bg-black hover:text-white transition"
          >
            Write a Review
          </button>
        </div>

        {/* REVIEW LIST */}
        <div className="space-y-8">
          {reviews.map(r => (
            <div key={r.id} className="border-b pb-6">
              <div className="flex justify-between">
                <div className="font-medium text-[#1a1a1a]">{r.full_name}</div>
                <div className="text-sm text-[#1a1a1a]">
                  {"⭐".repeat(r.rating)}
                </div>
              </div>
              {r.title && (
                <div className="mt-2 font-medium text-[#1a1a1a]">{r.title}</div>
              )}
              <p className="mt-2 text-gray-600 text-sm">
                {r.comment}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* ================= MODAL ================= */}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-lg rounded-2xl p-8 relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400"
            >
              ✕
            </button>

            <h4 className="text-xl font-light text-[#1a1a1a] mb-6">
              Write a Review
            </h4>

            {/* RATING */}
            <div className="flex gap-2 mb-6">
              {[1,2,3,4,5].map(star => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? "text-rose-600" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Review title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border text-[#1a1a1a] px-4 py-3 mb-4"
            />

            <textarea
              placeholder="Write your experience..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="w-full border text-[#1a1a1a] px-4 py-3 mb-4 h-28"
            />

            {error && (
              <p className="text-sm text-red-500 mb-4">{error}</p>
            )}

            <button
              onClick={submitReview}
              className="w-full bg-[#9c3a4a] text-white py-3 hover:opacity-90 transition"
            >
              Submit Review
            </button>

          </div>
        </div>
      )}
    </section>
  );
}
