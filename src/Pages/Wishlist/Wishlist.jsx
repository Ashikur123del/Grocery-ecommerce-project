import { useWishlistStore } from "../../store/useWishlistStore";
import { useCartStore } from "../../store/useCartStore";
import { toast } from "react-toastify";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import PageBanner from "../../Components/Shear/Pagebanner";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  if (wishlistItems.length === 0) {
    return <div className="text-center py-20 text-gray-500 font-medium">Your wishlist is empty.</div>;
  }

  return (
   <>
     <PageBanner title="Product Details" breadcrumbs={[{ label: "Wishlist" }]} />
     <div className="container mx-auto py-6 sm:py-10 px-4 max-w-6xl">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">My Wishlist</h2>
      
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Image</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Product Details</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Unit Price</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Add To Cart</th>
              <th className="p-4 text-sm font-semibold text-gray-600 text-center">Remove</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 last:border-none hover:bg-gray-50/50 transition">
                <td className="p-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg bg-gray-100" />
                </td>
                <td className="p-4">
                  <h3 className="font-bold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-400 mt-0.5">Color: N/A | Size: N/A</p>
                </td>
                <td className="p-4 font-bold text-gray-800">${product.price}</td>
                <td className="p-4">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold text-sm transition shadow-sm"
                  >
                    Add To Cart
                  </button>
                </td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => removeFromWishlist(product.id)}
                    className="bg-red-50 hover:bg-red-100 text-red-500 p-2.5 rounded-lg transition inline-flex items-center justify-center"
                    title="Remove item"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {wishlistItems.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center relative">
            
            <button 
              onClick={() => removeFromWishlist(product.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-1 transition"
              title="Remove item"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>

            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg bg-gray-100 flex-shrink-0" />
            
            <div className="flex-1 w-full pr-6 sm:pr-0">
              <h3 className="font-bold text-gray-800 text-base line-clamp-2">{product.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">Color: N/A | Size: N/A</p>
              
              <div className="flex items-center justify-between mt-4 gap-2">
                <span className="font-extrabold text-gray-900 text-lg">${product.price}</span>
                
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition flex items-center gap-2 shadow-sm"
                >
                  <FiShoppingCart className="w-4 h-4" />
                  <span>Add To Cart</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
   </>
  );
};

export default Wishlist;