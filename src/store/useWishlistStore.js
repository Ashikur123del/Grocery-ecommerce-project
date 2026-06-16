import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set) => ({
      wishlistItems: [],

      addToWishlist: (product) =>
        set((state) => {
          // যদি আইটেমটি আগে থেকেই থাকে, তবে যোগ করবে না
          const existing = state.wishlistItems.find((i) => i.id === product.id);
          if (existing) return state;
          
          return { wishlistItems: [...state.wishlistItems, product] };
        }),

      removeFromWishlist: (id) =>
        set((state) => ({
          wishlistItems: state.wishlistItems.filter((i) => i.id !== id),
        })),
    }),
    { name: "wishlist-storage" }
  )
);