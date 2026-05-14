export type Locale = "uk" | "ru";

export type Category = "tee" | "hoodie" | "shorts" | "jeans" | "socks";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type ProductBadge = "new" | "limited" | "soldout" | "drop";

export interface Product {
  id: string;
  slug: string;
  name: { uk: string; ru: string };
  category: Category;
  collection: string;
  price: number;
  oldPrice?: number;
  priceUSD: number;
  images: string[];
  sizes: Size[];
  colors: { name: string; hex: string }[];
  stock: number;
  badges: ProductBadge[];
  description: { uk: string; ru: string };
  material: { uk: string; ru: string };
  care: { uk: string; ru: string };
  tags: string[];
}

export interface CartItem {
  productId: string;
  size: Size;
  color: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
}