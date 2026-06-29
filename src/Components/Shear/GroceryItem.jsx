import { Card } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import grocery1 from "../../assets/category_icon_1.webp";
import grocery2 from "../../assets/category_icon_2.webp";
import grocery3 from "../../assets/category_icon_3.webp";
import grocery4 from "../../assets/category_icon_4.webp";
import grocery5 from "../../assets/category_icon_5.webp";
import grocery6 from "../../assets/category_icon_6.webp";
import { Link } from "react-router-dom";


const GroceryItem = () => {
  const categories = [
    { id: 1, name: "Blueberry", icon: grocery1, bgColor: "bg-[#EEF0FF] border-[#D9DFFF] text-[#2B3990]", platformColor: "bg-white/60 shadow-[0_8px_20px_rgba(43,57,144,0.1)]", badgeBg: "bg-[#2B3990]/10 text-[#2B3990]" },
    { id: 2, name: "Eggplant", icon: grocery2, bgColor: "bg-[#EAFBF3] border-[#CDF5E1] text-[#008744]", platformColor: "bg-white/60 shadow-[0_8px_20px_rgba(0,135,68,0.08)]", badgeBg: "bg-[#008744]/10 text-[#008744]" },
    { id: 3, name: "Strawberry", icon: grocery3, bgColor: "bg-[#FFF0F2] border-[#FFE0E4] text-[#D11A3A]", platformColor: "bg-white/60 shadow-[0_8px_20px_rgba(209,26,58,0.08)]", badgeBg: "bg-[#D11A3A]/10 text-[#D11A3A]" },
    { id: 4, name: "Cabbage", icon: grocery4, bgColor: "bg-[#FDF3E7] border-[#FBE3CD] text-[#B86B11]", platformColor: "bg-white/60 shadow-[0_8px_20px_rgba(184,107,17,0.08)]", badgeBg: "bg-[#B86B11]/10 text-[#B86B11]" },
    { id: 5, name: "Orange", icon: grocery5, bgColor: "bg-[#EBF7FF] border-[#D1EEFF] text-[#0070BA]", platformColor: "bg-white/60 shadow-[0_8px_20px_rgba(0,112,186,0.08)]", badgeBg: "bg-[#0070BA]/10 text-[#0070BA]" },
    { id: 6, name: "Apple", icon: grocery6, bgColor: "bg-[#FFF2EE] border-[#FFE2D9] text-[#C43311]", platformColor: "bg-white/60 shadow-[0_8px_20px_rgba(196,51,17,0.08)]", badgeBg: "bg-[#C43311]/10 text-[#C43311]" },
    { id: 7, name: "Apple", icon: grocery6, bgColor: "bg-[#FFF2EE] border-[#FFE2D9] text-[#C43311]", platformColor: "bg-white/60 shadow-[0_8px_20px_rgba(196,51,17,0.08)]", badgeBg: "bg-[#C43311]/10 text-[#C43311]" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4 md:px-8 relative group">
      <div className="relative w-full flex items-center">
        <button className="cat-prev-btn absolute -left-4 lg:-left-6 z-20 w-12 h-12 rounded-full bg-white border border-gray-100 text-gray-500 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none active:scale-90">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".cat-next-btn",
            prevEl: ".cat-prev-btn",
          }}
          loop={true}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            480: { slidesPerView: 3, spaceBetween: 20 },
            640: { slidesPerView: 4, spaceBetween: 24 },
            768: { slidesPerView: 5, spaceBetween: 24 },
            1024: { slidesPerView: 6, spaceBetween: 28 },
          }}
          className="w-full py-6 px-1"
        >
          {categories.map((item) => (
            <SwiperSlide key={item.id}>
              <motion.div
                initial="initial"
                whileHover="hover"
                className="w-full"
              >
                <Link to="/product-list">
                      <Card
                  isPressable
                  shadow="none"
                  className={`w-full aspect-[1/1.25] border rounded-[32px] transition-all duration-400 ease-out p-4 flex flex-col justify-between items-center select-none overflow-hidden relative ${item.bgColor}`}
                >
                  <div className="w-full flex justify-end">
                    <motion.div 
                      variants={{
                        hover: { rotate: 90, scale: 1.1 }
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className={`w-8 h-8 rounded-full border border-white/40 flex items-center justify-center cursor-pointer backdrop-blur-sm ${item.platformColor.split(" ")[0]}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 opacity-75">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </motion.div>
                  </div>

                  <div className="relative w-full flex items-center justify-center my-2">
                    <div className={`absolute bottom-[-6px] w-[80%] h-[24px] rounded-full blur-[4px] opacity-40 ${item.platformColor.split(" ").pop()}`} />
                    <div className={`absolute bottom-0 w-[85%] h-[40px] rounded-[16px] rotate-[-5deg] transform skew-x-12 border border-white/60 ${item.platformColor}`} />
                    <motion.div
                      variants={{
                        initial: { y: 0 },
                        hover: { 
                          y: -14,
                          transition: {
                            duration: 0.6,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                          }
                        }
                      }}
                      className="w-20 h-20 md:w-24 md:h-24 z-10 flex items-center justify-center drop-shadow-[0_10px_15px_rgba(0,0,0,0.08)]"
                    >
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                    </motion.div>
                  </div>
                  
                  <div className={`px-5 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-wide backdrop-blur-sm shadow-sm border border-white/20 ${item.badgeBg}`}>
                    {item.name}
                  </div>
                </Card>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Link to="/product-list" className="cat-next-btn absolute -right-4 lg:-right-6 z-20 w-12 h-12 rounded-full bg-white border border-gray-100 text-gray-500 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none active:scale-90">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      </div>
    </div>
  );
};  

export default GroceryItem;