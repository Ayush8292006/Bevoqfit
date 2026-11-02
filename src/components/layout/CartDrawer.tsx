import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    totalItems,
    subtotal,
    shipping,
    finalTotal,
    removeFromCart,
    updateQuantity
  } = useCart();
  const { isCartOpen, setIsCartOpen, setIsCheckoutOpen, scrollToShop } = useUI();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 1999;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9996] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Drawer panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-md bg-[#0D0D0D] border-l border-white/10 h-full flex flex-col z-10 text-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-neutral-300" />
              <h2 className="font-display text-lg font-bold uppercase tracking-wider">
                Shopping Bag ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 border border-white/10 hover:border-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-[#141414] border-b border-white/10">
            <div className="flex items-center justify-between text-[11px] font-mono-tech uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <Truck className="w-3.5 h-3.5" />
                {remainingForFreeShipping > 0 ? (
                  <>Add ₹{remainingForFreeShipping.toLocaleString('en-IN')} for Free Express Delivery</>
                ) : (
                  <span className="text-emerald-400 font-bold">You qualify for Free Express Delivery</span>
                )}
              </span>
              <span className="text-neutral-400">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-1 bg-white/10 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/10">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center text-neutral-500 mb-4">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-display text-base font-bold uppercase tracking-wider text-neutral-200">
                  Your bag is empty
                </h3>
                <p className="text-xs text-neutral-400 max-w-xs mt-2 font-mono-tech">
                  Explore our luxury oversized drop and discover your new streetwear attitude.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    scrollToShop();
                  }}
                  className="mt-6 px-6 py-3 bg-white text-black font-mono-tech text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-neutral-900 shrink-0 border border-white/10 overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-500 hover:text-white transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono-tech text-neutral-400">
                        <span className="flex items-center gap-1.5">
                          COLOR:
                          <span
                            className="inline-block w-2.5 h-2.5 rounded-full border border-white/30"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span className="text-neutral-200">{item.selectedColor.name}</span>
                        </span>
                        <span>•</span>
                        <span>SIZE: <span className="text-neutral-200 font-bold">{item.selectedSize}</span></span>
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-white/20">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-white/10 transition-colors text-neutral-400 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono-tech font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-white/10 transition-colors text-neutral-400 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-mono-tech text-xs font-bold text-white">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="px-6 py-5 bg-[#090909] border-t border-white/10 space-y-3">
              <div className="space-y-1.5 text-xs font-mono-tech">
                <div className="flex justify-between text-neutral-400">
                  <span>SUBTOTAL</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>SHIPPING</span>
                  <span>{shipping === 0 ? <span className="text-emerald-400">FREE</span> : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-white/10">
                  <span>TOTAL ESTIMATED</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-white text-black font-mono-tech font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all duration-200 mt-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] font-mono-tech text-neutral-500 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> 100% SECURE CHECKOUT
                </span>
                <span>•</span>
                <span>EASY 7-DAY EXCHANGES</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

