import { FaCreditCard, FaHeadset, FaTags, FaUndo, FaCheck } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="container mx-auto ">
        
        {/* Main Content Area with Green Border Background */}
        <div className="relative bg-gradient-to-r from-green-100 to-green-50 rounded-[40px] p-8 md:p-12 mb-16 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center bg-white rounded-[30px] p-6 shadow-sm">
            
            {/* Left: Image Section */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Team" 
                className="rounded-3xl w-full h-[400px] object-cover"
              />
              {/* Experience Badge */}
              <div className="absolute -right-8 top-1/4 bg-orange-500 text-white p-6 rounded-full w-28 h-28 flex flex-col items-center justify-center shadow-xl border-4 border-white">
                <span className="text-2xl font-bold">12+</span>
                <span className="text-[10px] uppercase font-semibold">Years Experience</span>
              </div>
              {/* Quote Box */}
              <div className="absolute -bottom-8 left-6 right-6 bg-gray-800 text-white p-6 rounded-2xl shadow-2xl border-b-4 border-orange-500">
                <p className="text-sm italic">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate officiis architecto reiciendis."</p>
                <p className="text-orange-400 font-bold mt-2">- JHON DEO</p>
              </div>
            </div>

            {/* Right: Text Section */}
            <div>
              <p className="text-orange-500 font-semibold uppercase text-sm tracking-widest">About Company</p>
              <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-6 leading-tight">Well-Coordinated Teamwork Speaks About Us</h1>
              <p className="text-gray-600 mb-8">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate aspernatur molestiae minimi pariatur consequatur voluptate sapiente deleniti soluta.</p>
              
              <div className="space-y-4">
                {["Trusted Partner", "Quality Products", "First Delivery", "Secure Payment"].map((title, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-orange-100 p-1.5 rounded-full text-orange-500">
                      <FaCheck size={12} />
                    </div>
                    <div className="font-semibold text-gray-800">{title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4 Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: FaUndo, title: "Return & refund", badge: "Money back guarantee", color: "bg-orange-100" },
            { icon: FaHeadset, title: "Quality Support", badge: "Always online 24/7", color: "bg-blue-100" },
            { icon: FaCreditCard, title: "Secure Payment", badge: "30% off by subscribing", color: "bg-green-100" },
            { icon: FaTags, title: "Daily Offers", badge: "20% off by subscribing", color: "bg-teal-100" }
          ].map((item, i) => (
            <div key={i} className={`${item.color} p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-md transition-all`}>
              <item.icon className="w-8 h-8 text-gray-700 mb-3" />
              <h4 className="font-bold text-gray-800">{item.title}</h4>
              <p className="text-[11px] font-medium bg-white/60 px-3 py-1 mt-2 rounded-full text-gray-600">{item.badge}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-400 text-sm">
          © 2026 Green Valley Store — Built with ❤️
        </div>
      </div>
    </div>
  );
};

export default About;