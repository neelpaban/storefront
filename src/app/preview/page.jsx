import Header from "@/components/shared/layout/Header";
import Footer from "@/components/shared/layout/Footer";
import { HOME_SECTIONS } from "@/lib/homeSectionsRegistry";

export default async function PreviewPage(props) {
  const searchParams = await props.searchParams; // ✅ unwrap Promise

  const sectionKey = searchParams.section;
  const data = searchParams.data
    ? JSON.parse(decodeURIComponent(searchParams.data))
    : null;

  return (
    <>
      <Header />

      <main className="bg-white">
        {sectionKey && data ? (
          (() => {
            const Component = HOME_SECTIONS[sectionKey];
            return Component ? <Component data={data} /> : null;
          })()
        ) : (
          <p className="p-10 text-gray-500">
            No preview data provided
          </p>
        )}
      </main>

      <Footer />
    </>
  );
}