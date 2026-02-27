// storefront/src/app/reset-password/page.jsx
"use client";

import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";
import Header from "@/components/shared/layout/Header";
import Footer from "@/components/shared/layout/Footer";

export default function ResetPasswordPage() {
  return (
    <>
      <Header />

      <Suspense fallback={null}>
        <ResetPasswordClient />
      </Suspense>

      <Footer />
    </>
  );
}