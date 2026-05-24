
import { FaTruck, FaHeadset, FaShieldAlt, FaTag, FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn, FaPaperPlane, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0b3d2e] text-white pt-32 pb-8 px-4 relative mt-24">
      <div className="absolute max-w-7xl mx-auto -top-20 left-4 right-4 bg-gray-100 text-gray-800 py-6 px-4 rounded-xl shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: FaTruck, title: "Return & refund", sub: "Money back guarantee" },
          { icon: FaHeadset, title: "Quality Support", sub: "Always online 24/7" },
          { icon: FaShieldAlt, title: "Secure Payment", sub: "30% off by subscribing" },
          { icon: FaTag, title: "Daily Offers", sub: "20% off by subscribing" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="bg-green-600 text-white p-3 rounded-full text-lg flex-shrink-0"><item.icon /></div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
              <p className="text-[10px] text-gray-500">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mt-10">
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
             <span className="bg-green-600 text-white px-2 py-0.5 rounded-sm">Z</span> Zenis
          </h2>
          <p className="text-gray-300 text-sm mb-6">It is a long established fact that reader distracted looking layout.</p>
          <div className="space-y-3 text-sm text-gray-300">
            <p className="flex items-center gap-2"><FaMapMarkerAlt /> 37 W 24th St, New York, NY</p>
            <p className="flex items-center gap-2"><FaPhoneAlt /> +123 324 5879 39</p>
            <p className="flex items-center gap-2"><FaEnvelope /> info@Zenis.com</p>
          </div>
        </div>
        {[
            {title: 'Our Stores', links: ['New York', 'London SF', 'Cockfosters BP', 'Los Angeles', 'Chicago', 'Las Vegas']},
            {title: 'Useful Links', links: ['Privacy Policy', 'Returns', 'Terms & Conditions', 'Contact Us', 'Latest News', 'Our Sitemap']},
            {title: 'Footer Menu', links: ['Instagram Profile', 'New Collection', 'Woman Dress', 'Contact Us', 'Latest News', 'Purchase Theme']}
        ].map((section, i) => (
          <div key={i}>
            <h4 className="font-bold text-lg mb-4">{section.title}</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              {section.links.map((link, j) => (
                <li key={j} className="hover:text-green-400 cursor-pointer transition">{link}</li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-bold text-lg mb-4">Newsletter</h4>
          <p className="text-gray-300 text-sm mb-4">Subscribe for latest updates.</p>
          <div className="relative">
            <input type="email" placeholder="Enter your email" className="w-full p-3 rounded bg-green-900 border border-green-700 text-sm focus:outline-none" />
            <button className="absolute right-2 top-2.5 text-white bg-green-600 p-1.5 rounded"><FaPaperPlane /></button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-green-800 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left text-sm text-gray-400">
        <div className="flex gap-2">
          {[FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn].map((Icon, i) => (
            <div key={i} className="bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700"><Icon /></div>
          ))}
        </div>
        <p>Copyright © Zenis 2026. All right reserved.</p>
        <div className="flex items-center gap-2">
          <span>Payment by :</span>
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="payment" className="h-5" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;