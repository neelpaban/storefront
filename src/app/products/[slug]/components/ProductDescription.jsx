export default function ProductDescription({ description }) {
  if (!description) return null;

  return (
    <section className="pt-16 border-t mt-16">
      <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6">
        Product Description
      </h2>

      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </section>
  );
}
