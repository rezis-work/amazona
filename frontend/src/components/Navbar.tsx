import { Link } from "react-router-dom";
import { Cart } from "../types/Cart";

interface NavProps {
  mode: string;
  modeHandle: () => void;
  cart: Cart;
}

export default function Navbar({ modeHandle, mode, cart }: NavProps) {
  return (
    <div className=" bg-primaryColor text-textPrimary py-3 px-3 xl:px-32 flex justify-between items-center">
      <h1 className="">AMAZONA</h1>
      <nav className=" flex gap-8">
        <button
          onClick={modeHandle}
          className="px-2 bg-textPrimary text-primaryColor rounded-md"
        >
          <i className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}></i>
        </button>
        <Link
          to={"/cart"}
          className="hover:text-gray-500 flex justify-center items-center relative"
        >
          Cart
          {cart.cartItems.length > 0 && (
            <div className="absolute -top-1 -right-3 w-4 h-4 flex justify-center items-center text-sm rounded-full bg-red-500">
              {cart?.cartItems?.reduce((a, c) => a + c.quantity, 0)}
            </div>
          )}
        </Link>
        <Link className=" hover:text-gray-500" to="/shop">
          Shop
        </Link>
        <Link className=" hover:text-gray-500" to="/signin">
          Signin
        </Link>
      </nav>
    </div>
  );
}
