import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, OversizedSubCategory } from '../types';

export interface ToastData {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface UIContextType {
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  activeFilter: 'all' | OversizedSubCategory;
  setActiveFilter: (filter: 'all' | OversizedSubCategory) => void;
  selectedGsm: number | 'all';
  setSelectedGsm: (gsm: number | 'all') => void;
  toasts: ToastData[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
  showIntro: boolean;
  replayIntro: () => void;
  finishIntro: () => void;
  scrollToShop: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | OversizedSubCategory>('all');
  const [selectedGsm, setSelectedGsm] = useState<number | 'all'>('all');
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // Cinematic Intro state
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      const seen = sessionStorage.getItem('bevoqfit_intro_seen');
      return !seen;
    } catch {
      return true;
    }
  });

  const finishIntro = () => {
    try {
      sessionStorage.setItem('bevoqfit_intro_seen', 'true');
    } catch (e) {
      console.error(e);
    }
    setShowIntro(false);
  };

  const replayIntro = () => {
    setShowIntro(true);
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      dismissToast(id);
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const scrollToShop = () => {
    const element = document.getElementById('shop-collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const anyModalOpen =
      isCartOpen ||
      isWishlistOpen ||
      isSearchOpen ||
      isSizeGuideOpen ||
      isCheckoutOpen ||
      Boolean(selectedProduct) ||
      showIntro;

    if (anyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [
    isCartOpen,
    isWishlistOpen,
    isSearchOpen,
    isSizeGuideOpen,
    isCheckoutOpen,
    selectedProduct,
    showIntro
  ]);

  return (
    <UIContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProduct,
        openProductModal,
        closeProductModal,
        activeFilter,
        setActiveFilter,
        selectedGsm,
        setSelectedGsm,
        toasts,
        showToast,
        dismissToast,
        showIntro,
        replayIntro,
        finishIntro,
        scrollToShop
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
