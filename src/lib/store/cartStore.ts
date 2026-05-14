"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Size } from "@/types";
import type { Promocode } from "@/lib/data/promocodes";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  promo: Promocode | null;
  addItem: (productId: string, size: Size, color: string) => void;
  removeItem: (productId: string, size: Size, color: string) => void;
  updateQuantity: (productId: string, size: Size, color: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setPromo: (promo: Promocode | null) => void;
  getTotal: (priceMap: Record<string, number>) => number;
  getDiscount: (priceMap: Record<string, number>) => number;
  getFinalTotal: (priceMap: Record<string, number>) => number;
  getCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promo: null,

      addItem: (productId, size, color) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.productId === productId && i.size === size && i.color === color
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i === existing ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...items, { productId, size, color, quantity: 1 }] });
        }
      },

      removeItem: (productId, size, color) => {
        set({
          items: get().items.filter(
            (i) => !(i.productId === productId && i.size === size && i.color === color)
          ),
        });
      },

      updateQuantity: (productId, size, color, qty) => {
        if (qty <= 0) {
          get().removeItem(productId, size, color);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId && i.size === size && i.color === color
              ? { ...i, quantity: qty }
              : i
          ),
        });
      },

      clearCart: () => set({ items: [], promo: null }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      setPromo: (promo) => set({ promo }),

      getTotal: (priceMap) =>
        get().items.reduce((sum, i) => sum + (priceMap[i.productId] || 0) * i.quantity, 0),

      getDiscount: (priceMap) => {
        const total = get().getTotal(priceMap);
        const promo = get().promo;
        if (!promo) return 0;
        return Math.round((total * promo.discount) / 100);
      },

      getFinalTotal: (priceMap) => {
        return get().getTotal(priceMap) - get().getDiscount(priceMap);
      },

      getCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "vss-cart" }
  )
);