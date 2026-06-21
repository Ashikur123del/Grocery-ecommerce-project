import { FiPlus, FiMinus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from "../../assets/man-2.png"

const faqData = [
  { question: "What is Newsfe?", answer: "Newsfe is a platform designed to provide the best skincare insights." },
  { question: "How does the technology work?", answer: "Our technology leverages AI to analyze your skin type accurately." },
  { question: "Who is teamhave for?", answer: "Teamhave is built for everyone looking to improve their skincare routine." },
  { question: "How often will I get Teamhice Mails?", answer: "You will receive updates weekly to keep your skin glowing." },
];

const FAQWithImage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="container mx-auto py-16 px-4 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
      
      {/* বাম দিকে FAQ - বাম দিক থেকে আসবে */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2"
      >
        <h2 className="text-sm font-bold text-orange-500 mb-2 uppercase tracking-widest">
          GENERAL QUESTION HERE
        </h2>
        <h1 className="text-4xl font-bold mb-8">
          Some Frequently Asked Questions.
        </h1>
        
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white hover:border-orange-400 transition-colors duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left text-lg font-semibold hover:bg-orange-50 transition-colors duration-200"
              >
                <span className="text-gray-800">{item.question}</span>
                <motion.span 
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-orange-500 text-xl"
                >
                  {openIndex === index ? <FiMinus /> : <FiPlus />}
                </motion.span>
              </button>
              
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-gray-600"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ডান দিকে ছবি - ডান দিক থেকে আসবে */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-1/2"
      >
        <img 
          src={Image}
          alt="Skincare Routine" 
          className="rounded-2xl shadow-lg object-cover w-full h-[400px]"
        />
      </motion.div>
    </section>
  );
};

export default FAQWithImage;