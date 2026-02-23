"use client";

import { useState } from "react";

export default function SpecAccordion({ specs }) {
  const [open, setOpen] = useState(null);

  if (!specs?.length) return null;

  return (
    <section className="py-24 max-w-4xl mx-auto">
      <h2 className="text-3xl font-light mb-10">
        Specifications
      </h2>

      {specs.map((spec, i) => (
        <div key={spec.id} className="border-b py-4">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left font-medium flex justify-between"
          >
            {spec.spec_key}
            <span>{open === i ? "-" : "+"}</span>
          </button>

          {open === i && (
            <p className="mt-3 text-gray-600">
              {spec.spec_value}
            </p>
          )}
        </div>
      ))}
    </section>
  );
}
