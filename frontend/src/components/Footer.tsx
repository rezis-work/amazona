import FooterContainer from "./FooterContainer";
import FooterSocialIcons from "./FooterSocialIcons";
import { Icons } from "../menus";

export default function Footer() {
  return (
    <footer className=" bg-gray-900 text-white mt-[100px] ">
      <div className=" md:flex md:justify-between sm:px-12 px-4 md:items-center bg-[#ffffff19] py-7">
        <h1 className=" lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className=" text-teal-400">Free</span> request your first coupon
        </h1>
        <div className=" flex flex-col lg:justify-between">
          <input
            type="text"
            placeholder="Enter Your ph.no"
            className=" text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className=" sm:w-72 w-full mt-1 bg-teal-400 hover:bg-teal-500 duration-300 px-5 py-2.5 font-semibold rounded-md text-white">
            Request Code
          </button>
        </div>
      </div>
      <FooterContainer />
      <div className=" grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
        <span>&copy; 2024 Famazona. All right reserved.</span>
        <span>Terms | Privacy Policy</span>
        <FooterSocialIcons Icons={Icons} />
      </div>
    </footer>
  );
}
