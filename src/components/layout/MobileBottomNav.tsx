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
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/10 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center justify-center py-1 px-2 text-neutral-400 hover:text-white active:scale-95 transition-all"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-mono-tech tracking-wider uppercase">HOME</span>
        </button>

        {/* Discover / Shop */}
        <button
          onClick={scrollToShop}
          className="flex flex-col items-center justify-center py-1 px-2 text-neutral-400 hover:text-white active:scale-95 transition-all"
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-mono-tech tracking-wider uppercase">ARCHIVE</span>
        </button>

        {/* Search */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 text-neutral-400 hover:text-white active:scale-95 transition-all"
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-mono-tech tracking-wider uppercase">SEARCH</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 text-neutral-400 hover:text-white active:scale-95 transition-all relative"
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
          className="flex flex-col items-center justify-center py-1 px-2 text-neutral-400 hover:text-white active:scale-95 transition-all relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5 text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-white text-black text-[9px] font-bold rounded-full flex items-center justify-center font-mono-tech">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[9px] font-mono-tech tracking-wider uppercase text-white font-semibold">BAG</span>
        </button>
      </div>
    </div>
  );
};

