import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Mail } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useUI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribed(true);
    showToast('Subscribed! Promo code ATTITUDE10 unlocked for 10% off.');
  };

  return (
    <section className="py-10 lg:py-24 bg-[#080808] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-6 text-neutral-300">
          <Mail className="w-5 h-5" />
        </div>

        <div className="text-xs font-mono-tech uppercase tracking-[0.3em] text-neutral-400 mb-2">
          JOIN THE INNER CIRCLE
        </div>

        <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
          NEVER MISS A DROP.
        </h2>

        <p className="text-sm text-neutral-400 font-mono-tech max-w-md mx-auto mt-4 leading-relaxed">
          Be the first to access limited monochrome drops, secret capsule releases, and private runway previews.
        </p>

        {isSubscribed ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-white/5 border border-white/20 max-w-md mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-2 text-white font-mono-tech font-bold text-sm mb-1">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>YOU ARE ON THE LIST</span>
            </div>
            <p className="text-xs font-mono-tech text-neutral-400 mt-1">
              Use code <span className="text-white font-bold underline">ATTITUDE10</span> at checkout for 10% off your first order.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER YOUR EMAIL..."
              required
              className="flex-1 bg-[#141414] border border-white/20 px-4 py-3.5 text-xs font-mono-tech uppercase text-white placeholder-neutral-500 focus:outline-none focus:border-white tracking-wider"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-white text-black font-mono-tech font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <span>JOIN NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[10px] font-mono-tech text-neutral-600 mt-4 uppercase tracking-widest">
          NO SPAM. ONLY PURE CURATED ARCHIVAL DROPS. UNSUBSCRIBE ANYTIME.
        </p>
      </div>
    </section>
  );
};

