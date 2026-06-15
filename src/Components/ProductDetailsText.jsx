import { useBoundStore } from "../store/useBoundStore";
import Card from "../Ui/Card";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const ProductDetailsText = ({ rating, benefits, description, category, currentProductId }) => {

  const { products } = useBoundStore();

 
  const relatedProducts = products
    .filter((p) => p.category === category && p.id !== currentProductId)
    .slice(0, 4);


  return (
    <>
    <div className="mt-10 p-6 border rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Product Details</h2>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="grid md:grid-rows-2 gap-10">
        {/* বেনিফিট লিস্ট */}
        <div>
          <h3 className="font-bold mb-3">Benefits:</h3>
          <ul className="list-disc pl-5 space-y-2">
            {benefits?.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>

        {/* রেটিং সেকশন */}
        <div>
          <h3 className="font-bold mb-3">Average Rating</h3>
          <div className="text-4xl font-black">{rating || "0.0"}</div>
          <div className="text-orange-400">★★★★★</div>
        </div>
      </div>
    </div>


<div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {relatedProducts.map((item) => (
            <SwiperSlide key={item.id} className="pb-10">
              <Card
                id={item.id}
                product={item}
                image={item.image}
                discount={item.originalPrice ? `${Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF` : null}
                category={item.category}
                name={item.name}
                quantity={item.quantity}
                brand={item.brand}
                price={item.price}
                oldPrice={item.originalPrice}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};;

export default ProductDetailsText;