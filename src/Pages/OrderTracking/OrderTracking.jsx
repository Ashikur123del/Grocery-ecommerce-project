import { useState } from "react";
import PageBanner from "../../Components/Shear/Pagebanner";

const OrderTracking = () => {
    const [orderId, setOrderId] = useState("");
    const [email, setEmail] = useState("");
    const [isTracked, setIsTracked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Mock Order Data
    const mockOrderData = {
        id: "#75HJFDYD4",
        date: "January 15, 2026",
        total: "$247.50",
        status: "shipped",
        items: [
            { name: "Wireless Noise-Canceling Headphones", qty: 1, price: "$89.99" },
            { name: "Smart Fitness Watch", qty: 1, price: "$157.51" },
        ],
        shipping: {
            address: "123 Main Street, Dhaka, Bangladesh",
            method: "Express Delivery (1-2 days)",
        },
        timeline: [
            { label: "Order Placed", date: "Jan 15, 10:30 AM", completed: true },
            { label: "Payment Confirmed", date: "Jan 15, 12:15 PM", completed: true },
            { label: "Shipped", date: "Jan 16, 8:00 AM", completed: true },
            { label: "Out for Delivery", date: "Jan 18, 9:30 AM", completed: false },
            { label: "Delivered", date: "Expected Jan 19", completed: false },
        ],
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsTracked(true);
            setIsLoading(false);
        }, 1200);
    };

    const handleReset = () => {
        setIsTracked(false);
        setOrderId("");
        setEmail("");
    };

    const getStatusColor = (status) => {
        const map = {
            processing: "from-yellow-400 to-yellow-500",
            shipped: "from-blue-400 to-blue-500",
            delivered: "from-green-400 to-green-500",
            cancelled: "from-red-400 to-red-500",
        };
        return map[status] || "from-orange-400 to-orange-500";
    };

    const getStatusBadge = (status) => {
        const map = {
            processing: "bg-yellow-100 text-yellow-700 border-yellow-200",
            shipped: "bg-blue-100 text-blue-700 border-blue-200",
            delivered: "bg-green-100 text-green-700 border-green-200",
            cancelled: "bg-red-100 text-red-700 border-red-200",
        };
        return map[status] || "bg-orange-100 text-orange-700 border-orange-200";
    };

    const getStatusEmoji = (status) => {
        const map = {
            processing: "⏳",
            shipped: "🚚",
            delivered: "✅",
            cancelled: "❌",
        };
        return map[status] || "📦";
    };

    const progressPercent = Math.round(
        (mockOrderData.timeline.filter((t) => t.completed).length / mockOrderData.timeline.length) * 100
    );

    return (
        <>
            <PageBanner title="Order Tracking" breadcrumbs={[{ label: "Tracking" }]} />

            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {!isTracked ? (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 transition-all duration-300 hover:shadow-xl">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Track Your Order</h2>
                                <p className="text-gray-500 mt-1">Enter your order ID and email to check status</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Order ID <span className="text-orange-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                            </svg>
                                        </span>
                                        <input
                                            type="text"
                                            value={orderId}
                                            onChange={(e) => setOrderId(e.target.value)}
                                            placeholder="#75HJFDYD4"
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email Address <span className="text-orange-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        </span>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="example@zenis.com"
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition duration-300 shadow-md shadow-orange-200/50 hover:shadow-orange-300/70 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Tracking...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Track Order</span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>

                            <p className="text-center text-xs text-gray-400 mt-5">
                                We'll send you updates about your order status.
                            </p>
                        </div>
                    ) : (
                        // ---------- TRACKING RESULT ----------
                        <div className="space-y-6">
                            {/* Back Button */}
                            <button
                                onClick={handleReset}
                                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors duration-200 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm hover:shadow-md"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Tracking
                            </button>

                            {/* Order Summary Card */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                {/* Header with gradient */}
                                <div className={`bg-gradient-to-r ${getStatusColor(mockOrderData.status)} p-6 text-white`}>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">{getStatusEmoji(mockOrderData.status)}</span>
                                            <div>
                                                <h3 className="text-xl font-bold tracking-tight">
                                                    Order {mockOrderData.id}
                                                </h3>
                                                <p className="text-white/80 text-sm">
                                                    Placed on {mockOrderData.date}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize border backdrop-blur-sm ${getStatusBadge(mockOrderData.status)}`}>
                                                {mockOrderData.status}
                                            </span>
                                            <span className="text-xl font-bold tracking-wide">
                                                {mockOrderData.total}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Body - Single Column */}
                                <div className="p-6 md:p-8 space-y-8">
                                    {/* 1. HORIZONTAL TIMELINE WITH CONNECTING LINE */}
                                    <div>
                                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5">
                                            Tracking Progress
                                        </h4>

                                        <div className="relative py-4">
                                            {/* Gray background line (full width) */}
                                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
                                            
                                            {/* Orange progress line (width based on progress) */}
                                            <div
                                                className="absolute top-1/2 left-0 h-0.5 bg-orange-500 transform -translate-y-1/2 transition-all duration-1000 ease-out"
                                                style={{ width: `${progressPercent}%` }}
                                            ></div>

                                            {/* Steps */}
                                            <div className="relative flex justify-between items-start">
                                                {mockOrderData.timeline.map((item, idx) => (
                                                    <div key={idx} className="flex flex-col items-center text-center flex-1">
                                                        <div
                                                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative z-10
                                                                ${item.completed
                                                                    ? "bg-orange-500 border-orange-500 shadow-md shadow-orange-200"
                                                                    : "bg-white border-gray-300"
                                                                }`}
                                                        >
                                                            {item.completed ? (
                                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            ) : (
                                                                <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
                                                            )}
                                                        </div>
                                                        <p className={`text-xs font-semibold mt-2 ${item.completed ? "text-gray-800" : "text-gray-400"}`}>
                                                            {item.label}
                                                        </p>
                                                        <p className={`text-[10px] mt-0.5 ${item.completed ? "text-gray-500" : "text-gray-300"}`}>
                                                            {item.date}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2. Order Items */}
                                    <div>
                                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                                            Order Items
                                        </h4>
                                        <div className="bg-gray-50/80 rounded-xl p-4 space-y-3 border border-gray-100">
                                            {mockOrderData.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium text-gray-800">{item.name}</p>
                                                        <p className="text-sm text-gray-400">Qty: {item.qty}</p>
                                                    </div>
                                                    <span className="font-semibold text-gray-700">{item.price}</span>
                                                </div>
                                            ))}
                                            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                                <span className="font-semibold text-gray-700">Total</span>
                                                <span className="text-lg font-bold text-orange-500">{mockOrderData.total}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. Shipping Details */}
                                    <div>
                                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                                            Shipping Details
                                        </h4>
                                        <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-100 space-y-3">
                                            <div className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <div>
                                                    <p className="text-gray-700 font-medium">{mockOrderData.shipping.address}</p>
                                                    <p className="text-sm text-gray-400">Method: {mockOrderData.shipping.method}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <div>
                                                    <p className="text-gray-700 font-medium">Order Updates</p>
                                                    <p className="text-sm text-gray-400">Sent to {email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Support Card */}
                            <div className="bg-orange-50/70 rounded-2xl p-5 text-center border border-orange-100/70">
                                <p className="text-gray-700 text-sm">
                                    Need help with your order?{" "}
                                    <a href="#" className="text-orange-500 font-semibold hover:underline hover:text-orange-600 transition-colors">
                                        Contact Support
                                    </a>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default OrderTracking;