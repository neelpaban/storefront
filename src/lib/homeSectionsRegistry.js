// trinkets/storefront/src/lib/homeSectionsRegistry.js
import HeroSection from "@/components/home/HeroSection";
import OfferRibbon from "@/components/home/OfferRibbon";
import SplitFeaturedSection from "@/components/home/SplitFeaturedSection";
import ThreeBannerMosaic from "@/components/home/ThreeBannerMosaic";
import CategoryGrid from "@/components/home/CategoryGrid";
import VideoBannerSection from "@/components/home/VideoBannerSection";
import TrustSection from "@/components/home/TrustSection";
import PromoBannerGrid from "@/components/home/PromoBannerGrid";
import SpecialCollection from "@/components/home/SpecialCollection";
import CuratedGallery from "@/components/home/CuratedGallery";


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