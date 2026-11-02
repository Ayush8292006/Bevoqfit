import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Check, Eye } from 'lucide-react';
import { useUI } from '../../context/UIContext';

interface FitMode {
  id: string;
  name: string;
  tagline: string;
  gsm: number;
  image: string;
  specs: { label: string; value: string; desc: string }[];
  visualHighlights: { top: string; left: string; text: string }[];
  categoryFilter: 'heavyweight-280' | 'acid-wash' | 'minimal-essential' | 'women-oversized';
}

export const InteractiveFitVisualizer: React.FC = () => {
  const { setActiveFilter, scrollToShop } = useUI();
  const [activeModeIndex, setActiveModeIndex] = useState(0);

  const fitModes: FitMode[] = [
    {
      id: 'fit-boxy',
      name: '280 GSM BOXY DROP-SHOULDER',
      tagline: 'The Definitive Architectural Streetwear Silhouette',
      gsm: 280,
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85',
      specs: [
        { label: 'SHOULDER DROP', value: '+2.5 INCHES', desc: 'Lowered armhole pitched 1.5" forward' },
        { label: 'CHEST VOLUME', value: '+4.0 INCHES', desc: 'Allows effortless natural airflow and drape' },
        { label: 'NECK RIBBING', value: '1.25" DENSE', desc: 'Spandex-threaded stay-tight collar' },
        { label: 'FABRIC TENSION', value: 'STRUCTURAL', desc: 'Holds crisp box shape without collapsing' }
      ],
      visualHighlights: [
        { top: '18%', left: '48%', text: '1.25" Tight Collar' },
        { top: '30%', left: '26%', text: '2.5" Drop Shoulder' },
        { top: '48%', left: '74%', text: 'Elbow-Length Sleeve' },
        { top: '75%', left: '35%', text: 'Zero-Torque Hem' }
      ],
      categoryFilter: 'heavyweight-280'
    },
    {
      id: 'fit-acid',
      name: '260 GSM MINERAL WASH SLOUCH',
      tagline: 'Artisanal Weathered Streetwear Drape',
      gsm: 260,
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85',
      specs: [
        { label: 'WASH PROCESS', value: 'HAND MINERAL', desc: 'Each tee possesses a 1-of-1 ash patina' },
        { label: 'SLEEVE LENGTH', value: 'MID-FOREARM', desc: 'Elongated slouchy proportion' },
        { label: 'SURFACE FEEL', value: 'PEACH-TOUCH', desc: 'Enzyme softened single jersey' },
        { label: 'TORSO DRAPE', value: 'FLUID STREET', desc: 'Effortless movement without bunching' }
      ],
      visualHighlights: [
        { top: '24%', left: '50%', text: 'Enzyme Washed Collar' },
        { top: '38%', left: '26%', text: 'Mineral Acid Patina' },
        { top: '65%', left: '70%', text: 'Slouchy Drop Elbow' }
      ],
      categoryFilter: 'acid-wash'
    },
    {
      id: 'fit-titan',
      name: '300 GSM ULTRA-WEIGHT ARMOR',
      tagline: 'The Heaviest Oversized T-Shirt in India',
      gsm: 300,
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85',
      specs: [
        { label: 'WEIGHT', value: '300 GSM', desc: 'Substantial armor-like cotton weight' },
        { label: 'CONTOURING', value: 'SQUARED BOX', desc: 'Zero body clinging or outline transparency' },
        { label: 'STITCHING', value: 'TWIN NEEDLE', desc: 'Industrial durability on every seam' },
        { label: 'LONGEVITY', value: 'LIFETIME FIT', desc: 'Guaranteed zero shrinkage or deformation' }
      ],
      visualHighlights: [
        { top: '16%', left: '46%', text: 'Double-Thick Collar' },
        { top: '42%', left: '24%', text: '300 GSM Heavy Armor' },
        { top: '80%', left: '55%', text: 'Twin-Stitched Hem' }
      ],
      categoryFilter: 'heavyweight-280'
    },
    {
      id: 'fit-boyfriend',
      name: '240 GSM BOYFRIEND SLOUCH',
      tagline: 'Women’s Oversized Architectural Silhouette',
      gsm: 240,
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
      specs: [
        { label: 'FABRICATION', value: 'MODAL-COTTON', desc: 'Buttery smooth tactile touch with sheen' },
        { label: 'SLEEVE STYLE', value: 'ROLL-FRIENDLY', desc: 'Designed to wear straight or folded' },
        { label: 'COLLAR OPENING', value: 'SOFT CREW', desc: 'Flattering balance across collarbones' },
        { label: 'LENGTH', value: 'MID-THIGH', desc: 'Versatile styling for pants or bike shorts' }
      ],
      visualHighlights: [
        { top: '22%', left: '48%', text: 'Soft Drape Crew' },
        { top: '35%', left: '72%', text: 'Dropped Sleeve' },
        { top: '78%', left: '35%', text: 'Extended Hem' }
      ],
      categoryFilter: 'women-oversized'
    }
  ];

  const currentMode = fitModes[activeModeIndex];

  const handleExploreSilhouette = () => {
    setActiveFilter(currentMode.categoryFilter);
    scrollToShop();
  };

  return (
    <section className="py-16 sm:py-24 bg-[#050505] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="text-[10px] sm:text-xs font-mono-tech uppercase tracking-[0.25em] text-neutral-400 mb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>INTERACTIVE SILHOUETTE LAB</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white">
              THE OVERSIZED FIT ANATOMY
            </h2>
          </div>
          <p className="text-xs font-mono-tech text-neutral-400 max-w-sm uppercase tracking-wider">
            Explore how our proprietary drop-shoulder cuts create the international runway silhouette.
          </p>
        </div>

        {/* Interactive Fit Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-10">
          {fitModes.map((mode, idx) => (
            <button
              key={mode.id}
              onClick={() => setActiveModeIndex(idx)}
              className={`p-3 sm:p-4 border text-left transition-all duration-300 relative ${
                activeModeIndex === idx
                  ? 'border-white bg-white text-black shadow-2xl'
                  : 'border-white/15 bg-[#0D0D0D] text-neutral-400 hover:border-white/50 hover:text-white'
              }`}
            >
              <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono-tech uppercase mb-1">
                <span>0{idx + 1} / CUT</span>
                <span className={`px-1 sm:px-1.5 py-0.2 border ${activeModeIndex === idx ? 'border-black text-black font-bold' : 'border-white/20 text-neutral-400'}`}>
                  {mode.gsm}G
                </span>
              </div>
              <h3 className="font-display font-black text-xs sm:text-sm uppercase tracking-wider line-clamp-1">
                {mode.name}
              </h3>
            </button>
          ))}
        </div>

        {/* Animated Visualizer Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-[#0D0D0D] border border-white/15 p-4 sm:p-8 lg:p-10">
          {/* Left: Model Visual with Animated Hotspot Indicators (6 cols) */}
          <div className="lg:col-span-6 relative aspect-[3/4] bg-[#141414] border border-white/10 overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentMode.id}
                src={currentMode.image}
                alt={currentMode.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full h-full object-cover grayscale contrast-125 select-none"
              />
            </AnimatePresence>

            {/* Dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Animated Pin Callouts */}
            {currentMode.visualHighlights.map((hl, i) => (
              <motion.div
                key={`${currentMode.id}-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.15, type: 'spring' }}
                style={{ top: hl.top, left: hl.left }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              >
                <div className="group/pin relative flex items-center">
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white text-black flex items-center justify-center font-bold text-[8px] sm:text-[9px] shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                    +
                  </div>
                  <span className="ml-1.5 sm:ml-2 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-black/90 backdrop-blur-md border border-white/30 text-[8px] sm:text-[10px] font-mono-tech text-white uppercase tracking-wider whitespace-nowrap shadow-xl">
                    {hl.text}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Corner Live Stamp */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 bg-black/80 backdrop-blur-md px-2.5 py-1 border border-white/20 text-[9px] sm:text-[10px] font-mono-tech uppercase tracking-widest text-neutral-300">
              {currentMode.gsm} GSM • SPEC
            </div>
          </div>

          {/* Right: Technical Specs & Dimension Breakdown (6 cols) */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-5 sm:space-y-6"
              >
                <div>
                  <span className="text-[11px] sm:text-xs font-mono-tech uppercase tracking-[0.2em] text-neutral-400">
                    {currentMode.tagline}
                  </span>
                  <h3 className="text-xl sm:text-3xl lg:text-4xl font-display font-black uppercase tracking-tight text-white mt-1">
                    {currentMode.name}
                  </h3>
                </div>

                {/* 4 Precision Spec Blocks */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  {currentMode.specs.map((spec, i) => (
                    <div key={i} className="p-3 sm:p-4 bg-white/[0.03] border border-white/10">
                      <span className="text-[9px] sm:text-[10px] font-mono-tech uppercase tracking-widest text-neutral-400 block mb-0.5">
                        {spec.label}
                      </span>
                      <span className="text-sm sm:text-lg font-display font-bold text-white block">
                        {spec.value}
                      </span>
                      <p className="text-[10px] sm:text-[11px] font-mono-tech text-neutral-400 mt-1 line-clamp-2">
                        {spec.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Guarantee Banner */}
                <div className="p-3 sm:p-4 bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-black flex items-center justify-center shrink-0 font-bold text-xs">
                    ✓
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono-tech text-neutral-300">
                    <span className="text-white font-bold block">100% ZERO COLLAR SAG GUARANTEE</span>
                    Pre-shrunk, bio-washed, and engineered to retain its boxy geometry wash after wash.
                  </div>
                </div>

                {/* CTA */}
                <div>
                  <button
                    onClick={handleExploreSilhouette}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-mono-tech text-xs uppercase tracking-[0.25em] font-bold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3 active:scale-98"
                  >
                    <span>SHOP THIS OVERSIZED CUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
