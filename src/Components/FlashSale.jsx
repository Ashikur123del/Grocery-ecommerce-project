
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

import man3 from '../assets/man-3.jpg';
import { useEffect, useState } from 'react';

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 182,
    hours: 18,
    minutes: 50,
    seconds: 48,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div 
      className="relative w-full min-h-[500px] md:h-[540px] flex items-center select-none bg-cover bg-no-repeat bg-center md:bg-right"
      style={{ backgroundImage: `url(${man3})` }}
    >
      
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
    
        <motion.div 
          className="md:col-span-7 space-y-5 text-left py-12 md:py-0"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span 
            variants={fadeInUp}
            className="inline-block text-sm md:text-base font-semibold text-emerald-400 tracking-wider font-serif italic"
          >
            Monthly Offers
          </motion.span>

          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-[54px] font-black text-white leading-tight tracking-tight font-sans"
          >
            Our Specials Products <br />
            <span className="text-neutral-200 font-normal block mt-1 text-3xl md:text-4xl tracking-wide lowercase font-serif italic">
              deal of the day
            </span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-neutral-300 text-xs md:text-sm max-w-md leading-relaxed"
          >
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
          </motion.p>
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap gap-3 pt-2"
          >
            {Object.entries(timeLeft).map(([label, value]) => (
              <div 
                key={label}
                className="w-16 h-16 bg-white rounded-full flex flex-col items-center justify-center shadow-lg border border-neutral-100/10"
              >
                <span className="text-lg md:text-xl font-bold text-[#00A859] font-sans leading-none">
                  {String(value).padStart(2, '0')}
                </span>
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider mt-0.5">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="pt-3">
            <button className="group flex items-center gap-2 bg-[#00A859] hover:bg-[#008F4C] text-white px-5 py-2.5 rounded-lg font-bold text-sm tracking-wide transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-emerald-900/20">
              <span>Shop Now</span>
              <FiArrowUpRight className="text-base opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </motion.div>

        <div className="hidden md:block md:col-span-5" />

      </div>
    </div>
  );
};

export default FlashSale;