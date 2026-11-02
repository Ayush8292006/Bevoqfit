import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';
import { OversizedSubCategory } from '../../types';

export const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const {
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setActiveFilter,
    scrollToShop,
    showToast
  } = useUI();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (category?: 'all' | OversizedSubCategory) => {
    if (category) {
      setActiveFilter(category);
    }
    scrollToShop();
  };

  const navLinks: { label: string; action: () => void }[] = [
    { label: 'HOME', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: '280 GSM HEAVYWEIGHT', action: () => handleNavClick('heavyweight-280') },
    { label: 'ACID WASH', action: () => handleNavClick('acid-wash') },
    { label: 'ARCHIVAL GRAPHIC', action: () => handleNavClick('archival-graphic') },
    { label: 'MINIMAL ESSENTIAL', action: () => handleNavClick('minimal-essential') },
    { label: "WOMEN'S BOYFRIEND", action: () => handleNavClick('women-oversized') },
  ];

  return (
    <header
      className={`hidden lg:block sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080808]/92 backdrop-blur-md border-b border-white/10 shadow-lg py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex flex-col items-start focus:outline-none"
            >
              <span className="font-display text-2xl sm:text-3xl font-black tracking-widest text-white transition-all duration-300 group-hover:tracking-[0.18em]">
                BEVOQFIT
              </span>
              <span className="text-[8px] font-mono-tech tracking-[0.3em] text-neutral-400 group-hover:text-white transition-colors">
                OVERSIZED T-SHIRT ARCHIVE
              </span>
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="relative text-xs uppercase tracking-[0.18em] font-medium text-neutral-300 hover:text-white transition-colors duration-200 py-1 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-neutral-300 hover:text-white transition-colors relative"
              aria-label="Search collection"
              title="Search Oversized Tees (Cmd+K)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account / VIP Club */}
            <button
              onClick={() => showToast('BEVOQ VIP: Sign in coming with Drop 02', 'info')}
              className="p-2 text-neutral-300 hover:text-white transition-colors"
              aria-label="Account profile"
              title="Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-neutral-300 hover:text-white transition-colors relative"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {totalWishlist > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white text-black text-[9px] font-mono-tech font-bold flex items-center justify-center animate-scale-in">
                  {totalWishlist}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-neutral-300 hover:text-white transition-colors relative flex items-center gap-2 group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-105" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white text-black text-[9px] font-mono-tech font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-xs font-mono-tech tracking-wider text-neutral-300 group-hover:text-white">
                BAG
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
