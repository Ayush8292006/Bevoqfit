import React from 'react';
import { UIProvider } from './context/UIContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { CustomCursor } from './components/common/CustomCursor';
import { ToastContainer } from './components/common/Toast';
import { SizeGuideModal } from './components/common/SizeGuideModal';
import { CinematicIntro } from './components/intro/CinematicIntro';

import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { MobileAppHeader } from './components/mobile/MobileAppHeader';
import { MobileStoriesRow } from './components/mobile/MobileStoriesRow';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { SearchModal } from './components/layout/SearchModal';
import { CartDrawer } from './components/layout/CartDrawer';
import { WishlistDrawer } from './components/layout/WishlistDrawer';
import { CheckoutModal } from './components/layout/CheckoutModal';
import { Footer } from './components/layout/Footer';

import { HeroSection } from './components/home/HeroSection';
import { CategorySection } from './components/home/CategorySection';
import { InteractiveFitVisualizer } from './components/home/InteractiveFitVisualizer';
import { ProductGridSection } from './components/home/ProductGridSection';
import { MarqueeBanner } from './components/home/MarqueeBanner';
import { BrandStorySection } from './components/home/BrandStorySection';
import { ShopTheLookSection } from './components/home/ShopTheLookSection';
import { HorizontalCampaignSection } from './components/home/HorizontalCampaignSection';
import { FabricSpecsSection } from './components/home/FabricSpecsSection';
import { CommunityGallerySection } from './components/home/CommunityGallerySection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { NewsletterSection } from './components/home/NewsletterSection';

import { ProductDetailsModal } from './components/shop/ProductDetailsModal';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F2] font-sans selection:bg-white selection:text-black relative pb-28 lg:pb-0">
      {/* Custom Desktop Streetwear Cursor (Automatically disabled on touch screens) */}
      <CustomCursor />

      {/* Global Interactive Notification Toasts */}
      <ToastContainer />

      {/* Cinematic First-Visit Intro Sequence */}
      <CinematicIntro />

      {/* Global Overlays & Drawers */}
      <SearchModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <SizeGuideModal />
      <ProductDetailsModal />

      {/* Top Banner */}
      <AnnouncementBar />

      {/* Native In-App Mobile Header (Mobile only) */}
      <MobileAppHeader />

      {/* In-App Stories / Drop Highlights Row (Mobile only) */}
      <MobileStoriesRow />

      {/* Desktop Sticky Navigation Bar */}
      <Navbar />

      {/* Native App-like Mobile Sticky Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Main 100% Oversized T-Shirt Experience */}
      <main>
        {/* Full-Screen Animated Hero Section */}
        <HeroSection />

        {/* Shop By Oversized Cut (280 GSM Heavyweight, Acid Wash, Women Boyfriend) */}
        <CategorySection />

        {/* Animated Interactive Oversized Fit Anatomy & Silhouette Lab */}
        <InteractiveFitVisualizer />

        {/* Kinetic Editorial Marquee */}
        <MarqueeBanner />

        {/* 100% Oversized T-Shirt Grid with GSM Filters & 3D Card Hover Tilts */}
        <ProductGridSection />

        {/* Editorial Brand Story Section */}
        <BrandStorySection />

        {/* Interactive Shop The Look Campaign with Hotspot Pins */}
        <ShopTheLookSection />

        {/* Horizontal Scrolling Fashion Runway Section */}
        <HorizontalCampaignSection />

        {/* Fabric & Precision Engineering Specs (240–300 GSM) */}
        <FabricSpecsSection />

        {/* Community Street Style Instagram Gallery */}
        <CommunityGallerySection />

        {/* Verified Customer Reviews & Testimonials */}
        <TestimonialsSection />

        {/* VIP Inner Circle Newsletter Drop */}
        <NewsletterSection />
      </main>

      {/* International Editorial Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <UIProvider>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </UIProvider>
  );
}
