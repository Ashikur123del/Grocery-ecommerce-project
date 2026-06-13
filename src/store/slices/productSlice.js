import { getProducts, getProductById } from '../../services/apiService';

export const createProductSlice = (set) => ({
  products: [],
  currentProduct: null,
  isLoading: false,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const data = await getProducts();
      set({ products: data, isLoading: false });
    } catch { set({ isLoading: false }); }
  },

  fetchProductById: async (id) => {
    set({ isLoading: true });
    try {
      const data = await getProductById(id);
      set({ currentProduct: data, isLoading: false });
    } catch { set({ isLoading: false }); }
  },

  clearCurrentProduct: () => set({ currentProduct: null })
});