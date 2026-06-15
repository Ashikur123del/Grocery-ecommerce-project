import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useCartStore } from "../store/useCartStore";

const Card = ({ id, image, discount, category, name, quantity, brand, price, oldPrice, product }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleCardClick = () => {
    navigate(`/best-products/${id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    if (product) {
      addToCart(product, 1);
      toast.success("Added to Cart!");
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 w-full max-w-sm cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden rounded-xl bg-gray-50 mb-4">
        {discount && (
          <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">
            {discount}
          </span>
        )}
        <img src={image} alt={name} className="w-full h-48 object-cover p-2" />
      </div>

      <div className="text-left">
        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
          {category}
        </span>
        <h3 className="text-base font-bold text-neutral-800 mt-1">{name}</h3>
        <p className="text-xs text-neutral-400 mt-1">{quantity} • {brand}</p>
        
        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg font-black text-neutral-900">${price}</span>
          {oldPrice && <span className="text-xs text-neutral-400 line-through">${oldPrice}</span>}
        </div>
      </div>
      
      <button 
        onClick={handleAddToCart}
        className="w-full mt-4 py-2.5 bg-neutral-50 hover:bg-emerald-600 text-neutral-800 hover:text-white border border-neutral-200 hover:border-emerald-600 rounded-xl font-semibold text-sm transition-all duration-300"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default Card;