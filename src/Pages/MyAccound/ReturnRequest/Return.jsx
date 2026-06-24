
import Image1 from "../../../assets/grocery_product_img_1.webp"
import Image2 from "../../../assets/grocery_product_img_2.webp"
import Image3 from "../../../assets/grocery_product_img_3.webp"
import Image4 from "../../../assets/grocery_product_img_4.webp"
import Image5 from "../../../assets/grocery_product_img_5.webp"
import Image6 from "../../../assets/grocery_product_img_6.webp"




const returnRequests = [
  { id: "#1374837", name: "Wireless Headphones", date: "8/29/2025", qty: 1, price: "$129.99", status: "Pending", img: Image1 },
  { id: "#1374838", name: "Smart Watch", date: "8/28/2025", qty: 2, price: "$199.99", status: "Approved", img: Image2 },
  { id: "#1374839", name: "Bluetooth Speaker", date: "8/27/2025", qty: 1, price: "$79.99", status: "Rejected", img: Image3 },
  { id: "#1374840", name: "Gaming Mouse", date: "8/26/2025", qty: 1, price: "$59.99", status: "Pending", img: Image4 },
  { id: "#1374840", name: "Gaming Mouse", date: "8/26/2025", qty: 1, price: "$59.99", status: "Pending", img: Image5 },
  { id: "#1374840", name: "Gaming Mouse", date: "8/26/2025", qty: 1, price: "$59.99", status: "Pending", img: Image6 },
];

const getStatusStyles = (status) => {
  switch (status) {
    case "Pending": return "bg-yellow-50 text-yellow-600";
    case "Approved": return "bg-green-50 text-green-600";
    case "Rejected": return "bg-red-50 text-red-600";
    default: return "bg-gray-50 text-gray-600";
  }
};

const Return = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Request For Product Return</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {returnRequests.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-700">Request No <span className="text-emerald-500">{item.id}</span></h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(item.status)}`}>
                {item.status}
              </span>
            </div>

            {/* Content */}
            <div className="flex gap-4">
              <img src={item.img} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-gray-50" />
              <div>
                <p className="text-xs text-gray-400 mb-1">{item.date}</p>
                <h4 className="font-bold text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
                <p className="font-bold text-amber-500 mt-1">{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Return;