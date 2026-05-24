import download from '../assets/grocery_download_img.webp';
import { SiGoogleplay, SiAppstore } from 'react-icons/si';
import { motion } from 'framer-motion';

const YourOrder = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-evenly gap-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
          >
            <img src={download} alt="App Mockup" className="w-full" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl text-center lg:text-left"
          >
            <p className="text-green-600 font-bold mb-4 uppercase tracking-widest text-sm">Download This App</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Simple Way To Order <br className="hidden lg:block" /> Your Food Faster
            </h2>
            <p className="text-gray-600 mb-10 leading-relaxed max-w-md mx-auto lg:mx-0">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
            </p>


            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button className="flex items-center gap-3 bg-green-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg shadow-green-600/20">
                <SiAppstore size={28} />
                <div className="text-left leading-none">
                  <span className="text-[10px] uppercase opacity-90">Download on the</span>
                  <p className="text-sm">Apple Store</p>
                </div>
              </button>

              <button className="flex items-center gap-3 bg-white border border-gray-200 text-gray-900 px-6 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300">
                <SiGoogleplay size={28} />
                <div className="text-left leading-none">
                  <span className="text-[10px] uppercase opacity-70">Get it on</span>
                  <p className="text-sm">Play Store</p>
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default YourOrder;