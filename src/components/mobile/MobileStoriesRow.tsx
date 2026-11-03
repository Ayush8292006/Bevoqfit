import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight, Volume2 } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useUI } from '../../context/UIContext';
import { Product } from '../../types';

interface Story {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  image: string;
  productSlug?: string;
  productId?: string;
  specs: string;
}

export const MobileStoriesRow: React.FC = () => {
  const { openProductModal } = useUI();
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const stories: Story[] = [
    {
      id: 'story-1',
      name: '300G TITAN',
      tagline: 'ULTRA-WEIGHT STREET ARMOR',
      badge: 'NEW DROP',
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85',
      productId: 'bvq-ov-280-02',
      specs: '300 GSM Compact Cotton • Zero Sag Neck'
    },
    {
      id: 'story-2',
      name: '280G MONOLITH',
      tagline: 'SIGNATURE BOXY OVERSIZED TEE',
      badge: 'BESTSELLER',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85',
      productId: 'bvq-ov-280-01',
      specs: '280 GSM French Terry • 2.5" Drop Shoulder'
    },
    {
      id: 'story-3',
      name: 'ACID SMOKE',
      tagline: 'HAND-DIPPED 1-OF-1 MINERAL WASH',
      badge: 'LIMITED',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85',
      productId: 'bvq-ov-acid-01',
      specs: '260 GSM Single Jersey • Smoke Grey Patina'
    },
    {
      id: 'story-4',
      name: 'BOYFRIEND FIT',
      tagline: 'WOMEN’S SLOUCHY MODAL OVERSIZED',
      badge: 'TRENDING',
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
      productId: 'bvq-ov-wm-01',
      specs: '240 GSM Modal Silk Touch • Fluid Drape'
    },
    {
      id: 'story-5',
      name: '3D PUFF PRINT',
      tagline: 'TOKYO BRUTALIST ARCHIVE',
      badge: 'ICONIC',
      image: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=1200&q=85',
      productId: 'bvq-ov-graph-01',
      specs: '280 GSM • High-Relief Rubberized Print'
    }
  ];

  // Story progress timer
  useEffect(() => {
    if (activeStoryIndex === null) {
      setProgress(0);
      return;
    }

    const interval = 50;
    const step = (interval / 5000) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (activeStoryIndex < stories.length - 1) {
            setActiveStoryIndex((curr) => (curr !== null ? curr + 1 : null));
            return 0;
          } else {
            setActiveStoryIndex(null);
            return 0;
          }
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeStoryIndex, stories.length]);

  const handleOpenStory = (index: number) => {
    setProgress(0);
    setActiveStoryIndex(index);
  };

  const handleNextStory = () => {
    if (activeStoryIndex !== null && activeStoryIndex < stories.length - 1) {
      setProgress(0);
      setActiveStoryIndex(activeStoryIndex + 1);
    } else {
      setActiveStoryIndex(null);
    }
  };

  const handlePrevStory = () => {
    if (activeStoryIndex !== null && activeStoryIndex > 0) {
      setProgress(0);
      setActiveStoryIndex(activeStoryIndex - 1);
    }
  };

  const handleShopCurrentStory = () => {
    if (activeStoryIndex === null) return;
    const current = stories[activeStoryIndex];
    const product = PRODUCTS.find((p) => p.id === current.productId);
    setActiveStoryIndex(null);
    if (product) {
      openProductModal(product);
    }
  };

  return (
    <>
      {/* Mobile In-App Stories / Drop Highlights Row (Visible on Mobile & Tablet) */}
      <div className="lg:hidden bg-[#080808] pt-3 pb-1 px-3 overflow-hidden">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          {stories.map((story, idx) => (
            <button
              key={story.id}
              onClick={() => handleOpenStory(idx)}
              className="flex flex-col items-center shrink-0 group focus:outline-none"
            >
              {/* Glowing Story Ring */}
              <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-white via-neutral-400 to-white/40 active:scale-95 transition-transform">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-900 border-2 border-black">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-110 transition-transform"
                  />
                </div>
                {/* Live micro-badge */}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white text-black text-[7px] font-mono-tech font-black px-1.5 py-0.2 rounded-full uppercase tracking-tighter shadow-md whitespace-nowrap">
                  {story.badge}
                </span>
              </div>
              <span className="text-[10px] font-mono-tech uppercase text-neutral-300 mt-2 tracking-wider truncate max-w-[68px] text-center">
                {story.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Native Full-Screen App Story Viewer Modal */}
      <AnimatePresence>
        {activeStoryIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[10005] bg-black flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] justify-between overflow-hidden"
          >
            {/* Background Story Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={stories[activeStoryIndex].image}
                alt={stories[activeStoryIndex].name}
                className="w-full h-full object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/70" />
            </div>

            {/* Tap Gestures: Left Half (Previous), Right Half (Next) */}
            <div className="absolute inset-0 z-10 flex">
              <div onClick={handlePrevStory} className="w-1/3 h-full cursor-pointer" />
              <div onClick={handleNextStory} className="w-2/3 h-full cursor-pointer" />
            </div>

            {/* Top Bar with Progress Indicators */}
            <div className="relative z-20 pt-4 px-3 flex flex-col gap-2">
              <div className="flex gap-1.5 w-full">
                {stories.map((s, idx) => (
                  <div key={s.id} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-75"
                      style={{
                        width:
                          idx < activeStoryIndex
                            ? '100%'
                            : idx === activeStoryIndex
                            ? `${progress}%`
                            : '0%'
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Story Header */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-white overflow-hidden bg-neutral-900">
                    <img
                      src={stories[activeStoryIndex].image}
                      alt="Thumbnail"
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-display font-bold uppercase text-white block">
                      BEVOQFIT
                    </span>
                    <span className="text-[9px] font-mono-tech text-neutral-300 uppercase">
                      {stories[activeStoryIndex].badge} • OVERSIZED DROP
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveStoryIndex(null)}
                  className="p-2 text-white bg-black/60 backdrop-blur-md rounded-full border border-white/20"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom In-App Story Action Card */}
            <div className="relative z-20 p-5 bg-gradient-to-t from-black via-black/90 to-transparent space-y-3">
              <span className="px-2 py-0.5 bg-white text-black text-[9px] font-mono-tech font-bold uppercase tracking-wider inline-block">
                {stories[activeStoryIndex].specs}
              </span>

              <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white leading-tight">
                {stories[activeStoryIndex].tagline}
              </h3>

              <button
                onClick={handleShopCurrentStory}
                className="w-full py-4 rounded-full bg-white text-black font-mono-tech text-xs uppercase font-bold tracking-[0.2em] flex items-center justify-center gap-2 shadow-2xl active:scale-98"
              >
                <span>SHOP THIS OVERSIZED TEE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

