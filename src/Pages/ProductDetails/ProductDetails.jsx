

import { useNavigate } from "react-router"; 
import { useBoundStore } from "../../store/useBoundStore";
import { useCartStore } from "../../store/useCartStore"

const ProductDetails = ({ id }) => {
  const navigate = useNavigate(); 
  
  const product = useBoundStore((state) =>
    state.products.find((p) => String(p.id) === String(id))
  );
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product, 1); 
    navigate("/cart");     
  };

  if (!product)
    return <div className="text-center py-20 text-red-500">Product Not Found!</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-black">{product.name}</h1>
      <button
        onClick={handleAddToCart} 
        className="bg-orange-500 text-white p-4 mt-5 rounded-lg"
      >
        ADD TO CART & GO TO CART
      </button>
    </div>
  );
};

export default ProductDetails;