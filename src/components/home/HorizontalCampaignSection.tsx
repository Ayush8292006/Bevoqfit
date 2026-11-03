import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { PRODUCTS } from '../../data/products';

export const HorizontalCampaignSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { openProductModal } = useUI();

  const campaignPanels = [
    {
      id: 'cp-01',
      title: 'DROP SHOULDER GEOMETRY',
      subtitle: '280 GSM FRENCH TERRY',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85',
      productId: 'bvq-m-ov-01'
    },
    {
      id: 'cp-02',
      title: 'ACID MINERAL WEATHERING',
      subtitle: 'HAND-DIPPED INDIVIDUALITY',
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85',
      productId: 'bvq-m-ov-02'
    },
    {
      id: 'cp-03',
      title: 'SLOUCHY BOYFRIEND CUT',
      subtitle: 'MODAL SILK TOUCH',
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
      productId: 'bvq-w-01'
    },
    {
      id: 'cp-04',
      title: 'ATHLETIC SUPIMA TAILORING',
      subtitle: '4-WAY RECOVERY KNIT',
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=85',
      productId: 'bvq-m-reg-01'
    },
    {
      id: 'cp-05',
      title: 'ARCHITECTURAL BOXY CROP',
      subtitle: '260 GSM STRUCTURED HEM',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=85',
      productId: 'bvq-w-02'
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -450 : 450;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleCardClick = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) openProductModal(product);
  };

  return (
    <section className="py-10 lg:py-24 bg-[#050505] border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-6 lg:mb-8">
          <div>
            <div className="text-xs font-mono-tech uppercase tracking-[0.3em] text-neutral-400 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>RUNWAY CAMPAIGN</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
              AUTUMN/WINTER '26 EDITORIAL
            </h2>
          </div>

          {/* Manual Scroll Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 border border-white/20 hover:border-white text-white hover:bg-white/10 transition-colors"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 border border-white/20 hover:border-white text-white hover:bg-white/10 transition-colors"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        className="snap-row gap-3 md:gap-6 px-4 sm:px-6 lg:px-8 scroll-px-4 scroll-smooth"
      >
        {campaignPanels.map((panel, idx) => (
          <div
            key={panel.id}
            onClick={() => handleCardClick(panel.productId)}
            className="group relative w-[80%] sm:w-[380px] md:w-[440px] h-[420px] md:h-[520px] shrink-0 bg-[#101010] border border-white/10 rounded-3xl md:rounded-none hover:border-white transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between p-6"
          >
            {/* Background Photography */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={panel.image}
                alt={panel.title}
                className="w-full h-full object-cover grayscale contrast-125 brightness-75 group-hover:scale-105 group-hover:brightness-90 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/30" />
            </div>

            {/* Top Index */}
            <div className="relative z-10 flex justify-between items-center text-xs font-mono-tech uppercase tracking-widest text-neutral-300">
              <span>EDITION // 0{idx + 1}</span>
              <span className="p-1.5 bg-black/60 backdrop-blur-md border border-white/20 group-hover:bg-white group-hover:text-black transition-colors">
                <Eye className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Bottom Titles */}
            <div className="relative z-10">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                {panel.subtitle}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight text-white leading-tight">
                {panel.title}
              </h3>
              <div className="w-full h-[1px] bg-white/20 mt-4 group-hover:bg-white transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

