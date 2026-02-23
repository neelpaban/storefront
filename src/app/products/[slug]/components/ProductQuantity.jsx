export default function ProductQuantity({
  qty = 1,
  setQty,
  available = 0,
}) {
  const isDecrementDisabled = qty <= 1;
  const isIncrementDisabled = qty >= available;

  return (
    <div className="space-y-3">

      {/* Label */}
      <p className="text-sm font-semibold text-gray-900">
        Quantity
      </p>

      <div className="flex items-center gap-4">

        {/* Decrease */}
        <button
          onClick={() => setQty(q => Math.max(1, q - 1))}
          disabled={isDecrementDisabled}
          className="
            w-9 h-9 
            rounded-full 
            border border-gray-300
            flex items-center justify-center
            text-lg font-medium
            transition-all duration-200
            hover:bg-gray-100
            disabled:opacity-40
            disabled:cursor-not-allowed
          "
        >
          −
        </button>

        {/* Quantity */}
        <span className="text-lg font-semibold text-gray-900 min-w-[24px] text-center">
          {qty}
        </span>

        {/* Increase */}
        <button
          onClick={() =>
            setQty(q => (q < available ? q + 1 : q))
          }
          disabled={isIncrementDisabled}
          className="
            w-9 h-9 
            rounded-full 
            border border-gray-300
            flex items-center justify-center
            text-lg font-medium
            transition-all duration-200
            hover:bg-gray-100
            disabled:opacity-40
            disabled:cursor-not-allowed
          "
        >
          +
        </button>

        {/* Availability */}
        <span
          className={`
            text-xs font-medium
            ${
              available > 5
                ? "text-gray-500"
                : "text-[#7b2d3a]"
            }
          `}
        >
          {available > 0
            ? `${available} available`
            : "Out of stock"}
        </span>

      </div>
    </div>
  );
}
