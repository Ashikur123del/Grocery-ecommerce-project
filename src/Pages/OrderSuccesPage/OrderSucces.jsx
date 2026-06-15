import { Link } from "react-router";
import { useEffect, useState } from "react";
import { 
  FaCheckCircle, FaTruck, FaEnvelope, FaPrint, 
  FaHome, FaShoppingBag, FaArrowRight, FaDownload,
  FaStar, FaShare, FaWhatsapp, FaFacebook, FaTwitter
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

const OrderSuccess = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");

  useEffect(() => {
    // Generate random order number
    const randomOrder = "#ORD" + Math.floor(Math.random() * 1000000);
    setOrderNumber(randomOrder);
    
    // Calculate estimated delivery date (3-5 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
    
    // Show welcome toast
    toast.success("Welcome to Order Success Page! 🎉", {
      duration: 3000,
      position: "top-right",
    });
  }, []);

  const handlePrint = () => {
    window.print();
    toast.success("Printing order summary...", {
      duration: 2000,
      position: "top-right",
    });
  };

  const handleShare = (platform) => {
    const text = `I just placed an order on Green Valley Store! Order ID: ${orderNumber}`;
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    }
    toast.success(`Sharing on ${platform}...`, {
      duration: 2000,
      position: "top-right",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <Toaster />
      <div className="container mx-auto max-w-4xl">
        {/* Success Animation Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center py-12 px-6">
            <div className="inline-block bg-white rounded-full p-4 mb-6">
              <FaCheckCircle className="w-20 h-20 text-green-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Order Confirmed! 🎉</h1>
            <p className="text-green-100 text-lg">Thank you for shopping with us</p>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            {/* Order Info */}
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-2">Order Number</p>
              <p className="text-2xl font-bold text-gray-800 font-mono">{orderNumber}</p>
              <div className="mt-3 inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full">
                <FaTruck className="animate-pulse" />
                <span className="text-sm font-semibold">Estimated Delivery: {estimatedDelivery}</span>
              </div>
            </div>

            {/* Success Message */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-200">
              <h3 className="font-bold text-lg text-gray-800 mb-2">🎊 Order Placed Successfully!</h3>
              <p className="text-gray-600 mb-3">
                We've received your order and will notify you once it's shipped. 
                A confirmation email has been sent to your registered email address.
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <FaEnvelope className="w-4 h-4" />
                <span>Check your email for order updates</span>
              </div>
            </div>

            {/* Order Summary Card */}
            <div className="border border-gray-200 rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-xl text-gray-800 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">$245.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">$24.50</span>
                </div>
                <div className="flex justify-between text-sm text-emerald-600">
                  <span>Discount</span>
                  <span className="font-semibold">-$45.00</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Paid</span>
                    <span className="text-green-600">$224.50</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mt-4">
                <p className="text-sm text-gray-600 mb-2">📦 Shipping Address</p>
                <p className="text-sm font-semibold text-gray-800">John Doe</p>
                <p className="text-sm text-gray-600">123 Main Street, Dhaka 1200, Bangladesh</p>
              </div>
            </div>

            {/* What's Next? */}
            <div className="mb-8">
              <h3 className="font-bold text-xl text-gray-800 mb-4">📋 What's Next?</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaEnvelope className="text-orange-500 text-xl" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">Confirmation Email</h4>
                  <p className="text-xs text-gray-500">Check your email for order details</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaTruck className="text-orange-500 text-xl" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">Order Processing</h4>
                  <p className="text-xs text-gray-500">We'll notify you when it ships</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaCheckCircle className="text-orange-500 text-xl" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">Delivery</h4>
                  <p className="text-xs text-gray-500">Track your package in real-time</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/"
                className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all transform hover:scale-105"
              >
                <FaHome className="w-5 h-5" />
                Back to Home
              </Link>
              
              <Link
                to="/product-list"
                className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all transform hover:scale-105"
              >
                <FaShoppingBag className="w-5 h-5" />
                Continue Shopping
                <FaArrowRight className="w-4 h-4" />
              </Link>
              
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                <FaPrint className="w-5 h-5" />
                Print Receipt
              </button>
            </div>

            {/* Share Section */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600 mb-3">Share your purchase with friends</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all transform hover:scale-110"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-all transform hover:scale-110"
                >
                  <FaFacebook className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="bg-sky-500 text-white p-2 rounded-full hover:bg-sky-600 transition-all transform hover:scale-110"
                >
                  <FaTwitter className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Rating Section */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-2">How was your shopping experience?</p>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="text-gray-300 hover:text-yellow-400 transition-all transform hover:scale-110"
                    onClick={() => toast.success(`Thanks for rating ${star} star! ⭐`, { duration: 2000 })}
                  >
                    <FaStar className="w-6 h-6" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
          
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}
      </style>
    </div>
  );
};

export default OrderSuccess;