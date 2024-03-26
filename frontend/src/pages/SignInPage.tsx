import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { useSigninMutation } from "../hooks/userHooks";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import Container from "../components/Container";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import { motion } from "framer-motion";

export default function SignInPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const { mutateAsync: signin, isLoading } = useSigninMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const data = await signin({
        email,
        password,
      });
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className=" text-center font-bold  text-2xl mt-3 border-b-[1px] border-b-primaryColor pb-5">
        Sign In
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
              E-mail Adress
            </label>{" "}
            <br />
            <input
              type="email"
              className=" mt-2 border p-2 w-[280px] md:text-lg outline-none rounded-md"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
          <div className=" flex justify-center">
            <button
              disabled={isLoading}
              type="submit"
              className=" bg-primaryColor text-white py-3 w-full mb-5 hover:bg-black md:text-lg duration-200"
            >
              Sign In
            </button>
            {isLoading && <LoadingBox />}
          </div>
          <div className=" text-primaryColor flex justify-between items-center">
            <span className=" font-semibold">New customer?</span>
            <Link
              className=" bg-primaryColor text-textPrimary py-1 px-2 rounded-lg hover:bg-textPrimary hover:text-primaryColor duration-200"
              to={`/signup?redirect=${redirect}`}
            >
              Create your account
            </Link>
          </div>
        </form>
      </motion.div>
    </Container>
  );
}
