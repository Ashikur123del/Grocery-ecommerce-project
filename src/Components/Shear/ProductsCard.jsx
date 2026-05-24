import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Products from "./Products";
import { Link } from "react-router";

const ProductsCard = ({ initialCategory }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("");
  const [categoriesTabs, setCategoriesTabs] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const uniqueCategories = [...new Set(data.map((item) => item.category))];
        setCategoriesTabs(uniqueCategories);

        // Dynamic logic: use URL category OR first available category
        const targetTab = initialCategory && uniqueCategories.includes(initialCategory) 
                           ? initialCategory 
                           : uniqueCategories[0];
                           
        setActiveTab(targetTab);
        setFilteredProducts(data.filter((item) => item.category === targetTab));
        setLoading(false);
      });
  }, [initialCategory]); // Re-run when URL changes

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setFilteredProducts(products.filter((product) => product.category === tabName));
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center py-24">
        <span className="loading loading-spinner text-emerald-500 loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="w-full container mx-auto py-14 px-4 md:px-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-gray-100 pb-5 mb-10">
        <div>
          <span className="text-xs md:text-sm font-bold text-emerald-500 tracking-wide block mb-1">
            Best This Month
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-zinc-800 tracking-tight">
            Best Selling Products
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-zinc-400">
          {categoriesTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`transition-all duration-200 relative pb-1 whitespace-nowrap uppercase tracking-wider text-xs ${
                activeTab === tab
                  ? "text-emerald-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-emerald-500"
                  : "hover:text-zinc-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[440px]">
  <AnimatePresence mode="popLayout">
    {filteredProducts.slice(0, 4).map((product) => (
      <Link to={`/best-products/${product.id}`} key={product.id}>
        <Products product={product} />
      </Link>
    ))}
  </AnimatePresence>
</div>
    </div>
  );
};

export default ProductsCard;