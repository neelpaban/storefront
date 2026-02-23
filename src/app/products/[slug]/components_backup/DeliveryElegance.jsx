export default function DeliveryElegance({ delivery }) {
  if (!delivery) return null;

  return (
    <section className="py-24 bg-[#f9f7f4]">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-light mb-8">
          Delivery & Assurance
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-sm">

          <div>
            <div className="font-medium mb-2">
              Dispatch Time
            </div>
            <div>{delivery.dispatch_time || "Standard Dispatch"}</div>
          </div>

          <div>
            <div className="font-medium mb-2">
              Delivery Days
            </div>
            <div>{delivery.delivery_days || "3–7 Business Days"}</div>
          </div>

          <div>
            <div className="font-medium mb-2">
              Free Delivery
            </div>
            <div>{delivery.free_delivery ? "Yes" : "Standard Charges Apply"}</div>
          </div>

        </div>

      </div>
    </section>
  );
}
