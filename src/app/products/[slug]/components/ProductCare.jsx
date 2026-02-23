export default function ProductCare({ details }) {
  if (!details?.care_instructions) return null;

  return (
    <section className="pt-16 border-t">
      <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6">
        Care Instructions
      </h2>

      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
        {details.care_instructions}
      </p>
    </section>
  );
}
