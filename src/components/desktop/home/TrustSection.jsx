// components/home/TrustSection.jsx
export default function TrustSection({ data = {} }) {
  const { items = [] } = data;

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section className="py-6 md:py-10 border-t">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-5 gap-6 text-sm text-center text-gray-700">
        {items.map((item, idx) => (
          <div key={idx} className="border py-4">
            {item.text}
          </div>
        ))}
      </div>
    </section>
  );
}
