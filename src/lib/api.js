// trinkets/storefront/src/lib/api.js

// Server-side (SSR) should call internal backend
const SERVER_API = "http://127.0.0.1:4000";

// Browser should call public domain
const CLIENT_API = process.env.NEXT_PUBLIC_API_URL || "https://api.trinketsforyou.com";

export async function api(path, options = {}) {
  try {
    const isServer = typeof window === "undefined";

    const baseURL = isServer ? SERVER_API : CLIENT_API;

    const url = path.startsWith("http")
      ? path
      : `${baseURL}${path}`;

    const res = await fetch(url, {
      next: { revalidate: 60 },
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });

    /* ================= MAINTENANCE HANDLER ================= */

    if (res.status === 503) {
      try {
        const data = await res.json();

        if (data?.maintenance) {
          if (typeof window !== "undefined") {
            window.location.href = "/maintenance";
          }
          return null;
        }
      } catch {
        if (typeof window !== "undefined") {
          window.location.href = "/maintenance";
        }
        return null;
      }
    }

    /* ================= NORMAL ERROR HANDLING ================= */

    if (!res.ok && res.status !== 304) {
      const text = await res.text();

      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = { message: text };
      }

      return {
        error: true,
        status: res.status,
        ...parsed,
      };
    }

    if (res.status === 304) {
      return null;
    }

    return await res.json();

  } catch (err) {
    console.error("API WRAPPER CRASH:", err);
    return null;
  }
}