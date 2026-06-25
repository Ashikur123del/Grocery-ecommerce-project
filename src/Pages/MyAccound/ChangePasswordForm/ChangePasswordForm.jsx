
import { Input, Button } from "@heroui/react";

import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function ChangePasswordForm() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className=" p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold mb-6">Change Password</h2>
      
      <div className="space-y-4">
        <Input
          label="Current Password"
          placeholder="Enter current password"
          className="w-full border-1 border-amber-400"
          type={isVisible ? "text" : "password"}
          variant="bordered"
          endContent={
            <button onClick={toggleVisibility} type="button">
              {isVisible ? <BsEyeSlash className="text-2xl text-default-400" /> : <BsEye className="text-2xl text-default-400" />}
            </button>
          }
        />
        
        <div className="flex gap-4">
          <Input
            label="New Password"
            className="w-full border-1 border-amber-400"
            placeholder="Enter new password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <Input
            label="Confirm New Password"
            className="w-full border-1 border-amber-400"
            placeholder="Confirm new password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
        </div>

        <Button color="primary" className="mt-4 rounded-sm bg-amber-500">
          Submit
        </Button>
      </div>
    </div>
  );
}