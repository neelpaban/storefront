// storefront/src/components/home/PromoBannerGrid.jsx
import SectionShell from "./SectionShell";

const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_URL || "";

export default function PromoBannerGrid({ data = {} }) {
  const { items = [] } = data;

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <SectionShell>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => {
          const media = item.media?.[0];

          return (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden group"
            >
              {/* MEDIA */}
              {media ? (
                media.type === "video" ? (
                  <video
                    src={`${MEDIA_BASE}${media.url}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-72 object-cover"
                  />
                ) : (
                  <img
                    src={`${MEDIA_BASE}${media.url}`}
                    alt={item.title}
                    className="w-full h-72 object-cover"
                  />
                )
              ) : (
                <div className="w-full h-72 bg-gray-200" />
              )}

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl mb-1">{item.title}</h3>
                {item.subtitle && (
                  <p className="text-sm mb-4">{item.subtitle}</p>
                )}
                {item.ctaText && (
                  <a
                    href={item.ctaLink || "#"}
                    className="inline-block border px-4 py-2 text-sm w-fit"
                  >
                    {item.ctaText}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
