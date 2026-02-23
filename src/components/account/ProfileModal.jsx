// storefront/src/components/account/ProfileModal.jsx
"use client";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;
if (!API) {
  throw new Error("NEXT_PUBLIC_API_URL not defined.");
}

export default function ProfileModal({ open, onClose, user, refresh }) {
  const [form, setForm] = useState({
    full_name: user?.full_name || "",
    phone: user?.phone || ""
  });

  if (!open) return null;

  const handleSubmit = async () => {
    await fetch(`${API}/api/account/profile`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 w-[400px] space-y-4">
        <h3 className="text-lg font-medium">Edit Profile</h3>

        <input
          value={form.full_name}
          onChange={(e) =>
            setForm({ ...form, full_name: e.target.value })
          }
          className="w-full border p-2 text-sm"
        />

        <input
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className="w-full border p-2 text-sm"
        />

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="underline text-sm">
            Cancel
          </button>
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
