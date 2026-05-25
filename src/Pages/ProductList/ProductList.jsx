import { useEffect, useState, useMemo } from "react";
import ProductCard from "../../Components/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inStockOnly, setInStockOnly] = useState(false);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [minRating, setMinRating] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
      const matchesStock = inStockOnly ? p.inStock : true;

      const matchesMinPrice = minPrice ? p.price >= Number(minPrice) : true;
      const matchesMaxPrice = maxPrice ? p.price <= Number(maxPrice) : true;

      const matchesBrand = selectedBrand ? p.brand === selectedBrand : true;
      const matchesColor = selectedColor ? p.color?.includes(selectedColor) : true;

      const matchesRating = p.rating >= minRating;

      const matchesSearch = search
        ? p.name.toLowerCase().includes(search.toLowerCase())
        : true;

      return (
        matchesCategory &&
        matchesStock &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesBrand &&
        matchesColor &&
        matchesRating &&
        matchesSearch
      );
    });
  }, [
    products,
    selectedCategory,
    inStockOnly,
    minPrice,
    maxPrice,
    selectedBrand,
    selectedColor,
    minRating,
    search,
  ]);

  // unique brand/color list
  const brands = [...new Set(products.map((p) => p.brand))];
  const colors = [...new Set(products.flatMap((p) => p.color || []))];

  return (
    <div className="container mx-auto px-4 py-10 flex gap-8">
      
      {/* Sidebar */}
      <aside className="w-64 space-y-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search product..."
          className="w-full border p-2 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category */}
        <div>
          <h4 className="font-bold mb-2">Category</h4>
          <ul className="space-y-1">
            <li onClick={() => setSelectedCategory(null)} className="cursor-pointer">All</li>
            {["Fruits", "Dairy", "Bakery", "Meat"].map((cat) => (
              <li key={cat} onClick={() => setSelectedCategory(cat)} className="cursor-pointer">
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Brand */}
        <div>
          <h4 className="font-bold mb-2">Brand</h4>
          <select
            className="w-full border p-2 rounded"
            onChange={(e) => setSelectedBrand(e.target.value || null)}
          >
            <option value="">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Color */}
        <div>
          <h4 className="font-bold mb-2">Color</h4>
          <select
            className="w-full border p-2 rounded"
            onChange={(e) => setSelectedColor(e.target.value || null)}
          >
            <option value="">All Colors</option>
            {colors.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <h4 className="font-bold mb-2">Price</h4>
          <input
            type="number"
            placeholder="Min"
            className="w-full border p-2 mb-2 rounded"
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full border p-2 rounded"
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        {/* Rating */}
        <div>
          <h4 className="font-bold mb-2">Min Rating</h4>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            onChange={(e) => setMinRating(Number(e.target.value))}
          />
          <p>{minRating} ⭐</p>
        </div>

        {/* Stock */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          In Stock Only
        </label>
      </aside>

      {/* Products */}
      <main className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductList;