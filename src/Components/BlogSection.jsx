
import { FaUser, FaCalendarAlt, FaArrowRight, FaComment } from 'react-icons/fa';
import { motion } from 'framer-motion';
import man1 from '../assets/grocery_blog_img_1.webp';
import man2 from '../assets/grocery_blog_img_2.webp';
import man3 from '../assets/grocery_blog_img_3.webp';
import { Link } from "react-router-dom";

const blogData = [
  { title: "Freshly Served Exploring The World Of Fresh", comments: "15 Comments", image: man1 },
  { title: "The Fresh Connection Exploring The Link Between", comments: "42 Comments", image: man2 },
  { title: "Common Engine Oil Problems And Solutions", comments: "0 Comments", image: man3 }
];

const BlogSection = () => {
  return (
    <section className=" px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
        <span className="text-green-600 font-bold tracking-widest uppercase text-sm mb-2 block">| Our Blog Post</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Latest News & Articles</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogData.map((blog, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -10 }}
            className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
          >
            <Link to="/product-list">
            
                <div className="relative overflow-hidden h-64">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500"></div>
            </div>
            
            <div className="p-7">
              <div className="flex items-center gap-5 text-xs font-medium text-gray-400 mb-4 uppercase tracking-wide">
                <div className="flex items-center gap-1.5 hover:text-green-600 cursor-pointer transition-colors">
                  <FaUser className="text-green-600" /> Admin
                </div>
                <div className="flex items-center gap-1.5">
                  <FaCalendarAlt className="text-green-600" /> 12 Jan 2025
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-green-700 transition-colors">
                {blog.title}
              </h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout...
              </p>
              
              <div className="flex justify-between items-center border-t border-gray-100 pt-5">
                <button className="flex items-center gap-2 text-green-600 font-bold hover:gap-3 transition-all">
                  READ MORE <FaArrowRight />
                </button>
                <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <FaComment className="text-green-600/50" /> {blog.comments}
                </span>
              </div>
            </div>
            </Link>
          </motion.div>
        ))}
      </div>
        </div>
      
    </section>
  );
};

export default BlogSection;