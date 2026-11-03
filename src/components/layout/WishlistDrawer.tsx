import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { Product } from '../../types';

export const WishlistDrawer: React.FC = () => {
  const isMobile = useIsMobile();
  const { items, totalWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isWishlistOpen, setIsWishlistOpen, openProductModal, scrollToShop, showToast } = useUI();

  if (!isWishlistOpen) return null;

  const handleQuickAdd = (product: Product) => {
    addToCart(product, product.sizes[0], product.colors[0], 1);
    showToast(`Added ${product.name} to Bag`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9996] flex items-end lg:items-stretch justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWishlistOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Drawer panel */}
        <motion.div
          initial={isMobile ? { y: '100%' } : { x: '100%' }}
          animate={isMobile ? { y: 0 } : { x: 0 }}
          exit={isMobile ? { y: '100%' } : { x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full lg:max-w-md bg-[#0D0D0D] border-t lg:border-t-0 lg:border-l border-white/10 h-[88vh] lg:h-full rounded-t-[28px] lg:rounded-none overflow-hidden flex flex-col z-10 text-white shadow-2xl pb-[env(safe-area-inset-bottom)]"
        >
          {/* Mobile sheet grabber */}
          <div className="lg:hidden flex justify-center pt-2.5 pb-1"><span className="w-10 h-1 rounded-full bg-white/25" /></div>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-neutral-300 fill-white" />
              <h2 className="font-display text-lg font-bold uppercase tracking-wider">
                Saved Wishlist ({totalWishlist})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 border border-white/10 hover:border-white transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/10">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center text-neutral-500 mb-4">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="font-display text-base font-bold uppercase tracking-wider text-neutral-200">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-neutral-400 max-w-xs mt-2 font-mono-tech">
                  Save pieces you love to build your personal monochrome wardrobe.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    scrollToShop();
                  }}
                  className="mt-6 px-6 py-3 bg-white text-black font-mono-tech text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors"
                >
                  BROWSE COLLECTION
                </button>
              </div>
            ) : (
              items.map((product) => (
                <div key={product.id} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setIsWishlistOpen(false);
                      openProductModal(product);
                    }}
                    className="w-20 h-24 bg-neutral-900 shrink-0 border border-white/10 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-[10px] font-mono-tech text-neutral-400 uppercase tracking-wider">
                          {product.categoryLabel}
                        </span>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-neutral-500 hover:text-white transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4
                        onClick={() => {
                          setIsWishlistOpen(false);
                          openProductModal(product);
                        }}
                        className="text-xs font-bold uppercase tracking-wider line-clamp-1 cursor-pointer hover:text-neutral-300"
                      >
                        {product.name}
                      </h4>
                      <div className="text-xs font-mono-tech text-white font-bold mt-1">
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => handleQuickAdd(product)}
                        className="flex-1 py-2 bg-white text-black font-mono-tech text-[10px] uppercase font-bold tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>ADD TO BAG</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => {
                          setIsWishlistOpen(false);
                          openProductModal(product);
                        }}
                        className="px-3 py-2 border border-white/20 text-neutral-300 hover:text-white font-mono-tech text-[10px] uppercase"
                      >
                        DETAILS
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

