// components/home/SpecialCollection.jsx
const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_URL || "";

function SpecialItem({ title, price, media }) {
  const img = Array.isArray(media) ? media[0] : null;
  if (!img) return null;

  return (
    <div>
      <img
        src={`${MEDIA_BASE}${img.url}`}
        alt={title}
        className="h-64 w-full object-cover"
      />
      <h3 className="mt-4 text-sm text-[#1a1a1a] font-medium">{title}</h3>
      <p className="text-sm text-gray-600">{price}</p>
    </div>
  );
}

export default function SpecialCollection({ data = {} }) {
  const {
    heading,
    subheading,
    items = [],
  } = data;

  if (!heading || items.length === 0) return null;

  return (
    <section className="py-6 md:py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-3xl text-[#1a1a1a] font-light mb-4">
          {heading}
        </h2>

        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          {subheading}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <SpecialItem
              key={idx}
              title={item.title}
              price={item.price}
              media={item.media}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
