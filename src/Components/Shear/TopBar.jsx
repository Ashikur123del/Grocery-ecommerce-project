import { Button, Dropdown, Label } from "@heroui/react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdAttachEmail } from "react-icons/md";

const  TopBar = () => {
  return (
    <div className="bg-[#05a845] text-white text-sm hidden md:block">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">

            <div className="flex items-center gap-1 text-white/90">
              <MdAttachEmail />
              <p className="hover:text-red-300 cursor-pointer">
                company@gmail.com
              </p>
            </div>

            <div className="flex items-center gap-1 text-white/90">
              <IoLocationSharp />
              <p>New York, United States</p>
            </div>

          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex gap-3 sm:border-r sm:border-white sm:pr-3">
              <FaFacebook className="cursor-pointer hover:text-blue-300" />
              <FaInstagram className="cursor-pointer hover:text-pink-300" />
              <FaTwitter className="cursor-pointer hover:text-sky-300" />
            </div>
            <Dropdown>
              <Button
                variant="light"
                className="text-white flex items-center gap-1 p-0"
              >
                English <IoMdArrowDropdown />
              </Button>

              <Dropdown.Popover>
                <Dropdown.Menu onAction={(key) => console.log(key)}>
                  <Dropdown.Item id="en">
                    <Label>English</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="es">
                    <Label>Spanish</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="fr">
                    <Label>French</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>

            {/* CURRENCY */}
            <Dropdown>
              <Button
                variant="light"
                className="text-white flex items-center gap-1 p-0"
              >
                USD <IoMdArrowDropdown />
              </Button>

              <Dropdown.Popover>
                <Dropdown.Menu onAction={(key) => console.log(key)}>
                  <Dropdown.Item id="usd">
                    <Label>$USD</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="eur">
                    <Label>$EUR</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="gbp">
                    <Label>$GBP</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>

          </div>

        </div>
      </div>
    </div>
  );
};

export default TopBar;