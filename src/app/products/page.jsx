// storefront/src/app/products/page.jsx
"use client";

import { Suspense } from "react";
import ProductsContent from "./ProductsContent";

export const dynamic = "force-dynamic";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="py-40 text-center">Loading products…</div>}>
      <ProductsContent />
    </Suspense>
  );
}