const TopBrands = () => {
  // ১৪টি ভিন্ন ব্র্যান্ডের নাম ও কালার সেট করা হয়েছে
  const brands = [
    { name: "Coca-Cola", color: "text-red-600" },
    { name: "FedEx", color: "text-orange-600" },
    { name: "Apple", color: "text-gray-900" },
    { name: "Huawei", color: "text-red-700" },
    { name: "Gong", color: "text-purple-600" },
    { name: "Sony", color: "text-black" },
    { name: "IBM", color: "text-blue-700" },
    { name: "Zapier", color: "text-orange-500" },
    { name: "Treehouse", color: "text-green-600" },
    { name: "Amazon", color: "text-yellow-600" },
    { name: "Netflix", color: "text-red-600" },
    { name: "Nike", color: "text-black" },
    { name: "Samsung", color: "text-blue-800" },
    { name: "Google", color: "text-green-600" },
  ];

  return (
    <div className="py-6 md:py-20 px-6 bg-white">
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Top Brands</h2>
            <div className="w-24 h-1.5 bg-yellow-400 rounded-full mt-2"></div>
          </div>
          <button className="flex items-center gap-2 text-gray-500 hover:text-orange-500 font-semibold transition-all group">
            View All 
            <span className="bg-gray-100 p-2 rounded-full group-hover:bg-orange-100 transition-colors">→</span>
          </button>
        </div>

        {/* Smart Brand Grid (14 items) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {brands.map((brand, i) => (
            <div 
              key={i} 
              className="group relative h-24 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden hover:border-orange-200 transition-all duration-500 cursor-pointer"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <span className={`relative font-black text-lg ${brand.color} opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}>
                {brand.name}
              </span>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default TopBrands;