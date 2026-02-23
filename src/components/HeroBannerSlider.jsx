// components/HeroBannerSlider.jsx
"use client";

import styles from "./HeroBannerSlider.module.css";

export default function HeroBannerSlider({ banners }) {
  return (
    <section className={styles.viewport}>
      <div className={`${styles.track} ${styles.animate}`}>
        {banners.map((banner, index) => (
          <div key={index} className={styles.slide}>
            {/* IMAGE — THIS WAS THE MISSING LINK */}
            <img
              src={banner.src}
              alt={banner.title}
              className={styles.image}
            />

            {/* TEXT OVERLAY */}
            <div className="absolute inset-0 bg-black/40 flex items-center">
              <div className="max-w-7xl mx-auto px-6 text-white">
                <h1 className="text-4xl sm:text-5xl font-light max-w-xl">
                  {banner.title}
                </h1>
                <p className="mt-4 text-lg text-gray-200">
                  {banner.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
