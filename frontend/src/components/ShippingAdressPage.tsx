import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import CheckoutSteps from "./CheckoutSteps";

export default function ShippingAdressPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch({
      type: "SAVE_SHIPPING_ADRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };

  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="md:w-[600px] xl:w-[1100px] mx-auto">
        <h1 className=" my-3">Shipping Adress</h1>
        <div className=" border-[1px] p-5">
          <form onSubmit={submitHandler}>
            <div className=" mb-5">
              <label className="tracking-wider font-semibold" htmlFor="name">
                Full Name
              </label>{" "}
              <br />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="border-[1px] border-primaryColor py-2 px-2 w-80 mt-3 md:text-2xl text-primaryColor rounded-md"
              />
            </div>
            <div className=" mb-5">
              <label className="tracking-wider font-semibold" htmlFor="name">
                Adress
              </label>{" "}
              <br />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="border-[1px] border-primaryColor py-2 px-2 w-80 mt-3 md:text-2xl text-primaryColor rounded-md"
              />
            </div>
            <div className=" mb-5">
              <label className="tracking-wider font-semibold" htmlFor="name">
                City
              </label>{" "}
              <br />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="border-[1px] border-primaryColor py-2 px-2 w-80 mt-3 md:text-2xl text-primaryColor rounded-md"
              />
            </div>
            <div className=" mb-5">
              <label className="tracking-wider font-semibold" htmlFor="name">
                Postal Code
              </label>{" "}
              <br />
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                className="border-[1px] border-primaryColor py-2 px-2 w-80 mt-3 md:text-2xl text-primaryColor rounded-md"
              />
            </div>
            <div className=" mb-5">
              <label className=" font-semibold tracking-wider" htmlFor="name">
                Country
              </label>{" "}
              <br />
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="border-[1px] border-primaryColor py-2 px-2 w-80 mt-3 outline-none md:text-2xl text-primaryColor rounded-md"
              />
            </div>
            <div className=" mb-3">
              <button
                className="w-80 py-2 px-8 bg-primaryColor text-white font-bold hover:bg-black duration-200 rounded-md"
                type="submit"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
