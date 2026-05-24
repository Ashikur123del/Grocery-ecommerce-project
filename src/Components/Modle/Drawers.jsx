import { RiShoppingBagFill } from "react-icons/ri";
import { House, Magnifier, Bell, Envelope, Person, Gear } from "@gravity-ui/icons";
import { Drawer, Button } from "@heroui/react";

export function Drawers() {
  const navItems = [
    { icon: House, label: "Home" },
    { icon: Magnifier, label: "Search" },
    { icon: Bell, label: "Notifications" },
    { icon: Envelope, label: "Messages" },
    { icon: Person, label: "Profile" },
    { icon: Gear, label: "Settings" },
  ];

  return (
    <Drawer>
      <Drawer.Trigger asChild>
        <div className="relative cursor-pointer group p-2">
          <RiShoppingBagFill 
            size={24} 
            className="text-[#05a845] transition-all duration-300" 
          />
          <span className="absolute top-0 right-0 bg-[#05a845] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            1
          </span>
        </div>
      </Drawer.Trigger>

      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          {(onClose) => (
            <Drawer.Dialog >
              <Drawer.CloseTrigger className="bg-[#05a845] text-white"/>
              <Drawer.Header className="border-b ">
                <Drawer.Heading className="text-xl font-bold text-[#05a845]">Shopping Cart</Drawer.Heading>
              </Drawer.Header>
              
              <Drawer.Body>
                <nav className="flex flex-col gap-2 mt-4">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium hover:bg-gray-100 transition-colors text-left w-full group"
                      type="button"
                    >
                      <item.icon className="size-5 text-gray-400 group-hover:text-[#05a845]" />
                      <span className="text-gray-700">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </Drawer.Body>

              <Drawer.Footer className="border-t">
                <Button 
                  color="danger" 
                  variant="flat" 
                  className="w-full font-semibold"
                  onPress={onClose}
                >
                  Close Menu
                </Button>
              </Drawer.Footer>
            </Drawer.Dialog>
          )}
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}