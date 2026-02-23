import Link from "next/link";

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className="text-center py-20 text-gray-400">
        No products found
      </div>
    );
  }

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-10">
      {products.map(product => (
        <Link
          key={product.id}
          href={`/products/${product.slug}`}
          className="group space-y-3"
        >
          <div className="bg-gray-50 rounded-xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="text-center">
            <h3 className="text-sm font-medium">
              {product.name}
            </h3>
            <p className="text-gray-500 text-sm">
              ₹{product.total_price}
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}
