import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // ← card click আটকাবে
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleCardClick = () => {
    navigate(`/best-products/${product.id}`); // ← তোমার route অনুযায়ী path দাও
  };

  const price = Number(product?.price) || 0;
  const discount = Number(product?.discount) || 0;
  const rating = Number(product?.rating) || 0;

  const discountRate =
    discount > price ? Math.round(((discount - price) / discount) * 100) : 0;

  return (
    <div
      onClick={handleCardClick}
      className="group border border-gray-100 bg-white p-3 rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-xl">
        {discountRate > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[11px] font-semibold px-2 py-1 rounded-md">
            -{discountRate}%
          </span>
        )}
        <span
          className={`absolute top-3 right-3 z-10 text-white text-[10px] px-2 py-1 rounded-md ${
            product?.inStock ? "bg-emerald-500" : "bg-gray-500"
          }`}
        >
          {product?.inStock ? "In Stock" : "Out Stock"}
        </span>
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <span className="text-xs uppercase tracking-wider text-emerald-500 font-semibold">
          {product?.category}
        </span>
        <h3 className="text-base font-bold text-zinc-800 line-clamp-1">
          {product?.name}
        </h3>
        <p className="text-sm text-zinc-400">Brand: {product?.brand}</p>

        <div className="flex items-center gap-2">
          <span className="text-[#05a845] font-bold text-xl">
            ${price.toFixed(2)}
          </span>
          {discount > price && (
            <span className="text-gray-400 line-through text-sm">
              ${discount.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400 text-sm">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={
                index < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
              }
            />
          ))}
        </div>

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          disabled={!product?.inStock}
          className={`w-full mt-3 py-2 rounded-lg font-semibold transition-colors ${
            product?.inStock
              ? "bg-[#05a845] text-white hover:bg-[#04913a]"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {product?.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;