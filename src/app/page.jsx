// trinkets/storefront/src/app/page.jsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { HOME_SECTIONS } from "@/lib/homeSectionsRegistry";
import { api } from "@/lib/api";

export default async function HomePage() {
  let sections = [];

  try {
    sections = await api("/api/home");
  } catch (err) {
    console.error("HOME LOAD FAILED:", err);
    sections = [];
  }

  const seen = new Set();
  const uniqueSections = Array.isArray(sections)
    ? sections.filter(section => {
        if (!section?.section_key) return false;
        if (seen.has(section.section_key)) return false;
        seen.add(section.section_key);
        return true;
      })
    : [];

  return (
    <>
      <Header />
      <main className="bg-white">
        {uniqueSections.map(section => {
          const Component = HOME_SECTIONS[section.section_key];
          if (!Component) return null;

          return (
            <Component
              key={section.section_key}
              data={section.data}
            />
          );
        })}
      </main>
      <Footer />
    </>
  );
}
