import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useBoundStore } from "../../store/useBoundStore";
import { useCartStore } from "../../store/useCartStore";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaAmbulance } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { MdPhoneInTalk } from "react-icons/md";
import ProductDetailsText from "../../Components/ProductDetailsText";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const { products, fetchProducts, isLoading } = useBoundStore();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  const product = products.find((p) => String(p.id) === String(id));

  
  if (isLoading) {
    return (
      <div className="text-center py-20 text-emerald-600 font-bold">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500">
        Product Not Found!
      </div>
    );
  }

  const images = product?.images?.length ? product.images : [product?.image];
  const discount = product?.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success("Added to Cart!");
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="border border-gray-100 rounded-2xl p-6 grid md:grid-cols-2 gap-10 bg-white shadow-sm">
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                  activeImg === i ? "border-orange-400" : "border-gray-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center min-h-72">
            <img
              src={images[activeImg]}
              alt={product?.name}
              className="w-full h-full object-cover max-h-100"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{product?.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold text-orange-500">
                ${product?.price?.toLocaleString()}
              </span>
              {product?.originalPrice && (
                <span className="text-gray-400 text-lg line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
              {discount && (
                <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full">
                  Save {discount}%
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-600 font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  −
                </button>
                <span className="w-10 text-center font-semibold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors flex gap-2 items-center justify-center"
              >
                <FaCartShopping /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors flex gap-2 items-center justify-center"
              >
              <FaAmbulance />  Buy Now
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              
               <a href={`https://wa.me/?text=${encodeURIComponent(product?.name)}`}
                target="_blank"
                rel="noreferrer"
                className="py-3 bg-green-500 text-white rounded-xl font-semibold text-center hover:bg-green-600 transition-colors text-sm flex gap-2 items-center justify-center"
              >
                <BsWhatsapp /> Order on WhatsApp
              </a>
              
               <a href="tel:+8801700000000"
                className="py-3 bg-blue-700 text-white rounded-xl font-semibold text-center hover:bg-blue-800 transition-colors text-sm flex gap-2 items-center justify-center"
              >
                <MdPhoneInTalk /> Call for Order
              </a>
            </div>
            {product?.brand && (
              <div className="inline-flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 mt-2">
                <span className="text-gray-500 text-sm">Brand:</span>
                <span className="font-bold text-gray-900">{product.brand}</span>
              </div>
            )}
          </div>
        </div>
      </div>

     
      <ProductDetailsText 
  rating={product.rating} 
  benefits={product.benefits} 
  description={product.description}
  category={product.category}            
  currentProductId={product.id}        
/>
    </div>
  );
};

export default ProductDetails;