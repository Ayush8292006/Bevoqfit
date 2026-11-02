import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, ArrowRight, Shield, Truck, RefreshCw, Ruler, Check, Star } from 'lucide-react';
import { Product, ProductColor } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';
import { PRODUCTS } from '../../data/products';

export const ProductDetailsModal: React.FC = () => {
  const { selectedProduct, closeProductModal, setIsSizeGuideOpen, setIsCheckoutOpen, showToast, openProductModal } = useUI();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!selectedProduct) return null;

  return (
    <ProductDetailsContent
      product={selectedProduct}
      onClose={closeProductModal}
      onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      onOpenCheckout={() => setIsCheckoutOpen(true)}
      showToast={showToast}
      onSelectRelated={openProductModal}
      isInWishlist={isInWishlist}
      toggleWishlist={toggleWishlist}
      addToCart={addToCart}
    />
  );
};

interface InnerProps {
  product: Product;
  onClose: () => void;
  onOpenSizeGuide: () => void;
  onOpenCheckout: () => void;
  showToast: (msg: string, type?: 'success' | 'info') => void;
  onSelectRelated: (p: Product) => void;
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (p: Product) => boolean;
  addToCart: any;
}

const ProductDetailsContent: React.FC<InnerProps> = ({
  product,
  onClose,
  onOpenSizeGuide,
  onOpenCheckout,
  showToast,
  onSelectRelated,
  isInWishlist,
  toggleWishlist,
  addToCart
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'care'>('details');

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    showToast(`Added ${quantity}x ${product.name} (${selectedSize}) to Bag!`);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
    onOpenCheckout();
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9994] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Main Body - Bottom sheet on mobile, centered modal on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-[#0D0D0D] border-t sm:border border-white/20 z-10 text-white max-h-[92vh] sm:max-h-[94vh] overflow-y-auto shadow-2xl flex flex-col rounded-t-2xl sm:rounded-none pb-24 sm:pb-0"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 sm:p-2.5 bg-black/80 backdrop-blur-md border border-white/20 hover:border-white text-white transition-colors"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Main Grid: Gallery (Left) & Purchasing Info (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-white/10">
            {/* Gallery Section */}
            <div className="md:col-span-7 p-4 sm:p-8 bg-[#101010] flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
              {/* Primary High-Resolution Display Stage */}
              <div className="relative aspect-[3/4] w-full bg-[#181818] overflow-hidden border border-white/10">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={`${product.name} view ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-500"
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                    <span className="px-2.5 py-1 bg-white text-black text-[9px] sm:text-[10px] font-mono-tech font-bold uppercase tracking-widest">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* GSM Spec Overlay */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 bg-black/80 backdrop-blur-md px-2.5 py-1 border border-white/20 text-[9px] sm:text-[10px] font-mono-tech uppercase tracking-wider text-neutral-300">
                  {product.gsm} GSM • {product.fit}
                </div>
              </div>

              {/* Angle Thumbnails */}
              <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto no-scrollbar py-1">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 shrink-0 bg-neutral-900 border transition-all ${
                      activeImageIndex === idx
                        ? 'border-white scale-100 ring-1 ring-white'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                    <span className="absolute bottom-1 right-1 text-[8px] font-mono-tech bg-black/80 px-1 text-neutral-300">
                      0{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Purchasing Info */}
            <div className="md:col-span-5 p-5 sm:p-8 flex flex-col justify-between space-y-5 sm:space-y-6">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-400 mb-2">
                  <span className="uppercase tracking-widest">{product.categoryLabel}</span>
                  <div className="flex items-center gap-1.5 text-white">
                    <Star className="w-3.5 h-3.5 fill-white" />
                    <span>{product.rating}</span>
                    <span className="text-neutral-500">({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight text-white leading-tight">
                  {product.name}
                </h1>

                {/* Price Bar */}
                <div className="flex items-baseline gap-3 mt-2.5 pb-3 border-b border-white/10 font-mono-tech">
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs sm:text-sm text-neutral-500 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-[9px] uppercase text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5">
                    IN STOCK
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-300 font-sans leading-relaxed mt-3">
                  {product.description}
                </p>

                {/* Color Selection */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs font-mono-tech uppercase text-neutral-400 mb-2">
                    <span>COLOR:</span>
                    <span className="text-white font-bold">{selectedColor.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-3 py-2 border transition-all text-xs font-mono-tech ${
                          selectedColor.name === color.name
                            ? 'border-white bg-white/15 text-white'
                            : 'border-white/20 text-neutral-400 hover:border-white/50'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/40"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection with Size Guide Trigger */}
                <div className="mt-5">
                  <div className="flex justify-between items-center text-xs font-mono-tech uppercase mb-2">
                    <span className="text-neutral-400">SELECT OVERSIZED SIZE:</span>
                    <button
                      onClick={onOpenSizeGuide}
                      className="text-neutral-300 hover:text-white underline underline-offset-4 flex items-center gap-1"
                    >
                      <Ruler className="w-3 h-3" />
                      <span>SIZE GUIDE</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 sm:py-3 border font-mono-tech text-xs font-bold uppercase transition-all ${
                          selectedSize === size
                            ? 'bg-white text-black border-white shadow-lg'
                            : 'bg-transparent text-neutral-300 border-white/20 hover:border-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Desktop Actions */}
                <div className="hidden sm:block mt-6 space-y-2.5">
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 py-4 bg-white text-black font-mono-tech font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO BAG</span>
                    </button>

                    <button
                      onClick={() => {
                        const added = toggleWishlist(product);
                        showToast(
                          added ? `Added to Wishlist` : `Removed from Wishlist`,
                          added ? 'success' : 'info'
                        );
                      }}
                      className="p-4 border border-white/20 hover:border-white text-white transition-colors"
                      aria-label="Wishlist"
                    >
                      <Heart
                        className={`w-5 h-5 ${isFavorited ? 'fill-white text-white' : 'text-neutral-300'}`}
                      />
                    </button>
                  </div>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3 bg-neutral-900 border border-white/30 text-white font-mono-tech font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-white hover:text-black hover:border-white transition-all duration-200"
                  >
                    <span>EXPRESS CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications, Fabric & Details */}
          <div className="p-4 sm:p-8 bg-[#0B0B0B] border-b border-white/10">
            <div className="flex border-b border-white/10 gap-4 sm:gap-6 text-xs font-mono-tech uppercase tracking-wider mb-4 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 whitespace-nowrap transition-colors relative ${
                  activeTab === 'details' ? 'text-white font-bold' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <span>SPECIFICATIONS & CRAFT</span>
                {activeTab === 'details' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-2 whitespace-nowrap transition-colors relative ${
                  activeTab === 'shipping' ? 'text-white font-bold' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <span>SHIPPING & RETURNS</span>
                {activeTab === 'shipping' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-2 whitespace-nowrap transition-colors relative ${
                  activeTab === 'care' ? 'text-white font-bold' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <span>GARMENT CARE</span>
                {activeTab === 'care' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
                )}
              </button>
            </div>

            {activeTab === 'details' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-tech text-neutral-300">
                <ul className="space-y-2">
                  {product.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-3 sm:p-4 bg-white/5 border border-white/10 space-y-1.5">
                  <p className="text-white font-bold uppercase">OVERSIZED MANIFESTO:</p>
                  <p className="text-neutral-400">{product.fabric}</p>
                  <p className="text-neutral-400">WEIGHT: {product.gsm} GSM HEAVYWEIGHT</p>
                  <p className="text-neutral-400">FIT: {product.fit}</p>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="text-xs font-mono-tech text-neutral-300 leading-relaxed max-w-2xl space-y-2">
                <p>• Dispatched within 24 hours from Mumbai fulfillment center.</p>
                <p>• Free express shipping on domestic orders over ₹1,999.</p>
                <p>• Unworn items with security tags eligible for 7-day exchanges.</p>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="text-xs font-mono-tech text-neutral-300 leading-relaxed max-w-2xl space-y-2">
                <p>• Machine wash cold (30°C max) inside out with dark colors.</p>
                <p>• Hang dry in shade to preserve structural 280 GSM shape.</p>
                <p>• Iron on reverse at medium heat.</p>
              </div>
            )}
          </div>

          {/* Sticky Mobile Bottom Add Bar (Only on mobile devices for 1-tap conversion) */}
          <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-white/20 p-3 flex gap-2 shadow-2xl">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3.5 bg-white text-black font-mono-tech font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-98"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO BAG (₹{product.price.toLocaleString('en-IN')})</span>
            </button>

            <button
              onClick={() => {
                const added = toggleWishlist(product);
                showToast(
                  added ? `Added to Wishlist` : `Removed from Wishlist`,
                  added ? 'success' : 'info'
                );
              }}
              className="p-3.5 border border-white/30 text-white active:scale-95"
              aria-label="Wishlist"
            >
              <Heart
                className={`w-4 h-4 ${isFavorited ? 'fill-white text-white' : 'text-neutral-300'}`}
              />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
