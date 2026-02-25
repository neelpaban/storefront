export default function ProductCoupon({ discount, coupon }) {
  return (
    <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full text-sm">
      <span className="font-semibold text-[#1a1a1a]">
       {/*EXTRA {discount}% OFF*/} EXTRA 10% OFF
      </span>
      <span className="font-semibold text-gray-900">
        with coupon <b>{coupon}</b>
      </span>
    </div>
  );
}
