export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-pulse space-y-10">

      <div className="h-[50vh] bg-gray-200 rounded-xl" />

      <div className="h-6 bg-gray-200 w-1/3 rounded" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-72 bg-gray-200 rounded-xl" />
            <div className="h-4 bg-gray-200 w-3/4 rounded" />
            <div className="h-4 bg-gray-200 w-1/2 rounded" />
          </div>
        ))}
      </div>

    </div>
  );
}
