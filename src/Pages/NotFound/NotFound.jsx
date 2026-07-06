import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* ডেকোরেটিভ সার্কেল */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center relative z-10 border border-white/30"
      >
        {/* ৪০৪ নম্বর – অ্যানিমেটেড */}
        <motion.div
          initial={{ scale: 0.5, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1
          }}
          className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2"
        >
          404
        </motion.div>

        {/* আইকন সহ হেডিং */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <FaSearch className="text-3xl text-gray-400" />
          <h2 className="text-3xl font-bold text-gray-800">পেজটি পাওয়া যায়নি</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-600 mb-8 text-lg"
        >
          আপনি যে পেজ খুঁজছেন, তা সরানো হয়েছে, নাম পরিবর্তন হয়েছে অথবা অস্থায়ীভাবে অনুপলব্ধ।
        </motion.p>

        {/* বাটন */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <FaHome />
            হোমপেজে ফিরে যান
          </Link>
        </motion.div>

        {/* ছোট্ট টিপ */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 text-sm text-gray-400"
        >
          অথবা উপরের মেনু থেকে পছন্দের পৃষ্ঠায় যান।
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;