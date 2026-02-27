// storefront/src/components/emotions/EmotionSelector.jsx
"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;
if (!API) {
  throw new Error("NEXT_PUBLIC_API_URL not defined.");
}

export default function EmotionSelector({ onSelect }) {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/emotions`)
      .then(res => res.json())
      .then(setMoods);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-light mb-2">
        How do you want to feel today?
      </h2>
      <p className="text-gray-500 mb-8">
        Discover jewellery curated by emotion, not filters.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {moods.map(mood => (
          <button
            key={mood.id}
            onClick={() => onSelect(mood)}
            className="border rounded-xl p-6 text-left hover:bg-black hover:text-white transition"
          >
            <p className="text-lg font-medium">{mood.title}</p>
            <p className="text-sm opacity-70 mt-1">{mood.subtitle}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
