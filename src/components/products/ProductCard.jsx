// storefront/src/components/products/ProductCard.jsx
import Link from "next/link";

const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_URL || "";

export default function ProductCard({ product }) {
  const media = product.media?.[0]; // first media only

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
    >
      {/* IMAGE */}
      <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
        {media ? (
          media.type === "video" ? (
            <video
              src={`${MEDIA_BASE}${media.url}`}
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
              onMouseEnter={e => e.currentTarget.play()}
              onMouseLeave={e => e.currentTarget.pause()}
            />
          ) : (
            <img
              src={`${MEDIA_BASE}${media.url}`}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )
        ) : (
          <div className="absolute inset-0 bg-gray-200" />
        )}
      </div>

      {/* INFO */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-900">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          ₹{product.price}
        </p>
      </div>
    </Link>
  );
}
