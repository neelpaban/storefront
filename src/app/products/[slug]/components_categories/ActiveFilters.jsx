"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function ActiveFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const entries = Array.from(searchParams.entries());

  if (!entries.length) return null;

  function removeFilter(key) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3 py-4 text-sm">
      {entries.map(([key, value]) => (
        <button
          key={key}
          onClick={() => removeFilter(key)}
          className="px-3 py-1 bg-gray-100 rounded-full"
        >
          {key}: {value} ✕
        </button>
      ))}
    </div>
  );
}
