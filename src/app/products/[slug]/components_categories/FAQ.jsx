export default function FAQ({ data }) {
  if (!data?.length) return null;

  return (
    <section className="py-16 space-y-6">
      <h3 className="text-2xl font-light text-center">
        Frequently Asked Questions
      </h3>

      <div className="max-w-3xl mx-auto space-y-4">
        {data.map((item, i) => (
          <details key={i} className="border p-4 rounded-lg">
            <summary className="cursor-pointer font-medium">
              {item.question}
            </summary>
            <p className="mt-2 text-gray-600 text-sm">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
