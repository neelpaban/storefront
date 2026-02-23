export default function ProductFeatures({ features }) {
  if (!features?.length) return null;

  return (
    <section className="pt-16 border-t mt-16">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight mb-8">
        Why You'll Love It
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="
              p-6 md:p-7 
              rounded-2xl 
              bg-gray-50 
              border border-gray-100
              transition-all duration-300 
              hover:shadow-lg 
              hover:-translate-y-1
            "
          >
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
              {feature.title}
            </h3>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
