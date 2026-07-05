import { create } from "zustand";
import { fetchAllProducts } from "../Service/apiService";


export const useBoundStore = create((set, get) => ({
  products: [],
  currentProduct: null,
  isLoading: false,
  isLoaded: false,

 
  fetchProducts: async () => {
    if (get().isLoaded) return;
    set({ isLoading: true });
    try {
      const data = await fetchAllProducts();
      set({ products: data, isLoading: false, isLoaded: true });
    } catch {
      set({ isLoading: false });
    }
  },


  fetchProductById: (id) => {
    const found = get().products.find((p) => (p.id) === (id));
    set({ currentProduct: found ?? null });
  },

  clearCurrentProduct: () => set({ currentProduct: null }),
}));