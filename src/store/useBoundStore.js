import { create } from "zustand";
import { fetchAllProducts } from "../Service/apiService";


export const useBoundStore = create((set, get) => ({
  products: [],
  currentProduct: null,
  isLoading: false,
  isLoaded: false,

  // সব products fetch — cache করা থাকলে আর call করবে না
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

  // Dynamic ID দিয়ে product খোঁজা — store থেকেই, extra API call নেই
  fetchProductById: (id) => {
    const found = get().products.find((p) => String(p.id) === String(id));
    set({ currentProduct: found ?? null });
  },

  clearCurrentProduct: () => set({ currentProduct: null }),
}));