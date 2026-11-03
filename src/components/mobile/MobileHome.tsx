import React, { useMemo, useRef, useState } from 'react';
import {
  Search,
  ChevronRight,
  Copy,
  Truck,
  RefreshCw,
  ShieldCheck,
  Banknote,
  Star,
  Instagram,
  SlidersHorizontal,
} from 'lucide-react';
import { PRODUCTS, LOOKBOOK_LOOKS, CUSTOMER_REVIEWS, COMMUNITY_POSTS } from '../../data/products';
import { useUI } from '../../context/UIContext';
import { OversizedSubCategory } from '../../types';
import { MobileProductCard, toTitle } from './MobileProductCard';

/* ---------- small building blocks ---------- */

const SectionHead: React.FC<{ title: string; sub?: string; action?: string; onAction?: () => void }> = ({
  title,
  sub,
  action,
  onAction,
}) => (
  <div className="mb-3 flex items-end justify-between px-4">
    <div>
      <h2 className="font-display text-[19px] font-bold leading-tight text-white">{title}</h2>
      {sub && <p className="mt-0.5 text-[12px] text-neutral-500">{sub}</p>}
    </div>
    {action && (
      <button onClick={onAction} className="flex items-center gap-0.5 text-[12px] font-semibold text-neutral-300 active:opacity-60">
        {action}
        <ChevronRight className="h-4 w-4" />
      </button>
    )}
  </div>
);

const Rail: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`snap-row gap-3 px-4 ${className}`}>{children}</div>
);

/* ---------- data ---------- */

const BANNERS = [
  {
    tag: 'NEW DROP',
    title: 'Not just clothing.\nIt’s an attitude.',
    cta: 'Shop the drop',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
    filter: 'all' as const,
  },
  {
    tag: '280 GSM',
    title: 'Heavyweight.\nZero sag. Ever.',
    cta: 'Shop heavyweight',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
    filter: 'heavyweight-280' as const,
  },
  {
    tag: 'LIMITED',
    title: 'Acid wash.\nNo two alike.',
    cta: 'Shop acid wash',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80',
    filter: 'acid-wash' as const,
  },
];

const CATEGORIES: { label: string; value: 'all' | OversizedSubCategory; image: string }[] = [
  { label: 'All', value: 'all', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=70' },
  { label: 'Heavyweight', value: 'heavyweight-280', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=70' },
  { label: 'Acid Wash', value: 'acid-wash', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=300&q=70' },
  { label: 'Graphic', value: 'archival-graphic', image: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=300&q=70' },
  { label: 'Essential', value: 'minimal-essential', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=300&q=70' },
  { label: 'Women', value: 'women-oversized', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=300&q=70' },
];

const SORTS = [
  { label: 'Popular', value: 'featured' },
  { label: 'Price ↑', value: 'price-asc' },
  { label: 'Price ↓', value: 'price-desc' },
  { label: 'Top rated', value: 'rating' },
] as const;
type SortValue = (typeof SORTS)[number]['value'];

/* ---------- screen ---------- */

export const MobileHome: React.FC = () => {
  const { setIsSearchOpen, activeFilter, setActiveFilter, scrollToShop, openProductModal, showToast } = useUI();
  const [slide, setSlide] = useState(0);
  const [sort, setSort] = useState<SortValue>('featured');
  const bannerRef = useRef<HTMLDivElement>(null);

  const onBannerScroll = () => {
    const el = bannerRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    setSlide(Math.round(el.scrollLeft / (card.offsetWidth + 12)));
  };

  const pickCategory = (v: 'all' | OversizedSubCategory) => {
    setActiveFilter(v);
    scrollToShop();
  };

  const newDrops = useMemo(() => PRODUCTS.filter((p) => p.isTrending).slice(0, 6), []);

  const grid = useMemo(() => {
    let r = activeFilter === 'all' ? [...PRODUCTS] : PRODUCTS.filter((p) => p.category === activeFilter);
    if (sort === 'price-asc') r.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') r.sort((a, b) => b.price - a.price);
    if (sort === 'rating') r.sort((a, b) => b.rating - a.rating);
    return r;
  }, [activeFilter, sort]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText('ATTITUDE10');
    } catch {
      /* clipboard may be blocked; toast still confirms the code */
    }
    showToast('Code ATTITUDE10 copied — 10% off at checkout', 'success');
  };

  return (
    <main className="pb-6">
      {/* Search bar */}
      <div className="px-4 pt-3">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex h-11 w-full items-center gap-2.5 rounded-2xl border border-white/10 bg-[#141414] px-4 text-left text-[13px] text-neutral-500 active:bg-[#1a1a1a]"
        >
          <Search className="h-[18px] w-[18px] text-neutral-400" />
          Search oversized tees, 280 GSM…
        </button>
      </div>

      {/* Hero banners */}
      <section className="pt-4">
        <div ref={bannerRef} onScroll={onBannerScroll} className="snap-row gap-3 px-4">
          {BANNERS.map((b) => (
            <button
              key={b.tag}
              onClick={() => pickCategory(b.filter)}
              className="relative aspect-[5/6] w-[86%] shrink-0 overflow-hidden rounded-[26px] bg-[#151515] text-left active:scale-[0.99] transition-transform"
            >
              <img src={b.image} alt="" className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 brightness-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="inline-block rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white backdrop-blur-md">
                  {b.tag}
                </span>
                <h1 className="mt-2.5 whitespace-pre-line font-display text-[28px] font-extrabold leading-[1.05] text-white">
                  {b.title}
                </h1>
                <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2.5 text-[12px] font-bold text-black">
                  {b.cta}
                  <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-1.5">
          {BANNERS.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === slide ? 'w-5 bg-white' : 'w-1.5 bg-white/25'}`} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="pt-6">
        <SectionHead title="Shop by cut" />
        <Rail>
          {CATEGORIES.map((c) => (
            <button key={c.value} onClick={() => pickCategory(c.value)} className="flex w-[72px] shrink-0 flex-col items-center active:scale-95 transition-transform">
              <span className="h-[72px] w-[72px] overflow-hidden rounded-[22px] border border-white/10 bg-[#161616]">
                <img src={c.image} alt="" className="h-full w-full object-cover grayscale" />
              </span>
              <span className="mt-1.5 text-[11px] font-medium text-neutral-300">{c.label}</span>
            </button>
          ))}
        </Rail>
      </section>

      {/* Offer card */}
      <section className="px-4 pt-6">
        <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-br from-[#1d1d1d] to-[#0e0e0e] p-4">
          <div className="pointer-events-none absolute -right-6 -top-10 h-32 w-32 rounded-full bg-white/[0.06]" />
          <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">First order offer</p>
          <p className="mt-1 font-display text-[20px] font-bold text-white">Flat 10% off</p>
          <p className="text-[12px] text-neutral-400">+ free shipping above ₹1,999</p>
          <button
            onClick={copyCode}
            className="mt-3 inline-flex items-center gap-2 rounded-xl border border-dashed border-white/40 px-3 py-2 font-mono-tech text-[12px] font-bold tracking-wider text-white active:bg-white/10"
          >
            ATTITUDE10
            <Copy className="h-3.5 w-3.5 text-neutral-400" />
          </button>
        </div>
      </section>

      {/* Trending rail */}
      <section className="pt-7">
        <SectionHead title="Trending now" sub="Most-loved this week" action="See all" onAction={() => pickCategory('all')} />
        <Rail>
          {newDrops.map((p) => (
            <MobileProductCard key={p.id} product={p} className="w-[44%] shrink-0" />
          ))}
        </Rail>
      </section>

      {/* Lookbook rail */}
      <section className="pt-7">
        <SectionHead title="Shop the look" sub="Styled by the BEVOQFIT studio" />
        <Rail>
          {LOOKBOOK_LOOKS.map((look) => (
            <button
              key={look.id}
              onClick={() => {
                const p = PRODUCTS.find((x) => x.id === look.hotspots[0]?.productId);
                if (p) openProductModal(p);
              }}
              className="relative aspect-[3/4] w-[62%] shrink-0 overflow-hidden rounded-[22px] bg-[#151515] text-left active:scale-[0.99] transition-transform"
            >
              <img src={look.image} alt="" className="absolute inset-0 h-full w-full object-cover grayscale contrast-125" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3.5">
                <p className="text-[10px] font-medium text-neutral-400 line-clamp-1">{look.subtitle}</p>
                <p className="mt-0.5 text-[14px] font-bold leading-tight text-white line-clamp-2">{toTitle(look.title)}</p>
              </div>
            </button>
          ))}
        </Rail>
      </section>

      {/* All products */}
      <section id="shop-collection" className="pt-8">
        <SectionHead title="All oversized tees" sub={`${grid.length} styles`} />

        {/* Sticky filter bar */}
        <div className="sticky top-[57px] z-30 border-b border-white/5 bg-[#080808]/90 py-2.5 backdrop-blur-xl">
          <div className="snap-row gap-2 px-4">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setActiveFilter(c.value)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors ${
                  activeFilter === c.value ? 'bg-white text-black' : 'border border-white/12 bg-[#141414] text-neutral-300'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2 px-4">
            <SlidersHorizontal className="h-3.5 w-3.5 shrink-0 text-neutral-500" />
            {SORTS.map((s) => (
              <button
                key={s.value}
                onClick={() => setSort(s.value)}
                className={`text-[11px] font-medium ${sort === s.value ? 'text-white underline underline-offset-4' : 'text-neutral-500'}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-5 px-4 pt-4">
          {grid.map((p) => (
            <MobileProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="px-4 pt-9">
        <h2 className="mb-3 font-display text-[19px] font-bold text-white">Why BEVOQFIT</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { icon: ShieldCheck, t: '280 GSM cotton', d: 'Heavy, structured drape' },
            { icon: RefreshCw, t: '7-day returns', d: 'Easy size exchange' },
            { icon: Truck, t: 'Free shipping', d: 'On orders above ₹1,999' },
            { icon: Banknote, t: 'Cash on delivery', d: 'Pay when it arrives' },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-[#111] p-3.5">
              <Icon className="h-5 w-5 text-white" />
              <p className="mt-2 text-[13px] font-semibold text-white">{t}</p>
              <p className="text-[11px] text-neutral-500">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="pt-9">
        <SectionHead title="What buyers say" sub="4.8★ from 2,000+ verified orders" />
        <Rail>
          {CUSTOMER_REVIEWS.map((r) => (
            <div key={r.id} className="w-[80%] shrink-0 rounded-[22px] border border-white/10 bg-[#111] p-4">
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                ))}
              </div>
              <p className="mt-2 text-[14px] font-semibold leading-snug text-white">“{r.title}”</p>
              <p className="mt-1.5 line-clamp-3 text-[12px] leading-relaxed text-neutral-400">{r.comment}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold text-white">
                  {r.author.charAt(0)}
                </span>
                <div>
                  <p className="text-[12px] font-semibold text-white">{toTitle(r.author)}</p>
                  <p className="text-[10px] text-neutral-500">{r.location} · Verified buyer</p>
                </div>
              </div>
            </div>
          ))}
        </Rail>
      </section>

      {/* Community */}
      <section className="pt-9">
        <SectionHead title="#WearYourAttitude" sub="Tag @bevoqfit to get featured" />
        <div className="grid grid-cols-3 gap-1 px-4">
          {COMMUNITY_POSTS.slice(0, 6).map((post) => (
            <div key={post.id} className="relative aspect-square overflow-hidden rounded-xl bg-[#151515]">
              <img src={post.image} alt={post.caption} loading="lazy" className="h-full w-full object-cover grayscale" />
            </div>
          ))}
        </div>
      </section>

      {/* Mini footer */}
      <footer className="mt-10 border-t border-white/10 px-4 pt-6 text-center">
        <p className="font-display text-[18px] font-extrabold tracking-[0.2em] text-white">BEVOQFIT</p>
        <p className="mt-1 text-[12px] text-neutral-500">Premium oversized tees · Made in India</p>
        <div className="mt-4 flex justify-center gap-5 text-[12px] text-neutral-400">
          <button onClick={() => showToast('Order tracking coming soon', 'info')}>Track order</button>
          <button onClick={() => showToast('7-day easy returns & exchange', 'info')}>Returns</button>
          <button onClick={() => showToast('Support chat coming soon', 'info')}>Help</button>
        </div>
        <div className="mt-4 flex justify-center">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-neutral-300">
            <Instagram className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-4 text-[10px] text-neutral-600">© 2026 BEVOQFIT. All rights reserved.</p>
      </footer>
    </main>
  );
};
