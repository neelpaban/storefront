"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap justify-between items-center py-6 border-b text-sm">

      <div className="flex gap-4">
        <select
          onChange={(e) => updateParam("sort", e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Sort</option>
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

    </div>
  );
}
