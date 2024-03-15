import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { useCreateOrderMutation } from "../hooks/orderHooks";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import CheckoutSteps from "../components/CheckoutSteps";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";

export default function PlaceOrderPage() {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const { mutateAsync: createOrder, isLoading } = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const data = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      });
      dispatch({ type: "CART_CLEAR" });
      localStorage.removeItem("cartItems");
      navigate(`/orders/${data.order._id}`);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className=" my-3 px-5 text-2xl font-semibold text-center pb-10 border-b-[1px] border-b-black">
        Preview Order
      </h1>
      <div className=" flex flex-col lg:flex-row  justify-center px-5">
        <div className=" basis-2/3 ">
          <div className=" flex flex-col lg:flex-row gap-8 pt-3">
            <div className=" inline-flex border-[1px] p-3 rounded-lg">
              <h2 className=" mr-4 font-bold text-xl">Shipping: </h2>
              <div className=" flex flex-col gap-1">
                <p className=" flex gap-4">
                  <strong>Name</strong>
                  {cart.shippingAddress.fullName}
                </p>
                <p className=" flex gap-4">
                  <strong>Address:</strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </p>
                <Link
                  className=" border-[1px] px-6 py-2 w-20 text-lg rounded-lg hover:bg-black hover:text-white bg-primaryColor text-white duration-200"
                  to={"/shipping"}
                >
                  Edit
                </Link>
              </div>
            </div>
            <div className=" inline-flex border-[1px] p-5 rounded-lg">
              <h2 className="mr-4 font-bold text-xl">Payment:</h2>
              <div className=" flex flex-col gap-4">
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
                <Link
                  className=" border-[1px] px-6 py-2 text-lg rounded-lg bg-primaryColor text-white hover:bg-black hover:text-white w-20 duration-200"
                  to={"/payment"}
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h2 className=" text-3xl font-semibold my-10">Items</h2>
            <div className=" pb-5">
              <ul className=" border-[1px] p-5 mb-10">
                {cart.cartItems.map((item) => (
                  <li key={item._id} className=" mb-10 border p-5 rounded-lg">
                    <div className=" flex flex-col md:flex-row items-center ">
                      <div className=" basis-2/4 flex flex-col justify-center items-center md:block">
                        <Link to={`/product/${item.slug}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className=" mb-5 w-20 hover:scale-125 duration-300"
                          />
                        </Link>
                        <Link
                          className=" hover:text-red-500 duration-200"
                          to={`/product/${item.slug}`}
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className=" basis-1/4">
                        <p className=" text-xl">Amount: {item.quantity}</p>
                      </div>
                      <div className=" basis-1/4">
                        <p className=" text-2xl text-green-600">
                          Price: ${item.price}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                className=" border-[1px]  py-3 px-10 text-xl bg-primaryColor text-white rounded-md hover:bg-black duration-200"
                to="/cart"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
        <div className=" basis-1/3 border-l border-b border-r xl:ml-10 mt-10 xl:mt-0 ">
          <div>
            <div>
              <h2 className=" text-center text-xl font-bold">Order Summary</h2>
            </div>
            <div className="pl-5 mt-10 mb-8">
              <ul className=" list-none">
                <li className="  text-xl font-semibold">Items Price:</li>
                <li className=" text-xl">${cart.itemsPrice.toFixed(2)}</li>
              </ul>
            </div>
            <div className="pl-5 mt-10 mb-8">
              <ul className=" list-none">
                <li className="  text-xl font-semibold">Shipping Price:</li>
                <li className=" text-xl">${cart.shippingPrice.toFixed(2)}</li>
              </ul>
            </div>
            <div className="pl-5 mt-10 mb-8">
              <ul className=" list-none">
                <li className="  text-xl font-semibold">Tax Price:</li>
                <li className=" text-xl">${cart.taxPrice.toFixed(2)}</li>
              </ul>
            </div>
            <div className="pl-5 mt-10 mb-8">
              <ul className=" list-none">
                <li className="  text-xl font-semibold">Order Total Price:</li>
                <li className=" text-xl">${cart.totalPrice.toFixed(2)}</li>
              </ul>
            </div>
            <div className=" pl-5">
              <div>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0 || isLoading}
                  className=" bg-primaryColor px-10 py-3 text-xl rounded-md text-white hover:bg-black duration-200"
                >
                  Place Order
                </button>
                {isLoading && <LoadingBox></LoadingBox>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
