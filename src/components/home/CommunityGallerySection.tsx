import React from 'react';
import { Instagram, Heart, ArrowUpRight } from 'lucide-react';
import { COMMUNITY_POSTS } from '../../data/products';

export const CommunityGallerySection: React.FC = () => {
  return (
    <section className="py-10 lg:py-24 bg-[#080808] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 lg:gap-4 mb-6 lg:mb-12">
          <div>
            <div className="text-xs font-mono-tech uppercase tracking-[0.3em] text-neutral-400 mb-2 flex items-center gap-2">
              <Instagram className="w-4 h-4 text-white" />
              <span>COMMUNITY FIT CHECKS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
              #WEARYOURATTITUDE
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
          >
            <span>TAG @BEVOQFIT TO BE FEATURED</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 6-Grid Editorial Community Cards */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-1 sm:gap-4 -mx-4 sm:mx-0">
          {COMMUNITY_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square sm:aspect-[3/4] bg-[#141414] border-0 sm:border border-white/10 overflow-hidden cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-110 group-hover:contrast-150 transition-all duration-500"
              />

              {/* Hover overlay with handle & likes */}
              <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5">
                <div className="flex justify-between items-center text-[10px] font-mono-tech text-neutral-400">
                  <span className="text-white font-bold">{post.handle}</span>
                  <span className="flex items-center gap-1 text-red-400">
                    <Heart className="w-3 h-3 fill-current" />
                    {post.likes}
                  </span>
                </div>

                <div className="text-left">
                  <span className="px-2 py-0.5 bg-white text-black text-[8px] font-mono-tech font-bold uppercase block mb-1">
                    {post.productTag}
                  </span>
                  <p className="text-[10px] text-neutral-300 font-sans line-clamp-2">
                    {post.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

