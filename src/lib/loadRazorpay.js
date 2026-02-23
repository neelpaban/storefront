export function loadRazorpay() {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      console.log("✅ Razorpay SDK loaded");
      resolve(true);
    };

    script.onerror = () => {
      console.error("❌ Razorpay SDK failed to load");
      resolve(false);
    };

    document.body.appendChild(script);
  });
}
