
import { BsDownload } from "react-icons/bs";
import Image1 from "../../../assets/grocery_product_img_1.webp"
import Image2 from "../../../assets/grocery_product_img_2.webp"
import Image3 from "../../../assets/grocery_product_img_3.webp"
import Image4 from "../../../assets/grocery_product_img_4.webp"
import Image5 from "../../../assets/grocery_product_img_5.webp"
import Image6 from "../../../assets/grocery_product_img_6.webp"

const downloads = [
  { id: "01", name: "Digital Marketing E-book 2025", img: Image1 },
  { id: "02", name: "Professional Photography Guide", img:Image2 },
  { id: "03", name: "Web Development Course Materials", img:Image3 },
  { id: "04", name: "SEO Strategy Template Pack", img: Image4 },
  { id: "05", name: "UI/UX Design Resources Bundle", img: Image5 },
  { id: "06", name: "UI/UX Design Resources Bundle", img: Image6 },
];

const Download = () => {
  return (
  <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-7xl bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-8 tracking-tight">My Downloads</h2>
        
        <div className="flex flex-col">
          {/* Table Header */}
          <div className="grid grid-cols-[60px_100px_1fr_80px] gap-4 px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200">
            <div>SN</div>
            <div>IMAGE</div>
            <div>NAME</div>
            <div className="text-right">ACTION</div>
          </div>

          {/* Table Rows */}
          {downloads.map((item) => (
            <div 
              key={item.id} 
              // এখানে border-b এবং border-gray-100 যোগ করা হয়েছে
              className="group grid grid-cols-[60px_100px_1fr_80px] gap-4 items-center px-4 py-5 border-b border-gray-100 transition-all duration-300 hover:bg-gray-50/50"
            >
              <div className="text-gray-400 font-bold">{item.id}</div>
              
              <div className="relative">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-xl object-cover shadow-sm transition-transform duration-300 group-hover:scale-110" 
                />
              </div>

              <div className="text-gray-700 font-semibold text-lg">{item.name}</div>
              
              <div className="flex justify-end">
                <button className="p-3 bg-amber-50 text-amber-500 rounded-2xl transition-all duration-300 hover:bg-amber-500 hover:text-white hover:shadow-lg">
                  <BsDownload size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Download;