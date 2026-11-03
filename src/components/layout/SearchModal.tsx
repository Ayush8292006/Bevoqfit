import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openProductModal } = useUI();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Keyboard shortcut listener (Cmd/Ctrl + K to open search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = PRODUCTS.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return false;
    return (
      p.name.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.fit.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  const popularSearches = [
    '280 GSM Heavyweight',
    'Men Oversized',
    'Acid Wash',
    'Tailored Supima',
    'Boxy Crop',
    'French Terry'
  ];

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    openProductModal(product);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9998] flex items-start justify-center sm:pt-24 px-0 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Search Dialog */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          className="relative w-full max-w-3xl h-full sm:h-auto bg-[#0F0F0F] border-0 sm:border border-white/20 shadow-2xl overflow-y-auto sm:overflow-hidden z-10 pt-[env(safe-area-inset-top)]"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10 gap-3 sm:gap-4">
            <Search className="w-5 h-5 text-neutral-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by fit, GSM, style or collection..."
              className="w-full bg-transparent text-white text-base sm:text-lg focus:outline-none placeholder-neutral-500 font-sans tracking-wide"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1 text-neutral-400 hover:text-white border border-white/10 hover:border-white transition-colors ml-2"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Filter Tags */}
          <div className="px-6 py-3 bg-[#141414] border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
            <span className="text-neutral-500 font-mono-tech uppercase text-[10px] tracking-wider shrink-0">
              POPULAR:
            </span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="shrink-0 px-2.5 py-1 bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white rounded-none border border-white/10 text-[11px] font-mono-tech transition-colors"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Search Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-6">
            {query && filteredProducts.length > 0 && (
              <div className="space-y-4">
                <div className="text-[11px] font-mono-tech uppercase text-neutral-400 tracking-widest">
                  Found {filteredProducts.length} Results
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p)}
                      className="group flex gap-4 p-3 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/40 cursor-pointer transition-all"
                    >
                      <div className="w-20 h-24 bg-neutral-900 shrink-0 overflow-hidden">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col justify-between py-0.5">
                        <div>
                          <span className="text-[10px] font-mono-tech text-neutral-400 uppercase tracking-wider">
                            {p.categoryLabel}
                          </span>
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider line-clamp-1 group-hover:text-neutral-300">
                            {p.name}
                          </h4>
                          <p className="text-[11px] text-neutral-400 font-mono-tech mt-1">
                            {p.fabric.split('•')[0]}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs font-mono-tech mt-2">
                          <span className="text-white font-bold">₹{p.price.toLocaleString('en-IN')}</span>
                          <span className="text-neutral-500 group-hover:text-white flex items-center gap-1 text-[10px]">
                            VIEW <CornerDownLeft className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {query && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm font-mono-tech text-neutral-400 uppercase tracking-widest">
                  No matching garments found for "{query}"
                </p>
                <p className="text-xs text-neutral-600 mt-2">
                  Try searching for 'oversized', 'heavyweight', '280 gsm', or 'regular'
                </p>
              </div>
            )}

            {!query && (
              <div className="py-8 text-center">
                <p className="text-xs font-mono-tech text-neutral-400 uppercase tracking-[0.2em] mb-4">
                  ENTER KEYWORDS TO EXPLORE THE MONOCHROME ARCHIVE
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
                  {PRODUCTS.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectProduct(item)}
                      className="cursor-pointer group text-left border border-white/10 p-2 hover:border-white transition-colors"
                    >
                      <div className="aspect-[3/4] bg-neutral-900 overflow-hidden mb-2">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="text-[10px] font-mono-tech text-neutral-300 truncate uppercase">
                        {item.name}
                      </p>
                      <p className="text-[10px] font-mono-tech text-white font-bold">
                        ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

