

import { RiShoppingBagFill } from "react-icons/ri";

import {
  Drawer,
  Button,
} from "@heroui/react";
import { useCartStore } from "../../store/useCartStore";



export function Drawers() {

  const cartItems = useCartStore(
    (state) => state.cartItems
  );

  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <Drawer>

      <Drawer.Trigger asChild>

        <div className="relative cursor-pointer p-2">

          <RiShoppingBagFill
            size={24}
            className="text-[#05a845]"
          />

          {/* BADGE */}
          <span className="absolute top-0 right-0 bg-[#05a845] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {totalQuantity}
          </span>

        </div>

      </Drawer.Trigger>

      {/* DRAWER */}
      <Drawer.Backdrop>

        <Drawer.Content placement="right">

          {(onClose) => (

            <Drawer.Dialog>

              {/* CLOSE BUTTON */}
              <Drawer.CloseTrigger className="bg-[#05a845] text-white" />

              {/* HEADER */}
              <Drawer.Header className="border-b">

                <Drawer.Heading className="text-xl font-bold text-[#05a845]">
                  Shopping Cart
                </Drawer.Heading>

              </Drawer.Header>

              {/* BODY */}
              <Drawer.Body>

                <div className="flex flex-col gap-4 mt-4">

                  {cartItems.length === 0 ? (

                    <p className="text-center text-gray-500">
                      Cart is empty
                    </p>

                  ) : (

                    cartItems.map((item) => (

                      <div
                        key={item.id}
                        className="flex items-center gap-4 border rounded-xl p-3"
                      >

                        {/* IMAGE */}
                        <img
                          src={
                            item.image ||
                            item.images?.[0]
                          }
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />

                        {/* INFO */}
                        <div className="flex-1">

                          <h3 className="font-bold text-sm">
                            {item.name}
                          </h3>

                          <p className="text-[#05a845] font-semibold">
                            ৳{item.price}
                          </p>

                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>

                          <p className="text-sm font-bold text-orange-500">
                            Total:
                            ৳
                            {item.price *
                              item.quantity}
                          </p>

                        </div>

                        {/* REMOVE */}
                        <button
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Remove
                        </button>

                      </div>
                    ))
                  )}
                </div>

              </Drawer.Body>

              {/* FOOTER */}
              <Drawer.Footer className="border-t flex flex-col gap-3">

                {/* TOTAL */}
                <div className="flex items-center justify-between w-full">

                  <span className="font-bold text-lg">
                    Total:
                  </span>

                  <span className="font-black text-xl text-[#05a845]">
                    ৳{totalPrice}
                  </span>

                </div>

                {/* BUTTONS */}
                <div className="grid grid-cols-2 gap-3 w-full">

                  {/* CLEAR */}
                  <Button
                    color="danger"
                    variant="flat"
                    className="font-semibold"
                    onPress={clearCart}
                  >
                    Clear Cart
                  </Button>

                  {/* CLOSE */}
                  <Button
                    className="bg-[#05a845] text-white font-semibold"
                    onPress={onClose}
                  >
                    Checkout
                  </Button>

                </div>

              </Drawer.Footer>

            </Drawer.Dialog>
          )}

        </Drawer.Content>

      </Drawer.Backdrop>

    </Drawer>
  );
}