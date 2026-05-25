
import { FiChevronLeft, FiChevronRight, FiArrowUpRight } from 'react-icons/fi';
import { Card, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import man2 from "../assets/man-2.png"

import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const categoryHighlights = {
    Fruits: "bg-orange-50 text-orange-600 border-orange-100/50",
    Dairy: "bg-blue-50 text-blue-600 border-blue-100/50",
    Bakery: "bg-amber-50 text-amber-700 border-amber-100/50",
    Vegetables: "bg-emerald-50 text-emerald-600 border-emerald-100/50",
    Cooking: "bg-rose-50 text-rose-600 border-rose-100/50",
    Seafood: "bg-cyan-50 text-cyan-600 border-cyan-100/50",
    Beverages: "bg-violet-50 text-violet-600 border-violet-100/50",
    Meat: "bg-red-50 text-red-600 border-red-100/50",
  };

  useEffect(() => {
    fetch('/data.json')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-20 text-center text-emerald-600 font-bold">
        Loading Products...
      </div>
    );
  }

  return (
    <section className="container mx-auto px-6 md:px-12 py-16 select-none bg-white">

      <div className="flex items-end justify-between mb-8">
        <div className="text-left">
          <span className="text-emerald-600 text-xs md:text-sm font-bold tracking-wider uppercase block mb-1">
            This month popular
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-neutral-800 tracking-tight">
            Our Most Popular Products
          </h2>
        </div>
        <div className="flex gap-2.5">
          <button 
            ref={prevRef}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-[#00A859] hover:text-white hover:border-[#00A859] transition-all duration-300 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-neutral-600"
          >
            <FiChevronLeft className="text-xl" />
          </button>
          <button 
            ref={nextRef}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-[#00A859] hover:text-white hover:border-[#00A859] transition-all duration-300 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-neutral-600"
          >
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        <div className="lg:col-span-3 rounded-[24px] p-7 flex flex-col justify-between relative overflow-hidden bg-[#EBF7F2] min-h-[360px] lg:min-h-full border border-emerald-100/30 shadow-[inset_0_2px_8px_rgba(0,168,89,0.02)]">
          <div className="text-left relative z-10">
            <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider block mb-2">
              Organic Food
            </span>
            <h3 className="text-2xl font-black text-neutral-800 leading-tight">
              Fresh Foods Up To <br />
              <span className="text-[#00A859]">45% Off</span>
            </h3>
            <button className="mt-5 group flex items-center gap-1.5 bg-[#00A859] hover:bg-[#008F4C] text-white px-4 py-2.5 rounded-lg font-bold text-xs transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm">
              <span>Shop Now</span>
              <FiArrowUpRight className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <div className="absolute right-0 bottom-0 md:bottom-30 w-full h-full pointer-events-none">
            <img 
              src={ man2}
              alt="Fresh Leek"
              className="w-full h-full object-contain object-right-bottom transform scale-110 origin-bottom-right"
            />
          </div>
        </div>


        <div className="lg:col-span-9 relative w-full overflow-hidden flex items-center">
          <Swiper
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1}
            spaceBetween={20}
            grabCursor={true}
            breakpoints={{
              540: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
            className="w-full h-full py-4 px-1" 
          >
            {products.map((product) => {
              const tagStyle = categoryHighlights[product.category] || "bg-zinc-100 text-zinc-600 border-zinc-200";
              const percentOff = product.discount && product.discount > product.price
                ? Math.round(((product.discount - product.price) / product.discount) * 100)
                : 0;

              return (
                <SwiperSlide key={product.id} className="h-full flex">
                  <Link to={`/popular-product/${product.id}`} className="w-full h-full">
                       <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    whileHover="hover" 
                    layout
                    transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    className="w-full h-full flex"
                  >
                    <Card
                      isPressable
                      shadow="none"
                      className="w-full h-full border border-zinc-200/50 bg-[#F9FAFB] hover:bg-white hover:border-emerald-500/30 hover:shadow-[0_16px_36px_rgba(0,0,0,0.05)] rounded-[24px] p-4 flex flex-col justify-between transition-all duration-300 group text-left"
                    >
                      <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden rounded-[18px] bg-white border border-zinc-100 shadow-[inset_0_2px_8px_rgba(0,0,0,0.01)]">
                        
                        {percentOff > 0 && (
                          <span className="absolute top-2.5 left-2.5 z-10 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm tracking-wider uppercase">
                            {percentOff}% Off
                          </span>
                        )}

                        <motion.div
                          variants={{
                            hover: { scale: 1.04, y: -2 }
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className="w-full h-full p-2 flex items-center justify-center"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain rounded-[12px] pointer-events-none transition-transform duration-300"
                            loading="lazy"
                          />
                        </motion.div>
                      </div>

                      <div className="mt-4 flex-grow flex flex-col justify-between text-left px-0.5">
                        <div className="mb-4">
                          <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider mb-2 ${tagStyle}`}>
                            {product.category}
                          </span>

                          <h3 className="text-base font-bold text-zinc-800 tracking-tight line-clamp-1 group-hover:text-[#00A859] transition-colors duration-200">
                            {product.name}
                          </h3>
                          
                          <span className="text-xs font-medium text-zinc-400 block mt-0.5">
                            {product.quantity || "1 unit"} <span className="text-zinc-300 mx-1">•</span> {product.brand}
                          </span>

                          <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-lg font-black text-zinc-900">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.discount && (
                              <span className="text-xs text-zinc-400 line-through font-medium">
                                ${product.discount.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="w-full pt-1">
                          <Button
                            size="md"
                            variant="flat"
                            radius="xl"
                            className="w-full bg-white border border-zinc-200 text-zinc-700 font-semibold transition-all duration-300 text-sm group-hover:bg-[#00A859] group-hover:text-white group-hover:border-[#00A859] shadow-sm"
                          >
                            Add To Cart
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default PopularProducts;