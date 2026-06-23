import { useMemo } from "react";
import { Card } from "@heroui/react";
import {
  BsBagCheckFill,
  BsClockHistory,
  BsCartXFill,
  BsHeartFill,
  BsChatTextFill,
  BsEye,
  BsPencil,
  BsTrash,
} from "react-icons/bs";
import { FaCircleDollarToSlot, FaStar } from "react-icons/fa6";

const OverView = () => {
  const cardCount = useMemo(
    () => [
      {
        id: 1,
        count: "471",
        title: "Total Order",
        bgColor: "from-green-50 to-green-100",
        borderColor: "border-l-4 border-green-500",
        icon: <BsBagCheckFill className="text-green-600 text-2xl" />,
      },
      {
        id: 2,
        count: "56",
        title: "Completed Order",
        bgColor: "from-blue-50 to-blue-100",
        borderColor: "border-l-4 border-blue-500",
        icon: <FaCircleDollarToSlot className="text-blue-600 text-2xl" />,
      },
      {
        id: 3,
        count: "28",
        title: "Pending Order",
        bgColor: "from-yellow-50 to-yellow-100",
        borderColor: "border-l-4 border-yellow-500",
        icon: <BsClockHistory className="text-yellow-600 text-2xl" />,
      },
      {
        id: 4,
        count: "12",
        title: "Canceled Order",
        bgColor: "from-red-50 to-red-100",
        borderColor: "border-l-4 border-red-500",
        icon: <BsCartXFill className="text-red-600 text-2xl" />,
      },
      {
        id: 5,
        count: "48",
        title: "Total Wishlist",
        bgColor: "from-purple-50 to-purple-100",
        borderColor: "border-l-4 border-purple-500",
        icon: <BsHeartFill className="text-purple-600 text-2xl" />,
      },
      {
        id: 6,
        count: "26",
        title: "Total Reviews",
        bgColor: "from-slate-50 to-slate-100",
        borderColor: "border-l-4 border-slate-500",
        icon: <BsChatTextFill className="text-slate-600 text-2xl" />,
      },
    ],
    []
  );

  const orders = useMemo(
    () => [
      { id: "#7SHJFDYD4", date: "July 16, 2023", status: "Completed", amount: "$200" },
      { id: "#7SHJF6WER", date: "June 23, 2023", status: "Active", amount: "$60" },
      { id: "#7SHJF457G", date: "Aug 18, 2023", status: "Completed", amount: "$180" },
      { id: "#7SHJF5FKI", date: "June 22, 2023", status: "Completed", amount: "$140" },
      { id: "#7SHJF4707", date: "Jan 12, 2023", status: "Canceled", amount: "$80" },
    ],
    []
  );

  const reviews = useMemo(
    () => [
      {
        id: 1,
        product: "Denim 2 Quarter Pant",
        date: "05 January 2025",
        rating: 5,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus exercitationem accusantium obcaecati quos...",
      },
      {
        id: 2,
        product: "Half Sleeve Tops For Women",
        date: "23 April 2025",
        rating: 4,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus exercitationem accusantium obcaecati quos...",
      },
      {
        id: 3,
        product: "Cherry Fabric Western Tops",
        date: "18 March 2025",
        rating: 5,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus exercitationem accusantium obcaecati quos...",
      },
    ],
    []
  );

  const getStatusColor = (status) => {
    const colorMap = {
      Completed: "text-green-600",
      Active: "text-blue-600",
      Canceled: "text-red-600",
    };
    return colorMap[status] || "text-gray-600";
  };

  const renderActionIcon = (status) => {
    if (status === "Active") {
      return (
        <BsTrash className="text-red-600 cursor-pointer transition-all duration-200 text-sm hover:scale-110" />
      );
    }
    return (
      <BsPencil className="text-amber-500 cursor-pointer transition-all duration-200 text-sm hover:scale-110" />
    );
  };

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`${i < count ? "text-yellow-400" : "text-gray-200"} text-xs`}
      />
    ));
  };

  const truncateText = (text, maxLength = 90) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="p-3  bg-zinc-50 min-h-screen">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 text-sm">Overview of your business</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
        {cardCount.map((item) => (
          <Card
            key={item.id}
            className={`bg-gradient-to-br ${item.bgColor} shadow-md hover:shadow-lg transition-all duration-300 ${item.borderColor} border-0 rounded-lg p-3 sm:p-4`}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 bg-white rounded-lg shadow-sm flex items-center justify-center w-10 h-10 flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{item.count}</p>
                <p className="text-xs text-gray-700 font-semibold">{item.title}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Orders & Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
    
      <div className="lg:col-span-2">
  <div className="flex items-center justify-between mb-3 md:mb-4">
    <h2 className="text-lg font-bold text-gray-900">Your Recent Order</h2>
    <span className="text-xs text-blue-600 font-medium hover:underline cursor-pointer">
      View All
    </span>
  </div>

  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <div className="min-w-[640px]">
        {/* Header */}
        <div className="grid grid-cols-5 gap-3 px-4 py-3 bg-amber-500 border-b border-gray-200 text-xs font-semibold text-white uppercase tracking-wider">
          <div className="col-span-1">Order ID</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">Amount</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {/* Rows */}
        {orders.map((item, idx) => (
          <div
            key={item.id}
            className={`grid grid-cols-5 gap-3 px-4 py-3 items-center border-b border-gray-100 last:border-0 hover:bg-blue-50/40 transition-all duration-200 text-sm ${
              idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
            }`}
          >
            <div className="col-span-1 font-mono text-gray-900 text-xs font-medium tracking-tight">
              {item.id}
            </div>
            <div className="col-span-1 text-gray-600 text-sm whitespace-nowrap">
              {item.date}
            </div>
            <div className="col-span-1">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(item.status).replace('text-', 'bg-')}`}></span>
                {item.status}
              </span>
            </div>
            <div className="col-span-1 text-right font-semibold text-gray-900">
              {item.amount}
            </div>
            <div className="col-span-1 flex items-center justify-end gap-3">
              <button className="p-1  text-amber-500 hover:bg-amber-600-50 rounded-md transition-all duration-200 hover:scale-110">
                <BsEye className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200">
                {renderActionIcon(item.status)}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

        {/* Reviews */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-900 mb-3 md:mb-4">Your Recent Reviews</h2>
          <Card className="p-3 sm:p-4 shadow-sm border border-gray-200 rounded-lg">
            <div className="space-y-0">
              {reviews.map((review, index) => (
                <div key={review.id}>
                  <div className="py-2 md:py-3">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">
                        {review.product}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex gap-0.5 my-1">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                      {truncateText(review.description, 90)}
                    </p>
                  </div>
                  {index < reviews.length - 1 && (
                    <hr className="border-t border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OverView;