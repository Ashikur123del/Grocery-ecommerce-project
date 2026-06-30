import { Link } from "react-router";
import { useCompareStore } from "../../store/compare";
import { FiTrash2, FiArrowLeft } from "react-icons/fi";
import { useCartStore } from "../../store/useCartStore";
import { toast } from "react-toastify";

const Compare = () => {
const { compare, removeFromCompare } = useCompareStore();

const addToCart = useCartStore((state) => state.addToCart);
    const handleAddToCart = (e, product) => {
      e.preventDefault();
      e.stopPropagation();
      addToCart(product, 1);
      toast.success(`${product.name} added to cart!`);
    };

  const renderStars = (rating = 5) => {
    const full = Math.floor(rating);
    return (
      <div className="flex items-center gap-0.5 text-xs">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < full ? "text-yellow-400" : "text-gray-300"}>★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-8 container mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Compare Products ({compare.length})</h2>
        <Link to="/" className="text-[#00A859] font-semibold flex items-center gap-2">
          <FiArrowLeft /> Back to Shop
        </Link>
      </div>

      {compare.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
          <p className="text-gray-500">No products in comparison list.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {compare.map((product) => (
            <div
              key={product.id}
              className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm hover:shadow-lg transition-all flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />

              <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="font-black text-lg">${product.price}</span>
                {product.discount && (
                  <span className="text-xs text-gray-400 line-through">${product.discount}</span>
                )}
              </div>

              <div className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
                {product.description}
              </div>

              {/* Attributes */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Qty:</span>
                  <span className="font-medium">{product.quantity}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Colors:</span>
                  <div className="flex gap-1">
                    {product.color?.slice(0, 3).map((c) => (
                      <div key={c} className="w-4 h-4 rounded-full border" style={{ backgroundColor: c.toLowerCase() }} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-4">{renderStars(product.rating)}</div>

              {/* Button Container: Add to Cart + Delete */}
              <div className="flex gap-2">
                <button onClick={(e) => handleAddToCart(e, product)} className="flex-grow bg-[#00A859] text-white py-2 rounded-lg font-semibold hover:bg-[#008f4a] transition-colors text-sm">
                  Add to Cart
                </button>
                <button 
                  onClick={() => removeFromCompare(product.id)}
                  className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-red-100 hover:text-red-500 transition-colors"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Compare;