// storefront/src/components/account/AddressModal.jsx
"use client";
import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

if (!API) {
  throw new Error("NEXT_PUBLIC_API_URL not defined.");
}

export default function AddressModal({
  open,
  onClose,
  address,
  refresh,
  forceMode = false,   // ✅ IMPORTANT
}) {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
    is_default: 0,
  });

  /* ================= PREFILL / RESET ================= */
  useEffect(() => {
    if (address) {
      setForm({
        id: address.id,
        full_name: address.full_name || "",
        phone: address.phone || "",
        address_line1: address.address_line1 || "",
        address_line2: address.address_line2 || "",
        city: address.city || "",
        state: address.state || "",
        postal_code: address.postal_code || "",
        country: address.country || "India",
        is_default: address.is_default || 0,
      });
    } else {
      setForm({
        full_name: "",
        phone: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "India",
        is_default: 0,
      });
    }
  }, [address, open]);

  if (!open) return null;

  /* ================= SAVE ================= */
  const handleSubmit = async () => {
    await fetch(`${API}/api/account/address`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: address?.id }),
    });

    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 w-[500px] rounded-sm space-y-4">

        <h3 className="text-lg font-medium">
          {address ? "Edit Address" : "Add Address"}
        </h3>

        {/* INPUT FIELDS */}
        {[
          "full_name",
          "phone",
          "address_line1",
          "address_line2",
          "city",
          "state",
          "postal_code",
          "country",
        ].map((key) => (
          <input
            key={key}
            value={form[key] || ""}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
            placeholder={key.replace("_", " ")}
            className="w-full border p-2 text-sm"
          />
        ))}

        {/* DEFAULT CHECKBOX */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.is_default === 1}
            onChange={(e) =>
              setForm({
                ...form,
                is_default: e.target.checked ? 1 : 0,
              })
            }
          />
          Set as default address
        </label>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-4">

          {!forceMode && (
            <button
              onClick={onClose}
              className="text-sm underline"
            >
              Cancel
            </button>
          )}

          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 text-sm"
          >
            Save
          </button>

        </div>

      </div>
    </div>
  );
}
