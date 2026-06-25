import { useState } from "react";

import Image1 from "../../../assets/grocery_product_img_1.webp";
import Image2 from "../../../assets/grocery_product_img_2.webp";
import Image3 from "../../../assets/grocery_product_img_3.webp";
import Image4 from "../../../assets/grocery_product_img_4.webp";
import Image5 from "../../../assets/grocery_product_img_5.webp";

const reviews = [
  { id: 1, name: "Wireless Noise Cancelling Headphones", date: "August 25, 2025", comment: "Excellent sound quality and very comfortable for long listening sessions.", rating: 5, image: Image1 },
  { id: 2, name: "Smart Fitness Watch", date: "August 20, 2025", comment: "Great fitness tracking features and battery life is amazing.", rating: 4, image: Image2 },
  { id: 3, name: "Mechanical Gaming Keyboard", date: "August 15, 2025", comment: "Great typing experience and the RGB lighting is customizable.", rating: 4, image: Image3 },
  { id: 4, name: "Ultra HD Monitor", date: "August 10, 2025", comment: "Crystal clear display and excellent color accuracy.", rating: 4, image: Image4 },
  { id: 5, name: "Portable Bluetooth Speaker", date: "August 5, 2025", comment: "Surprisingly powerful sound for its size.", rating: 5, image: Image5 },
];

const MyReviews = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 4; 

  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const currentReviews = reviews.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <section className="container mx-auto py-12 px-4 ">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Reviews</h1>
        <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{reviews.length} Total</span>
      </div>

      {/* Reviews List */}
      <div className="flex flex-col gap-6">
        {currentReviews.map((review) => (
          <div key={review.id} className="group border border-gray-100 rounded-3xl p-6 bg-white hover:border-[#00A859]/30 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0">
                <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-gray-800">{review.name}</h3>
                <p className="text-xs font-medium text-gray-400 mb-3">{review.date}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
              </div>
              <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-1 rounded-full">
                <span className="text-amber-500 font-bold text-sm">{review.rating}</span>
                <span className="text-amber-400 text-xs">★</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 w-full">
          <ul className="flex items-center gap-2">
            {/* Previous */}
            <li>
              <button
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="w-10 h-10 flex items-center justify-center border rounded-xl hover:bg-gray-100 disabled:opacity-30 transition-all"
              >
                ←
              </button>
            </li>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <li key={p}>
                <button
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl transition-all font-semibold ${
                    p === page 
                      ? "bg-[#00A859] text-white shadow-lg shadow-[#00A859]/20" 
                      : "bg-white border text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              </li>
            ))}

            {/* Next */}
            <li>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="w-10 h-10 flex items-center justify-center border rounded-xl hover:bg-gray-100 disabled:opacity-30 transition-all"
              >
                →
              </button>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default MyReviews;