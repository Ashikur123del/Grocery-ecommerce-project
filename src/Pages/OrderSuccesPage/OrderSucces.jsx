import { Link } from "react-router";
import { useEffect, useState } from "react";
import {
    FaCheckCircle, FaTruck, FaEnvelope, FaPrint,
    FaHome, FaShoppingBag, FaArrowRight,
    FaStar, FaWhatsapp, FaFacebook, FaTwitter
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

const OrderSuccess = () => {
    const [orderNumber, setOrderNumber] = useState("");
    const [estimatedDelivery, setEstimatedDelivery] = useState("");

    useEffect(() => {
        const randomOrder = "#ORD" + Math.floor(Math.random() * 1000000);
        setOrderNumber(randomOrder);
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 4);
        setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }));
        toast.success("Welcome! 🎉", { duration: 2000, position: "top-right" });
    }, []);

    const handlePrint = () => {
        window.print();
        toast.success("Printing...", { duration: 1500, position: "top-right" });
    };

    const handleShare = (platform) => {
        const text = `I just placed an order! Order: ${orderNumber}`;
        const urls = {
            whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${encodeURIComponent(text)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
        };
        window.open(urls[platform], '_blank');
        toast.success(`Shared on ${platform}`, { duration: 1500, position: "top-right" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-6 px-3">
            <Toaster />
            <div className="container mx-auto max-w-3xl">

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center py-6 px-4">
                        <div className="inline-block bg-white rounded-full p-2 mb-2">
                            <FaCheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <h1 className="text-2xl font-bold">Order Confirmed! 🎉</h1>
                        <p className="text-green-100 text-sm">Thank you for shopping with us</p>
                    </div>

                    {/* Body */}
                    <div className="p-5 space-y-4">

                        {/* Order Info */}
                        <div className="text-center">
                            <p className="text-xs text-gray-500">Order Number</p>
                            <p className="text-lg font-bold text-gray-800 font-mono">{orderNumber}</p>
                            <div className="mt-1 inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs">
                                <FaTruck className="animate-pulse" />
                                <span className="font-semibold">Delivery: {estimatedDelivery}</span>
                            </div>
                        </div>

                        {/* Success Msg */}
                        <div className="bg-green-50 rounded-xl p-3 border border-green-200 text-sm">
                            <p className="font-semibold text-gray-800">✅ Order Placed!</p>
                            <p className="text-gray-600 text-xs">Confirmation email sent. We'll notify you when it ships.</p>
                            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                                <FaEnvelope className="w-3 h-3" />
                                <span>Check your email</span>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="border border-gray-200 rounded-xl p-4">
                            <h3 className="font-bold text-gray-800 text-sm mb-2">Order Summary</h3>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-semibold">$245.00</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="font-semibold text-green-600">Free</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Tax</span><span className="font-semibold">$24.50</span></div>
                                <div className="flex justify-between text-emerald-600"><span>Discount</span><span className="font-semibold">-$45.00</span></div>
                                <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between font-bold text-sm">
                                        <span>Total</span>
                                        <span className="text-green-600">$224.50</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-2 mt-3 text-xs">
                                <p className="text-gray-500">📦 Shipping</p>
                                <p className="font-semibold text-gray-800">John Doe</p>
                                <p className="text-gray-500">123 Main St, Dhaka 1200</p>
                            </div>
                        </div>

                        {/* What's Next */}
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm mb-2">📋 What's Next?</h3>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { icon: FaEnvelope, label: "Email", desc: "Check details" },
                                    { icon: FaTruck, label: "Process", desc: "Shipping soon" },
                                    { icon: FaCheckCircle, label: "Delivery", desc: "Track package" }
                                ].map((item, i) => (
                                    <div key={i} className="bg-gray-50 rounded-lg p-2 text-center">
                                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-1">
                                            <item.icon className="text-orange-500 text-sm" />
                                        </div>
                                        <p className="font-semibold text-gray-800 text-xs">{item.label}</p>
                                        <p className="text-[10px] text-gray-500">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-2 justify-center pt-2">
                            <Link to="/" className="flex items-center gap-1 bg-gray-800 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-gray-900 transition">
                                <FaHome className="w-3 h-3" /> Home
                            </Link>
                            <Link to="/product-list" className="flex items-center gap-1 bg-orange-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-orange-600 transition">
                                <FaShoppingBag className="w-3 h-3" /> Shop <FaArrowRight className="w-3 h-3" />
                            </Link>
                            <button onClick={handlePrint} className="flex items-center gap-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-gray-50 transition">
                                <FaPrint className="w-3 h-3" /> Print
                            </button>
                        </div>

                        {/* Share & Rating */}
                        <div className="border-t border-gray-200 pt-4 text-center">
                            <p className="text-xs text-gray-500 mb-2">Share</p>
                            <div className="flex justify-center gap-2">
                                {[
                                    { icon: FaWhatsapp, color: "bg-green-500", key: "whatsapp" },
                                    { icon: FaFacebook, color: "bg-blue-600", key: "facebook" },
                                    { icon: FaTwitter, color: "bg-sky-500", key: "twitter" }
                                ].map((s) => (
                                    <button key={s.key} onClick={() => handleShare(s.key)} className={`${s.color} text-white p-1.5 rounded-full hover:scale-110 transition text-xs`}>
                                        <s.icon className="w-3 h-3" />
                                    </button>
                                ))}
                            </div>
                            <div className="mt-3 flex justify-center items-center gap-1">
                                <span className="text-xs text-gray-500">Rate:</span>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button key={star} onClick={() => toast.success(`⭐ ${star} star!`, { duration: 1500 })} className="text-gray-300 hover:text-yellow-400 transition text-sm">
                                        <FaStar className="w-4 h-4" />
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <style>{`
            .animate-pulse { animation: pulse 2s cubic-bezier(0.4,0,0.6,1) infinite; }
            @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
          `}</style>
        </div>
    );
};

export default OrderSuccess;