
import { useWishlistStore } from "../../store/useWishlistStore";
import { useCartStore } from "../../store/useCartStore";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  if (wishlistItems.length === 0) {
    return <div className="text-center py-20 text-gray-500">Your wishlist is empty.</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4">Images</th>
              <th className="p-4">Product Details</th>
              <th className="p-4">Unit Price</th>
              <th className="p-4">Add To Cart</th>
              <th className="p-4">Remove</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 last:border-none">
                <td className="p-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                </td>
                <td className="p-4">
                  <h3 className="font-bold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-400">Color: N/A | Size: N/A</p>
                </td>
                <td className="p-4 font-bold">${product.price}</td>
                <td className="p-4">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                  >
                    Add To Cart
                  </button>
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => removeFromWishlist(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;