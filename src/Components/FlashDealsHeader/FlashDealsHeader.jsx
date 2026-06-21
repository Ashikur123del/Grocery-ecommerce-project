// Components/FlashDealsHeader.jsx
const FlashDealsHeader = () => {
  return (
    <div className="bg-[#FFFDF5] p-6 rounded-t-xl flex flex-col md:flex-row justify-between items-center border-b border-orange-100 mb-6">
      <h2 className="text-3xl font-bold text-orange-500">Eid special offers</h2>
      <div className="flex gap-4 text-center">
        {["Days", "Hours", "Minutes", "Seconds"].map((item) => (
          <div key={item}>
            <div className="text-2xl font-bold text-orange-500">00</div>
            <div className="text-[10px] uppercase font-semibold">{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashDealsHeader;