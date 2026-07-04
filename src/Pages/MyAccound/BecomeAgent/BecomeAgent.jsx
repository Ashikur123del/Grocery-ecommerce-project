import { useState } from "react";
import { Card, Input, Label, Link } from "@heroui/react";
import { HiOutlineUpload } from "react-icons/hi";
import { FiSend } from "react-icons/fi";
import { FaCircleDollarToSlot } from "react-icons/fa6"; 

const BecomeAgent = () => {
  const [formData, setFormData] = useState({
    fatherName: "",
    dob: "",
    nidNumber: "",
    document: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen w-full text-slate-700 font-sans">
      
      {/* Top 3 Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Card 1 */}
        <Card className="p-5 text-center border border-slate-100 shadow-sm flex flex-col items-center justify-center bg-white">
          <FaCircleDollarToSlot className="text-blue-600 size-7 mb-2" />
          <h3 className="font-bold text-slate-800 text-sm">Earn Commission</h3>
          <p className="text-xs text-slate-500 mt-1">
            Get paid for every order you refer to us
          </p>
        </Card>

        {/* Card 2 */}
        <Card className="p-5 text-center border border-slate-100 shadow-sm flex flex-col items-center justify-center bg-white">
          <span className="text-3xl mb-2">📊</span>
          <h3 className="font-bold text-slate-800 text-sm">Track Sales</h3>
          <p className="text-xs text-slate-500 mt-1">
            Real-time dashboard to monitor your earnings
          </p>
        </Card>

        {/* Card 3 */}
        <Card className="p-5 text-center border border-slate-100 shadow-sm flex flex-col items-center justify-center bg-white">
          <span className="text-3xl mb-2">🚀</span>
          <h3 className="font-bold text-slate-800 text-sm">Grow Together</h3>
          <p className="text-xs text-slate-500 mt-1">
            Exclusive tools & dedicated support to scale
          </p>
        </Card>
      </div>

      {/* Main Application Form Container */}
      <Card className="w-full shadow-sm border border-slate-200 overflow-hidden bg-white">
        <Card.Header className="border-b border-slate-100 p-4">
          <h2 className="text-base font-bold text-slate-800">
            Apply to Become an Agent
          </h2>
        </Card.Header>

        <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-6">
          {/* Note Alert */}
          <div className="bg-[#E0F7FA] text-[#006064] text-xs md:text-sm p-3 rounded-lg border border-[#B2EBF2]">
            <span className="font-bold">Note:</span> Applying as{" "}
            <span className="font-bold">Mojambal</span> (mojambal123@gmail.com).
            Only KYC details are required below.
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Father's Name */}
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="fatherName"
                className="text-xs font-semibold text-slate-600"
              >
                Father's Name{" "}
                <span className="text-slate-400 font-normal">(optional)</span>
              </Label>
              <Input
                id="fatherName"
                name="fatherName"
                type="text"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Enter father's name"
                className="w-full"
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="dob"
                className="text-xs font-semibold text-slate-600"
              >
                Date of Birth{" "}
                <span className="text-slate-400 font-normal">(optional)</span>
              </Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className="w-full text-slate-500"
              />
            </div>

            {/* NID Number */}
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="nidNumber"
                className="text-xs font-semibold text-slate-600"
              >
                NID Number{" "}
                <span className="text-slate-400 font-normal">(optional)</span>
              </Label>
              <Input
                id="nidNumber"
                name="nidNumber"
                type="text"
                value={formData.nidNumber}
                onChange={handleChange}
                placeholder="National ID number"
                className="w-full"
              />
            </div>
          </div>

          {/* NID / Document Photo Upload Area */}
          <div className="flex flex-col gap-1">
            <Label className="text-xs font-semibold text-slate-600">
              NID / Document Photo{" "}
              <span className="text-slate-400 font-normal">
                (optional · JPG/PNG/PDF, max 2MB)
              </span>
            </Label>

            <Label className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition bg-slate-50/50">
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                className="hidden"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    document: e.target.files[0],
                  }))
                }
              />
              <HiOutlineUpload className="text-slate-400 text-3xl mb-2" />
              <span className="text-xs text-slate-500 font-medium">
                Click to upload NID document
              </span>
            </Label>
            {formData.document && (
              <p className="text-xs text-emerald-600 font-medium mt-1">
                ✓ Selected: {formData.document.name}
              </p>
            )}
          </div>

          {/* Card Footer for Action Buttons */}
          <Card.Footer className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 px-0 pb-0 justify-between">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="submit"
                className="bg-[#F28C28] hover:bg-[#E07B18] text-white font-bold py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 shadow-sm text-sm transition-colors duration-200"
              >
                <FiSend className="transform rotate-45 mb-0.5" />
                Submit Application
              </button>
              <span className="text-xs text-slate-500 font-medium text-center sm:text-left">
                Pending admin approval after submission.
              </span>
            </div>

            {/* ডানপাশে বা নিচে সুন্দর লিংক ডিজাইন */}
            <div className="text-xs text-slate-500 font-medium text-center sm:text-right">
              Visit our{" "}
              <Link
                aria-label="Go to Creator Hub (opens in new tab)"
                href="https://heroui.com"
                rel="noopener noreferrer"
                target="_blank"
                className="text-xs text-blue-600 hover:underline inline-flex items-center gap-0.5"
              >
                Creator Hub
                <Link.Icon aria-hidden="true" className="size-3" />
              </Link>
            </div>
          </Card.Footer>
        </form>
      </Card>
    </div>
  );
};

export default BecomeAgent;