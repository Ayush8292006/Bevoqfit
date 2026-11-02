import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#050505] border-b border-white/10 text-neutral-300 py-2 px-4 text-[11px] font-mono-tech tracking-widest uppercase overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2 text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
          <span>AUTUMN/WINTER '26 CAPSULE</span>
        </div>

        <div className="flex-1 text-center truncate px-2">
          <span className="text-white font-medium">COMPLIMENTARY SHIPPING</span> ON ORDERS ABOVE ₹1,999 • USE CODE <span className="text-white font-bold underline underline-offset-2">ATTITUDE10</span> FOR 10% OFF
        </div>

        <div className="hidden md:flex items-center gap-3 text-neutral-400">
          <span>INDIA WIDE EXPRESS DISPATCH</span>
        </div>
      </div>
    </div>
  );
};

