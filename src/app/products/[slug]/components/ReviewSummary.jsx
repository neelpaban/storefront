export default function ReviewSummary({ average, total }) {
  const rounded = Number(average).toFixed(1);

  return (
    <div className="flex items-center gap-8 bg-gray-50 p-8 rounded-2xl">

      <div>
        <p className="text-5xl font-semibold">
          {rounded}
        </p>
        <StarRating rating={average} />
        <p className="text-sm text-gray-500 mt-2">
          Based on {total} reviews
        </p>
      </div>

    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex mt-2">
      {[1,2,3,4,5].map(i => (
        <span
          key={i}
          className={`text-xl ${
            rating >= i
              ? "text-rose-500"
              : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
