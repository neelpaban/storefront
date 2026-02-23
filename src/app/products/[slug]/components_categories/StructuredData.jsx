export default function StructuredData({ category }) {
  const siteUrl = process.env.NEXT_PUBLIC_API_URL;

  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": category.name,
    "description": category.meta_description,
    "url": `${siteUrl}/categories/${category.slug}`
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
    />
  );
}
