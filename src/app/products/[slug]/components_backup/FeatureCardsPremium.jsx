export default function FeatureCardsPremium({ features }) {
  if (!features?.length) return null;

  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 px-6">

        {features.map(feature => (
          <div
            key={feature.id}
            className="bg-[#faf8f5] p-8 rounded-2xl text-center hover:shadow-xl transition duration-500"
          >
            <h3 className="text-xl font-medium mb-4">
              {feature.title}
            </h3>

            <p className="text-gray-600 text-sm">
              {feature.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}
