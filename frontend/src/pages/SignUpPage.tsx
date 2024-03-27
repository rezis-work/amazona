import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { useSignupMutation } from "../hooks/userHooks";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import Container from "../components/Container";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import { motion } from "framer-motion";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redicrect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberError, setIsPhoneNumberError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const { mutateAsync: signup, isPending } = useSignupMutation();

  const validateEmail = (email: string) => {
    // Basic regex for email validation
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    }
    if (isNaN(Number(phoneNumber))) {
      setIsPhoneNumberError(true);
      return;
    }
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    try {
      const data = await signup({
        name,
        email,
        phoneNumber,
        password,
      });
      console.log("Signup successful, response data:", data);
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect);
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(getError(err as ApiError));
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className=" text-center font-bold  text-2xl mt-3 border-b-[1px] border-b-primaryColor pb-5">
        Sign Up
      </h1>
      <motion.div
        initial={{ y: 50, opacity: 0 }} // Initial position and opacity
        animate={{
          y: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 300 },
        }}
        className=" bg-white shadow-2xl  mb-20 rounded-xl flex items-center justify-center mt-9 py-20 lg:w-[50%] mx-auto"
      >
        <form onSubmit={submitHandler}>
          <div className=" mb-3">
            <label
              className=" md:text-xl  text-primaryColor font-semibold"
              htmlFor="email"
            >
              Name / NickName
            </label>{" "}
            <br />
            <input
              type="text"
              className=" mt-2 border p-2 w-[280px] md:text-lg outline-none rounded-md"
              placeholder="Name / Nickname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className=" mb-3">
            <label
              className=" md:text-xl  text-primaryColor font-semibold"
              htmlFor="email"
            >
              E-mail Adress
            </label>{" "}
            <br />
            <input
              type="email"
              className=" mt-2 border p-2 w-[280px] md:text-lg outline-none rounded-md"
              placeholder="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(!validateEmail(e.target.value));
              }}
              required
            />
            {emailError && (
              <p className="text-red-500">Please enter a valid email address</p>
            )}
          </div>
          <div className=" mb-3">
            <label
              className=" md:text-xl  text-primaryColor font-semibold"
              htmlFor="email"
            >
              Phone Number
            </label>{" "}
            <br />
            <input
              type="text"
              className=" mt-2 border p-2 w-[280px] md:text-lg outline-none rounded-md"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d*$/.test(input)) {
                  setPhoneNumber(input);
                  setIsPhoneNumberError(false);
                } else {
                  setIsPhoneNumberError(true);
                }
              }}
              required
            />
            {isPhoneNumberError && (
              <p className="text-red-500">Please enter a valid number</p>
            )}
          </div>
          <div className=" mt-5">
            <label
              className=" md:text-xl text-primaryColor font-semibold"
              htmlFor="password"
            >
              Password
            </label>{" "}
            <br />
            <input
              type="password"
              className="mt-2 mb-7 border p-2 w-[280px] md:text-lg outline-none rounded-md"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label
              className=" md:text-xl text-primaryColor font-semibold"
              htmlFor="password"
            >
              Reapeat Password
            </label>{" "}
            <br />
            <input
              type="password"
              className="mt-2 mb-7 border p-2 w-[280px] md:text-lg outline-none rounded-md"
              placeholder="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className=" flex justify-center">
            <button
              disabled={isPending}
              type="submit"
              className=" bg-primaryColor text-white py-3 w-full mb-5 hover:bg-black md:text-lg duration-200 rounded-md"
            >
              Sign Up
            </button>
            {isPending && <LoadingBox />}
          </div>
          <div className=" text-primaryColor flex justify-between items-center">
            <span className=" font-semibold">Already habe an account?</span>
            <Link
              className=" bg-primaryColor text-textPrimary py-1 px-2 rounded-lg hover:bg-textPrimary hover:text-primaryColor duration-200"
              to={`/signin?redirect=${redirect}`}
            >
              Sign In
            </Link>
          </div>
        </form>
      </motion.div>
    </Container>
  );
}
