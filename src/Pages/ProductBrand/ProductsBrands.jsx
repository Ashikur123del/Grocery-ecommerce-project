import PageBanner from "../../Components/Shear/Pagebanner";


const ProductsBrands = () => {
  const brands = [
    "Coca-Cola", "FedEx", "Apple", "Huawei", "Gong", "Sony", "FedEx",
    "Sony", "Treehouse", "Apple", "Zapier", "Gong", "Huawei", "IBM",
    "Sony", "Walmart", "Coca-Cola", "FedEx", "Apple", "Huawei", "Gong",
    "Sony", "FedEx", "Sony", "Treehouse", "Apple", "Zapier", "Gong"
  ]

  return (
<>
 <PageBanner title="Product Brand" breadcrumbs={[{ label: "Brand" }]} />
     <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {brands.map((brand, index) => (
            <div 
              key={index}  
              className="bg-white p-6 rounded-xl flex items-center justify-center 
              border-2 border-gray-200 shadow-sm
              transition-all duration-300 
              hover:border-blue-500 hover:shadow-lg hover:scale-[1.02] 
              cursor-pointer"
            >
              <span className="font-semibold text-gray-800">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
</>
  );
}

export default ProductsBrands;