import { useContext } from "react";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { query } = state;
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
  };

  return (
    <form onSubmit={submitHandler} className=" relative">
      <input
        type="text"
        value={query}
        onChange={(e) =>
          dispatch({ type: "FILTER_PRODUCTS", payload: e.target.value })
        }
        placeholder="Famazona Search"
        className=" py-1 px-2 rounded-lg w-[170px] md:w-[250px] lg:w-[450px] xl:w-[500px] outline-none text-primaryColor font-semibold"
      />
      <button type="submit">
        <i className=" fas fa-search absolute top-2 right-2 text-primaryColor"></i>
      </button>
    </form>
  );
}
