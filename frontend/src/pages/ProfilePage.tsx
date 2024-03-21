import { useContext, useState } from "react";
import { Store } from "../Store";
import Container from "../components/Container";
import { useUpdateProfileMutation } from "../hooks/userHooks";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const [name, setName] = useState(userInfo?.name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber || "");

  const { mutate: updateProfile } = useUpdateProfileMutation();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    updateProfile(
      { name, email, phoneNumber },
      {
        onSuccess: (updatedUserInfo) => {
          dispatch({ type: "USER_UPDATE_PROFILE", payload: updatedUserInfo });
          toast.success("Profile updated successfully!");
        },
        onError: (error) => {
          // Handle error
          console.error("Error updating profile:", error);
          toast.error("Failed to update profile.");
        },
      }
    );
  };

  return (
    <Container>
      <h1 className=" pl-5 mb-10 border-b pb-2 text-3xl font-bold text-primaryColor">
        {userInfo?.isAdmin ? "Admin Profile" : "User Profile"}
      </h1>
      <div className=" flex px-5 border-l-[2px]">
        <div className=" flex flex-col gap-3">
          <h1 className=" md:text-2xl font-semibold text-primaryColor">
            User Name: <span>{userInfo?.name}</span>
          </h1>
          <p className=" text-xl font-semibold text-primaryColor">
            E-mail: {userInfo?.email}
          </p>
          <p className=" text-xl font-semibold text-primaryColor">
            Phone Number: {userInfo?.phoneNumber}
          </p>
          <p className=" text-xl font-semibold text-primaryColor">
            Status: {userInfo?.isAdmin ? "Admin" : "User"}
          </p>
        </div>
      </div>
      <div className=" mt-36 pl-5">
        <h3 className=" md:text-2xl font-semibold mb-10">
          Change your details
        </h3>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-3">
          <input
            type="text"
            className=" outline-none border-[1px] w-[400px] pl-5 py-2"
            placeholder="enter new name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className=" outline-none border-[1px] w-[400px] pl-5 py-2"
            placeholder="enter new E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className=" outline-none border-[1px] w-[400px] pl-5 py-2"
            placeholder="enter new Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button
            className=" w-[400px] flex justify-center py-2 bg-primaryColor text-white text-lg rounded-lg hover:bg-textPrimary hover:text-primaryColor duration-200"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </Container>
  );
}
