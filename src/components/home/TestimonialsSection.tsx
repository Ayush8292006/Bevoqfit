import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../../data/products';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-10 lg:py-24 bg-[#0A0A0A] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left md:text-center max-w-2xl mx-auto mb-6 lg:mb-16">
          <div className="text-xs font-mono-tech uppercase tracking-[0.3em] text-neutral-400 mb-2 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>VERIFIED BUYER EXPERIENCES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            THE STREET VERDICT
          </h2>
        </div>

        {/* 3 Review Cards */}
        <div className="snap-row gap-3 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="w-[85%] sm:w-[60%] md:w-auto shrink-0 rounded-3xl md:rounded-none p-6 md:p-8 bg-[#121212] border border-white/10 hover:border-white/40 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-white mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-white" />
                  ))}
                </div>

                <h3 className="text-base font-display font-bold uppercase tracking-tight text-white mb-3">
                  "{rev.title}"
                </h3>

                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono-tech">
                  <div>
                    <span className="font-bold text-white block">{rev.author}</span>
                    <span className="text-[10px] text-neutral-500">{rev.location}</span>
                  </div>
                  {rev.verifiedBuyer && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5">
                      <CheckCircle className="w-3 h-3" /> VERIFIED
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono-tech text-neutral-400 block mt-2">
                  GARMENT: {rev.productName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

