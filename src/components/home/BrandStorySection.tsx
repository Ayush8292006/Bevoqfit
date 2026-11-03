import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckSquare, Layers, ShieldCheck } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const BrandStorySection: React.FC = () => {
  const { scrollToShop } = useUI();

  return (
    <section className="py-10 lg:py-24 bg-[#0A0A0A] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center">
          {/* Left: Large Editorial Campaign Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[4/5] w-full bg-[#141414] border border-white/15 overflow-hidden group rounded-3xl lg:rounded-none">
              {/* Real authentic monochrome streetwear editorial photography */}
              <img
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1400&q=85"
                alt="BEVOQFIT Brand Story Campaign Model"
                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Film negative aesthetic stamp */}
              <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/20 text-[10px] font-mono-tech text-white uppercase tracking-widest">
                BEVOQFIT // ARCHIVE 01
              </div>

              <div className="absolute bottom-4 right-4 z-10 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/20 text-[10px] font-mono-tech text-neutral-400 uppercase tracking-widest">
                RAW BLACK & WHITE
              </div>
            </div>

            {/* Overlapping Floating Badge */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-white text-black p-6 shadow-2xl border border-white max-w-[220px]">
              <span className="block text-2xl font-display font-black tracking-tight">100%</span>
              <span className="text-[11px] font-mono-tech uppercase font-bold tracking-wider leading-tight block mt-1">
                COMBED LONG-STAPLE COTTON & ZERO SAG COLLARS
              </span>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8">
            <div>
              <div className="text-xs font-mono-tech uppercase tracking-[0.3em] text-neutral-400 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>THE PHILOSOPHY</span>
              </div>

              {/* Exact Prompt Headline */}
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white leading-tight">
                BUILT FOR EVERYDAY.<br />
                <span className="text-stroke-white text-white/90">DESIGNED TO STAND OUT.</span>
              </h2>

              {/* Exact Prompt Supporting Copy */}
              <p className="text-sm sm:text-lg text-neutral-300 font-sans leading-relaxed mt-4 lg:mt-6">
                BEVOQFIT is about more than what you wear. It's about how you express yourself. Clean silhouettes, effortless fits, and everyday essentials designed for people who define their own style.
              </p>
            </div>

            {/* Quality Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 font-mono-tech text-xs">
              <div className="p-4 bg-white/[0.02] border border-white/10">
                <span className="text-white font-bold block uppercase text-sm mb-1">01 / HEAVYWEIGHT 280 GSM</span>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Substantial luxury French Terry with structured drop shoulders that never cling or lose drape.
                </p>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/10">
                <span className="text-white font-bold block uppercase text-sm mb-1">02 / ZERO TORQUE SEAMS</span>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Bio-polished and preshrunk so side seams remain parallel wash after wash.
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={scrollToShop}
                className="w-full sm:w-auto justify-center rounded-full lg:rounded-none px-8 py-4 bg-white text-black font-mono-tech text-xs uppercase tracking-[0.2em] font-bold hover:bg-neutral-200 active:scale-[0.98] transition flex items-center gap-3"
              >
                <span>EXPERIENCE THE FIT</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

