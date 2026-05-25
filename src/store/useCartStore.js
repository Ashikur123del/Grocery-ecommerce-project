// src/store/useCartStore.js

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],

      addToCart: (product, quantity) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                    }
                  : item
              ),
            };
          }
          return {
            cartItems: [
              ...state.cartItems,
              {
                ...product,
                quantity,
              },
            ],
          };
        }),

  
      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.id !== id
          ),
        })),


      clearCart: () =>
        set({
          cartItems: [],
        }),
    }),
    {
      name: "cart-storage",
    }
  )
);









