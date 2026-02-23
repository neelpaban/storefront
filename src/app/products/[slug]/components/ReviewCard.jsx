export default function ReviewCard({ review }) {
  return (
    <div className="border-b pb-8">

      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">
            {review.user_name || "Anonymous"}
          </p>
          <StarRating rating={review.rating} />
        </div>

        <p className="text-sm text-gray-400">
          {new Date(review.created_at).toLocaleDateString()}
        </p>
      </div>

      {review.title && (
        <p className="mt-4 font-medium">
          {review.title}
        </p>
      )}

      <p className="mt-2 text-gray-600 leading-relaxed">
        {review.comment}
      </p>

      {review.is_verified_purchase && (
        <p className="text-xs text-green-600 mt-2">
          ✔ Verified Purchase
        </p>
      )}
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex mt-1">
      {[1,2,3,4,5].map(i => (
        <span
          key={i}
          className={`text-sm ${
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
