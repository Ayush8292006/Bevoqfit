import React from 'react';
import { Home, LayoutGrid, Search, Heart, ShoppingBag } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const MobileBottomNav: React.FC = () => {
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const {
    isCartOpen, setIsCartOpen,
    isWishlistOpen, setIsWishlistOpen,
    isSearchOpen, setIsSearchOpen,
    scrollToShop,
  } = useUI();

  const closeAll = () => {
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsSearchOpen(false);
  };

  const tabs = [
    { label: 'Home', icon: Home, active: !isCartOpen && !isWishlistOpen && !isSearchOpen,
      onClick: () => { closeAll(); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { label: 'Shop', icon: LayoutGrid, active: false, onClick: () => { closeAll(); scrollToShop(); } },
    { label: 'Search', icon: Search, active: isSearchOpen, onClick: () => { closeAll(); setIsSearchOpen(true); } },
    { label: 'Saved', icon: Heart, active: isWishlistOpen, badge: totalWishlist,
      onClick: () => { closeAll(); setIsWishlistOpen(true); } },
    { label: 'Bag', icon: ShoppingBag, active: isCartOpen, badge: totalItems,
      onClick: () => { closeAll(); setIsCartOpen(true); } },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0B0B0B]/90 backdrop-blur-2xl border-t border-white/[0.08] pb-[env(safe-area-inset-bottom)]">
      <div className="flex h-[60px] items-stretch">
        {tabs.map(({ label, icon: Icon, active, badge, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className={`relative flex flex-1 flex-col items-center justify-center gap-1 active:opacity-60 transition-colors ${
              active ? 'text-white' : 'text-neutral-500'
            }`}
          >
            <span className="relative">
              <Icon className={`h-[22px] w-[22px] ${active ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
              {!!badge && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-black">
                  {badge}
                </span>
              )}
            </span>
            <span className={`text-[10px] ${active ? 'font-semibold' : 'font-medium'}`}>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
