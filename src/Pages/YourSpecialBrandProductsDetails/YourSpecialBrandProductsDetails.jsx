import { useParams } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";



const YourSpecialBrandProductsDetails = () => {
     const { id } = useParams();
      const addToCart = useCartStore((state) => state.addToCart);
    
      const [product, setProduct] = useState(null);
      const [loading, setLoading] = useState(true);
      const [mainImage, setMainImage] = useState("");
      const [quantity, setQuantity] = useState(1);
    
      useEffect(() => {
        fetch("/data.json")
          .then((res) => res.json())
          .then((data) => {
            const found = data.find((item) => item.id == id);
            setProduct(found);
            setMainImage(found?.images ? found.images[0] : found?.image);
            setLoading(false);
          });
      }, [id]);
    
    
      const handleAddToCart = () => {
        addToCart(product, quantity);
        toast.success(`${product.name} সফলভাবে কার্টে যোগ হয়েছে!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      };
    
      if (loading) {
        return (
          <div className="py-20 text-center text-emerald-500 text-xl font-bold">
            Loading...
          </div>
        );
      }
    
      if (!product) {
        return (
          <div className="py-20 text-center text-xl font-bold text-red-500">
            Product Not Found!
          </div>
        );
      }
    
      const images = product.images || [product.image];
  return (
    <div className="container mx-auto py-10 px-4">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-cover border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  mainImage === img
                    ? "border-emerald-500 shadow-lg"
                    : "border-gray-200 hover:border-emerald-300"
                }`}
              />
            ))}
          </div>
          <div className="flex-1 flex items-center justify-center border border-gray-100 rounded-2xl p-6 bg-white shadow-sm overflow-hidden">
            <img
              src={mainImage}
              alt={product.name}
              className="max-h-[400px] w-full object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-black text-gray-800">{product.name}</h1>
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-orange-600">৳{product.price}</span>
            <span className="text-xl text-gray-400 line-through">৳{product.discount}</span>
            <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Save 12%
            </span>
          </div>
          
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          
          <div className="flex items-center gap-4">
            <span className="font-bold text-gray-700">Quantity:</span>
            <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-5 py-2 bg-gray-50 hover:bg-gray-200">-</button>
              <span className="px-8 py-2 font-bold border-x-2 border-gray-200">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="px-5 py-2 bg-gray-50 hover:bg-gray-200">+</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <button
              onClick={handleAddToCart} 
              className="bg-orange-500 text-white font-bold py-4 rounded-xl hover:bg-orange-600 shadow-lg transition-all"
            >
              ADD TO CART
            </button>
            <button className="bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-black shadow-lg transition-all">
              BUY NOW
            </button>
            <button className="bg-green-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-green-700">
              WhatsApp Order
            </button>
            <button className="bg-blue-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-900">
              Call For Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourSpecialBrandProductsDetails