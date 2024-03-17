import { Link } from "react-router-dom";
import { Cart } from "../types/Cart";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Store } from "../Store";
// import SearchInput from "./SearchInput";

interface NavProps {
  mode: string;
  modeHandle: () => void;
  cart: Cart;
}

export default function Navbar({ modeHandle, mode, cart }: NavProps) {
  const [opacity, setOpacity] = useState("bg-opacity-100");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const handleScroll = () => {
      const scrollOpacity =
        window.scrollY < 100 ? "bg-opacity-100" : "bg-opacity-80";
      setOpacity(scrollOpacity);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };

  const signOutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  // const navigate = useNavigate();

  // const handleSearch = (query: string) => {
  //   navigate(`/search?query=${query}`);
  // };

  return (
    <div
      className={`bg-primaryColor text-textPrimary py-3 px-3 xl:px-32 flex justify-between items-center top-0 z-50 fixed w-full ${opacity} transition-opacity duration-300`}
    >
      <h1 className=" text-2xl font-bold">
        <Link onClick={closeMenu} to={"/"}>
          FAMAZONA
        </Link>
      </h1>
      {/* <SearchInput onSearch={(query) => navigate(`/search?query=${query}`)} /> */}

      <div className=" md:hidden cursor-pointer">
        <button onClick={() => setIsMenuOpen((cur) => !cur)}>
          <i className=" fa fa-bars text-lg"></i>
        </button>
      </div>
      <div
        className={`fixed top-0 right-0 h-full z-40 w-64 bg-primaryColor transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col gap-8 p-5 md:hidden`}
      >
        <button onClick={() => setIsMenuOpen(false)} className="self-end">
          <i className="fa fa-times"></i>
        </button>
        <button
          onClick={() => {
            modeHandle();
            closeMenu();
          }}
          className="px-2 bg-textPrimary text-primaryColor rounded-md"
        >
          {mode === "light" ? (
            <i className="fa fa-sun"></i>
          ) : (
            <i className="fa fa-moon"></i>
          )}
        </button>
        <Link
          to="/cart"
          onClick={closeMenu}
          className="hover:text-gray-500 flex items-center"
        >
          Cart
          {cart.cartItems.length > 0 && (
            <span className="ml-2 rounded-full bg-red-500 px-2 py-1 text-xs">
              {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
            </span>
          )}
        </Link>
        <Link to="/shop" onClick={close} className="hover:text-gray-500">
          Shop
        </Link>
        {userInfo ? (
          <div className="relative">
            <button
              onClick={toggleUserDropdown}
              className={`hover:text-gray-500 flex items-center gap-2`}
            >
              {userInfo.name}{" "}
              {isUserDropdownOpen ? (
                <i className="fas fa-hand-point-up text-white"></i>
              ) : (
                <i className="fas fa-hand-point-down text-white"></i>
              )}
            </button>
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md py-1 text-primaryColor">
                <Link
                  to="/orderhistory"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Order History
                </Link>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/signin"
                  onClick={() => {
                    closeMenu(), signOutHandler();
                  }}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Sign Out
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/signin"
            onClick={closeMenu}
            className="hover:text-gray-500"
          >
            Signin
          </Link>
        )}
      </div>
      <nav
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:flex gap-8 flex-col md:flex-row absolute md:relative top-full right-0 min-w-[200px] md:min-w-0 bg-primaryColor md:bg-transparent p-5 md:p-0`}
      >
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
        {userInfo ? (
          <div className="relative ">
            <button
              onClick={toggleUserDropdown}
              className="hover:text-gray-500 flex items-center gap-2"
            >
              {userInfo.name}
              {isUserDropdownOpen ? (
                <i className="fas fa-hand-point-up text-white "></i>
              ) : (
                <i className="fas fa-hand-point-down text-white "></i>
              )}
            </button>
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-primaryColor rounded-md py-1">
                <Link
                  to="/orderhistory"
                  className="block px-4 py-2 hover:bg-gray-100 hover:text-primaryColor"
                >
                  Order History
                </Link>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="block px-4 py-2 hover:text-primaryColor hover:bg-gray-100 duration-200"
                >
                  Profile
                </Link>
                <Link
                  to="/signin"
                  onClick={() => {
                    closeMenu(), signOutHandler();
                  }}
                  className="block px-4 py-2 hover:text-primaryColor hover:bg-gray-100 duration-200"
                >
                  Sign Out
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/signin"
            onClick={closeMenu}
            className="hover:text-gray-500"
          >
            Signin
          </Link>
        )}
      </nav>
    </div>
  );
}
