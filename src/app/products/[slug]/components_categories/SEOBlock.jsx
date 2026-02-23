export default function SEOBlock({ content }) {
  if (!content) return null;

  return (
    <section className="py-20 max-w-4xl mx-auto text-gray-600 text-sm leading-relaxed">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
}
