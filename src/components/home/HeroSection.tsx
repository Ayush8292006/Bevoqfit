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
      className="relative mx-3 mt-3 rounded-[28px] border border-white/10 lg:mx-0 lg:mt-0 lg:rounded-none lg:border-0 lg:border-b min-h-[72vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#080808]"
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
          {/* Authentic Real Fashion Model Photography */}
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
      <div className="hidden lg:block absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden z-0 opacity-15">
        <motion.span
          animate={{ x: [0, -40, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          className="font-display text-[17vw] font-black uppercase text-stroke-white tracking-widest whitespace-nowrap block text-center"
        >
          OVERSIZED T-SHIRT ARCHIVE
        </motion.span>
      </div>

      {/* Main Hero Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-20 w-full flex flex-col justify-between min-h-[72vh] lg:min-h-[85vh]">
        {/* Top Campaign Stamp with Animated Pulse Badge */}
        <div className="flex items-center justify-between text-xs font-mono-tech uppercase tracking-[0.3em] text-neutral-400">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-1.5 border border-white/20 text-[10px] sm:text-xs"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span className="text-white font-bold">100% OVERSIZED T-SHIRTS</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden sm:flex items-center gap-3 text-neutral-400"
          >
            <span className="text-white font-bold">240 – 300 GSM</span>
            <span>•</span>
            <span>BOXY DROP-SHOULDER</span>
          </motion.div>
        </div>

        {/* Center Editorial Headlines */}
        <div className="mt-auto lg:my-auto pt-10 pb-6 sm:py-12 max-w-4xl">
          {/* Main Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.35rem] sm:text-6xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight text-white leading-[0.94]"
          >
            NOT JUST CLOTHING.<br />
            <span className="text-stroke-white text-white/90">IT'S AN ATTITUDE.</span>
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-base md:text-lg text-neutral-300 font-sans font-normal max-w-xl mt-3 sm:mt-6 leading-relaxed line-clamp-3 sm:line-clamp-none"
          >
            The ultimate house of heavy oversized t-shirts. Engineered 280 GSM French Terry, forward-pitched drop shoulders, and reinforced collars designed for people who define their own silhouette.
          </motion.p>

          {/* Animated CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-6 sm:mt-8"
          >
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={scrollToShop}
              className="group relative rounded-full lg:rounded-none px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-mono-tech text-xs uppercase tracking-[0.25em] font-bold overflow-hidden transition-all duration-300 active:bg-neutral-200 flex items-center justify-center gap-3 shadow-2xl"
            >
              <span>EXPLORE OVERSIZED ARCHIVE</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveFilter('heavyweight-280');
                scrollToShop();
              }}
              className="rounded-full lg:rounded-none px-6 sm:px-8 py-3.5 sm:py-4 border border-white/30 text-white font-mono-tech text-xs uppercase tracking-[0.25em] font-semibold active:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <span>280 GSM HEAVYWEIGHT</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Banner Row: Animated Spec Badges & Scroll Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 sm:pt-6 border-t border-white/10 text-xs font-mono-tech text-neutral-400">
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-1">
            <div className="shrink-0">
              <span className="block text-white font-bold text-xs sm:text-sm">280–300 GSM</span>
              <span className="text-[9px] sm:text-[10px] text-neutral-500 uppercase">French Terry</span>
            </div>
            <div className="h-6 w-[1px] bg-white/15 shrink-0" />
            <div className="shrink-0">
              <span className="block text-white font-bold text-xs sm:text-sm">DROP SHOULDER</span>
              <span className="text-[9px] sm:text-[10px] text-neutral-500 uppercase">Forward Pitched</span>
            </div>
            <div className="h-6 w-[1px] bg-white/15 shrink-0" />
            <div className="shrink-0">
              <span className="block text-white font-bold text-xs sm:text-sm">1.25" RIB COLLAR</span>
              <span className="text-[9px] sm:text-[10px] text-neutral-500 uppercase">Zero Sag</span>
            </div>
          </div>

          <button
            onClick={scrollToShop}
            className="hidden sm:flex items-center gap-2 text-neutral-300 hover:text-white transition-colors uppercase tracking-widest text-[10px] sm:text-[11px] self-end sm:self-auto"
          >
            <span>DISCOVER THE DROPS</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
