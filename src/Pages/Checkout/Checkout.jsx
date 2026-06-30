import { Link, useNavigate } from "react-router";
import { useCartStore } from "../../store/useCartStore";
import { useState, useEffect } from "react";
import { 
  FaArrowLeft, FaCreditCard, FaPaypal, FaGooglePay, 
  FaLock, FaTruck, FaShieldAlt, FaClock, 
  FaCheckCircle, FaUser, FaMapMarkerAlt, FaPhone, 
  FaEnvelope, FaCommentDots, FaTag, FaShoppingBag
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",
    notes: "",
  }); 

  // Load coupon from localStorage when component mounts
  useEffect(() => {
    const savedCoupon = localStorage.getItem('appliedCoupon');
    if (savedCoupon) {
      setAppliedCoupon(JSON.parse(savedCoupon));
      localStorage.removeItem('appliedCoupon'); // Clear after loading
    }
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 50 ? 0 : 10;
  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const total = subtotal + tax + shipping - discount;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address) {
      toast.error("Please fill in all required fields!", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!", {
        duration: 3000,
        position: "top-right",
      });
      navigate("/product-list");
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Order placed successfully! 🎉", {
        duration: 4000,
        position: "top-right",
        icon: "✅",
      });
      clearCart();
      setIsProcessing(false);
      navigate("/ordersucces");
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <Toaster />
        <div className="text-center max-w-md">
          <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FaShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">No items to checkout</h2>
          <p className="text-gray-500 mb-8">Please add some items to your cart first</p>
          <Link 
            to="/product-list" 
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all"
          >
            <FaArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:px-8">
      <Toaster />
      
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/cart" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors mb-4"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Checkout</h1>
          <p className="text-gray-500 mt-2">Complete your order securely</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaUser className="text-orange-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Customer Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="+880 1234 567890"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="text-orange-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Shipping Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Dhaka"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="1200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    >
                      <option>Bangladesh</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>USA</option>
                      <option>UK</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaCreditCard className="text-orange-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Payment Method</h2>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  />
                  <FaCreditCard className="text-blue-600 text-xl" />
                  <div className="flex-1">
                    <span className="font-semibold">Credit / Debit Card</span>
                    <p className="text-xs text-gray-500">Visa, Mastercard, American Express</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  />
                  <FaPaypal className="text-blue-600 text-xl" />
                  <div className="flex-1">
                    <span className="font-semibold">PayPal</span>
                    <p className="text-xs text-gray-500">Fast and secure</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="googlepay"
                    checked={paymentMethod === "googlepay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  />
                  <FaGooglePay className="text-blue-600 text-xl" />
                  <div className="flex-1">
                    <span className="font-semibold">Google Pay</span>
                    <p className="text-xs text-gray-500">Instant payment</p>
                  </div>
                </label>
              </div>

              {/* Order Notes */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaCommentDots className="inline mr-2" />
                  Order Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Special instructions for delivery..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
              {/* Products List */}
              <div className="max-h-64 overflow-y-auto mb-4 space-y-3 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-100">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-orange-600">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-semibold">+ ${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <FaTruck className="text-xs" />
                    Shipping
                  </span>
                  <span className="font-semibold">
                    {shipping === 0 ? "Free" : `+ $${shipping.toFixed(2)}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-emerald-600">
                    <span className="flex items-center gap-1">
                      <FaTag className="text-xs" />
                      Discount
                    </span>
                    <span className="font-semibold">- ${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-orange-600">${Math.max(0, total).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-6 bg-gradient-to-r from-gray-50 to-orange-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <FaClock className="text-orange-500" />
                  <span>Estimated Delivery: 3-5 business days</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaShieldAlt className="text-orange-500" />
                  <span>Secure payment protected</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaCheckCircle className="text-orange-500" />
                  <span>Free returns within 30 days</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full mt-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3.5 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaLock className="w-4 h-4" />
                    Place Order ${Math.max(0, total).toFixed(2)}
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                By placing this order, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
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
          
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          .animate-spin {
            animation: spin 1s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Checkout;