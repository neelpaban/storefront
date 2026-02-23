export default function ProductDeliveryBox({
  deliveryDate,
}) {
  if (!deliveryDate) return null;

  return (
    <div className="space-y-4">

      {/* Heading */}
      <h3 className="text-base md:text-lg font-semibold text-gray-900">
        Estimated Delivery Time
      </h3>

      {/* Delivery Box */}
      <div className="
        p-5 
        rounded-2xl 
        border border-gray-200 
        bg-gray-50
        transition-all duration-300
      ">

        <p className="text-gray-700">
          Free Delivery by{" "}
          <span className="font-semibold text-gray-900">
            {deliveryDate}
          </span>
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Order within{" "}
          <span className="font-medium text-[#7b2d3a]">
            16 hrs
          </span>
        </p>

      </div>

    </div>
  );
}
