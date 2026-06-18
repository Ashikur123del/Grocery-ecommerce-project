import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCompareStore = create(
  persist(
    (set) => ({
      compare: [], 

      addToCompare: (product) =>
        set((state) => {
        
          const existing = state.compare.find((i) => i.id === product.id);
          if (existing) return state; 
          
          return { compare: [...state.compare, product] }; 
        }),

      removeFromCompare: (id) =>
        set((state) => ({
          compare: state.compare.filter((i) => i.id !== id),
        })),
    }),
    { name: "compare-storage" } 
  )
);