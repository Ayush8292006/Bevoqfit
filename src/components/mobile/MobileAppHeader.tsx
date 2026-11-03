import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const Badge: React.FC<{ n: number }> = ({ n }) =>
  n > 0 ? (
    <span className="absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-black">
      {n}
    </span>
  ) : null;

export const MobileAppHeader: React.FC = () => {
  const { setIsCartOpen, setIsWishlistOpen } = useUI();
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();

  return (
    <header className="lg:hidden sticky top-0 z-40 h-[57px] bg-[#080808]/85 backdrop-blur-xl border-b border-white/[0.06] px-4 flex items-center justify-between">
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-left">
        <span className="font-display text-[20px] font-extrabold tracking-[0.18em] text-white">BEVOQFIT</span>
      </button>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-white active:bg-white/10"
          aria-label="Wishlist"
        >
          <Heart className="h-[21px] w-[21px]" />
          <Badge n={totalWishlist} />
        </button>
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-white active:bg-white/10"
          aria-label="Bag"
        >
          <ShoppingBag className="h-[21px] w-[21px]" />
          <Badge n={totalItems} />
        </button>
      </div>
    </header>
  );
};
