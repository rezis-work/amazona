import React, { useContext } from "react";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Product } from "../types/Product";

export default function SearchBox() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { query } = state;
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
    dispatch({ type: "FILTER_PRODUCTS", payload: "" });
  };
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) {
        try {
          const response = await fetch(
            `http://localhost:4000/api/products?query=${query}&page=1&pageSize=5` // Example: Fetching top 5 suggestions
          );
          const { products } = await response.json(); // Destructure `products` from the response
          setSuggestions(products);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [query]);

  return (
    <>
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
        <div className=" search-box-container">
          {showSuggestions && (
            <ul className="absolute top-full left-0 w-full bg-primaryColor shadow-md max-h-60 overflow-auto rounded-lg  h-36 overflow-y-scroll">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion._id}
                  className="p-2 hover:bg-gray-100 cursor-pointer hover:text-primaryColor"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(`Navigating to: /product/${suggestion.slug}`);
                    navigate(`/product/${suggestion.slug}`);
                    setShowSuggestions(false);
                    dispatch({ type: "FILTER_PRODUCTS", payload: "" });
                  }}
                >
                  <div className=" flex items-center gap-2">
                    <img src={suggestion.image} alt="" width="20px" />
                    <span>{suggestion.name} /</span>
                    <span>{suggestion.brand} /</span>
                    <span>{suggestion.category}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </>
  );
}
