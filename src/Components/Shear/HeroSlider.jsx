import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { Button } from "@heroui/react";


import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import herobanner1 from "../../assets/GB-2.avif";
import herobanner2 from "../../assets/hero-2.webp";
import herobanner3 from "../../assets/hero-3.webp";
import herobanner4 from "../../assets/hero-4.avif";

const HeroSlider = () => {
  const sliderData = [
    {
      id: 1,
      image: herobanner1,
      badge: "🌿 100% Organic & Fresh",
      title: "Bring Nature To Your Daily Grocery",
      desc: "Get up to 30% OFF on your first order. Fresh vegetables, organic fruits, and daily essentials delivered right to your doorstep.",
      ctaText: "Shop Vegetables",
      colorClass: "from-emerald-400 to-green-500",
    },
    {
      id: 2,
      image: herobanner2,
      badge: "⚡ Fast Delivery Within 2 Hours",
      title: "Daily Essentials Delivered Super Fast",
      desc: "No more waiting in long lines! Order fresh meat, dairy, and household staples from the comfort of your home.",
      ctaText: "Order Now",
      colorClass: "from-amber-400 to-orange-500",
    },
    {
      id: 3,
      image: herobanner3,
      badge: "🍓 Premium Quality Checked",
      title: "Healthy Fruits For A Healthy Life",
      desc: "Handpicked premium quality fruits rich in vitamins. Stay energized and healthy with our curated seasonal baskets.",
      ctaText: "Explore Fruits",
      colorClass: "from-lime-400 to-emerald-500",
    },
    {
      id: 4,
      image: herobanner4,
      badge: "💰 Best Deals Guaranteed",
      title: "Smart Shopping, Massive Savings",
      desc: "Check out our weekly mega-saver bundle offers. Quality products at the wholesale prices you'll love.",
      ctaText: "View Offers",
      colorClass: "from-cyan-400 to-blue-500",
    },
  ];

  return (
    <div className="relative w-full h-[520px] md:h-[640px] lg:h-[700px] overflow-hidden   shadow-2xl group">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect={"fade"}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          nextEl: ".hero-swiper-next",
          prevEl: ".hero-swiper-prev",
        }}
        className="w-full h-full"
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[5000ms] ease-out"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 text-white z-10 max-w-3xl">
              <div className="mb-4 animate-fade-in">
                <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-xl border border-white/20 text-emerald-400 font-semibold px-4 py-1.5 rounded-full text-xs md:text-sm tracking-wide shadow-xl">
                  {slide.badge}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-5">
                {slide.title.split(" ").map((word) => {
                  if (word.id >= word.length - 2) {
                    return (
                      <span key={word.id} className={`bg-gradient-to-r ${slide.colorClass} bg-clip-text text-transparent mr-2`}>
                        {word}{" "}
                      </span>
                    );
                  }
                  return <span key={word.id} className="mr-2">{word}</span>;
                })}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-zinc-300/90 font-normal mb-8 max-w-xl leading-relaxed">
                {slide.desc}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  radius="xl"
                  className="bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold px-8 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-[1.03]"
                  endContent={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  }
                >
                  {slide.ctaText}
                </Button>

                <Button
                  size="lg"
                  radius="xl"
                  variant="bordered"
                  className="border-2 border-white/40 hover:border-white text-white font-bold px-7 backdrop-blur-md hover:bg-white/10 transition-all"
                >
                  See Catalog
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <button className="hero-swiper-prev absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/20 hover:bg-emerald-500 border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md shadow-lg pointer-events-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button className="hero-swiper-next absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/20 hover:bg-emerald-500 border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md shadow-lg pointer-events-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </Swiper>
    </div>
  );
};

export default HeroSlider;