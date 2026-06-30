import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { useCartStore } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";
import { toast } from "react-toastify";
import { LuArrowUpDown } from "react-icons/lu";
import { useCompareStore } from "../../store/compare";

const ProductsCard = ({ products = [], limit, columns = 4, showAddToCartButton = true}) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlistStore();
  const addToCompare = useCompareStore((state) => state.addToCompare);
  const compareItems = useCompareStore((state) => state.compare);

  
  const displayProducts = limit ? products.slice(0, limit) : products;

  const columnClasses = {
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5"
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const toggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    const isWishlisted = wishlistItems.some((item) => item.id === product.id);
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.info("Removed from Wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to Wishlist");
    }
  };

  const handleCompare = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    const alreadyAdded = compareItems.find((i) => i.id === product.id);
    if (alreadyAdded) {
      toast.info(`${product.name} is already in compare list`);
      return;
    }

    addToCompare(product);
    toast.success(`${product.name} added to compare!`);
  };

  return (
   <div className={`grid grid-cols-1 sm:grid-cols-2 ${columnClasses[columns] || "lg:grid-cols-4"} gap-6`}>
      {displayProducts.map((product) => {
        const isWishlisted = wishlistItems.some((item) => item.id === product.id);

        return (
          <Link
            to={`/best-products/${product.id}`}
            key={product.id}
            className="group"
          >
            <motion.div
              className="bg-white rounded-3xl border border-gray-100 p-4 transition-all duration-300 hover:shadow-2xl relative"
              whileHover={{ y: -8 }}
            >
              {/* Product Image Area */}
              <div className="relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Discount Badge */}
                <div className="absolute top-3 left-3 bg-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                  {product.discount || "20"}% OFF
                </div>

                {/* Floating Icons (Visible on Hover) */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Wishlist Icon */}
                  <button
                    onClick={(e) => toggleWishlist(e, product)}
                    className="p-2.5 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <FiHeart
                      className={
                        isWishlisted
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }
                    />
                  </button>

                  {/* Shopping Cart Icon */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="p-2.5 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <FiShoppingCart className="text-gray-600" />
                  </button>

                  {/* Compare Icon */}
                  <button
                    onClick={(e) => handleCompare(e, product)}
                    className="p-2.5 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <LuArrowUpDown
                      className={
                        compareItems.find((i) => i.id === product.id)
                          ? "text-green-500"
                          : "text-gray-600"
                      }
                    />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="px-1">
                <p className="text-[10px] font-bold text-orange-400 tracking-wider uppercase mb-1">
                  FRUITS
                </p>
                <h3 className="font-bold text-gray-800 text-base mb-0.5 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-[11px] mb-3">
                  {product.quantity || "1kg"} • Nature Fresh
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-black text-gray-900">
                    ${product.price}
                  </span>
                  <span className="text-gray-400 line-through text-xs">
                    ${product.originalPrice}
                  </span>
                </div>

                {/* Smart Add To Cart Button */}
                {showAddToCartButton && (
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full py-3 border border-gray-200 text-gray-700 font-bold rounded-xl transition-all duration-300 hover:bg-[#00A859] hover:text-white hover:border-[#00A859] flex items-center justify-center gap-2"
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsCard;