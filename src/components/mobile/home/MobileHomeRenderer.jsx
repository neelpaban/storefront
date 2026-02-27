// storefront/src/components/mobile/home/MobileHomeRenderer.jsx
"use client";

import { MOBILE_HOME_SECTIONS } from "@/lib/mobileHomeSectionsRegistry";

export default function MobileHomeRenderer({ sections = [] }) {

  // FORCE MOBILE ORDER
  const mobileOrder = [
  "hero",
  "categories",
  "special",
  "video",
  "curated_gallery",
];

  const sortedSections = [...sections].sort((a, b) => {
    const aIndex = mobileOrder.indexOf(a.section_key);
    const bIndex = mobileOrder.indexOf(b.section_key);

    // If section not in list, keep it at bottom
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  });

  return (
    <main className="bg-[#f4f4f4] min-h-screen pb-10">
      {sortedSections.map(section => {
        const Component =
          MOBILE_HOME_SECTIONS[section.section_key];

        if (!Component) return null;

        return (
          <Component
            key={section.section_key}
            data={section.data || {}}
          />
        );
      })}
    </main>
  );
}