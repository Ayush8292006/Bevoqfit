import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const CinematicIntro: React.FC = () => {
  const { showIntro, finishIntro } = useUI();
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    if (!showIntro) return;

    const t1 = setTimeout(() => setPhase(2), 1200);
    const t2 = setTimeout(() => setPhase(3), 2500);
    const t3 = setTimeout(() => finishIntro(), 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [showIntro, finishIntro]);

  if (!showIntro) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] } }}
        className="fixed inset-0 z-[10000] bg-[#080808] flex items-center justify-center overflow-hidden cursor-default selection:bg-transparent"
      >
        {/* Skip button in corner - touch optimized */}
        <button
          onClick={finishIntro}
          className="absolute top-4 right-4 sm:top-8 sm:right-8 z-30 flex items-center gap-2 text-[10px] sm:text-[11px] font-mono-tech tracking-[0.2em] sm:tracking-[0.25em] text-neutral-300 hover:text-white uppercase transition-all duration-300 border border-white/20 hover:border-white px-3 sm:px-4 py-2 bg-black/60 backdrop-blur-md active:scale-95"
        >
          <span>SKIP INTRO</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Ambient grain */}
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

        {/* Phase 3 Background Flash: High-End Fashion Campaign Model */}
        {phase >= 3 && (
          <motion.div
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.35 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="absolute inset-0 z-0 overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1800&q=85"
              alt="BEVOQFIT Campaign Intro Model"
              className="w-full h-full object-cover filter grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]" />
          </motion.div>
        )}

        {/* Central Editorial Sequence */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl w-full">
          {/* Subtle Edition Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[9px] sm:text-xs font-mono-tech tracking-[0.3em] uppercase text-neutral-400 mb-4 sm:mb-6"
          >
            EST. 2026 • 100% OVERSIZED T-SHIRT ARCHIVE
          </motion.div>

          {/* Logo Typography Reveal */}
          <div className="overflow-hidden py-2 w-full">
            <motion.h1
              initial={{ y: 90, letterSpacing: '0.02em', opacity: 0 }}
              animate={{
                y: 0,
                letterSpacing: phase >= 2 ? '0.14em' : '0.04em',
                opacity: 1
              }}
              transition={{
                y: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                letterSpacing: { duration: 1.8, ease: 'easeOut' },
                opacity: { duration: 0.6 }
              }}
              className="font-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-widest uppercase select-none"
            >
              BEVOQFIT
            </motion.h1>
          </div>

          {/* Subtle Horizontal Expanding White Line */}
          <div className="w-full flex justify-center my-4 sm:my-6">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: phase >= 2 ? '220px' : '0px',
                opacity: phase >= 2 ? 0.8 : 0
              }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
            />
          </div>

          {/* Tagline Reveal: "WEAR YOUR ATTITUDE." */}
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: 35, opacity: 0 }}
              animate={{
                y: phase >= 2 ? 0 : 35,
                opacity: phase >= 2 ? 1 : 0
              }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-xs sm:text-lg md:text-xl uppercase tracking-[0.3em] sm:tracking-[0.4em] text-neutral-300 font-semibold"
            >
              WEAR YOUR ATTITUDE.
            </motion.p>
          </div>

          {/* Bottom Audio/Explore Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 3 ? 0.7 : 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 sm:mt-12 text-[9px] sm:text-[10px] font-mono-tech tracking-[0.2em] text-neutral-500 uppercase flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>ENTERING SHOPPING EXPERIENCE</span>
          </motion.div>
        </div>

        {/* Edge Frame Accents for Editorial Luxury */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-[9px] sm:text-[10px] font-mono-tech text-neutral-600 tracking-widest hidden sm:block">
          BEVOQFIT / EDITION 01
        </div>
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-[9px] sm:text-[10px] font-mono-tech text-neutral-600 tracking-widest hidden sm:block">
          MONOCHROME OVERSIZED UNIFORM
        </div>
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-[9px] sm:text-[10px] font-mono-tech text-neutral-600 tracking-widest hidden sm:block">
          ALL RIGHTS RESERVED
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
