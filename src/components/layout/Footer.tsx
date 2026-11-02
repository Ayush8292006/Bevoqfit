import React from 'react';
import { ArrowUpRight, Instagram, Twitter, Youtube, RefreshCw, Shield, MapPin, Globe } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const Footer: React.FC = () => {
  const { replayIntro, scrollToShop, setActiveFilter, showToast } = useUI();

  return (
    <footer className="bg-[#050505] border-t border-white/10 text-white pt-16 pb-12 overflow-hidden">
      {/* Upper Brand Statement Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-16 border-b border-white/10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="text-xs font-mono-tech tracking-[0.3em] uppercase text-neutral-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>THE OVERSIZED CREED</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight text-white leading-none">
              OWN YOUR FIT.<br />
              <span className="text-neutral-500">DEFINE YOUR STYLE.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={replayIntro}
              className="flex items-center gap-2 px-5 py-3 border border-white/20 text-xs font-mono-tech uppercase tracking-widest text-neutral-300 hover:text-white hover:border-white transition-all bg-white/[0.02]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>REPLAY BRAND INTRO</span>
            </button>
            <button
              onClick={scrollToShop}
              className="px-6 py-3 bg-white text-black text-xs font-mono-tech uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors"
            >
              EXPLORE OVERSIZED ARCHIVE
            </button>
          </div>
        </div>

        {/* 4-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <span className="font-display text-xl font-black tracking-widest">BEVOQFIT</span>
            <p className="text-xs font-mono-tech text-neutral-400 leading-relaxed max-w-xs">
              House of luxury heavy oversized t-shirts. 280–300 GSM French Terry, forward-pitched drop shoulders, and reinforced stay-tight collars.
            </p>
            <div className="text-[11px] font-mono-tech text-neutral-500 flex items-center gap-2 pt-2">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span>MUMBAI • TOKYO • NEW DELHI</span>
            </div>
          </div>

          {/* Col 2: Collections */}
          <div>
            <h4 className="text-xs font-mono-tech uppercase tracking-widest text-neutral-400 mb-4 font-bold">
              OVERSIZED DROPS
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-tech text-neutral-400">
              <li>
                <button
                  onClick={() => {
                    setActiveFilter('heavyweight-280');
                    scrollToShop();
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>280 GSM Heavyweight Tees</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveFilter('acid-wash');
                    scrollToShop();
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Acid & Mineral Wash Drops</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveFilter('archival-graphic');
                    scrollToShop();
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>3D Archival Puff Graphics</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveFilter('women-oversized');
                    scrollToShop();
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Women's Boyfriend Oversized</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveFilter('all');
                    scrollToShop();
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>All Oversized Silhouettes</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Brand & Culture */}
          <div>
            <h4 className="text-xs font-mono-tech uppercase tracking-widest text-neutral-400 mb-4 font-bold">
              CULTURE & CRAFT
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-tech text-neutral-400">
              <li>
                <button onClick={() => showToast('Fabric Manifesto: 100% Combed French Terry Cotton', 'info')} className="hover:text-white transition-colors">
                  Fabric Manifesto (280–300 GSM)
                </button>
              </li>
              <li>
                <button onClick={() => showToast('Lookbook Editorial 01: Available in Campaign Section', 'info')} className="hover:text-white transition-colors">
                  Lookbook Fall/Winter
                </button>
              </li>
              <li>
                <button onClick={() => showToast('Sustainability: Bio-washed, zero chemical toxic runoff', 'info')} className="hover:text-white transition-colors">
                  Responsible Production
                </button>
              </li>
              <li>
                <button onClick={() => showToast('Stockist & Tokyo Studio inquiries open', 'info')} className="hover:text-white transition-colors">
                  Flagship Store Coming 2027
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Policies */}
          <div>
            <h4 className="text-xs font-mono-tech uppercase tracking-widest text-neutral-400 mb-4 font-bold">
              CLIENT CARE
            </h4>
            <ul className="space-y-2.5 text-xs font-mono-tech text-neutral-400">
              <li>
                <button onClick={() => showToast('Track Order: Check demo tracking in your confirmation order receipt', 'info')} className="hover:text-white transition-colors">
                  Track Your Package
                </button>
              </li>
              <li>
                <button onClick={() => showToast('7-Day Hassle Free Exchanges on all unworn items with tags', 'info')} className="hover:text-white transition-colors">
                  7-Day Return & Exchange Policy
                </button>
              </li>
              <li>
                <button onClick={() => showToast('Shipping: Free above ₹1,999 across all Indian PIN codes', 'info')} className="hover:text-white transition-colors">
                  Shipping & Customs
                </button>
              </li>
              <li>
                <button onClick={() => showToast('Concierge: care@bevoqfit.com', 'info')} className="hover:text-white transition-colors">
                  Contact Concierge
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono-tech text-neutral-500">
          <div className="flex items-center gap-4">
            <span className="text-neutral-400">© 2026 BEVOQFIT INC. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-neutral-400">WEAR YOUR ATTITUDE.</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-6 text-neutral-400">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-4 h-4" />
              <span className="text-[11px]">INSTAGRAM</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Twitter className="w-4 h-4" />
              <span className="text-[11px]">TWITTER</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Youtube className="w-4 h-4" />
              <span className="text-[11px]">YOUTUBE</span>
            </a>
          </div>

          {/* Region */}
          <div className="flex items-center gap-2 text-neutral-400">
            <Globe className="w-3.5 h-3.5" />
            <span>INDIA (INR ₹)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
