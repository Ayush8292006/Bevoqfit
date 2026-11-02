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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
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
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
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
            <nav className="hidden xl:flex items-center space-x-6">
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
                className="hidden sm:block p-2 text-neutral-300 hover:text-white transition-colors"
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
                <span className="hidden xl:inline text-xs font-mono-tech tracking-wider text-neutral-300 group-hover:text-white">
                  BAG
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-neutral-300 hover:text-white focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden fixed inset-x-0 top-[70px] z-40 bg-[#0A0A0A] border-b border-white/10 px-6 py-8 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={link.action}
                  className="flex items-center justify-between text-left text-base font-display font-bold uppercase tracking-wider text-neutral-200 hover:text-white border-b border-white/5 pb-3"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500" />
                </motion.button>
              ))}

              <div className="pt-4 flex flex-col gap-3 font-mono-tech text-xs text-neutral-400">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="flex items-center gap-3 py-2 text-left hover:text-white"
                >
                  <Search className="w-4 h-4" />
                  <span>SEARCH OVERSIZED TEES</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  className="flex items-center gap-3 py-2 text-left hover:text-white"
                >
                  <Heart className="w-4 h-4" />
                  <span>SAVED WISHLIST ({totalWishlist})</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
