import { FiPlus, FiMinus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from "../../assets/hero-4.avif";

const faqData = [
  { question: "What is Newsfe?", answer: "Newsfe is an advanced platform designed to provide personalized skincare insights and routine recommendations." },
  { question: "How does the technology work?", answer: "Our AI-driven technology analyzes your skin type and environmental factors to suggest the best treatments for you." },
  { question: "Who is this service for?", answer: "Our platform is built for everyone, from beginners to skincare enthusiasts looking to improve their skin health." },
  { question: "How often will I receive updates?", answer: "You will receive weekly, tailored skincare tips and product updates to keep your skin glowing." },
];

const FaqListItem = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="container mx-auto py-20 px-4 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Side: Image with Slide-in Animation */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <img 
            src={Image}
            alt="Skincare Routine" 
            className="rounded-2xl shadow-2xl object-cover w-full h-[500px]"
          />
        </motion.div>

        {/* Right Side: FAQ with Fade-in Animation */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-sm font-bold text-orange-500 mb-2 uppercase tracking-widest">
            Expert Guidance
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
            Frequently Asked Questions.
          </h1>
          
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <motion.div 
                key={index} 
                initial={false}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white hover:border-orange-400 transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left text-lg font-semibold hover:bg-orange-50 transition-colors duration-300"
                >
                  <span className="text-gray-800">{item.question}</span>
                  <motion.span 
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    className="text-orange-500 text-xl"
                  >
                    {openIndex === index ? <FiMinus /> : <FiPlus />}
                  </motion.span>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-gray-600 leading-relaxed"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqListItem;