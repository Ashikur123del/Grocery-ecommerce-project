
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import logo1 from '../assets/grocery_brand_1.webp';
import logo2 from '../assets/grocery_brand_2.webp';
import logo3 from '../assets/grocery_brand_3.webp';
import logo4 from '../assets/grocery_brand_5 (1).webp';
import logo5 from '../assets/grocery_brand_5.webp';
import logo6 from '../assets/grocery_brand_6.webp';
import logo7 from '../assets/grocery_brand_7.webp';
import logo8 from '../assets/grocery_brand_7 (1).webp';

const BardenLogo = () => {
  const partnerLogos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];

  return (
    <section className="w-full bg-white py-12 md:py-16 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-10">
        
        <span className="text-[#00A859] text-xs md:text-sm font-bold tracking-wider uppercase block mb-2 font-sans">
          | Our Partners
        </span>
        
        <h2 className="text-2xl md:text-4xl font-extrabold text-neutral-800 tracking-tight font-sans">
          Our Organic Farm Partners
        </h2>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 relative">
        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView={2} 
          spaceBetween={40}
          loop={true} 
          freeMode={true}  
          speed={4000} 
          autoplay={{
            delay: 0, 
            disableOnInteraction: false,
          }}
          allowTouchMove={true} 
          breakpoints={{
            480: { slidesPerView: 3, spaceBetween: 40 },
            768: { slidesPerView: 4, spaceBetween: 50 },
            1024: { slidesPerView: 6, spaceBetween: 60 }, 
          }}
          className="partner-swiper flex items-center justify-center wrapper"
        >
          {partnerLogos.map((logo, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center py-2">
              <div className="w-full h-16 md:h-20 flex items-center justify-center px-4 transition-all duration-300 filter transform hover:scale-105">
                <img 
                  src={logo} 
                  alt={`Partner Brand ${index + 1}`} 
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BardenLogo;