// storefront/src/hooks/useAccount.js
"use client";

import { useEffect, useState, useCallback } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export function useAccount() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [saved, setSaved] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJSON = async (url) => {
    const res = await fetch(url, { credentials: "include" });

    if (res.status === 401) {
      window.location.href = "/login";
      return null;
    }

    if (!res.ok) {
      console.error(`API Error: ${url}`, await res.text());
      return null;
    }

    return res.json();
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);

    try {
      const overview = await fetchJSON(`${API}/api/account/overview`);
      const ordersRes = await fetchJSON(`${API}/api/account/orders`);
      const savedRes = await fetchJSON(`${API}/api/account/saved`);
      const addressesRes = await fetchJSON(`${API}/api/account/addresses`);

      setUser(overview?.user || null);
      setOrders(ordersRes?.orders || []);
      setSaved(savedRes?.items || []);
      setAddresses(addressesRes?.addresses || []);
    } catch (err) {
      console.error("Account fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    user,
    orders,
    saved,
    addresses,
    loading,
    refresh: fetchAll
  };
}
