export default function ProductCraft({ details }) {
  if (!details?.craftsmanship_details) return null;

  return (
    <section className="pt-16 border-t">
      <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6">
        Craftsmanship
      </h2>

      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
        {details.craftsmanship_details}
      </p>
    </section>
  );
}
