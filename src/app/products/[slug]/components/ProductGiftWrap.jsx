export default function ProductGiftWrap({
  giftWrap,
  setGiftWrap,
}) {
  return (
    <div className="flex items-start gap-3 pt-2">

      <input
        type="checkbox"
        checked={giftWrap}
        onChange={() => setGiftWrap(!giftWrap)}
        className="
          mt-1 
          w-4 h-4 
          accent-[#7b2d3a]
          cursor-pointer
        "
      />

      <label
        onClick={() => setGiftWrap(!giftWrap)}
        className="text-sm text-gray-700 cursor-pointer select-none"
      >
        <span className="font-medium text-gray-900">
          Is this a gift?
        </span>{" "}
        🎁 Wrap it for just{" "}
        <span className="font-semibold text-[#7b2d3a]">
          ₹50
        </span>
      </label>

    </div>
  );
}
