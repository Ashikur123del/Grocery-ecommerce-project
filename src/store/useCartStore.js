import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],

      addToCart: (product, quantity) =>
        set((state) => {
          const existing = state.cartItems.find((i) => i.id === product.id);
          if (existing) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { cartItems: [...state.cartItems, { ...product, quantity }] };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((i) => i.id !== id),
        })),

      clearCart: () => set({ cartItems: [] }),
    }),
    { name: "cart-storage" }
  )
);