// storefront/src/components/DisableZoom.jsx
"use client";

import { useEffect } from "react";

export default function DisableZoom() {
  useEffect(() => {
    // Prevent gesture zoom (Safari)
    const gestureStart = (e) => e.preventDefault();
    const gestureChange = (e) => e.preventDefault();
    const gestureEnd = (e) => e.preventDefault();

    // Prevent ctrl + wheel zoom
    const wheelHandler = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    // Prevent double tap zoom (mobile)
    let lastTouchEnd = 0;
    const touchEndHandler = (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener("gesturestart", gestureStart);
    document.addEventListener("gesturechange", gestureChange);
    document.addEventListener("gestureend", gestureEnd);
    document.addEventListener("wheel", wheelHandler, { passive: false });
    document.addEventListener("touchend", touchEndHandler);

    return () => {
      document.removeEventListener("gesturestart", gestureStart);
      document.removeEventListener("gesturechange", gestureChange);
      document.removeEventListener("gestureend", gestureEnd);
      document.removeEventListener("wheel", wheelHandler);
      document.removeEventListener("touchend", touchEndHandler);
    };
  }, []);

  return null;
}