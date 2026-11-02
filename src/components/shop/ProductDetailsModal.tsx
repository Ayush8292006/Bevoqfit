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
    showToast(`Added ${quantity}x ${product.name} (${selectedSize} / ${selectedColor.name}) to Bag!`);
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
      <div className="fixed inset-0 z-[9994] flex items-center justify-center p-2 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Main Body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 25 }}
          className="relative w-full max-w-5xl bg-[#0D0D0D] border border-white/20 z-10 text-white max-h-[94vh] overflow-y-auto shadow-2xl flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 bg-black/70 backdrop-blur-md border border-white/20 hover:border-white text-white transition-colors"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Main Grid: Gallery (Left) & Purchasing Info (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-white/10">
            {/* Gallery Section (7 cols on md) */}
            <div className="md:col-span-7 p-6 sm:p-8 bg-[#101010] flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
              {/* Primary High-Resolution Display Stage */}
              <div className="relative aspect-[3/4] w-full bg-[#181818] overflow-hidden border border-white/10 group">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={`${product.name} view ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-white text-black text-[10px] font-mono-tech font-bold uppercase tracking-widest">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* GSM Spec Overlay */}
                <div className="absolute bottom-4 left-4 z-10 bg-black/80 backdrop-blur-md px-3 py-1 border border-white/20 text-[10px] font-mono-tech uppercase tracking-wider text-neutral-300">
                  {product.gsm} GSM • {product.fit}
                </div>
              </div>

              {/* Angle Thumbnails Picker */}
              <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar py-1">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-24 shrink-0 bg-neutral-900 border transition-all ${
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

            {/* Product Details Section (5 cols on md) */}
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-400 mb-2">
                  <span className="uppercase tracking-widest">{product.categoryLabel}</span>
                  <div className="flex items-center gap-1.5 text-white">
                    <Star className="w-3.5 h-3.5 fill-white" />
                    <span>{product.rating}</span>
                    <span className="text-neutral-500">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight text-white leading-tight">
                  {product.name}
                </h1>

                {/* Price Bar */}
                <div className="flex items-baseline gap-3 mt-3 pb-4 border-b border-white/10 font-mono-tech">
                  <span className="text-2xl font-bold text-white">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-500 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-[10px] uppercase text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5">
                    IN STOCK • SHIPS IN 24H
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-300 font-sans leading-relaxed mt-4">
                  {product.description}
                </p>

                {/* Color Selection */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs font-mono-tech uppercase text-neutral-400 mb-2">
                    <span>COLOR:</span>
                    <span className="text-white font-bold">{selectedColor.name}</span>
                  </div>
                  <div className="flex gap-2">
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
                <div className="mt-6">
                  <div className="flex justify-between items-center text-xs font-mono-tech uppercase mb-2">
                    <span className="text-neutral-400">SELECT SIZE:</span>
                    <button
                      onClick={onOpenSizeGuide}
                      className="text-neutral-300 hover:text-white underline underline-offset-4 flex items-center gap-1"
                    >
                      <Ruler className="w-3 h-3" />
                      <span>SIZE GUIDE</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 border font-mono-tech text-xs font-bold uppercase transition-all ${
                          selectedSize === size
                            ? 'bg-white text-black border-white'
                            : 'bg-transparent text-neutral-300 border-white/20 hover:border-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-xs font-mono-tech uppercase text-neutral-400">QUANTITY:</span>
                  <div className="flex items-center border border-white/20">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-neutral-400 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-4 text-xs font-mono-tech font-bold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-neutral-400 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Actions: Add to Bag + Buy Now + Wishlist */}
                <div className="mt-6 space-y-2.5">
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
                    className="w-full py-3.5 bg-neutral-900 border border-white/30 text-white font-mono-tech font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-white hover:text-black hover:border-white transition-all duration-200"
                  >
                    <span>BUY IT NOW • EXPRESS CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-[10px] font-mono-tech text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-neutral-300" />
                  <span>FREE SHIPPING</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-neutral-300" />
                  <span>7-DAY EXCHANGES</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-neutral-300" />
                  <span>100% AUTHENTIC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Collapsible Tabs: Specification, Details, Care Instructions */}
          <div className="p-6 sm:p-8 bg-[#0B0B0B] border-b border-white/10">
            <div className="flex border-b border-white/10 gap-6 text-xs font-mono-tech uppercase tracking-wider mb-4">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 transition-colors relative ${
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
                className={`pb-2 transition-colors relative ${
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
                className={`pb-2 transition-colors relative ${
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
                <div className="p-4 bg-white/5 border border-white/10 space-y-2">
                  <p className="text-white font-bold uppercase">FABRIC MANIFESTO:</p>
                  <p className="text-neutral-400">{product.fabric}</p>
                  <p className="text-neutral-400">WEIGHT: {product.gsm} GSM HEAVY GAUGE</p>
                  <p className="text-neutral-400">FIT: {product.fit}</p>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="text-xs font-mono-tech text-neutral-300 leading-relaxed max-w-2xl space-y-2">
                <p>• All orders are dispatched within 24 hours from our Mumbai fulfillment center.</p>
                <p>• Complimentary express shipping on all domestic orders above ₹1,999.</p>
                <p>• Flat rate ₹149 for standard orders below ₹1,999.</p>
                <p>• Unworn garments with intact security tags may be exchanged within 7 days of delivery.</p>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="text-xs font-mono-tech text-neutral-300 leading-relaxed max-w-2xl space-y-2">
                <p>• Machine wash cold (30°C max) inside out with like monochrome garments.</p>
                <p>• Do not tumble dry. Hang dry in shade to maintain the structural 280 GSM shape.</p>
                <p>• Iron on reverse at medium heat. Avoid direct high-heat contact with branding insignia.</p>
                <p>• Do not bleach or use chlorine-based optical brighteners.</p>
              </div>
            )}
          </div>

          {/* Related Products Bar */}
          {relatedProducts.length > 0 && (
            <div className="p-6 sm:p-8 bg-[#0D0D0D]">
              <h3 className="text-xs font-mono-tech uppercase tracking-[0.25em] text-neutral-400 mb-4 font-bold">
                COMPLETE THE CAPSULE
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="group border border-white/10 p-3 hover:border-white transition-colors cursor-pointer flex items-center gap-3 bg-white/[0.02]"
                  >
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-16 h-20 object-cover grayscale contrast-125 border border-white/10 shrink-0"
                    />
                    <div className="truncate">
                      <p className="text-[10px] font-mono-tech text-neutral-400 uppercase">{rel.categoryLabel}</p>
                      <p className="text-xs font-bold text-white uppercase truncate">{rel.name}</p>
                      <p className="text-xs font-mono-tech text-white font-bold mt-1">
                        ₹{rel.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

