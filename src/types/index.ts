export type OversizedSubCategory = 
  | 'heavyweight-280'
  | 'acid-wash'
  | 'archival-graphic'
  | 'minimal-essential'
  | 'women-oversized';

export type ProductBadge = 'NEW' | 'BESTSELLER' | 'LIMITED' | 'ICONIC' | '280 GSM' | 'HEAVYWEIGHT';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: OversizedSubCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  fabric: string;
  gsm: number;
  fit: string;
  colors: ProductColor[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  images: string[];
  badge?: ProductBadge;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  quantity: number;
}

export interface LookbookHotspot {
  id: string;
  productId: string;
  top: string;
  left: string;
  title: string;
  price: number;
}

export interface LookbookLook {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  hotspots: LookbookHotspot[];
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  comment: string;
  productName: string;
  verifiedBuyer: boolean;
  date: string;
}
