import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const HeroSection: React.FC = () => {
  const { scrollToShop, setActiveFilter } = useUI();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityParallax = useTransform(scrollY, [0, 600], [1, 0.35]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width - 0.5) * 25;
    const y = (clientY / height - 0.5) * 25;
    setMouseOffset({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#080808] border-b border-white/10"
    >
      {/* Background Campaign Photography Layer with Parallax */}
      <motion.div
        style={{ y: yParallax, opacity: opacityParallax }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <motion.div
          animate={{
            x: mouseOffset.x * -0.6,
            y: mouseOffset.y * -0.6,
          }}
          transition={{ type: 'spring', damping: 35, stiffness: 120 }}
          className="relative w-full h-[115%] -top-[7%]"
        >
          {/* Authentic High-Resolution Fashion Model Photography (Real male model in oversized heavyweight black tee) */}
          <img
            src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=2000&q=85"
            alt="BEVOQFIT Oversized T-Shirt Campaign Model"
            className="w-full h-full object-cover grayscale contrast-125 brightness-75 select-none"
          />

          {/* Luxury Monochrome Lighting Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]/85" />
          <div className="absolute inset-0 bg-grain opacity-30" />
        </motion.div>
      </motion.div>

      {/* Floating Animated Avant-Garde Background Watermark */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden z-0 opacity-15">
        <motion.span
          animate={{ x: [0, -40, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          className="font-display text-[17vw] font-black uppercase text-stroke-white tracking-widest whitespace-nowrap block text-center"
        >
          OVERSIZED T-SHIRT ARCHIVE
        </motion.span>
      </div>

      {/* Main Hero Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex flex-col justify-between min-h-[85vh]">
        {/* Top Campaign Stamp with Animated Pulse Badge */}
        <div className="flex items-center justify-between text-xs font-mono-tech uppercase tracking-[0.3em] text-neutral-400">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/20"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span className="text-white font-bold">100% OVERSIZED T-SHIRTS ONLY</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden sm:flex items-center gap-3 text-neutral-400"
          >
            <span className="text-white font-bold">240 – 300 GSM</span>
            <span>•</span>
            <span>BOXY DROP-SHOULDER CUTS</span>
          </motion.div>
        </div>

        {/* Center Editorial Headlines */}
        <div className="my-auto py-12 max-w-4xl">
          {/* Main Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight text-white leading-[0.92]"
          >
            NOT JUST CLOTHING.<br />
            <span className="text-stroke-white text-white/90">IT'S AN ATTITUDE.</span>
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base md:text-lg text-neutral-300 font-sans font-normal max-w-xl mt-6 leading-relaxed"
          >
            The ultimate house of heavy oversized t-shirts. Engineered 280 GSM French Terry, forward-pitched drop shoulders, and reinforced collars designed for people who define their own silhouette.
          </motion.p>

          {/* Animated CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToShop}
              className="group relative px-8 py-4 bg-white text-black font-mono-tech text-xs uppercase tracking-[0.25em] font-bold overflow-hidden transition-all duration-300 hover:bg-neutral-200 flex items-center justify-center gap-3 shadow-2xl"
            >
              <span>EXPLORE OVERSIZED COLLECTION</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveFilter('heavyweight-280');
                scrollToShop();
              }}
              className="px-8 py-4 border border-white/30 text-white font-mono-tech text-xs uppercase tracking-[0.25em] font-semibold hover:border-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <span>280 GSM HEAVYWEIGHT</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Banner Row: Animated Spec Badges & Scroll Indicator */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10 text-xs font-mono-tech text-neutral-400">
          <div className="flex items-center gap-6">
            <div>
              <span className="block text-white font-bold text-sm">280–300 GSM</span>
              <span className="text-[10px] text-neutral-500 uppercase">Heavy French Terry</span>
            </div>
            <div className="h-6 w-[1px] bg-white/15" />
            <div>
              <span className="block text-white font-bold text-sm">DROP SHOULDER</span>
              <span className="text-[10px] text-neutral-500 uppercase">Forward Pitched</span>
            </div>
            <div className="h-6 w-[1px] bg-white/15 hidden sm:block" />
            <div className="hidden sm:block">
              <span className="block text-white font-bold text-sm">1.25" RIB COLLAR</span>
              <span className="text-[10px] text-neutral-500 uppercase">Zero Sag Guaranteed</span>
            </div>
          </div>

          <button
            onClick={scrollToShop}
            className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors uppercase tracking-widest text-[11px]"
          >
            <span>DISCOVER THE DROPS</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
