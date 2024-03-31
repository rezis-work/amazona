import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { CartItem } from "../types/Cart";
import { Link } from "react-router-dom";
import MessageBox from "./MessageBox";

export default function CartPage() {
  const navigate = useNavigate();
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);

  const updateCartHandler = (item: CartItem, quantity: number) => {
    if (quantity < 1) return;
    if (item.countInStock < quantity) {
      toast.warn("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  const removeItemHandler = (item: CartItem) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (
    <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        {cartItems.length > 0 ? (
          cartItems.map((item: CartItem) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-0 md:items-center mb-4 p-4 shadow"
            >
              <div className="flex items-center md:flex-1">
                <Link to={`/product/${item.slug}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-cover mr-6"
                  />
                </Link>
                <div>
                  <Link
                    to={`/product/${item.slug}`}
                    className=" text-md hover:text-red-500 duration-200 font-bold"
                  >
                    {item.name}
                  </Link>
                  <div className=" flex gap-2">
                    <button
                      onClick={() => updateCartHandler(item, item.quantity - 1)}
                    >
                      <i className=" fas fa-minus-circle"></i>
                    </button>
                    <p>Quantity: {item.quantity}</p>
                    <button
                      onClick={() => updateCartHandler(item, item.quantity + 1)}
                    >
                      <i className=" fas fa-plus-circle"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className=" md:flex-1 font-semibold text-primaryColor text-lg">
                <p>${item.price}</p>
              </div>
              <div className=" md:flex-2">
                <button onClick={() => removeItemHandler(item)}>
                  <i className=" fa fa-trash hover:text-red-500 duration-200"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <MessageBox>
            Your cart is empty{" "}
            <Link
              className=" bg-red-700 text-white py-1 px-2 rounded-md ml-3 hover:bg-textPrimary hover:text-red-500 duration-200"
              to={"/"}
            >
              Go back to shopping
            </Link>
          </MessageBox>
        )}
      </div>
      <div className="md:col-span-1 bg-gray-100 p-4 shadow">
        <ul className=" mb-3">
          {cartItems.map((item: CartItem, i: number) => (
            <li
              className=" flex justify-start items-center mb-2 text-lg text-primaryColor font-semibold"
              key={item._id}
            >
              {i + 1}) {item.name} - {item.quantity} piece
            </li>
          ))}
        </ul>
        <p className="text-xl mb-4 subtotal">
          Subtotal: ${calculateTotal().toFixed(2)}
        </p>
        <button
          className="bg-primaryColor text-white w-full py-2 rounded hover:bg-primaryColor-dark"
          onClick={checkoutHandler}
          disabled={cartItems.length === 0}
        >
          Continue to Checkout
        </button>
      </div>
    </div>
  );
}
