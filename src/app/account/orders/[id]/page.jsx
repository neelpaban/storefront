// storefront/src/app/account/orders/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

export default function OrderDetailPage() {

  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ORDER ================= */
  useEffect(() => {
console.log(order);

    if (!id) return;

    async function fetchOrder() {
      try {
        const data = await api(`/api/orders/${id}`);

        if (data.success) {
          setOrder(data.order);
        }

      } catch (err) {
        console.error("Order fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();

  }, [id]);

  if (loading || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading your order...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f4f2] py-16 px-6">

      <div className="max-w-6xl mx-auto space-y-10">

        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-3xl shadow-sm p-10">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

            <div>
              <h1 className="text-3xl font-light tracking-wide text-black">
                Order Confirmation
              </h1>
              <p className="text-gray-500 mt-2 text-sm">
                Thank you for choosing Trinkets.
              </p>
            </div>

            <div className="text-sm text-right">
             {/* <p className="text-gray-400">Order Number</p>
              <p className="font-medium text-lg">
                #{order.order_number || order.id}
              </p> */}
              <p className="text-gray-500 mt-1">
                Placed on {new Date(order.created_at).toLocaleString()}
              </p>
            </div>

          </div>

        </div>

        {/* ================= STATUS + TRACKING ================= */}
        <div className="bg-white rounded-3xl shadow-sm p-10 grid md:grid-cols-2 gap-10">

          {/* ORDER STATUS */}
          <div className="space-y-6">

            <div>
              <p className="text-gray-400 text-sm">Order Status</p>
              <p className="font-medium text-lg text-black">{order.order_status}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Payment</p>
              <p className="font-medium text-black">
                {order.payment_method} • {order.payment_status}
              </p>
            </div>

          </div>

          {/* COURIER INFO */}
          {order.courier && (
            <div className="space-y-6">

              <div>
                <p className="text-gray-400 text-sm text-black">Courier</p>
                <p className="font-medium text-black">
                  {order.courier.carrier_name}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm text-black">Tracking Number</p>
                <p className="font-medium text-black">
                  {order.courier.tracking_number}
                </p>
              </div>

              {order.courier.tracking_url && (
                <Link
                  href={order.courier.tracking_url}
                  target="_blank"
                  className="underline text-sm"
                >
                  Track Shipment
                </Link>
              )}

              {order.courier.estimated_delivery && (
                <div>
                  <p className="text-gray-400 text-sm text-black">
                    Estimated Delivery
                  </p>
                  <p className="font-medium text-black">
                    {new Date(
                      order.courier.estimated_delivery
                    ).toLocaleDateString()}
                  </p>
                </div>
              )}

            </div>
          )}

        </div>

        {/* ================= ORDER ITEMS ================= */}
        <div className="bg-white rounded-3xl shadow-sm p-10">

          <h2 className="text-xl font-light mb-8 text-black">
            Items in Your Order
          </h2>

          <div className="space-y-8 text-black">

            {Array.isArray(order.items) && order.items.map((item) => (
              <div
                key={item.product_id}
                className="flex flex-col md:flex-row gap-8 border-b pb-8"
              >

                {item.image && (
                  <img
  src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
  alt={item.name}
  className="w-32 h-32 object-cover rounded-xl"
/>

                )}

                <div className="flex-1 text-sm space-y-3">

                  <Link
                    href={`/products/${item.slug}`}
                    className="font-medium text-base hover:underline"
                  >
                    {item.name}
                  </Link>

                  <p className="text-gray-500">
                    Quantity: {item.quantity}
                  </p>

                  <div>
  <p className="font-medium">
    ₹{Number(item.price * item.quantity).toLocaleString()}
  </p>
  <p className="text-gray-500 text-xs">
    ₹{Number(item.price).toLocaleString()} × {item.quantity}
  </p>
</div>


                </div>

              </div>
            ))}

          </div>

        </div>

        {/* ================= SHIPPING DETAILS ================= */}
        <div className="bg-white rounded-3xl shadow-sm p-10 grid md:grid-cols-2 gap-10 text-black">

          {/* SHIPPING ADDRESS */}
          <div>
            <h2 className="text-xl font-light mb-6">
              Shipping Details
            </h2>

            <div className="text-sm space-y-2">
              <p className="font-medium">
                {order.shipping?.full_name}
              </p>
              <p>{order.shipping?.address_line1}</p>
              {order.shipping?.address_line2 && (
                <p>{order.shipping?.address_line2}</p>
              )}
              <p>
                {order.shipping?.city},{" "}
                {order.shipping?.state}{" "}
                {order.shipping?.postal_code}
              </p>
              <p>{order.shipping?.country}</p>
              <p className="text-gray-500">
                {order.shipping?.phone}
              </p>
            </div>

          </div>

          {/* PRICE SUMMARY */}
          <div>
            <h2 className="text-xl font-light mb-6">
              Payment Summary
            </h2>

            <div className="text-sm space-y-3">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  ₹{Number(order.subtotal).toLocaleString()}
                </span>
              </div>

              {order.discount_amount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>
                    -₹{Number(order.discount_amount).toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Tax</span>
                <span>
                  ₹{Number(order.tax_amount).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  ₹{Number(order.shipping_fee).toLocaleString()}
                </span>
              </div>

              <div className="border-t pt-4 flex justify-between font-medium text-base">
                <span>Total</span>
                <span>
                  ₹{Number(order.total_amount).toLocaleString()}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
