import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight, Eye, ShoppingBag } from 'lucide-react';
import { LOOKBOOK_LOOKS, PRODUCTS } from '../../data/products';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';

export const ShopTheLookSection: React.FC = () => {
  const [selectedLookIndex, setSelectedLookIndex] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>('hs-01');

  const { openProductModal, showToast } = useUI();
  const { addToCart } = useCart();

  const currentLook = LOOKBOOK_LOOKS[selectedLookIndex];

  const handleQuickAddFromHotspot = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      addToCart(product, product.sizes[0], product.colors[0], 1);
      showToast(`Added ${product.name} to Bag!`);
    }
  };

  return (
    <section className="py-24 bg-[#080808] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-mono-tech uppercase tracking-[0.3em] text-neutral-400 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>CURATED STYLING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
              SHOP THE LOOK
            </h2>
          </div>

          {/* Lookbook navigation tabs */}
          <div className="flex border border-white/20 p-1 bg-[#121212]">
            {LOOKBOOK_LOOKS.map((look, idx) => (
              <button
                key={look.id}
                onClick={() => {
                  setSelectedLookIndex(idx);
                  setActiveHotspotId(look.hotspots[0]?.id || null);
                }}
                className={`px-4 py-2 text-xs font-mono-tech uppercase tracking-wider transition-all ${
                  selectedLookIndex === idx
                    ? 'bg-white text-black font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                LOOK 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Lookbook Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Large Image with Interactive Pulsing Hotspots (8 cols) */}
          <div className="lg:col-span-8 relative aspect-[4/5] sm:aspect-[16/10] bg-[#121212] border border-white/15 overflow-hidden">
            <img
              src={currentLook.image}
              alt={currentLook.title}
              className="w-full h-full object-cover grayscale contrast-125 select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

            {/* Hotspot Pins */}
            {currentLook.hotspots.map((hs) => {
              const isActive = activeHotspotId === hs.id;
              const product = PRODUCTS.find((p) => p.id === hs.productId);

              return (
                <div
                  key={hs.id}
                  style={{ top: hs.top, left: hs.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  {/* Pulsing button */}
                  <button
                    onClick={() => setActiveHotspotId(isActive ? null : hs.id)}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-white text-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.8)]'
                        : 'bg-black/80 text-white border border-white/60 hover:scale-110'
                    }`}
                    aria-label={`Inspect ${hs.title}`}
                  >
                    <Plus className={`w-4 h-4 transition-transform ${isActive ? 'rotate-45' : ''}`} />
                    {!isActive && (
                      <span className="absolute -inset-1 rounded-full border border-white animate-ping opacity-75" />
                    )}
                  </button>

                  {/* Hotspot Hover Card */}
                  <AnimatePresence>
                    {isActive && product && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 bg-[#0F0F0F] border border-white/30 p-3 shadow-2xl z-30"
                      >
                        <div className="flex gap-3 items-center">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-14 h-16 object-cover grayscale contrast-125 border border-white/10 shrink-0"
                          />
                          <div className="overflow-hidden">
                            <span className="text-[9px] font-mono-tech text-neutral-400 uppercase">
                              {product.categoryLabel}
                            </span>
                            <h4 className="text-xs font-bold text-white uppercase truncate">
                              {product.name}
                            </h4>
                            <p className="text-xs font-mono-tech text-white font-bold mt-1">
                              ₹{product.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-3 pt-2 border-t border-white/10">
                          <button
                            onClick={() => handleQuickAddFromHotspot(product.id)}
                            className="flex-1 py-1.5 bg-white text-black font-mono-tech text-[10px] font-bold uppercase tracking-wider hover:bg-neutral-200"
                          >
                            QUICK ADD
                          </button>
                          <button
                            onClick={() => openProductModal(product)}
                            className="px-2.5 py-1.5 border border-white/20 text-neutral-300 hover:text-white font-mono-tech text-[10px] uppercase"
                          >
                            DETAILS
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Look Details Sidebar (4 cols) */}
          <div className="lg:col-span-4 p-8 bg-[#121212] border border-white/15 h-full flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-neutral-400">
                {currentLook.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-white mt-1">
                {currentLook.title}
              </h3>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed mt-3">
                Mastering the balance of silhouette volume and proportions. Styled exclusively with BEVOQFIT heavyweight monochrome essentials.
              </p>
            </div>

            {/* Featured Items in this look */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-400 font-bold block">
                ITEMS IN THIS EDITORIAL:
              </span>
              {currentLook.hotspots.map((hs) => {
                const prod = PRODUCTS.find((p) => p.id === hs.productId);
                if (!prod) return null;

                return (
                  <div
                    key={hs.id}
                    onClick={() => openProductModal(prod)}
                    className="p-3 bg-white/[0.03] border border-white/10 hover:border-white transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-10 h-12 object-cover grayscale contrast-125 border border-white/10"
                      />
                      <div>
                        <p className="text-xs font-bold text-white uppercase group-hover:text-neutral-300 truncate max-w-[150px]">
                          {prod.name}
                        </p>
                        <p className="text-[11px] font-mono-tech text-neutral-400">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                const firstProd = PRODUCTS.find((p) => p.id === currentLook.hotspots[0]?.productId);
                if (firstProd) openProductModal(firstProd);
              }}
              className="w-full py-4 bg-white text-black font-mono-tech font-bold text-xs uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors"
            >
              INSPECT THIS FIT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

