// storefront/src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

import MobileLayout from "@/layouts/MobileLayout";
import DesktopLayout from "@/layouts/DesktopLayout";
import DisableZoom from "@/components/DisableZoom"; // 👈 ADD THIS

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Trinkets",
  description: "Luxury Jewellery Store",
};

/* ✅ STRICT VIEWPORT CONTROL */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({ children }) {
  const headerList = await headers();
  const userAgent = headerList.get("user-agent") || "";
  const isMobile = /android|iphone|ipod|mobile/i.test(userAgent);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 🔒 Strict Zoom Blocker */}
        <DisableZoom />

        {isMobile ? (
          <MobileLayout>{children}</MobileLayout>
        ) : (
          <DesktopLayout>{children}</DesktopLayout>
        )}
      </body>
    </html>
  );
}