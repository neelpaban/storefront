"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAccount } from "@/hooks/useAccount";
import AddressModal from "@/components/account/AddressModal";
import ProfileModal from "@/components/account/ProfileModal";
import Link from "next/link";

export default function AccountContent() {
  const { user, orders, saved, addresses, loading, refresh } = useAccount();

  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const setupMode = searchParams.get("setup");

  useEffect(() => {
    if (
      setupMode === "address" &&
      !loading &&
      user &&
      addresses.length === 0
    ) {
      setEditingAddress(null);
      setAddressModalOpen(true);
    }
  }, [setupMode, addresses, user, loading]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="py-40 text-center text-gray-500">
          Loading your account…
        </main>
        <Footer />
      </>
    );
  }

  if (!user) return null;

  const forceMode =
    setupMode === "address" && addresses.length === 0;

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-20 space-y-20">

        {/* HEADER */}
        <section>
          <h1 className="text-3xl font-light">My Account</h1>
          <p className="mt-2 text-gray-600">
            Manage your orders, saved jewellery, and personal details.
          </p>
        </section>

        {/* ORDERS */}
<section>
  <h2 className="text-2xl font-light">Recent Orders</h2>

  {orders.length === 0 ? (
    <div className="mt-6 border rounded-sm p-6 text-sm text-gray-600">
      No orders yet.
    </div>
  ) : (
    <div className="mt-6 space-y-6">
      {orders.map((o) => (
        <Link
          key={o.id}
          href={`/account/orders/${o.id}`}
          className="border p-6 block hover:shadow-sm transition"
        >
          <div className="flex justify-between items-start">

            {/* LEFT SIDE */}
            <div className="space-y-4">

              <div>
                <p className="font-medium text-sm">
                  Order #{o.order_number || o.id}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(o.created_at).toLocaleDateString()}
                </p>
              </div>

              {/* ORDER ITEMS PREVIEW */}
              <div className="space-y-3">
                {o.items?.slice(0, 2).map((item) => (
                  <div key={item.product_id} className="flex gap-4 items-center">

                    {item.image && (
                      <img
                        src={item.image}
                        className="w-16 h-16 object-cover"
                        alt={item.name}
                      />
                    )}

                    <div className="text-sm">
                      <p>{item.name}</p>
                      <p className="text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="text-right text-sm">
              <p className="font-medium">₹{o.total_amount}</p>
              <p className="text-gray-500">{o.status}</p>
            </div>

          </div>
        </Link>
      ))}
    </div>
  )}
</section>


        {/* SAVED */}
        <section>
          <h2 className="text-2xl font-light">Saved Items</h2>

          {saved.length === 0 ? (
            <p className="mt-6 text-sm text-gray-500">
              No saved items yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {saved.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="border p-4"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      className="w-full h-40 object-cover mb-4"
                      alt={item.name}
                    />
                  )}
                  <p className="text-sm">{item.name}</p>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ADDRESSES */}
        <section>
          <h2 className="text-2xl font-light">Addresses</h2>

          {addresses.length === 0 ? (
            <div className="mt-6 border p-6 text-sm text-gray-600">
              No addresses yet.
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="border p-6 text-sm flex justify-between"
                >
                  <div>
                    <p>{addr.full_name}</p>
                    <p className="text-gray-500">
                      {addr.address_line1}, {addr.city}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingAddress(addr);
                      setAddressModalOpen(true);
                    }}
                    className="underline text-sm"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => {
              setEditingAddress(null);
              setAddressModalOpen(true);
            }}
            className="mt-4 underline text-sm"
          >
            Add Address
          </button>
        </section>

        {/* PROFILE */}
        <section>
          <h2 className="text-2xl font-light">Profile Details</h2>

          <div className="mt-6 text-sm">
            <p>{user.full_name}</p>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500">{user.phone}</p>
          </div>

          <button
            onClick={() => setProfileModalOpen(true)}
            className="mt-4 underline text-sm"
          >
            Edit Profile
          </button>
        </section>

      </main>

      <AddressModal
        open={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        address={editingAddress}
        refresh={refresh}
        forceMode={forceMode}
      />

      <ProfileModal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={user}
        refresh={refresh}
      />

      <Footer />
    </>
  );
}