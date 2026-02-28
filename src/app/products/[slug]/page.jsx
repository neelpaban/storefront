// storefront/src/app/products/[slug]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/shared/layout/Header";
import Footer from "@/components/shared/layout/Footer";

import ProductGallery from "./components/ProductGallery";
import ProductPricing from "./components/ProductPricing";
import ProductTitle from "./components/ProductTitle";
import ProductQuantity from "./components/ProductQuantity";
import ProductTrust from "./components/ProductTrust";
import ProductActions from "./components/ProductActions";
import ProductDescription from "./components/ProductDescription";
import ProductCraft from "./components/ProductCraft";
import ProductSpecifications from "./components/ProductSpecifications";
import ProductFeatures from "./components/ProductFeatures";
import ProductCare from "./components/ProductCare";
import ProductReviews from "./components/ProductReviews";
import FloatingMobileBar from "./components/FloatingMobileBar";
import ProductCoupon from "./components/ProductCoupon";
import ProductGiftWrap from "./components/ProductGiftWrap";
import ProductDeliveryBox from "./components/ProductDeliveryBox";
import SimilarProductsSection from "./components/SimilarProductsSection";


const API = process.env.NEXT_PUBLIC_API_URL;

export default function ProductPage() {
  const { slug } = useParams();

  const [data, setData] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [giftWrap, setGiftWrap] = useState(false);


  useEffect(() => {
    fetch(`${API}/api/products/${slug}`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(json => {
        console.log("FULL PRODUCT DATA:", json);
        console.log("SIMILAR PRODUCTS:", json.similarProducts);

        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("PRODUCT FETCH ERROR:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="py-40 text-center">Loading...</div>;
  if (!data) return <div className="py-40 text-center">Product not found</div>;

  const { product, images, inventory } = data;
  const price = Number(product.total_price || 0);
  const mrp = product.mrp ?? Math.round(price * 1.6);

  const discount =
    mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const coupon = "WELCOME20";

  const available = inventory?.available ?? 0;

  function getDeliveryWindow() {
    const today = new Date();

    const start = new Date(today);
    start.setDate(today.getDate() + 3);

    const end = new Date(today);
    end.setDate(today.getDate() + 4);

    const options = {
      weekday: "long",
      day: "numeric",
      month: "long"
    };

    return `${start.toLocaleDateString("en-IN", options)} – ${end.toLocaleDateString("en-IN", options)}`;
  }

  const deliveryDate =
    data.delivery?.estimated_date || getDeliveryWindow();



  return (
    <>
      <Header />

      <main className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20 
grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 lg:gap-20">

          <div className="lg:sticky lg:top-28 h-fit">
            <ProductGallery images={images} product={product} />
          </div>

          <div className="space-y-8">

            <ProductPricing
              price={price}
              mrp={mrp}
              qty={qty}
            />

            <ProductTitle product={product} />

            <ProductCoupon
              discount={discount}
              coupon={coupon}
            />

            <ProductQuantity
              qty={qty}
              setQty={setQty}
              available={available}
            />

            <ProductDeliveryBox
              deliveryDate={deliveryDate}
            />

            <ProductGiftWrap
              giftWrap={giftWrap}
              setGiftWrap={setGiftWrap}
            />

            <ProductTrust />

            <ProductActions
              productId={product.id}
              qty={qty}
              available={available}
              giftWrap={giftWrap}
            />

            <ProductDescription description={product.description} />

            <ProductCraft details={data.details} />

            <ProductSpecifications specifications={data.specifications} />

            <ProductFeatures features={data.features} />



            <ProductCare details={data.details} />

            <ProductReviews productId={product.id} />
            <SimilarProductsSection products={data.similarProducts} />

            <FloatingMobileBar
              productId={product.id}
              price={price}
              qty={qty}
              available={available}
              giftWrap={giftWrap}
            />
          </div>

        </div>
      </main>


      <Footer />
    </>
  );
}
