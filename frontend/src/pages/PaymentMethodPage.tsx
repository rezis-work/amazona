import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckoutSteps from "../components/CheckoutSteps";
import { Helmet } from "react-helmet-async";

export default function PaymentMethodPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "PayPal"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className=" md:w-[600px] xl:w-[1100px] mx-auto border-[1px] p-5">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className=" md:text-xl my-3">Payment Method</h1>
        <form
          onSubmit={(e) => {
            submitHandler(e);
            backhandler(e);
          }}
        >
          <div className="mb-3 flex items-center">
            <input
              type="radio"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
              className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-500 text-blue-600"
            />
            <label
              htmlFor="PayPal"
              className=" md:text-lg ml-2 block text-sm  text-green-500"
            >
              PayPal
            </label>
          </div>
          <div className="mb-3 flex items-center">
            <input
              type="radio"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
              className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-500 text-blue-600"
            />
            <label
              htmlFor="Stripe"
              className="md:text-lg ml-2 block text-sm text-green-500"
            >
              Stripe
            </label>
          </div>
          <div>
            <button
              className=" bg-primaryColor text-white py-2 px-8 rounded-md hover:bg-green-500 duration-200 md:text-lg mb-3 w-52"
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
