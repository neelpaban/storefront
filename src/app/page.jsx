// trinkets/storefront/src/app/page.jsx

import Header from "@/components/shared/layout/Header";
import Footer from "@/components/shared/layout/Footer";
import { HOME_SECTIONS } from "@/lib/homeSectionsRegistry";
import { api } from "@/lib/api";
import { isMobileDevice } from "@/lib/device";
import MobileHomeRenderer from "@/components/mobile/home/MobileHomeRenderer";

export default async function HomePage() {

  let sections = [];

  try {
    const response = await api("/api/home");

    if (Array.isArray(response)) {
      sections = response;
    } else if (response?.sections && Array.isArray(response.sections)) {
      sections = response.sections;
    } else {
      sections = [];
    }
  } catch (err) {
    console.error("HOME LOAD FAILED:", err);
    sections = [];
  }

  // Remove duplicate section_keys
  const seen = new Set();
  const uniqueSections = sections.filter(section => {
    if (!section?.section_key) return false;
    if (seen.has(section.section_key)) return false;
    seen.add(section.section_key);
    return true;
  });

  const isMobile = await isMobileDevice();

  return (
    <>
      <Header />

      {isMobile ? (
        <MobileHomeRenderer sections={uniqueSections} />
      ) : (
        <main className="bg-white">
          {uniqueSections.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No homepage sections available.
            </div>
          )}

          {uniqueSections.map(section => {
            const Component = HOME_SECTIONS[section.section_key];
            if (!Component) return null;

            return (
              <Component
                key={section.section_key}
                data={section.data || {}}
              />
            );
          })}
        </main>
      )}

      <Footer />
    </>
  );
}