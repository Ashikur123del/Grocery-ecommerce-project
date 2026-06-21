import { useEffect, useState } from "react";
import ProductsCard from "../../Components/Shear/ProductsCard";
import { useBoundStore } from "../../store/useBoundStore";

const BestProduct = () => {
  const { fetchProducts, isLoading, products } = useBoundStore();
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="px-4 py-10 container mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-emerald-600 text-sm font-semibold mb-1">Best This Month</p>
          <h2 className="text-3xl font-bold text-gray-900">Best Selling Products</h2>
        </div>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-sm font-medium transition-colors relative ${
                activeCategory === cat
                  ? "text-emerald-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-full" />
              )}
              {cat}
              {cat !== categories[categories.length - 1] && (
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-gray-300" />
              )}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <ProductsCard products={filteredProducts} limit={4} />   
      ) : (
        <p className="text-center text-gray-400 py-16">No products in this category.</p>
      )}
    </section>
  );
};

export default BestProduct;