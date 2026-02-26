// storefront/src/middleware.js
import { NextResponse } from "next/server";
const API_URL= process.env.API_URL;
export async function middleware(req) {
  const { pathname } = req.nextUrl;
console.log("MIDDLEWARE HIT:", pathname);

const sessionCookie = req.cookies.get("trinkets.sid");


  /* =====================================================
     ADMIN ROUTE PROTECTION (PRESERVED)
  ===================================================== */

  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login")
  ) {
    if (!sessionCookie) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }
  }

  /* =====================================================
    MAINTENANCE MODE CHECK (ENTERPRISE KILL SWITCH)
  ===================================================== */

  // Allow maintenance page itself
  if (pathname.startsWith("/maintenance")) {
    return NextResponse.next();
  }

  // Allow Next.js internals & static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  try {
    const res = await fetch(
  `${API_URL}/api/system/status`,
  { cache: "no-store" }
);

    if (res.ok) {
      const data = await res.json();

      if (data?.maintenance) {
        const url = req.nextUrl.clone();
        url.pathname = "/maintenance";
        return NextResponse.redirect(url);
      }
    }
  } catch (err) {
    console.error("Maintenance middleware error:", err);
    // Fail open — do NOT crash site if backend unavailable
  }

  return NextResponse.next();
}
