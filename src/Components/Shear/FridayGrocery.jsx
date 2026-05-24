
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import friday1 from "../../assets/grocerry_add_bg_1.webp";
import friday2 from "../../assets/grocerry_add_bg_2.webp";
const FridayGrocery = () => {
  const banners = [
    {
      id: 1,
      subTitle: "Black Friday Offer",
      title: "Organic Foods Up To",
      highlight: "45% Off",
      image: friday1,
      bgColor: "bg-[#5A99C3]", 
    },
    {
      id: 2,
      subTitle: "Holiday Sale",
      title: "Vegetables Up To",
      highlight: "65% Off",
      image: friday2,
      bgColor: "bg-[#FF914D]", 
    },
  ];

  return (
    <div className="w-full container mx-auto py-12 px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {banners.map((banner) => (
          <motion.div
            key={banner.id}
            initial="initial"
            whileHover="hover"
            className="w-full"
          >
            <div className={`relative w-full h-[240px] sm:h-[280px] lg:h-[320px] rounded-[24px] lg:rounded-[32px] overflow-hidden ${banner.bgColor} shadow-md border border-black/5 flex items-center cursor-pointer select-none`}>
            
              <motion.div
                variants={{
                  hover: { scale: 1.06 }
                }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-0 bg-cover bg-right bg-no-repeat w-full h-full"
                style={{ backgroundImage: `url(${banner.image})` }}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent md:from-black/10" />

              <div className="relative z-10 pl-6 sm:pl-10 md:pl-12 lg:pl-16 pr-4 max-w-[60%] sm:max-w-[55%] flex flex-col justify-center text-white">
                
                <span className="text-base sm:text-lg lg:text-xl font-medium tracking-wide font-serif opacity-95 mb-2 block antialiased">
                  {banner.subTitle}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-5 drop-shadow-sm">
                  {banner.title}{" "}
                  <span className="block text-white mt-0.5">{banner.highlight}</span>
                </h2>
                <div className="w-fit">
                  <Button
                    variant="light"
                    className="p-0 h-auto min-w-0 text-white font-bold text-sm sm:text-base tracking-wide flex items-center gap-1.5 hover:bg-transparent data-[hover=true]:bg-transparent group"
                  >
                    <span className="border-b-2 border-white/60 group-hover:border-white transition-colors duration-300 pb-0.5">
                      Shop Now
                    </span>
                    
                    <motion.svg
                      variants={{
                        hover: { x: 3, y: -3 }
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </motion.svg>
                  </Button>
                </div>

              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FridayGrocery;