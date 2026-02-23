export async function GET() {
  return Response.json([
    {
      id: 1,
      section_key: "hero",
      data: {
        title: "Fine Jewellery for Timeless Moments",
        subtitle: "Crafted with precision & trust",
        image: "/media/home/hero.jpg",
        ctaText: "Explore Collection",
        ctaLink: "/collections",
      },
    },
    {
      id: 2,
      section_key: "offer",
      data: {
        text: "Flat 20% Off on Bridal Collection",
        link: "/collections/bridal",
      },
    },
    {
      id: 3,
      section_key: "promo",
      data: {
        banners: [
          {
            image: "/media/home/promo1.jpg",
            link: "/collections/gold",
          },
          {
            image: "/media/home/promo2.jpg",
            link: "/collections/diamond",
          },
        ],
      },
    },
    {
      id: 4,
      section_key: "special",
      data: {
        title: "Signature Collection",
        items: [
          {
            name: "Aurora Ring",
            image: "/media/products/ring.jpg",
            price: 98000,
            link: "/product/aurora-ring",
          },
        ],
      },
    },
  ]);
}