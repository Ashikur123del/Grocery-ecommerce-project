import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactSection = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      {/* ১. উপরে কন্টাক্ট ইনফো কার্ডগুলো */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: <FaPhoneAlt />, title: "Call Us", details: ["+1 (555) 123-4567", "+1 (555) 987-6543"] },
          { icon: <FaEnvelope />, title: "Email Us", details: ["support@example.com", "info@example.com"] },
          { icon: <FaMapMarkerAlt />, title: "Our Location", details: ["123 Business Avenue", "New York, NY 10001"] },
        ].map((item, index) => (
          <div key={index} className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl border border-gray-300">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xl flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <p className="font-bold text-gray-800">{item.title}</p>
              {item.details.map((detail, i) => (
                <p key={i} className="text-gray-600 text-sm">{detail}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ২. নিচে ইমেজ এবং গেট ইন টাচ ফর্ম */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* বাম পাশের ইমেজ */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Contact Us"
            className="rounded-3xl w-full h-[550px] object-cover shadow-2xl"
          />
        </div>

        {/* ডান পাশের ফর্ম */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Get In Touch 👋</h2>
          <form className="space-y-5">
            
              <input type="text" placeholder="Name" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none" />
              <input type="email" placeholder="Email" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none" />
           
            <input type="tel" placeholder="Phone" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none" />
            <input type="text" placeholder="Subject" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none" />
            <textarea rows="4" placeholder="Message" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none resize-none" />
            
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-200"
            >
              Send Message →
            </button>
          </form>
        </div>
      </div>
       <div className="w-full h-[300px] rounded-3xl overflow-hidden shadow-lg border border-gray-100 md:mt-10">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902455896305!2d90.3915!3d23.7508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sYourLocation!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
    </section>
  );
};

export default ContactSection;