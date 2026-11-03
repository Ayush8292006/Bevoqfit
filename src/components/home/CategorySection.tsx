import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { OversizedSubCategory } from '../../types';

interface CategoryCard {
  title: string;
  subtitle: string;
  category: OversizedSubCategory;
  image: string;
  itemCount: string;
  gsmBadge: string;
}

export const CategorySection: React.FC = () => {
  const { setActiveFilter, scrollToShop } = useUI();

  const categories: CategoryCard[] = [
    {
      title: "280 GSM HEAVYWEIGHT OVERSIZED",
      subtitle: "French Terry Boxy Drop-Shoulder Streetwear",
      category: 'heavyweight-280',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85',
      itemCount: '02 DROPS',
      gsmBadge: '280 - 300 GSM'
    },
    {
      title: "ACID & MINERAL WASH OVERSIZED",
      subtitle: "Artisanal Weathered Stone-Smoke Drape",
      category: 'acid-wash',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85',
      itemCount: '02 DROPS',
      gsmBadge: '260 - 270 GSM'
    },
    {
      title: "WOMEN'S BOYFRIEND OVERSIZED",
      subtitle: "Slouchy Modal-Cotton & Architectural Boxy Crops",
      category: 'women-oversized',
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
      itemCount: '03 DROPS',
      gsmBadge: '240 - 260 GSM'
    }
  ];

  const handleCategorySelect = (category: OversizedSubCategory) => {
    setActiveFilter(category);
    scrollToShop();
  };

  return (
    <section className="py-10 lg:py-24 bg-[#080808] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 lg:gap-4 mb-6 lg:mb-12">
          <div>
            <div className="text-xs font-mono-tech uppercase tracking-[0.3em] text-neutral-400 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>OVERSIZED T-SHIRT ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
              SHOP BY OVERSIZED CUT
            </h2>
          </div>
          <p className="hidden sm:block text-xs font-mono-tech text-neutral-400 max-w-xs uppercase tracking-wider">
            Engineered drop-shoulder boxy cuts crafted exclusively from 240–300 GSM heavyweight cotton.
          </p>
        </div>

        {/* 3 Large Animated Visual Category Cards */}
        <div className="snap-row gap-3 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleCategorySelect(cat.category)}
              className="group relative w-[78%] sm:w-[60%] md:w-auto shrink-0 h-[360px] sm:h-[480px] md:h-[600px] overflow-hidden bg-[#121212] border border-white/15 rounded-3xl md:rounded-none hover:border-white cursor-pointer transition-all duration-500 flex flex-col justify-between p-5 sm:p-8 shadow-xl"
            >
              {/* Background Image with Zoom on Hover */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-75 group-hover:scale-110 group-hover:brightness-95 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 group-hover:via-black/20 transition-all duration-500" />
                <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none" />
              </div>

              {/* Top Meta info */}
              <div className="relative z-10 flex items-center justify-between text-xs font-mono-tech uppercase tracking-widest text-neutral-400">
                <span className="px-2.5 py-1 whitespace-nowrap rounded-full md:rounded-none bg-black/80 backdrop-blur-md border border-white/20 text-white font-bold">
                  {cat.gsmBadge}
                </span>
                <span className="hidden sm:inline px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/20 text-[10px]">
                  {cat.itemCount}
                </span>
              </div>

              {/* Bottom Category Content & Animated Arrow */}
              <div className="relative z-10">
                <p className="text-xs font-mono-tech text-neutral-300 mb-2 transform group-hover:-translate-y-1 transition-transform duration-300">
                  {cat.subtitle}
                </p>

                <div className="flex items-end justify-between">
                  <h3 className="text-xl sm:text-3xl font-display font-black uppercase tracking-tight text-white leading-tight group-hover:tracking-wider transition-all duration-300">
                    {cat.title}
                  </h3>

                  <div className="w-10 h-10 rounded-full border border-white/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0 ml-4 shadow-lg">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="w-full h-[1px] bg-white/20 mt-4 group-hover:bg-white transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
