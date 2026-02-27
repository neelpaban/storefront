
// storefront/src/lib/mobileHomeSectionsRegistry.js
import MobileHero from "@/components/mobile/home/MobileHero";
import MobileCategorySlider from "@/components/mobile/home/MobileCategorySlider";
import MobileRecommendation from "@/components/mobile/home/MobileRecommendation";
import VideoBannerSection from "@/components/desktop/home/VideoBannerSection";
import CuratedGallery from "@/components/desktop/home/CuratedGallery";
import TrustSection from "@/components/desktop/home/TrustSection";

// You can expand later for other sections

export const MOBILE_HOME_SECTIONS = {
  hero: MobileHero,
  categories: MobileCategorySlider,
  curated_gallery: CuratedGallery,
  video: VideoBannerSection,

  // Map actual product sections to mobile recommendation
  
  special: MobileRecommendation,
};