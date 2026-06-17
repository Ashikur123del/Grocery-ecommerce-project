import { useCompareStore } from "../../store/compare";


const Compare = () => {
  const { compare, removeFromCompare } = useCompareStore();

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Compare Products</h2>
      {compare.length === 0 ? (
        <p>No products added for comparison.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {compare.map((product) => (
            <div key={product.id} className="border p-4 rounded-xl">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
              <h3 className="font-bold">{product.name}</h3>
              <button 
                onClick={() => removeFromCompare(product.id)}
                className="text-red-500 text-sm mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Compare;