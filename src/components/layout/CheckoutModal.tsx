import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Lock, Truck, CreditCard, Smartphone, Banknote } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';

export const CheckoutModal: React.FC = () => {
  const { items, subtotal, shipping, finalTotal, clearCart } = useCart();
  const { isCheckoutOpen, setIsCheckoutOpen, showToast } = useUI();

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  // Form State
  const [form, setForm] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.s@example.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Skyline Residency, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase().trim() === 'ATTITUDE10') {
      const discountAmount = Math.round(subtotal * 0.1);
      setDiscount(discountAmount);
      setCouponApplied(true);
      showToast('Code ATTITUDE10 applied: 10% discount saved!');
    } else {
      showToast('Invalid promo code. Try ATTITUDE10', 'error');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const randomId = 'BVQ-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(randomId);
      setIsSubmitting(false);
      setOrderConfirmed(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#a1a1a1', '#555555']
        });
      } catch (err) {
        console.error(err);
      }

      clearCart();
    }, 1200);
  };

  const grandTotal = Math.max(0, finalTotal - discount);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9997] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !orderConfirmed && setIsCheckoutOpen(false)}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#0D0D0D] border border-white/20 z-10 text-white max-h-[92vh] overflow-y-auto"
        >
          {/* Top header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#121212]">
            <div className="flex items-center gap-3">
              <span className="font-display text-xl font-black tracking-widest uppercase">
                BEVOQFIT
              </span>
              <span className="text-xs font-mono-tech text-neutral-400">
                / SECURE CHECKOUT
              </span>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 border border-white/10 hover:border-white transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {orderConfirmed ? (
            /* Order Confirmed View */
            <div className="p-8 md:p-12 text-center max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <span className="text-xs font-mono-tech text-neutral-400 uppercase tracking-widest">
                ORDER CONFIRMED • PROTOTYPE
              </span>

              <h2 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight mt-2 text-white">
                WEAR YOUR ATTITUDE.
              </h2>

              <p className="text-sm font-mono-tech text-neutral-300 mt-4 leading-relaxed">
                Thank you, <span className="text-white font-bold">{form.name}</span>! Your order has been placed successfully in our prototype system.
              </p>

              {/* Order Ticket Details */}
              <div className="my-6 p-6 bg-white/5 border border-white/15 text-left font-mono-tech text-xs space-y-3">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-neutral-400">ORDER NUMBER:</span>
                  <span className="text-white font-bold">{orderId}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-neutral-400">ESTIMATED DISPATCH:</span>
                  <span className="text-white font-bold">Within 24 Hours</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-neutral-400">DELIVERY DESTINATION:</span>
                  <span className="text-white truncate max-w-[200px]">{form.city}, {form.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">AMOUNT PAID:</span>
                  <span className="text-emerald-400 font-bold">₹{grandTotal.toLocaleString('en-IN')} via {paymentMethod.toUpperCase()}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-8 py-3.5 bg-white text-black font-mono-tech font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                >
                  RETURN TO STORE
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8">
              {/* Left Column: Form Details (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-xs font-mono-tech uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-white" /> 1. SHIPPING ADDRESS
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-tech">
                    <div className="sm:col-span-2">
                      <label className="block text-neutral-400 mb-1">FULL NAME</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#181818] border border-white/15 px-3 py-2.5 text-white focus:outline-none focus:border-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#181818] border border-white/15 px-3 py-2.5 text-white focus:outline-none focus:border-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">MOBILE NUMBER</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-[#181818] border border-white/15 px-3 py-2.5 text-white focus:outline-none focus:border-white"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-neutral-400 mb-1">STREET ADDRESS & APARTMENT</label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="w-full bg-[#181818] border border-white/15 px-3 py-2.5 text-white focus:outline-none focus:border-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">CITY</label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full bg-[#181818] border border-white/15 px-3 py-2.5 text-white focus:outline-none focus:border-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">PIN CODE</label>
                      <input
                        type="text"
                        value={form.pincode}
                        onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                        className="w-full bg-[#181818] border border-white/15 px-3 py-2.5 text-white focus:outline-none focus:border-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-xs font-mono-tech uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-white" /> 2. PAYMENT METHOD
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 border text-left flex flex-col justify-between transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-white bg-white/10'
                          : 'border-white/10 hover:border-white/30 bg-[#161616]'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 mb-2" />
                      <span className="text-[11px] font-mono-tech font-bold uppercase">UPI / QR</span>
                      <span className="text-[9px] text-neutral-400">GPay, PhonePe, Paytm</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 border text-left flex flex-col justify-between transition-all ${
                        paymentMethod === 'card'
                          ? 'border-white bg-white/10'
                          : 'border-white/10 hover:border-white/30 bg-[#161616]'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mb-2" />
                      <span className="text-[11px] font-mono-tech font-bold uppercase">CARDS</span>
                      <span className="text-[9px] text-neutral-400">Visa, Mastercard</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 border text-left flex flex-col justify-between transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-white bg-white/10'
                          : 'border-white/10 hover:border-white/30 bg-[#161616]'
                      }`}
                    >
                      <Banknote className="w-5 h-5 mb-2" />
                      <span className="text-[11px] font-mono-tech font-bold uppercase">CASH ON DEL</span>
                      <span className="text-[9px] text-neutral-400">Pay at doorstep</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary (5 cols) */}
              <div className="lg:col-span-5 bg-[#141414] p-6 border border-white/10 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-mono-tech uppercase tracking-widest text-neutral-400 pb-3 border-b border-white/10">
                    ORDER SUMMARY ({items.length} ITEMS)
                  </h3>

                  {/* Items list preview */}
                  <div className="max-h-52 overflow-y-auto divide-y divide-white/10 my-4 pr-1">
                    {items.map((i) => (
                      <div key={i.id} className="py-2.5 flex items-center gap-3 text-xs">
                        <img
                          src={i.product.images[0]}
                          alt={i.product.name}
                          className="w-12 h-14 object-cover grayscale contrast-125 border border-white/10 shrink-0"
                        />
                        <div className="flex-1 truncate">
                          <p className="font-bold text-white uppercase truncate">{i.product.name}</p>
                          <p className="text-[10px] font-mono-tech text-neutral-400">
                            SIZE: {i.selectedSize} • QTY: {i.quantity}
                          </p>
                        </div>
                        <span className="font-mono-tech text-white shrink-0 font-bold">
                          ₹{(i.product.price * i.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Promo code form */}
                  <form onSubmit={handleApplyCoupon} className="pt-2 pb-4 border-t border-white/10">
                    <label className="block text-[10px] font-mono-tech uppercase text-neutral-400 mb-1.5">
                      PROMO CODE
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="e.g. ATTITUDE10"
                        disabled={couponApplied}
                        className="flex-1 bg-[#1C1C1C] border border-white/20 px-3 py-2 text-xs font-mono-tech uppercase text-white focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={couponApplied || !couponCode}
                        className="px-4 py-2 bg-white text-black font-mono-tech text-xs uppercase font-bold disabled:opacity-40 hover:bg-neutral-200"
                      >
                        {couponApplied ? 'APPLIED' : 'APPLY'}
                      </button>
                    </div>
                  </form>

                  {/* Price Totals */}
                  <div className="space-y-2 text-xs font-mono-tech border-t border-white/10 pt-4">
                    <div className="flex justify-between text-neutral-400">
                      <span>BAG SUBTOTAL</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>ATTITUDE10 (10% OFF)</span>
                        <span>-₹{discount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-neutral-400">
                      <span>SHIPPING</span>
                      <span>{shipping === 0 ? <span className="text-emerald-400">FREE</span> : `₹${shipping}`}</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-base pt-3 border-t border-white/10">
                      <span>TOTAL PAYABLE</span>
                      <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting || items.length === 0}
                    className="w-full py-4 bg-white text-black font-mono-tech font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        PROCESSING SECURE ORDER...
                      </span>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>PLACE DEMO ORDER (₹{grandTotal.toLocaleString('en-IN')})</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] font-mono-tech text-neutral-500 text-center mt-3">
                    Demonstrative front-end prototype. No actual money will be charged.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

