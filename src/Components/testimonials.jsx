import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import t1 from "../assets/t-1.jpg";
import t2 from "../assets/t-2.jpg";
import t3 from "../assets/t-3.jpg";
import t4 from "../assets/t-4.avif";
import t5 from "../assets/t-5.jpg";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Jane Doe",
    rating: 4,
    img: t1,
    text: "Adipiscing bibendum est ultricies integr quis. It's Tortor at risus viverra adipiscing.",
  },
  {
    name: "Robert Deni",
    rating: 3.5,
    img: t2,
    text: "Adipiscing bibendum est ultricies integr quis. It's Tortor at risus viverra adipiscing.",
  },
  {
    name: "Nigel Nigel",
    rating: 4.5,
    img: t3,
    text: "Adipiscing bibendum est ultricies integr quis. It's Tortor at risus viverra adipiscing.",
  },
  {
    name: "Sarah Smith",
    rating: 5,
    img: t4,
    text: "Adipiscing bibendum est ultricies integr quis. It's Tortor at risus viverra adipiscing.",
  },
  {
    name: "John Doe",
    rating: 4,
    img: t5,
    text: "Adipiscing bibendum est ultricies integr quis. It's Tortor at risus viverra adipiscing.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-green-50 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <p className="text-green-600 font-bold uppercase tracking-widest text-sm mb-2">
          Testimonials
        </p>
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          What Our Customers Say
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16 px-2"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index} className="py-4">
              <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 text-left relative transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.floor(item.rating)
                          ? "fill-yellow-400"
                          : "fill-gray-200"
                      }
                    />
                  ))}
                  <span className="ml-2 text-gray-600 font-bold text-sm">
                    {item.rating}
                  </span>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed italic">
                  "{item.text}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-green-100"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{item.name}</h4>
                      <p className="text-xs text-green-600 font-medium uppercase tracking-wide">
                        Customer
                      </p>
                    </div>
                  </div>
                  <FaQuoteRight className="text-green-100 text-4xl" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-pagination-bullet-active {
          background-color: #16a34a !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
