"use client";

import { useState } from "react";

export default function ProductSpecifications({ specifications }) {
  const [open, setOpen] = useState(true);

  if (!specifications?.length) return null;

  return (
    <section className="text-xl font-bold text-[#1a1a1a] mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-xl font-medium"
      >
        Specifications
        <span className="text-gray-400">
          {open ? "−" : "+"}
        </span>
      </button>

      <div
        className={`transition-all duration-500 overflow-hidden ${
          open ? "max-h-[1000px] mt-6" : "max-h-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-6 text-sm text-gray-600">
          {specifications.map((spec) => (
            <div key={spec.id}>
              <p className="text-gray-400">{spec.spec_key}</p>
              <p className="font-medium">{spec.spec_value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
