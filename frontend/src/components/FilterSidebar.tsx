import { useContext } from "react";
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
  const brands = [
    "Nike",
    "Adidas",
    "Lacosta",
    "Converse",
    "Patagonia",
    "Jordan",
  ];
  const priceRanges = [
    { label: "Under $50", value: [0, 50] },
    { label: "$50 to $100", value: [50, 100] },
    { label: "$100 to $150", value: [100, 150] },
    { label: "Over $150", value: [150, Infinity] },
  ];

  return (
    <div className="filter-sidebar">
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
    </div>
  );
};

export default FilterSidebar;
