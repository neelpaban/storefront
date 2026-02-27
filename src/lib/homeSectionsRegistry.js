// trinkets/storefront/src/lib/homeSectionsRegistry.js
import HeroSection from "@/components/desktop/home/HeroSection";
import OfferRibbon from "@/components/desktop/home/OfferRibbon";
import SplitFeaturedSection from "@/components/desktop/home/SplitFeaturedSection";
import ThreeBannerMosaic from "@/components/desktop/home/ThreeBannerMosaic";
import CategoryGrid from "@/components/desktop/home/CategoryGrid";
import VideoBannerSection from "@/components/desktop/home/VideoBannerSection";
import TrustSection from "@/components/desktop/home/TrustSection";
import PromoBannerGrid from "@/components/desktop/home/PromoBannerGrid";
import SpecialCollection from "@/components/desktop/home/SpecialCollection";
import CuratedGallery from "@/components/desktop/home/CuratedGallery";


export const HOME_SECTIONS = {
  hero: HeroSection,
  offer: OfferRibbon,
  split_featured: SplitFeaturedSection,
  categories: CategoryGrid,
  video: VideoBannerSection,
  trust: TrustSection,
  promo: PromoBannerGrid,
  special: SpecialCollection,
  threebannermosaic: ThreeBannerMosaic,
  curated_gallery: CuratedGallery,
};