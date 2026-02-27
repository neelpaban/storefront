// storefront/src/layouts/DesktopLayout.jsx
"use client";

export default function DesktopLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Page Content */}
      <main className="flex-1 overflow-y-auto pb-16">
        {children}
      </main>

      {/* Bottom Navigation */}
      
    </div>
  );
}