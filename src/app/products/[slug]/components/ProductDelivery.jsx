export default function ProductDelivery({ delivery }) {
  if (!delivery) return null;

  return (
    <section className="pt-16 border-t">
      <h2 className="text-xl font-medium mb-6">
        Delivery Information
      </h2>

      <div className="text-sm text-gray-600 space-y-2 font-semibold text-[#1a1a1a] mb-6">
        {delivery.delivery_days && (
          <p>
            Estimated delivery in {delivery.delivery_days} days
          </p>
        )}

        {delivery.dispatch_time && (
          <p>
            Dispatch within {delivery.dispatch_time}
          </p>
        )}

        {delivery.free_delivery && (
          <p className="text-rose-500 font-medium">
            Free delivery available
          </p>
        )}
      </div>
    </section>
  );
}
