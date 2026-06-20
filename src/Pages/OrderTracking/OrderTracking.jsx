import PageBanner from "../../Components/Shear/Pagebanner";


const OrderTracking = () => {
  return (
    <>
     <PageBanner title="Order Tracking" breadcrumbs={[{ label: "Tracking" }]} />
    <div className="flex justify-center items-center  bg-gray-100 py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Order Tracking</h2>
        <p className="text-center text-gray-500 mb-6">Tracking Your Order Status</p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Order Id*</label>
            <input 
              type="text" 
              placeholder="#75HJFDYD4" 
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address*</label>
            <input 
              type="email" 
              placeholder="example@zenis.com" 
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-md flex justify-center items-center transition duration-300"
          >
            Track Order ↗
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default OrderTracking;