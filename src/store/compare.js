import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCompareStore = create(
  persist(
    (set) => ({
      compare: [], // এটি 'compare' হতে হবে

      addToCompare: (product) =>
        set((state) => {
          // চেক করছি অলরেডি আছে কি না
          const existing = state.compare.find((i) => i.id === product.id);
          if (existing) return state; // থাকলে কিছু করবে না
          
          return { compare: [...state.compare, product] }; // নাহলে যোগ করবে
        }),

      removeFromCompare: (id) =>
        set((state) => ({
          compare: state.compare.filter((i) => i.id !== id),
        })),
    }),
    { name: "compare-storage" } // লোকাল স্টোরেজে সেভ হবে
  )
);