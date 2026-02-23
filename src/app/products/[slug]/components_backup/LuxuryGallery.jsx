// src/app/products/[slug]/components/LuxuryGallery.jsx

const MEDIA = process.env.NEXT_PUBLIC_MEDIA_URL;

export default function LuxuryGallery({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-light mb-16 text-center">
          Product Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {images.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl shadow-sm group"
            >
              <img
                src={`${MEDIA}${img.image_url}`}
                alt="Product"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
