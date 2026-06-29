
import { Link } from "react-router-dom";
import { 
    FaTimesCircle, FaRedo, FaHeadset, 
    FaArrowLeft, FaShoppingCart 
} from "react-icons/fa";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-12 px-4 flex justify-center items-center">
      <div className="container mx-auto max-w-lg">
        
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-8 text-center">
          
          {/* Header/Icon */}
          <div className="inline-flex justify-center items-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <FaTimesCircle className="w-12 h-12 text-red-500" />
          </div>

          {/* Title & Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Failed!</h1>
          <p className="text-gray-600 mb-6">
            We couldn't process your payment. Please try again or check your payment details.
          </p>

          {/* Error Details Box */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <p className="text-sm text-red-700 font-medium">
              Error: Transaction declined by bank.
            </p>
            <p className="text-xs text-red-500 mt-1">
              Ref: #ERR-987654321
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Link 
              to="/checkout" 
              className="flex items-center justify-center gap-2 w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition duration-300"
            >
              <FaRedo /> Try Again
            </Link>
            
            <div className="flex gap-3">
              <Link 
                to="/cart" 
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                <FaShoppingCart /> View Cart
              </Link>
              <Link 
                to="/support" 
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                <FaHeadset /> Support
              </Link>
            </div>
          </div>

          {/* Footer Link */}
          <div className="mt-8">
            <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1">
              <FaArrowLeft className="w-3 h-3" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;