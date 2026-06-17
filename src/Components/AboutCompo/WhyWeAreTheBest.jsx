import { FaGift, FaTruck, FaUndo, FaHeadset } from "react-icons/fa";

const WhyWeAreTheBest = () => {
  const features = [
    { icon: FaGift, title: "Quality Products", desc: "Objectively pontificate quality models before intuitive information." },
    { icon: FaTruck, title: "Fast Delivery", desc: "Objectively pontificate quality models before intuitive information." },
    { icon: FaUndo, title: "Return Policy", desc: "Objectively pontificate quality models before intuitive information." },
    { icon: FaHeadset, title: "24/7 Service", desc: "Objectively pontificate quality models before intuitive information." }
  ];

  return (
    <div className="py-6 md:py-20 px-4 bg-white">
      <div className="container mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Why We Are The <span className="underline decoration-yellow-400 decoration-[6px] underline-offset-4">Best</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
            {features.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-5 top-5 z-10 bg-yellow-400 p-4 rounded-full text-white shadow-lg">
                  <item.icon size={24} />
                </div>
                <div className="bg-white p-6 pl-10 shadow-[0_10px_20px_rgba(0,0,0,0.05)] border border-gray-100 transform -skew-x-6 hover:skew-x-0 transition-all duration-300">
                  <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
       {/* Right Side: Image Collage (Grocery Themed) */}
<div className="grid grid-cols-2 gap-3 h-[400px]">
  {/* ১. ফ্রেশ ভেজিটেবল ইমেজ */}
  <div className="rounded-lg overflow-hidden shadow-lg">
    <img 
      src="https://loremflickr.com/400/400/vegetables" 
      alt="Fresh Vegetables" 
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
    />
  </div>
  {/* ২. গ্রোসারি ডেলিভারি ইমেজ */}
  <div className="rounded-lg overflow-hidden shadow-lg">
    <img 
      src="https://loremflickr.com/400/400/grocery" 
      alt="Grocery Delivery" 
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
    />
  </div>
  {/* ৩. শপিং বা সুপারশপ ইন্টারনাল ইমেজ */}
  <div className="col-span-2 rounded-lg overflow-hidden shadow-lg">
    <img 
      src="https://loremflickr.com/800/400/supermarket" 
      alt="Supermarket" 
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
    />
  </div>
</div>

      </div>
    </div>
  );
};

export default WhyWeAreTheBest;