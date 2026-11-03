import React from 'react';
import { Home, Compass, Search, Heart, ShoppingBag } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const MobileBottomNav: React.FC = () => {
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const { setIsCartOpen, setIsWishlistOpen, setIsSearchOpen, scrollToShop } = useUI();

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-around bg-[#111111]/90 backdrop-blur-2xl border border-white/10 rounded-[22px] px-1.5 py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.9)]">
        {/* Home */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-2xl text-neutral-400 active:bg-white/10 active:scale-95 transition-all"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-mono-tech tracking-wider uppercase">HOME</span>
        </button>

        {/* Discover / Shop */}
        <button
          onClick={scrollToShop}
          className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-2xl text-neutral-400 active:bg-white/10 active:scale-95 transition-all"
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-mono-tech tracking-wider uppercase">ARCHIVE</span>
        </button>

        {/* Search */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-2xl text-neutral-400 active:bg-white/10 active:scale-95 transition-all"
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-mono-tech tracking-wider uppercase">SEARCH</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-2xl text-neutral-400 active:bg-white/10 active:scale-95 transition-all relative"
        >
          <div className="relative">
            <Heart className="w-5 h-5 mb-0.5" />
            {totalWishlist > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-white text-black text-[9px] font-bold rounded-full flex items-center justify-center font-mono-tech">
                {totalWishlist}
              </span>
            )}
          </div>
          <span className="text-[9px] font-mono-tech tracking-wider uppercase">SAVED</span>
        </button>

        {/* Cart Bag */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-2xl bg-white text-black active:bg-neutral-200 active:scale-95 transition-all relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5 text-black" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center font-mono-tech">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[9px] font-mono-tech tracking-wider uppercase text-black font-bold">BAG</span>
        </button>
      </div>
    </nav>
  );
};

