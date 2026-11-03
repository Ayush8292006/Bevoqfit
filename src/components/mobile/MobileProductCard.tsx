import React from 'react';
import { Heart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';

/** "MONOLITH 280GSM FRENCH TERRY OVERSIZED TEE" -> "Monolith 280GSM French Terry Oversized Tee" */
export const toTitle = (s: string) =>
  s
    .toLowerCase()
    .replace(/\b([a-z])/g, (m) => m.toUpperCase())
    .replace(/(\d+)gsm/gi, '$1 GSM');

export const discountPct = (p: Product) =>
  p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;

interface Props {
  product: Product;
  className?: string;
}

export const MobileProductCard: React.FC<Props> = ({ product, className = '' }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openProductModal, showToast } = useUI();
  const fav = isInWishlist(product.id);
  const off = discountPct(product);

  const onHeart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const added = toggleWishlist(product);
    showToast(added ? 'Saved to wishlist' : 'Removed from wishlist', added ? 'success' : 'info');
  };

  return (
    <button
      type="button"
      onClick={() => openProductModal(product)}
      className={`group text-left active:scale-[0.98] transition-transform ${className}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#161616]">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover grayscale contrast-110"
        />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-[3px] text-[9px] font-bold uppercase tracking-wide text-black">
            {product.badge}
          </span>
        )}
        <span
          role="button"
          tabIndex={0}
          onClick={onHeart}
          aria-label="Save"
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 backdrop-blur-md"
        >
          <Heart className={`h-4 w-4 ${fav ? 'fill-white text-white' : 'text-white'}`} />
        </span>
        <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-[3px] text-[9px] font-semibold text-white backdrop-blur-md">
          {product.gsm} GSM
        </span>
      </div>

      <div className="px-0.5 pt-2.5">
        <p className="line-clamp-1 text-[13px] font-semibold leading-snug text-white">
          {toTitle(product.name)}
        </p>
        <p className="mt-0.5 line-clamp-1 text-[11px] text-neutral-500">{product.fit}</p>
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-[14px] font-bold text-white">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-[11px] text-neutral-500 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          {off > 0 && <span className="text-[11px] font-semibold text-emerald-400">{off}% off</span>}
        </div>
        <div className="mt-1 flex items-center gap-1 text-[11px] text-neutral-400">
          <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
          <span className="font-medium text-neutral-200">{product.rating}</span>
          <span>({product.reviewsCount})</span>
        </div>
      </div>
    </button>
  );
};
