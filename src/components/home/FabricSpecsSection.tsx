import React from 'react';
import { Shield, Sparkles, Feather, Scissors, CheckCircle, RefreshCw } from 'lucide-react';

export const FabricSpecsSection: React.FC = () => {
  const specs = [
    {
      num: '01',
      title: '280 GSM FRENCH TERRY',
      subtitle: 'PROPRIETARY HEAVYWEIGHT KNIT',
      description: 'Crafted from 100% combed long-staple cotton, loop-backed for maximum breathability while holding an uncompromising structured drape.'
    },
    {
      num: '02',
      title: '1.25" REINFORCED RIB COLLAR',
      subtitle: 'ZERO COLLAR SAG GUARANTEE',
      description: 'Engineered with double-needle spandex-reinforced threading. Stays flat, crisp and tight against the neckline through 50+ wash cycles.'
    },
    {
      num: '03',
      title: 'FORWARD DROP-SHOULDER PITCH',
      subtitle: 'STREETWEAR ARCHITECTURAL DRAPE',
      description: 'Shoulder seams are rotated 1.5 inches forward to eliminate shoulder bunching and create the iconic boxy high-street contour.'
    },
    {
      num: '04',
      title: 'BIO-WASHED & PRE-SHRUNK',
      subtitle: 'ZERO SHRINKAGE OR TORQUE',
      description: 'Every roll of fabric undergoes specialized eco-enzyme washing to eliminate micro-fuzz, deliver buttery handfeel, and lock dimensions.'
    }
  ];

  return (
    <section className="py-24 bg-[#090909] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono-tech uppercase tracking-[0.3em] text-neutral-400 mb-2 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>FABRIC LAB & PRECISION METRICS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            OBSESSIVE ENGINEERING.
          </h2>
          <p className="text-sm text-neutral-400 font-mono-tech mt-3 uppercase tracking-wider">
            Why our t-shirts feel substantially different from anything else in your wardrobe.
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((s) => (
            <div
              key={s.num}
              className="p-8 bg-[#111111] border border-white/10 hover:border-white transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="font-display text-4xl font-black text-neutral-700 group-hover:text-white transition-colors">
                  {s.num}
                </span>
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-400 block mt-4">
                  {s.subtitle}
                </span>
                <h3 className="text-lg font-display font-bold uppercase tracking-tight text-white mt-1">
                  {s.title}
                </h3>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

