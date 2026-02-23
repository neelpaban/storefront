// src/app/products/[slug]/components/CraftDetailSplit.jsx

const MEDIA = process.env.NEXT_PUBLIC_MEDIA_URL;

export default function CraftDetailSplit({ details, images }) {
  if (!details?.craftsmanship_details) return null;

  const craftImage =
    images && images.length > 1
      ? images[1].image_url
      : images?.[0]?.image_url;

  return (
    <section className="py-32 bg-[#f5f2ec]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 px-6 items-center">

        {/* LEFT TEXT */}
        <div>
          <h2 className="text-4xl font-light mb-8">
            Crafted With Precision
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {details.craftsmanship_details}
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg group">
          <img
            src={`${MEDIA}${craftImage}`}
            alt="Craftsmanship"
            className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700"
          />
        </div>

      </div>
    </section>
  );
}
