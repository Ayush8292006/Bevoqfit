import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile';
import { X, Ruler, HelpCircle } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const SizeGuideModal: React.FC = () => {
  const isMobile = useIsMobile();
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useUI();
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [tab, setTab] = useState<'oversized' | 'regular'>('oversized');

  if (!isSizeGuideOpen) return null;

  const oversizedData = [
    { size: 'S', chestIn: '44"', chestCm: '112', lengthIn: '29"', lengthCm: '74', shoulderIn: '21.5"', shoulderCm: '55' },
    { size: 'M', chestIn: '46"', chestCm: '117', lengthIn: '30"', lengthCm: '76', shoulderIn: '22.5"', shoulderCm: '57' },
    { size: 'L', chestIn: '48"', chestCm: '122', lengthIn: '31"', lengthCm: '79', shoulderIn: '23.5"', shoulderCm: '60' },
    { size: 'XL', chestIn: '50"', chestCm: '127', lengthIn: '32"', lengthCm: '81', shoulderIn: '24.5"', shoulderCm: '62' },
    { size: 'XXL', chestIn: '52"', chestCm: '132', lengthIn: '33"', lengthCm: '84', shoulderIn: '25.5"', shoulderCm: '65' },
  ];

  const regularData = [
    { size: 'S', chestIn: '38"', chestCm: '96', lengthIn: '27.5"', lengthCm: '70', shoulderIn: '17.5"', shoulderCm: '44' },
    { size: 'M', chestIn: '40"', chestCm: '102', lengthIn: '28.5"', lengthCm: '72', shoulderIn: '18.5"', shoulderCm: '47' },
    { size: 'L', chestIn: '42"', chestCm: '107', lengthIn: '29.5"', lengthCm: '75', shoulderIn: '19.5"', shoulderCm: '49' },
    { size: 'XL', chestIn: '44"', chestCm: '112', lengthIn: '30.5"', lengthCm: '77', shoulderIn: '20.5"', shoulderCm: '52' },
    { size: 'XXL', chestIn: '46"', chestCm: '117', lengthIn: '31.5"', lengthCm: '80', shoulderIn: '21.5"', shoulderCm: '54' },
  ];

  const currentData = tab === 'oversized' ? oversizedData : regularData;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9995] flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSizeGuideOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0F0F0F] border-t sm:border border-white/20 rounded-t-[28px] sm:rounded-none p-5 md:p-8 z-10 text-white max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 font-mono-tech">
                <Ruler className="w-3.5 h-3.5" />
                <span>Precision Measurements</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight mt-1">
                Size & Fit Guide
              </h2>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="p-2 border border-white/10 hover:border-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fit Toggle Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="flex border border-white/20 p-1 bg-black/50">
              <button
                onClick={() => setTab('oversized')}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all ${
                  tab === 'oversized' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Oversized Cut
              </button>
              <button
                onClick={() => setTab('regular')}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all ${
                  tab === 'regular' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Tailored Regular Fit
              </button>
            </div>

            {/* Units Toggle */}
            <div className="flex items-center gap-2 text-xs font-mono-tech text-neutral-400">
              <span>UNIT:</span>
              <button
                onClick={() => setUnit('in')}
                className={`px-2 py-1 border transition-colors ${
                  unit === 'in' ? 'border-white text-white font-bold' : 'border-white/20 text-neutral-500'
                }`}
              >
                INCHES
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-2 py-1 border transition-colors ${
                  unit === 'cm' ? 'border-white text-white font-bold' : 'border-white/20 text-neutral-500'
                }`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Measurements Table */}
          <div className="mt-6 border border-white/15 overflow-x-auto">
            <table className="w-full text-left text-sm font-mono-tech">
              <thead className="bg-[#181818] border-b border-white/15 text-xs text-neutral-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Chest ({unit})</th>
                  <th className="py-3 px-4">Length ({unit})</th>
                  <th className="py-3 px-4">Shoulder Drop ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {currentData.map((row) => (
                  <tr key={row.size} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-bold text-white">{row.size}</td>
                    <td className="py-3 px-4 text-neutral-300">
                      {unit === 'in' ? row.chestIn : `${row.chestCm} cm`}
                    </td>
                    <td className="py-3 px-4 text-neutral-300">
                      {unit === 'in' ? row.lengthIn : `${row.lengthCm} cm`}
                    </td>
                    <td className="py-3 px-4 text-neutral-300">
                      {unit === 'in' ? row.shoulderIn : `${row.shoulderCm} cm`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pro Sizing Recommendation */}
          <div className="mt-6 p-4 bg-white/5 border border-white/10 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
            <div className="text-xs text-neutral-300 leading-relaxed font-sans">
              <p className="font-semibold text-white uppercase tracking-wider mb-1">
                Recommendation for {tab === 'oversized' ? 'Oversized Tees' : 'Regular Fits'}
              </p>
              {tab === 'oversized' ? (
                <p>
                  Our oversized t-shirts are intentionally engineered with a 2-3 inch drop shoulder and boxy drape. Stick to your usual size for the authentic runway streetwear silhouette. Size down only if you prefer a less voluminous fit.
                </p>
              ) : (
                <p>
                  Our regular fit tees are sculpted around the shoulders and arms while keeping a relaxed drape through the chest and waist. True to international sizing.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

