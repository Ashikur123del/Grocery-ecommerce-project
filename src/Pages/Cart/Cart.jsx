import { Link, useNavigate } from "react-router";
import { useCartStore } from "../../store/useCartStore";
import { useState } from "react";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaTag, FaArrowLeft, FaCreditCard, FaGift, FaTimes, FaLock, FaStore, FaTrashAlt } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { GiSugarCane } from "react-icons/gi";
import { FcProcess } from "react-icons/fc";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const discount = appliedCoupon ? 45.00 : 0;
  const total = subtotal + tax - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "HEM4556JL") {
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount: 45.00 });
      toast.success('Coupon applied successfully!', {
        duration: 3000,
        position: 'top-right',
        icon: <GiSugarCane />,
      });
      setCouponCode("");
    } else {
      toast.error('Invalid coupon code!', {
        duration: 3000,
        position: 'top-right',
      });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast.success('Coupon removed', {
      duration: 2000,
      position: 'top-right',
    });
  };

  const handleRemoveItem = (id, name) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`, {
      duration: 2000,
      position: 'top-right',
      icon: <FaTrashAlt />,
    });
  };

  const handleUpdateQuantity = (id, newQuantity, name) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
    toast.success(`${name} quantity updated`, {
      duration: 1500,
      position: 'top-right',
      icon: <FcProcess />,
    });
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!', {
        duration: 3000,
        position: 'top-right',
      });
      return;
    }
    
    // Save coupon info to localStorage to use in checkout
    if (appliedCoupon) {
      localStorage.setItem('appliedCoupon', JSON.stringify(appliedCoupon));
    }
    
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <Toaster />
        <div className="text-center max-w-md transition-all duration-500 ease-out transform">
          <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FaShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any items yet</p>
          <Link 
            to="/product-list" 
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
          >
            <FaArrowLeft className="w-5 h-5" />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-12">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 3000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
          <p className="text-gray-500">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side: Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-5 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100 text-xs font-bold text-gray-600 uppercase tracking-wider">
                <div className="col-span-5">Product Details</div>
                <div className="col-span-2 text-center">Unit Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-center">Subtotal</div>
              </div>

              {/* Products */}
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-5 hover:bg-gray-50 transition-all duration-300 group">
                    <div className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="flex items-center gap-4 md:col-span-5 w-full">
                        <div className="relative">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-20 h-20 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300" 
                          />
                          <button 
                            onClick={() => handleRemoveItem(item.id, item.name)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
                          >
                            <FaTrash className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 hover:text-orange-500 transition-colors duration-200 cursor-pointer">{item.name}</h3>
                          <p className="text-xs text-gray-400 mt-1">Color: Default | Size: M</p>
                          <div className="md:hidden mt-2">
                            <div className="text-sm text-gray-600">Price: ${item.price}</div>
                            <div className="text-sm font-bold text-gray-800">Total: ${(item.price * item.quantity).toFixed(2)}</div>
                          </div>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="md:col-span-2 text-center">
                        <span className="font-semibold text-gray-700">${item.price}</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="md:col-span-3">
                        <div className="flex items-center justify-center gap-3">
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.name)} 
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 hover:border-orange-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={item.quantity <= 1}
                          >
                            <FaMinus className="w-3 h-3" />
                          </button>
                          <span className="w-10 text-center font-bold text-lg">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.name)} 
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 hover:border-orange-300 transition-all duration-200"
                          >
                            <FaPlus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal with Delete Icon */}
                      <div className="md:col-span-2 flex items-center justify-center gap-2">
                        <span className="font-bold text-lg text-orange-600">${(item.price * item.quantity).toFixed(2)}</span>
                        <button 
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-red-400 hover:text-red-600 transition-all duration-200 hover:scale-110"
                          title="Remove item"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping Button (Mobile) */}
            <Link 
              to="/product-list" 
              className="md:hidden flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300"
            >
              <FaArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>

          {/* Right Side: Billing Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6 transition-all duration-300 hover:shadow-2xl">
              <h2 className="font-bold text-2xl mb-6 flex items-center gap-2">
                <FaCreditCard className="w-6 h-6 text-orange-500" />
                Billing Summary
              </h2>
              
              {/* Store Header */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl p-4 mb-6 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-2 font-bold">
                  <FaStore className="text-2xl" /> 
                  <span>Green Valley Store</span>
                </div>
                <p className="text-xs text-orange-100 mt-1">Free shipping on orders over $50</p>
              </div>

              {/* Product List Box */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6 max-h-64 overflow-y-auto custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 mb-4 last:mb-0 pb-3 border-b border-gray-200 last:border-0 last:pb-0 transition-all duration-200 hover:bg-gray-100 rounded-lg p-2 group">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-14 h-14 rounded-lg object-cover shadow-md" 
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-800">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">${item.price} x {item.quantity}</p>
                      <p className="text-xs font-bold text-orange-600 mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="text-red-400 hover:text-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                      title="Remove item"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-semibold text-gray-800">+ ${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-emerald-600 transition-all duration-300 transform">
                    <span className="flex items-center gap-1">
                      <FaTag className="w-3 h-3" />
                      Discount
                    </span>
                    <span className="font-bold">- ${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 my-3"></div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-lg text-gray-800">Total</span>
                  <span className="font-black text-2xl text-orange-600">${Math.max(0, total).toFixed(2)}</span>
                </div>
              </div>
              
              {/* Coupon Section */}
              <div className="mt-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <FaGift className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Coupon code" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      disabled={appliedCoupon}
                    />
                  </div>
                  <button 
                    onClick={handleApplyCoupon}
                    disabled={appliedCoupon || !couponCode}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                  >
                    Apply
                  </button>
                </div>
                
                {appliedCoupon && (
                  <div className="mt-3 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-3 rounded-lg flex justify-between items-center transition-all duration-300 transform">
                    <div className="flex items-center gap-2">
                      <FaTag className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-semibold text-emerald-700">{appliedCoupon.code}</span>
                      <span className="text-xs text-emerald-600">-${appliedCoupon.discount.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={handleRemoveCoupon}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Buttons */}
              <div className="mt-8 space-y-3">
                <button 
                  onClick={handleProceedToCheckout}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3.5 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <FaCreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </button>
                
                <Link 
                  to="/product-list" 
                  className="hidden md:flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 hover:shadow-lg"
                >
                  <FaArrowLeft className="w-5 h-5" />
                  Continue Shopping
                </Link>
              </div>

              {/* Secure Checkout Badge */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                  <FaLock className="w-3 h-3" />
                  Secure Checkout · 100% Protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles using Tailwind */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #f97316;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #ea580c;
          }
        `}
      </style>
    </div>
  );
};

export default Cart;