import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, Eye, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const cardRef = useRef<HTMLDivElement>(null);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { openProductModal, showToast } = useUI();

  const isFavorited = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    const added = toggleWishlist(product);
    showToast(
      added ? `Added ${product.name} to Wishlist` : `Removed ${product.name} from Wishlist`,
      added ? 'success' : 'info'
    );
  };

  const handleQuickAdd = (e: React.MouseEvent, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL') => {
    e.stopPropagation();
    addToCart(product, size, selectedColor, 1);
    showToast(`Added ${product.name} (${size}) to Bag!`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => openProductModal(product)}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        transformPerspective: 1000
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.5 }}
      className="group relative flex flex-col bg-[#0A0A0A] border border-white/10 hover:border-white transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full bg-[#121212] overflow-hidden">
        {/* Main Image */}
        <motion.img
          src={product.images[0]}
          alt={product.name}
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`absolute inset-0 w-full h-full object-cover grayscale contrast-125 transition-opacity duration-500 ${
            isHovered && product.images[1] ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {/* Alternate Hover Angle Image */}
        {product.images[1] && (
          <motion.img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`absolute inset-0 w-full h-full object-cover grayscale contrast-125 transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
          />
        )}

        {/* Dynamic Light Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

        {/* Badge (Top Left) */}
        {product.badge && (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            className="absolute top-3 left-3 z-10"
          >
            <span className="px-2.5 py-1 bg-white text-black text-[9px] font-mono-tech font-bold uppercase tracking-widest shadow-md">
              {product.badge}
            </span>
          </motion.div>
        )}

        {/* Animated GSM Spec Chip (Top Right next to wishlist) */}
        <div className="absolute top-3 right-12 z-10">
          <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/20 text-[9px] font-mono-tech text-white uppercase tracking-wider font-bold">
            {product.gsm} GSM
          </span>
        </div>

        {/* Wishlist Heart Button (Top Right) */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 z-10 p-2 bg-black/70 backdrop-blur-md border border-white/20 hover:border-white text-white transition-all rounded-none hover:scale-110"
          aria-label="Toggle Wishlist"
        >
          <motion.div whileTap={{ scale: 0.7 }}>
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isFavorited ? 'fill-white text-white' : 'text-neutral-300'
              }`}
            />
          </motion.div>
        </button>

        {/* Animated Quick Add Size Bar */}
        <div
          className={`absolute inset-x-0 bottom-0 z-20 bg-black/95 backdrop-blur-md border-t border-white/20 p-3 transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-[10px] font-mono-tech uppercase text-neutral-400 mb-1.5 flex justify-between items-center">
            <span>QUICK ADD OVERSIZED TEE:</span>
            <span className="text-white font-bold">{selectedColor.name}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-between">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={(e) => handleQuickAdd(e, size)}
                className="flex-1 py-1.5 border border-white/20 hover:border-white text-neutral-200 hover:text-black hover:bg-white text-[11px] font-mono-tech font-bold transition-all duration-150 active:scale-95"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details Bar */}
      <div className="p-4 flex flex-col justify-between flex-1 bg-[#0A0A0A]">
        <div>
          {/* Category & Color indicators */}
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-neutral-400 mb-1.5">
            <span className="uppercase tracking-widest text-neutral-300 font-semibold">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1">
              {product.colors.map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="w-2.5 h-2.5 rounded-full border border-white/30"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-white line-clamp-1 group-hover:text-neutral-300 transition-colors">
            {product.name}
          </h3>

          {/* Fit tag */}
          <p className="text-[11px] font-mono-tech text-neutral-400 mt-1">
            {product.fit}
          </p>
        </div>

        {/* Price & Rating Bar */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono-tech text-sm font-bold text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="font-mono-tech text-[11px] text-neutral-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[10px] font-mono-tech text-neutral-400">
            <span>★ {product.rating}</span>
            <span>({product.reviewsCount})</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
