
import { FiArrowUpRight, FiPlay, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/v-1.webp";
import img2 from "../assets/v-2.webp";
import img3 from "../assets/v-3.webp";
import img4 from "../assets/v-4.webp";
import { useState } from "react";

const FarmingWatch = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const items = [
    { img: img1, title: "Modern Irrigation", video: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" },
    { img: img2, title: "Organic Growth", video: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" },
    { img: img3, title: "Tech Harvesting", video: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" },
    { img: img4, title: "Smart Cultivation", video: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" },
  ];

  return (
    <section className="bg-[#E8F5EE] py-20 px-6 md:px-12 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-xl">
            <div className="inline-block px-3 py-1 bg-green-100 rounded-full text-green-700 text-xs font-bold tracking-widest uppercase mb-4">
              | New Tech Farming
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.1] mb-8">
              Watch Our Farming & <br /> <span className="text-green-600">Cultivations</span>
            </h2>
            <p className="text-neutral-600 text-lg mb-8 leading-relaxed">
              Explore the future of agriculture with our latest smart farming techniques. See how technology meets nature.
            </p>
            <button className="group bg-green-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2 shadow-xl hover:bg-green-700 hover:shadow-green-500/20 active:scale-95">
              Explore All Videos 
              <FiArrowUpRight className="text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>

    
          <div className="grid grid-cols-2 gap-4 w-full lg:max-w-xl">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedVideo(item.video)}
                className="relative cursor-pointer group rounded-[12px] overflow-hidden shadow-sm"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white shadow-lg">
                    <FiPlay className="text-xl fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white font-medium text-sm">
                  {item.title}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* কাস্টম মোডাল */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl border border-neutral-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors"
                onClick={() => setSelectedVideo(null)}
              >
                <FiX size={20} />
              </button>
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedVideo}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FarmingWatch;