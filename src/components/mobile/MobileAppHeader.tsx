import React from 'react';
import { Search, ShoppingBag, Bell, Heart } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const MobileAppHeader: React.FC = () => {
  const { setIsCartOpen, setIsSearchOpen, showToast, setIsWishlistOpen } = useUI();
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();

  const handleNotificationClick = () => {
    showToast('DROP ALERT: 300 GSM Titan Heavyweight Oversized Tee restocked in limited quantities!', 'info');
  };

  return (
    <div className="lg:hidden sticky top-0 z-40 bg-[#080808]/95 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
      {/* Brand Logotype + App Status Pill */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-left"
        >
          <span className="font-display text-xl font-black tracking-widest text-white uppercase block leading-none">
            BEVOQFIT
          </span>
          <span className="text-[7.5px] font-mono-tech tracking-[0.25em] text-neutral-400 uppercase">
            OVERSIZED ARCHIVE
          </span>
        </button>

        <span className="px-1.5 py-0.5 bg-white/10 border border-white/20 text-[8px] font-mono-tech text-white uppercase tracking-wider font-bold rounded-sm">
          EDITION 01
        </span>
      </div>

      {/* Right In-App Utility Controls */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2 text-neutral-300 active:text-white active:scale-90 transition-transform"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* In-App Drop Notifications Bell */}
        <button
          onClick={handleNotificationClick}
          className="p-2 text-neutral-300 active:text-white active:scale-90 transition-transform relative"
          aria-label="Drop Alerts"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        </button>

        {/* Bag with counter */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="p-2 text-white active:scale-90 transition-transform relative"
          aria-label="Bag"
        >
          <ShoppingBag className="w-4 h-4" />
          {totalItems > 0 && (
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-white text-black font-mono-tech font-bold text-[8px] rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

