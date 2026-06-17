import { useState } from "react";
import { FaPlay, FaTimes, FaSmile, FaUsers, FaProjectDiagram, FaCode } from "react-icons/fa";

const TeamVideo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const stats = [
    { icon: FaSmile, value: "15K+", label: "Happy Customers", color: "text-orange-500" },
    { icon: FaUsers, value: "12K+", label: "Team Members", color: "text-blue-500" },
    { icon: FaProjectDiagram, value: "9K+", label: "Complete Projects", color: "text-green-500" },
    { icon: FaCode, value: "16K+", label: "Lines of Code", color: "text-purple-500" }
  ];

  return (
    <div className="py-6 md:py-20 px-4 bg-gradient-to-b from-white to-gray-50/80">
      <div className="container mx-auto"> 
    
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
          onClick={openModal}
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
            alt="Team Collaboration"
            className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75"></div>
              <div className="relative w-20 h-20 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:bg-yellow-400 transition-all duration-500 shadow-lg">
                <FaPlay className="text-white text-2xl ml-1 group-hover:text-black transition-colors" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="text-sm font-medium opacity-90">▶ Click to watch our story</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100/80 hover:border-green-200 group"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} bg-opacity-10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={closeModal}
          >
            <div
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-200"
              >
                <FaTimes className="w-5 h-5" />
              </button>
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
                  title="Team Video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TeamVideo;