// trinkets/storefront/src/app/page.jsx

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { HOME_SECTIONS } from "@/lib/homeSectionsRegistry";
import { api } from "@/lib/api";

export default async function HomePage() {
  let sections = [];

  try {
    const response = await api("/api/home");

    console.log("HOME RAW RESPONSE:", response);

    // Handle different possible backend shapes safely
    if (Array.isArray(response)) {
      sections = response;
    } else if (response?.sections && Array.isArray(response.sections)) {
      sections = response.sections;
    } else if (response?.error) {
      console.error("HOME API ERROR:", response);
      sections = [];
    } else {
      console.warn("Unexpected HOME response shape:", response);
      sections = [];
    }

  } catch (err) {
    console.error("HOME LOAD FAILED:", err);
    sections = [];
  }

  // Remove duplicate section_keys
  const seen = new Set();
  const uniqueSections = sections.filter(section => {
    if (!section?.section_key) {
      console.warn("Missing section_key:", section);
      return false;
    }

    if (seen.has(section.section_key)) return false;
    seen.add(section.section_key);
    return true;
  });

  console.log("HOME FINAL SECTIONS:", uniqueSections);

  return (
    <>
      <Header />
      <main className="bg-white">
        {uniqueSections.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No homepage sections available.
          </div>
        )}

        {uniqueSections.map(section => {
          const Component = HOME_SECTIONS[section.section_key];

          if (!Component) {
            console.warn(
              "No component registered for key:",
              section.section_key
            );
            return null;
          }

          return (
            <Component
              key={section.section_key}
              data={section.data || {}}
            />
          );
        })}
      </main>
      <Footer />
    </>
  );
}