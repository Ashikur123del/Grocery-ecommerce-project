
import { Link } from 'react-router'; 
import {
  FaTruck,
  FaHeadset,
  FaShieldAlt,
  FaTag,
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaLinkedinIn,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa';
import logo from '../../assets/logo.png'; 

const Footer = () => {
  
  const footerItem = [
    {
      title: 'Our Stores',
      links: [
        { text: 'New York', url: '/products-category' },
        { text: 'London SF', url: '#' },
        { text: 'Cockfosters BP', url: '#' },
        { text: 'Los Angeles', url: '#' },
        { text: 'Chicago', url: '#' },
        { text: 'Las Vegas', url: '/products-category' },
      ],
    },
    {
      title: 'Useful Links',
      links: [
        { text: 'Privacy Policy', url: '/privacy-policy' },
        { text: 'Returns', url: '/return-policy' },
        { text: 'Terms & Conditions', url: '/terms-of-service' },
        { text: 'Contact Us', url: '/contact' },
        { text: 'Latest News', url: '#' },
        { text: 'Our Sitemap', url: '#' },
      ],
    },
    {
      title: 'Footer Menu',
      links: [
        { text: 'Instagram Profile', url: '#' }, 
        { text: 'New Collection', url: '/products-category' },
        { text: 'Contact Us', url: '/contact' },
        { text: 'Latest News', url: '#' },
        { text: 'Purchase Theme', url: '#' }, 
      ],
    },
  ];


  const iconItem =  [
      { icon: FaTruck, title: 'Return & refund', sub: 'Money back guarantee' },
      { icon: FaHeadset, title: 'Quality Support', sub: 'Always online 24/7' },
      { icon: FaShieldAlt, title: 'Secure Payment', sub: '30% off by subscribing' },
      { icon: FaTag, title: 'Daily Offers', sub: '20% off by subscribing' },
  ]



  return (
    <footer className="bg-[#0b3d2e] text-white pt-32 pb-8 px-4 relative mt-24">
      <div className="absolute max-w-7xl mx-auto -top-20 left-4 right-4 bg-gray-100 text-gray-800 py-6 px-4 rounded-xl shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
       {iconItem.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="bg-green-600 text-white p-3 rounded-full text-lg flex-shrink-0">
              <item.icon />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
              <p className="text-[10px] text-gray-500">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mt-10">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 min-w-fit">
            <img src={logo} alt="Logo" className="w-24" />
          </div>
          <p className="text-gray-300 text-sm mb-6">
            It is a long established fact that reader distracted looking layout.
          </p>
          <div className="space-y-3 text-sm text-gray-300">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt /> Chorongi Super Market, 5th floor, Lift 4, Savar Bus Stand, Savar, Dhaka.
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt /> 01962779366
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope /> leadskillit@gmail.com
            </p>
          </div>
        </div>
        {footerItem.map((section, i) => (
          <div key={i}>
            <h4 className="font-bold text-lg mb-4">{section.title}</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              {section.links.map((link, j) => {
                const isExternal = link.url.startsWith('http');
                return (
                  <li key={j}>
                    {isExternal ? (
                      <Link to='#'
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-400 transition cursor-pointer"
                      >
                        {link.text}
                      </Link>
                    ) : (
                      <Link
                        to={link.url}
                        className="hover:text-green-400 transition cursor-pointer"
                      >
                        {link.text}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div>
          <h4 className="font-bold text-lg mb-4">Newsletter</h4>
          <p className="text-gray-300 text-sm mb-4">Subscribe for latest updates.</p>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded bg-green-900 border border-green-700 text-sm focus:outline-none"
            />
            <button className="absolute right-2 top-2.5 text-white bg-green-600 p-1.5 rounded">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-green-800 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left text-sm text-gray-400">
        <div className="flex gap-2">
          {[FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn].map((Icon, i) => (
            <div
              key={i}
              className="bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700"
            >
              <Icon />
            </div>
          ))}
        </div>
        <p>Copyright © Zenis 2026. All right reserved.</p>
        <div className="flex items-center gap-2">
          <span>Payment by :</span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
            alt="payment"
            className="h-5"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;