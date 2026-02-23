// storefront/src/app/account/page.jsx
"use client";

import { Suspense } from "react";
import AccountContent from "./AccountContent";

export const dynamic = "force-dynamic";

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="py-40 text-center text-gray-500">Loading your account…</div>}>
      <AccountContent />
    </Suspense>
  );
}