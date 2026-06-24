"use client";

import { useState } from "react";
import { BsEnvelope, BsTelephone } from "react-icons/bs";
import AddressEdit from "../../../Components/Modle/AddressEdit";


const addresses = [
  { id: 1, address: "123 Main St, Apt 4B, New York, NY 10001", email: "home@example.com", phone: "(123) 456-7890" },
  { id: 2, address: "456 Business Ave, Suite 200, Los Angeles, CA 90001", email: "office@example.com", phone: "(987) 654-3210" },
  { id: 3, address: "456 Business Ave, Suite 200, Los Angeles, CA 90001", email: "office@example.com", phone: "(987) 654-3210" },
  { id: 4, address: "456 Business Ave, Suite 200, Los Angeles, CA 90001", email: "office@example.com", phone: "(987) 654-3210" },
];

const Address = () => {
  const [selectedId, setSelectedId] = useState(3);
  
  
  const currentAddress = addresses.find(addr => addr.id === selectedId);

  return (
    <div className=" p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Addresses</h2>
        <AddressEdit initialData={currentAddress} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
              selectedId === item.id 
                ? "border-amber-400 border-dashed bg-amber-50/30" 
                : "border-gray-200 border-dotted hover:border-gray-300"
            }`}
          >
            <div className="flex items-start gap-3">
              <input 
                type="radio" 
                checked={selectedId === item.id} 
                onChange={() => {}}
                className="mt-1 accent-amber-500" 
              />
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-semibold text-gray-800 mb-2">{item.address}</p>
                <div className="flex items-center gap-2"><BsEnvelope /> {item.email}</div>
                <div className="flex items-center gap-2"><BsTelephone /> {item.phone}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Address;