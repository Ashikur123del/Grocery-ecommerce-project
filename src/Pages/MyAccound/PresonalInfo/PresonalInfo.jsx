import EditInfoModal from "../../../Components/Modle/EditInfoModal";


const PresonalInfo = () => {
     const parsonalInfo = [
    {id:1, name: "Jhon Deo", Email: "example@yahoo.com", Phone: "01712897821", Country: "USA", City: "Dhaka", ZIPCode: "1234", Address: "441, 4th street, Washington DC, USA"}
  ];
  return (
     <div className=" p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      {parsonalInfo.map((item) => (
        <div key={item.id}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
            <EditInfoModal initialData={item} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            <div><p className="text-sm text-gray-400 mb-1">Name</p><p className="font-semibold text-gray-800">{item.name}</p></div>
            <div><p className="text-sm text-gray-400 mb-1">Email</p><p className="font-semibold text-gray-800">{item.Email}</p></div>
            <div><p className="text-sm text-gray-400 mb-1">Phone</p><p className="font-semibold text-gray-800">{item.Phone}</p></div>
            <div><p className="text-sm text-gray-400 mb-1">Country</p><p className="font-semibold text-gray-800">{item.Country}</p></div>
            <div><p className="text-sm text-gray-400 mb-1">City</p><p className="font-semibold text-gray-800">{item.City}</p></div>
            <div><p className="text-sm text-gray-400 mb-1">ZIP Code</p><p className="font-semibold text-gray-800">{item.ZIPCode}</p></div>
            <div className="md:col-span-2"><p className="text-sm text-gray-400 mb-1">Address</p><p className="font-semibold text-gray-800">{item.Address}</p></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PresonalInfo