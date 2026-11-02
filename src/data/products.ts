import { Product, LookbookLook, CustomerReview } from '../types';

export const PRODUCTS: Product[] = [
  // ================= 280 GSM HEAVYWEIGHT OVERSIZED TEES =================
  {
    id: 'bvq-ov-280-01',
    name: 'MONOLITH 280GSM FRENCH TERRY OVERSIZED TEE',
    slug: 'monolith-280gsm-french-terry-oversized-tee',
    category: 'heavyweight-280',
    categoryLabel: '280 GSM HEAVYWEIGHT',
    price: 1999,
    originalPrice: 2899,
    description: 'The definitive architectural oversized t-shirt. Constructed from custom-milled 280 GSM combed French Terry cotton with zero side torque, 2.5-inch drop-shoulders, and a 1.25" reinforced high-density ribbed collar that guarantees zero neck sag.',
    details: [
      '280 GSM 100% Combed French Terry Cotton',
      'Structural boxy oversized silhouette with extended sleeves',
      'High-density 1.25" stay-tight crew neck collar',
      'Bio-polished & pre-shrunk for permanent fit retention',
      'Tonal micro-matte silicone BEVOQFIT hem insignia',
      'Drop-shoulder geometry pitched 1.5" forward'
    ],
    fabric: '100% Combed Compact Cotton • 280 GSM French Terry',
    gsm: 280,
    fit: 'Architectural Boxy Oversized',
    colors: [
      { name: 'Pitch Black', hex: '#080808' },
      { name: 'Chalk White', hex: '#F5F5F2' },
      { name: 'Cast Iron Grey', hex: '#3E3E3E' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503342452485-86b7f54527ef?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85'
    ],
    badge: 'BESTSELLER',
    rating: 4.9,
    reviewsCount: 312,
    inStock: true,
    isFeatured: true,
    isTrending: true
  },
  {
    id: 'bvq-ov-280-02',
    name: 'TITAN 300GSM ULTRA-WEIGHT BOXY OVERSIZED TEE',
    slug: 'titan-300gsm-ultra-weight-boxy-oversized-tee',
    category: 'heavyweight-280',
    categoryLabel: '280 GSM HEAVYWEIGHT',
    price: 2499,
    originalPrice: 3499,
    description: 'Our heaviest oversized t-shirt ever engineered. A massive 300 GSM dense jersey that hangs like street armor, holding a crisp squared-off silhouette that never collapses against the body.',
    details: [
      '300 GSM Ultra-Dense Compact Cotton Jersey',
      'Squared-off oversized cut with deep armholes',
      'Double-thick collar with Lycra core reinforcement',
      'Blind-stitched sleeves and bottom hem'
    ],
    fabric: '100% Ring-Spun Compact Cotton • 300 GSM',
    gsm: 300,
    fit: 'Ultra-Heavyweight Boxy Cut',
    colors: [
      { name: 'Pure Onyx', hex: '#050505' },
      { name: 'Raw Bone', hex: '#EBE7DF' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503342452485-86b7f54527ef?auto=format&fit=crop&w=1200&q=85'
    ],
    badge: 'ICONIC',
    rating: 5.0,
    reviewsCount: 178,
    inStock: true,
    isFeatured: true,
    isTrending: true
  },

  // ================= ACID & MINERAL WASH OVERSIZED TEES =================
  {
    id: 'bvq-ov-acid-01',
    name: 'PHANTOM ACID-WASH OVERSIZED HEAVYWEIGHT TEE',
    slug: 'phantom-acid-wash-oversized-heavyweight-tee',
    category: 'acid-wash',
    categoryLabel: 'ACID & MINERAL WASH',
    price: 2299,
    originalPrice: 3199,
    description: 'Each piece undergoes a bespoke mineral acid wash process, creating an individual smoke-and-ash cloud patina. Built with 260 GSM single jersey and relaxed elbow-grazing sleeves.',
    details: [
      '260 GSM Heavy Single Jersey Cotton',
      'Artisanal hand-dipped acid smoke wash (each unit unique)',
      'Relaxed drop-shoulder drape with elongated sleeves',
      'Pre-shrunk with subtle distressed seam highlights'
    ],
    fabric: '100% Long-Staple Cotton • 260 GSM Mineral Wash',
    gsm: 260,
    fit: 'Slouchy Drop-Shoulder Oversized',
    colors: [
      { name: 'Acid Slate', hex: '#2A2D34' },
      { name: 'Vintage Washed Black', hex: '#1C1C1C' },
      { name: 'Smoked Ash', hex: '#4B4B4B' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85'
    ],
    badge: 'NEW',
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    isFeatured: true,
    isTrending: true
  },
  {
    id: 'bvq-ov-acid-02',
    name: 'VORTEX STONE-WASH OVERSIZED STREET TEE',
    slug: 'vortex-stone-wash-oversized-street-tee',
    category: 'acid-wash',
    categoryLabel: 'ACID & MINERAL WASH',
    price: 2199,
    originalPrice: 2999,
    description: 'Pumice stone weathered for 4 hours to break down surface tension while retaining structural 270 GSM heavyweight integrity. Features raw rolled sleeve edges and a relaxed wide chest.',
    details: [
      '270 GSM Combed French Terry Cotton',
      'Pumice stone wash with softened tactile feel',
      'Wide chest measurement with lowered armholes',
      'Subtle back yoke tonal typography print'
    ],
    fabric: '100% Combed Cotton • 270 GSM Stone Wash',
    gsm: 270,
    fit: 'Wide Boxy Oversized',
    colors: [
      { name: 'Washed Charcoal', hex: '#333333' },
      { name: 'Bleached Chalk', hex: '#F0EFEA' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85'
    ],
    badge: 'LIMITED',
    rating: 4.8,
    reviewsCount: 94,
    inStock: true,
    isFeatured: false,
    isTrending: true
  },

  // ================= ARCHIVAL GRAPHIC OVERSIZED TEES =================
  {
    id: 'bvq-ov-graph-01',
    name: 'GHOST ARCHIVE 3D PUFF-PRINT OVERSIZED TEE',
    slug: 'ghost-archive-3d-puff-print-oversized-tee',
    category: 'archival-graphic',
    categoryLabel: 'ARCHIVAL GRAPHIC',
    price: 2299,
    originalPrice: 3299,
    description: 'Tokyo brutalist architecture translated into tactile 3D rubberized puff printing across the spine. Cut in our signature boxy oversized silhouette with dropped shoulders.',
    details: [
      '280 GSM Heavy Single Jersey',
      'High-relief 3D tactile rubber puff print technique',
      'Extended wide-cut sleeves hitting below the elbow',
      'Reinforced neckband with interior contrast binding'
    ],
    fabric: '100% Ring-Spun Compact Cotton • 280 GSM',
    gsm: 280,
    fit: 'Extended Boxy Oversized',
    colors: [
      { name: 'Chalk White', hex: '#F8F8F5' },
      { name: 'Onyx Black', hex: '#050505' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85'
    ],
    badge: 'ICONIC',
    rating: 4.9,
    reviewsCount: 220,
    inStock: true,
    isFeatured: true,
    isTrending: true
  },
  {
    id: 'bvq-ov-graph-02',
    name: 'ATTITUDE MATRIX MONOCHROME OVERSIZED TEE',
    slug: 'attitude-matrix-monochrome-oversized-tee',
    category: 'archival-graphic',
    categoryLabel: 'ARCHIVAL GRAPHIC',
    price: 2199,
    originalPrice: 2999,
    description: 'Minimalist chest typography paired with an oversized geometric back grid. Engineered with breathable 260 GSM cotton that drapes fluidly without clinging.',
    details: [
      '260 GSM Bio-Washed Cotton',
      'Silkscreen matte plastisol monochrome graphic',
      'Oversized sleeve pitch designed to stay open',
      'Double-stitched bottom hem'
    ],
    fabric: '100% Combed Cotton • 260 GSM',
    gsm: 260,
    fit: 'Relaxed Drop-Shoulder Oversized',
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Matte Black', hex: '#0B0B0B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=85'
    ],
    badge: 'NEW',
    rating: 4.8,
    reviewsCount: 88,
    inStock: true,
    isFeatured: false,
    isTrending: false
  },

  // ================= MINIMAL ESSENTIAL OVERSIZED TEES =================
  {
    id: 'bvq-ov-min-01',
    name: 'NOCTURNE ZERO-BRANDING 260GSM OVERSIZED TEE',
    slug: 'nocturne-zero-branding-oversized-tee',
    category: 'minimal-essential',
    categoryLabel: 'MINIMAL ESSENTIAL',
    price: 1899,
    originalPrice: 2499,
    description: 'The purest manifestation of minimalist streetwear. Zero exterior logos. Just 260 GSM heavyweight cotton cut with dramatic proportions, dropped armholes, and side seam splits.',
    details: [
      '260 GSM Heavy Gauge Jersey Cotton',
      'Completely unbranded exterior for pure silhouette focus',
      'Side vent slits for fluid leg movement',
      'Extended back hemline (+1.5 inches)'
    ],
    fabric: '100% Organic Combed Cotton • 260 GSM',
    gsm: 260,
    fit: 'Longline Drop-Shoulder Oversized',
    colors: [
      { name: 'Pitch Black', hex: '#0A0A0A' },
      { name: 'Cast Concrete', hex: '#666666' },
      { name: 'Raw Optical White', hex: '#FFFFFF' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85'
    ],
    badge: 'BESTSELLER',
    rating: 4.9,
    reviewsCount: 265,
    inStock: true,
    isFeatured: true,
    isTrending: true
  },
  {
    id: 'bvq-ov-min-02',
    name: 'ORIGIN RAW-HEM OVERSIZED RELAXED TEE',
    slug: 'origin-raw-hem-oversized-relaxed-tee',
    category: 'minimal-essential',
    categoryLabel: 'MINIMAL ESSENTIAL',
    price: 1799,
    originalPrice: 2399,
    description: 'Features a subtle roll-stitch raw hem look at the sleeves and waist, pre-locked so it never unravels. Cut with an exaggerated wide chest and relaxed collar.',
    details: [
      '250 GSM Single Jersey Combed Cotton',
      'Locked raw-edge hem styling',
      'Deep crew neckline with reinforced binding',
      'Enzyme washed for instant lived-in luxury comfort'
    ],
    fabric: '100% Combed Cotton • 250 GSM',
    gsm: 250,
    fit: 'Slouchy Wide Oversized',
    colors: [
      { name: 'Smoked Black', hex: '#161616' },
      { name: 'Bone Ivory', hex: '#EBE7DF' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85'
    ],
    badge: 'LIMITED',
    rating: 4.7,
    reviewsCount: 79,
    inStock: true,
    isFeatured: false,
    isTrending: false
  },

  // ================= WOMEN'S OVERSIZED & BOYFRIEND TEES =================
  {
    id: 'bvq-ov-wm-01',
    name: 'SIREN SCULPTED OVERSIZED BOYFRIEND TEE',
    slug: 'siren-sculpted-oversized-boyfriend-tee',
    category: 'women-oversized',
    categoryLabel: "WOMEN'S OVERSIZED",
    price: 1899,
    originalPrice: 2599,
    description: 'Borrowed from the boys, perfected for her. A deliberately slouchy oversized silhouette featuring elongated sleeves that roll effortlessly, an open crew collar, and an exquisite fluid drape.',
    details: [
      '240 GSM Luxury Modal-Cotton Blend',
      'Relaxed drop-shoulder oversized drape',
      'Ultra-soft brushed finish with buttery tactile feel',
      'Reinforced collar that stays crisp throughout the day',
      'Subtle tone-on-tone BEVOQFIT embroidered monogram'
    ],
    fabric: '60% Combed Cotton, 40% Modal Silk-Touch • 240 GSM',
    gsm: 240,
    fit: 'Slouchy Boyfriend Oversized',
    colors: [
      { name: 'Chalk White', hex: '#FAF9F6' },
      { name: 'True Black', hex: '#0A0A0A' },
      { name: 'Dove Grey', hex: '#BFBFBF' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85'
    ],
    badge: 'BESTSELLER',
    rating: 4.9,
    reviewsCount: 245,
    inStock: true,
    isFeatured: true,
    isTrending: true
  },
  {
    id: 'bvq-ov-wm-02',
    name: 'AURA BOXY CROPPED OVERSIZED TEE',
    slug: 'aura-boxy-cropped-oversized-tee',
    category: 'women-oversized',
    categoryLabel: "WOMEN'S OVERSIZED",
    price: 1799,
    originalPrice: 2399,
    description: 'An architectural boxy cropped oversized tee designed to hit right at the natural high waistline. Cut with drop shoulders and wide sleeves for an unapologetic streetwear silhouette.',
    details: [
      '260 GSM Dense Combed Cotton Jersey',
      'Clean raw-edge hem look with reinforced stay-stitch',
      'Squared-off oversized boxy crop cut',
      'Pre-washed for instant lived-in luxury comfort'
    ],
    fabric: '100% Combed Cotton • 260 GSM Heavyweight',
    gsm: 260,
    fit: 'Architectural Boxy Crop Oversized',
    colors: [
      { name: 'Onyx Black', hex: '#090909' },
      { name: 'Bone Ivory', hex: '#EBE7DF' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85'
    ],
    badge: 'NEW',
    rating: 4.9,
    reviewsCount: 167,
    inStock: true,
    isFeatured: true,
    isTrending: true
  },
  {
    id: 'bvq-ov-wm-03',
    name: 'VALKYRIE EXTENDED LONGLINE OVERSIZED TEE',
    slug: 'valkyrie-extended-longline-oversized-tee',
    category: 'women-oversized',
    categoryLabel: "WOMEN'S OVERSIZED",
    price: 1999,
    originalPrice: 2699,
    description: 'Dramatic proportions meeting high-street comfort. An elongated oversized tunic silhouette with deep side slits, ideal for layering or wearing as a standalone statement.',
    details: [
      '240 GSM Feather-Touch Organic Cotton',
      'Dramatic extended length with deep side splits',
      'Thick 1.25" ribbed neckline for high-fashion finish',
      'Breathable, temperature-regulating natural fibers'
    ],
    fabric: '100% GOTS Certified Organic Cotton • 240 GSM',
    gsm: 240,
    fit: 'Longline Oversized Tunic',
    colors: [
      { name: 'Pure Black', hex: '#0C0C0C' },
      { name: 'Optical White', hex: '#FFFFFF' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85'
    ],
    badge: 'LIMITED',
    rating: 4.8,
    reviewsCount: 92,
    inStock: true,
    isFeatured: false,
    isTrending: false
  }
];

// Lookbook for "Shop The Look" - 100% Oversized T-shirt editorials
export const LOOKBOOK_LOOKS: LookbookLook[] = [
  {
    id: 'look-01',
    title: 'THE DOWNTOWN OVERSIZED UNIFORM',
    subtitle: '280 GSM French Terry Drop-Shoulder Editorial',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1400&q=85',
    hotspots: [
      {
        id: 'hs-01',
        productId: 'bvq-ov-280-01',
        top: '40%',
        left: '52%',
        title: 'MONOLITH 280GSM OVERSIZED TEE',
        price: 1999
      }
    ]
  },
  {
    id: 'look-02',
    title: 'MINERAL SMOKE & SLATE',
    subtitle: 'Acid-Wash Oversized Heavyweight Editorial',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1400&q=85',
    hotspots: [
      {
        id: 'hs-02',
        productId: 'bvq-ov-acid-01',
        top: '38%',
        left: '48%',
        title: 'PHANTOM ACID-WASH OVERSIZED TEE',
        price: 2299
      }
    ]
  },
  {
    id: 'look-03',
    title: 'THE BOYFRIEND SILHOUETTE',
    subtitle: 'Women’s Slouchy Modal Oversized Editorial',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85',
    hotspots: [
      {
        id: 'hs-03',
        productId: 'bvq-ov-wm-01',
        top: '46%',
        left: '50%',
        title: 'SIREN SCULPTED OVERSIZED BOYFRIEND TEE',
        price: 1899
      }
    ]
  }
];

// Instagram Community Streetwear fit gallery
export const COMMUNITY_POSTS = [
  {
    id: 'comm-01',
    handle: '@aarav.k_fit',
    image: 'https://images.unsplash.com/photo-1503342452485-86b7f54527ef?auto=format&fit=crop&w=800&q=80',
    caption: 'Nothing compares to 280 GSM French Terry oversized drape. @bevoqfit',
    likes: '2.4K',
    productTag: 'MONOLITH 280GSM TEE'
  },
  {
    id: 'comm-02',
    handle: '@maya_rebel',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    caption: 'The only boxy oversized tee you will ever need. #Bevoqfit #WearYourAttitude',
    likes: '1.9K',
    productTag: 'AURA BOXY CROP TEE'
  },
  {
    id: 'comm-03',
    handle: '@troy_street',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
    caption: 'Acid wash oversized street armor. Heavyweight perfection.',
    likes: '3.1K',
    productTag: 'PHANTOM ACID-WASH'
  },
  {
    id: 'comm-04',
    handle: '@zara.monochrome',
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=800&q=80',
    caption: 'Oversized black & white is a lifestyle, not just a trend.',
    likes: '4.2K',
    productTag: 'VALKYRIE LONGLINE TEE'
  },
  {
    id: 'comm-05',
    handle: '@vikram_s',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80',
    caption: 'The neck ribbing on these oversized tees is insane. 3 months, zero sag.',
    likes: '1.5K',
    productTag: 'MONOLITH 280GSM TEE'
  },
  {
    id: 'comm-06',
    handle: '@ananya_editorial',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80',
    caption: 'Understated slouchy drape meets raw street attitude.',
    likes: '2.8K',
    productTag: 'SIREN BOYFRIEND TEE'
  }
];

// Verified Customer Reviews focused on Oversized T-shirt quality
export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-01',
    author: 'KABIR MEHTA',
    location: 'Mumbai, MH',
    rating: 5,
    title: 'The Best Oversized T-Shirt in India, Hands Down.',
    comment: 'I own oversized tees from Represent, Fog Essentials, and Cole Buxton. BEVOQFIT literally matches them in fabric weight and neck collar tightness at a fraction of the import price. The 280 GSM drape is immaculate.',
    productName: 'MONOLITH 280GSM FRENCH TERRY OVERSIZED TEE',
    verifiedBuyer: true,
    date: '18 Oct 2026'
  },
  {
    id: 'rev-02',
    author: 'RIYA SHARMA',
    location: 'Bangalore, KA',
    rating: 5,
    title: 'Pure Luxury Feel & Unapologetic Boyfriend Fit.',
    comment: 'The modal blend on the Siren oversized tee feels like second skin. It hangs beautifully without clinging. Ordering the white one immediately.',
    productName: 'SIREN SCULPTED OVERSIZED BOYFRIEND TEE',
    verifiedBuyer: true,
    date: '24 Oct 2026'
  },
  {
    id: 'rev-03',
    author: 'ADITYA VERMA',
    location: 'Delhi, DL',
    rating: 5,
    title: 'Zero Collar Sag After 20 Washes.',
    comment: 'The 1.25 inch collar ribbing on this oversized tee is legendary. Wash after wash, it remains completely flat and structured. Size L is pure perfection for a 6ft frame.',
    productName: 'TITAN 300GSM ULTRA-WEIGHT BOXY OVERSIZED TEE',
    verifiedBuyer: true,
    date: '29 Oct 2026'
  }
];
