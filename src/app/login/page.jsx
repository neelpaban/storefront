// storefront/src/app/login/page.jsx
"use client";

import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <>
      <Header />

      <Suspense fallback={null}>
        <LoginClient />
      </Suspense>

      <Footer />
    </>
  );
}