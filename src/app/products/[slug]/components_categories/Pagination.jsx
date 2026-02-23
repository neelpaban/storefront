"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ page, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function changePage(newPage) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.push(`?${params.toString()}`);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-4 py-10">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => changePage(i + 1)}
          className={`px-4 py-2 border rounded ${
            page === i + 1 ? "bg-black text-white" : ""
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
