// storefront/src/app/cart/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { TrashIcon } from "@heroicons/react/24/outline";
import { loadRazorpay } from "@/lib/loadRazorpay";
import { api } from "@/lib/api";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function CartPage() {

  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [showCODConfirm, setShowCODConfirm] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartData = await api(`${API}/api/cart`);
        if (cartData?.success) {
          setCartItems(cartData.items || []);
        }

        const addrData = await api(`${API}/api/account/addresses`);
        const list = addrData?.addresses || [];

        setAddresses(list);
        setSelectedAddress(
          list.find(a => a.is_default === 1) || list[0] || null
        );

      } catch (err) {
        console.error("CART LOAD ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ================= CALCULATIONS ================= */

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + Number(item.total_price) * Number(item.quantity);
  }, 0);

  const giftTotal = cartItems.reduce(
    (sum, item) =>
      sum + (item.is_gift === 1 ? 50 * Number(item.quantity) : 0),
    0
  );

  const totalBeforeDiscount = subtotal + giftTotal;
  const finalTotal = totalBeforeDiscount - discountAmount;

  /* ================= APPLY COUPON ================= */

  const applyCoupon = async () => {
    if (!couponCode) {
      setCouponMessage("Enter a coupon code");
      return;
    }

    try {
      setApplyingCoupon(true);

      const res = await api(`${API}/api/coupons/validate`, {
        method: "POST",
        body: JSON.stringify({
          code: couponCode,
          cartTotal: subtotal + giftTotal
        })
      });

      if (!res?.valid) {
        setCouponMessage(res?.message || "Invalid coupon");
        setDiscountAmount(0);
        return;
      }

      setDiscountAmount(res.discount);
      setCouponMessage("Coupon applied successfully");

    } catch (err) {
      setCouponMessage("Coupon validation failed");
      setDiscountAmount(0);
    } finally {
      setApplyingCoupon(false);
    }
  };

  /* ================= REMOVE ITEM ================= */

  const removeItem = async (id) => {
    try {
      await api(`${API}/api/cart/${id}`, { method: "DELETE" });
      setCartItems(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  const requireAddress = () => {
    if (!selectedAddress) {
      alert("Please select a shipping address.");
      return false;
    }
    return true;
  };

  /* ================= COD ================= */

  const handleCOD = async () => {
    if (!requireAddress()) return;

    try {
      setCheckoutLoading(true);

      const data = await api(`${API}/api/orders/cod`, {
        method: "POST",
        body: JSON.stringify({
          address_id: selectedAddress.id,
          coupon_code: couponCode || null
        })
      });

      if (!data?.success) {
        alert(data?.message || "COD failed");
        return;
      }

      router.push(`/account/orders/${data.orderId}`);

    } catch (err) {
      alert("COD failed");
    } finally {
      setCheckoutLoading(false);
    }
  };

  /* ================= RAZORPAY ================= */

  const handleRazorpay = async () => {
    if (!requireAddress()) return;

    try {
      setCheckoutLoading(true);
      await loadRazorpay();

      const data = await api(`/api/checkout/create-order`, {
        method: "POST",
        body: JSON.stringify({
          address_id: selectedAddress.id,
          coupon_code: couponCode || null
        })
      });

      if (!data?.success) {
        alert(data?.message || "Checkout failed");
        return;
      }

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        order_id: data.razorpayOrderId,
        amount: data.amount,
        currency: "INR",
        name: "Trinkets Jewellery",
        handler: async (response) => {
          await api(`/api/checkout/verify`, {
            method: "POST",
            body: JSON.stringify(response)
          });
          router.push(`/account/orders/${data.orderId}`);
        },
        theme: { color: "#9f1239" }
      });

      rzp.open();

    } catch (err) {
      console.error("Razorpay error:", err);
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return <div className="p-20 text-center">Loading cart...</div>;
  }

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16 space-y-12">

        {/* SHIPPING SECTION */}
        <section className="bg-rose-50 border border-rose-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-semibold text-rose-900">
                Shipping Address
              </h2>

              {selectedAddress ? (
                <div className="mt-3 text-sm text-rose-800 space-y-1">
                  <p className="font-medium">{selectedAddress.full_name}</p>
                  <p>{selectedAddress.address_line1}</p>
                  <p>{selectedAddress.city}, {selectedAddress.state}</p>
                  <p>{selectedAddress.postal_code}</p>
                </div>
              ) : (
                <p className="mt-2 text-sm text-red-600">
                  No address selected
                </p>
              )}
            </div>

            <button
              onClick={() => setShowAddressModal(true)}
              className="text-sm underline text-rose-700"
            >
              Change
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">

          <div className="space-y-6">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100 flex gap-6"
              >
                <img
                  src={
                    item.image_url?.startsWith("http")
                      ? item.image_url
                      : `${process.env.NEXT_PUBLIC_MEDIA_URL}${item.image_url}`
                  }
                  className="w-28 h-28 object-cover rounded-xl"
                  alt={item.name}
                />

                <div className="flex-1">
                  <h3 className="font-medium text-rose-900">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>

                  <p className="mt-2 font-semibold text-rose-800">
                    ₹ {(item.total_price * item.quantity).toLocaleString()}
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="mt-4 text-xs text-gray-400 hover:text-black"
                  >
                    <TrashIcon className="w-4 h-4 inline" /> Remove
                  </button>
                </div>
              </div>
            ))}

            <RewardBar subtotal={subtotal} />
            <TrustSection />
          </div>

          <aside className="bg-white rounded-2xl p-8 shadow-sm border border-rose-100 sticky top-24">
            <h3 className="text-lg font-semibold text-rose-900 mb-6">
              Order Summary
            </h3>

            <div className="flex justify-between text-sm mb-2 text-black">
              <span>Subtotal</span>
              <span>₹ {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-sm mb-2 text-black">
              <span>Gift Wrap</span>
              <span>₹ {giftTotal.toLocaleString()}</span>
            </div>

            <div className="border-t pt-6 mt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 border rounded-full px-4 py-2 text-sm"
                />
                <button
                  onClick={applyCoupon}
                  disabled={applyingCoupon}
                  className="bg-rose-800 text-white px-4 rounded-full text-sm disabled:opacity-50"
                >
                  {applyingCoupon ? "Applying..." : "Apply"}
                </button>
              </div>

              {couponMessage && (
                <p className="mt-2 text-sm text-rose-700">
                  {couponMessage}
                </p>
              )}
            </div>

            <div className="border-t pt-4 mt-4 flex justify-between font-semibold text-lg text-black">
              <span>Total</span>
              <span>₹ {finalTotal.toLocaleString()}</span>
            </div>

            <button
              onClick={() => setShowPaymentModal(true)}
              disabled={checkoutLoading}
              className="mt-8 w-full bg-rose-800 text-white py-3 rounded-full text-sm hover:bg-rose-900 disabled:opacity-50"
            >
              {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </aside>

        </section>
      </main>

      {showPaymentModal && (
        <PaymentModal
          close={() => setShowPaymentModal(false)}
          openCODConfirm={() => setShowCODConfirm(true)}
          handleRazorpay={handleRazorpay}
        />
      )}

      {showCODConfirm && (
        <CODConfirmModal
          close={() => setShowCODConfirm(false)}
          confirm={async () => {
            setShowCODConfirm(false);
            await handleCOD();
          }}
          loading={checkoutLoading}
        />
      )}

      <Footer />
    </>
  );
}

/* ================= EXTRA COMPONENTS ================= */

function RewardBar({ subtotal }) {
  const target = 10000;
  const percent = Math.min((subtotal / target) * 100, 100);

  return (
    <div className="bg-white rounded-2xl p-6 border border-rose-100 shadow-sm">
      <p className="text-sm text-rose-700 mb-2">
        Unlock rewards at ₹10,000
      </p>
      <div className="h-2 bg-rose-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-rose-800 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function TrustSection() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <TrustCard title="100% Purity" subtitle="Certified Jewellery" />
      <TrustCard title="Secure Delivery" subtitle="Insured Shipping" />
      <TrustCard title="Safe Payments" subtitle="Razorpay Protected" />
    </div>
  );
}

function TrustCard({ title, subtitle }) {
  return (
    <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-center">
      <p className="font-medium text-rose-900">{title}</p>
      <p className="text-xs text-rose-700 mt-1">{subtitle}</p>
    </div>
  );
}

function PaymentModal({ close, openCODConfirm, handleRazorpay }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 space-y-6">
        <h2 className="text-xl font-medium text-center">
          Select Payment Method
        </h2>

        <button
          onClick={() => { close(); handleRazorpay(); }}
          className="w-full bg-rose-800 text-white py-3 rounded-full text-sm"
        >
          Pay via Razorpay
        </button>

        <button
          onClick={() => { close(); openCODConfirm(); }}
          className="w-full border py-3 rounded-full text-sm"
        >
          Cash on Delivery
        </button>

        <button
          onClick={close}
          className="w-full text-sm text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function CODConfirmModal({ close, confirm, loading }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-xl space-y-6">
        <h2 className="text-xl font-semibold text-rose-900 text-center">
          Confirm Cash on Delivery
        </h2>

        <p className="text-sm text-gray-600 text-center">
          Are you sure you want to place this order using Cash on Delivery?
        </p>

        <div className="flex gap-4">
          <button
            onClick={close}
            disabled={loading}
            className="flex-1 border border-gray-300 py-3 rounded-full text-sm"
          >
            Cancel
          </button>

          <button
            onClick={confirm}
            disabled={loading}
            className="flex-1 bg-rose-800 text-white py-3 rounded-full text-sm disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Yes, Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}