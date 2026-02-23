// src/app/products/[slug]/components/StructuredData.jsx

export default function StructuredData({ data }) {
  if (!data?.product) return null;

  const product = data.product;

  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    description: product.description || "",
    image: data.images?.map(img =>
      `${process.env.NEXT_PUBLIC_MEDIA_URL}${img.image_url}`
    ),
    sku: product.sku || product.id,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.total_price,
      availability:
        data.inventory?.available > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
