import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ArrowUpDown, Sparkles, Filter } from 'lucide-react';
import { ProductCard } from '../shop/ProductCard';
import { PRODUCTS } from '../../data/products';
import { useUI } from '../../context/UIContext';
import { OversizedSubCategory } from '../../types';

export const ProductGridSection: React.FC = () => {
  const { activeFilter, setActiveFilter, selectedGsm, setSelectedGsm } = useUI();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'gsm-desc'>('featured');

  const filterTabs: { label: string; value: 'all' | OversizedSubCategory }[] = [
    { label: 'ALL OVERSIZED TEES', value: 'all' },
    { label: '280 GSM HEAVYWEIGHT', value: 'heavyweight-280' },
    { label: 'ACID & MINERAL WASH', value: 'acid-wash' },
    { label: 'ARCHIVAL GRAPHIC', value: 'archival-graphic' },
    { label: 'MINIMAL ESSENTIAL', value: 'minimal-essential' },
    { label: "WOMEN'S BOYFRIEND", value: 'women-oversized' },
  ];

  const gsmFilters: (number | 'all')[] = ['all', 240, 260, 270, 280, 300];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeFilter !== 'all') {
      result = result.filter((p) => p.category === activeFilter);
    }

    if (selectedGsm !== 'all') {
      result = result.filter((p) => p.gsm === selectedGsm);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'gsm-desc') {
      result.sort((a, b) => b.gsm - a.gsm);
    }

    return result;
  }, [activeFilter, selectedGsm, sortBy]);

  return (
    <section id="shop-collection" className="py-16 sm:py-24 bg-[#080808] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header with Title and Tab Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-white/10">
          <div>
            <div className="text-[10px] sm:text-xs font-mono-tech uppercase tracking-[0.25em] text-neutral-400 mb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>THE ARCHIVE // 100% OVERSIZED T-SHIRTS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white">
              OVERSIZED ARCHIVE DROPS
            </h2>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[11px] sm:text-xs font-mono-tech text-neutral-400 uppercase tracking-wider hidden sm:inline">
              SORT:
            </span>
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto appearance-none bg-[#141414] border border-white/20 text-white text-[11px] sm:text-xs font-mono-tech px-3 sm:px-4 py-2 sm:py-2.5 pr-8 uppercase tracking-wider focus:outline-none focus:border-white cursor-pointer"
              >
                <option value="featured">FEATURED CURATION</option>
                <option value="gsm-desc">FABRIC WEIGHT (300 GSM FIRST)</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
                <option value="rating">HIGHEST RATED (★ 4.8+)</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter Category Pills Bar - Scrollable on mobile */}
        <div className="py-4 sm:py-6 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-white/5 -mx-3 px-3 sm:mx-0 sm:px-0">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-mono-tech uppercase tracking-wider font-semibold transition-all duration-200 ${
                activeFilter === tab.value
                  ? 'bg-white text-black border border-white shadow-lg'
                  : 'bg-white/[0.03] text-neutral-400 border border-white/10 hover:border-white/40 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* GSM Quick Weight Filter Bar - Mobile touch friendly */}
        <div className="py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0C0C0C] px-3 sm:px-4 my-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto py-1">
            <span className="text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400 flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3" /> GSM:
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {gsmFilters.map((gsm) => (
                <button
                  key={gsm}
                  onClick={() => setSelectedGsm(gsm)}
                  className={`px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-mono-tech uppercase font-bold transition-colors ${
                    selectedGsm === gsm
                      ? 'bg-white text-black border border-white'
                      : 'border border-white/20 text-neutral-400 hover:text-white'
                  }`}
                >
                  {gsm === 'all' ? 'ALL' : `${gsm}G`}
                </button>
              ))}
            </div>
          </div>

          <span className="text-[10px] sm:text-xs font-mono-tech text-neutral-400 uppercase tracking-widest hidden sm:inline">
            {filteredAndSortedProducts.length} OVERSIZED SILHOUETTES
          </span>
        </div>

        {/* 2-Column Mobile & 4-Column Desktop Product Grid */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
