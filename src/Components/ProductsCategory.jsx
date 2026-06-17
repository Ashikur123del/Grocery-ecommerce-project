import { Link } from "react-router";

const ProductsCategory = ({ product }) => {
  const { name, image } = product;

  return (
   <Link to="/product-list">
    <div className="group flex flex-col items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] bg-white shadow-lg shadow-gray-200 border border-gray-100 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:shadow-blue-100">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover p-4 transition-transform duration-500 group-hover:scale-110" 
        />
      </div>
      
      <h2 className="text-base font-semibold text-gray-800 tracking-wide text-center">
        {name}
      </h2>
    </div>
   </Link>
  );
};

export default ProductsCategory;