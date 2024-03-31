import { useContext, useState } from "react";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
type FilterType = "category" | "brand" | "priceRange" | "rating";
type FilterValue = string | number[] | number;

const FilterSidebar = () => {
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();
  const updateFilter = (filterType: FilterType, value: FilterValue) => {
    dispatch({ type: "UPDATE_FILTER", payload: { filterType, value } });
    const queryParams = new URLSearchParams(window.location.search);

    if (value !== undefined && value !== null && value !== "") {
      if (filterType === "priceRange" && Array.isArray(value)) {
        queryParams.set("priceMin", value[0].toString());
        if (value[1] !== Infinity) {
          // Handle the case where price range has an upper limit
          queryParams.set("priceMax", value[1].toString());
        } else {
          queryParams.delete("priceMax"); // Ensure no upper limit is set if the range is "Over $150"
        }
      } else {
        queryParams.set(filterType, value.toString());
      }
    } else {
      queryParams.delete(filterType);
    }

    navigate(`/filtered?${queryParams.toString()}`, { replace: true });
  };
  const clearFilters = () => {
    dispatch({ type: "CLEAR_ALL_FILTERS" });
    navigate("/filtered", { replace: true });
  };
  const categories = ["Shirts", "Pants", "Tees", "Tops", "Polos", "Jerseys"];
  const brands = ["Nike", "Adidas", "Converse", "Patagonia"];
  const priceRanges = [
    { label: "$50 to $100", value: [50, 100] },
    { label: "$100 to $150", value: [100, 150] },
    { label: "Over $150", value: [150, Infinity] },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-10"
        } h-screen duration-300 bg-primaryColor relative  `}
      >
        <div onClick={() => setOpen(!open)} className=" z-30">
          {open ? (
            <i className="fas fa-hand-point-left absolute cursor-pointer right-3 top-9 w-14   text-red-600 flex justify-center text-2xl  rounded-l-2xl"></i>
          ) : (
            <i className="fas fa-hand-point-right absolute cursor-pointer -right-12 top-9 w-14  text-red-600 flex justify-center text-2xl  rounded-l-2xl"></i>
          )}
        </div>
        <div className=" flex gap-x-4 items-center">
          <h1
            className={` cursor-pointer duration-500 font-bold text-3xl border-[1px] border-white inline py-1 px-4 hover:border-primaryColor rounded-full`}
          >
            F
          </h1>
          <h2
            className={` text-white origin-left font font-medium text-xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            Famazona filters
          </h2>
        </div>
        {open ? (
          <>
            <div className=" pt-2">
              <h3 className=" m-0 p-0">{open ? "Categories" : "Cate"}</h3>
              <ul className=" pt-1">
                {categories.map((cate, i) => (
                  <li
                    key={i}
                    onClick={() => updateFilter("category", cate)}
                    className={`text-gray-300 text-sm flex items-center gap-x-2 cursor-pointer p-2 hover:bg-gray-200 hover:text-primaryColor  rounded-md `}
                  >
                    {open ? cate : cate.slice(0, 1)}
                    <span>
                      <i className="fas fa-solid fa-arrow-right"></i>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className=" pt-2">
              <h3 className=" m-0 p-0">Brands</h3>
              <ul className=" ">
                {brands.map((brand) => (
                  <li
                    key={brand}
                    onClick={() => updateFilter("brand", brand)}
                    className=" text-gray-300 text-sm flex items-center gap-x-2 cursor-pointer p-2 hover:bg-gray-200 hover:text-primaryColor  rounded-md"
                  >
                    {open ? brand : brand.slice(0, 1)}
                    <span>
                      <i className="fas fa-solid fa-arrow-right"></i>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className=" pt-2">
              <h3 className=" m-0 p-0">Price</h3>
              <ul className="">
                {priceRanges.map(({ label, value }) => (
                  <li
                    key={label}
                    onClick={() => updateFilter("priceRange", value)}
                    className=" text-gray-300 text-sm flex items-center gap-x-2 cursor-pointer p-2 hover:bg-gray-200 hover:text-primaryColor  rounded-md"
                  >
                    {open ? label : "$"}
                    <span>
                      <i className="fas fa-solid fa-arrow-right"></i>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={clearFilters}
              className="text-gray-300 text-sm flex items-center gap-x-2 cursor-pointer p-2 hover:bg-gray-200 hover:text-primaryColor  rounded-md border-[1px] mt-2"
            >
              {open ? "Claer Filter" : "Clear"}
            </button>
          </>
        ) : (
          <>
            <div className=" flex">
              <div className=" pt-5">
                <h3 className=" m-0 p-0">{open ? "Categories" : "Cate"}</h3>
                <ul className=" pt-1">
                  {categories.map((cate, i) => (
                    <li
                      key={i}
                      onClick={() => updateFilter("category", cate)}
                      className=" text-gray-300 text-sm flex items-center gap-x-2 cursor-pointer p-2 hover:bg-gray-200 hover:text-primaryColor  rounded-md"
                    >
                      {open ? cate : cate.slice(0, 1)}
                      <span>
                        <i className="fas fa-solid fa-arrow-right"></i>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={` pt-5 ${!open && "scale-0"}`}>
                <h3 className=" m-0 p-0">Brands</h3>
                <ul className=" ">
                  {brands.map((brand) => (
                    <li
                      key={brand}
                      onClick={() => updateFilter("brand", brand)}
                      className=" text-gray-300 text-sm flex items-center gap-x-2 cursor-pointer p-2 hover:bg-gray-200 hover:text-primaryColor  rounded-md"
                    >
                      {open ? brand : brand.slice(0, 1)}
                      <span>
                        <i className="fas fa-solid fa-arrow-right"></i>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={` pt-5 ${!open && "scale-0"}`}>
                <h3 className=" m-0 p-0">Price</h3>
                <ul className="">
                  {priceRanges.map(({ label, value }) => (
                    <li
                      key={label}
                      onClick={() => updateFilter("priceRange", value)}
                      className=" text-gray-300 text-sm flex items-center gap-x-2 cursor-pointer p-2 hover:bg-gray-200 hover:text-primaryColor  rounded-md"
                    >
                      {open ? label : "$"}
                      <span>
                        <i className="fas fa-solid fa-arrow-right"></i>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              onClick={clearFilters}
              className="text-gray-300 text-sm flex items-center gap-x-2 cursor-pointer p-2 hover:bg-gray-200 hover:text-primaryColor  rounded-md border-[1px] mt-2"
            >
              {open ? "Claer Filter" : "Clear"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;

{
  /* <div className="filter-sidebar"> 
      <div>
        <h3 className=" text-xl mb-5 text-white">Categories</h3>
        <ul className=" border p-2">
          {["Shirts", "Pants", "Tees", "Tops", "Polos", "Jerseys"].map(
            (category) => (
              <li
                key={category}
                onClick={() => updateFilter("category", category)}
                className="text-lg md:text-xl text-white cursor-pointer hover:text-blue-500"
              >
                {category}
              </li>
            )
          )}
        </ul>
      </div>
      <div>
        <h3 className=" text-xl mb-5 mt-2 text-white">Brands</h3>
        <ul className=" border p-2">
          {brands.map((brand) => (
            <li
              key={brand}
              onClick={() => updateFilter("brand", brand)}
              className=" text-lg md:text-xl text-white cursor-pointer hover:text-blue-500"
            >
              {brand}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className=" text-xl mb-5 mt-2 text-white">Price Range</h3>
        <ul className="border p-2">
          {priceRanges.map(({ label, value }) => (
            <li
              key={label}
              onClick={() => updateFilter("priceRange", value)}
              className=" mb-1 text-lg md:text-xl cursor-pointer hover:text-blue-500"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={clearFilters} className=" mt-5">
        Clear Filter
      </button>
    </div> */
}
