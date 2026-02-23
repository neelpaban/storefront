export default function ProductTitle({ product }) {
  if (!product?.name) return null;

  return (
    <div className="space-y-3">

      {/* Product Name */}
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight leading-snug">
        {product.name}
      </h1>

      {/* Subtitle */}
      <p className="text-sm md:text-base text-gray-600">
        Premium handcrafted jewellery
      </p>

    </div>
  );
}
