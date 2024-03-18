import { useLocation } from "react-router-dom";
import { useFetchProducts } from "../hooks/productHooks";
import { Product } from "../types/Product";
import axios from "axios";
import { useEffect, useState } from "react";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPageInput() {
  const query = useQuery().get("query");
  const { data, loading, error } = useFetchProducts(query);
  const [dates, setDates] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const url = `http://localhost:4000/api/products?query=${query}`;
      console.log("Fetching from URL:", url); // Debug: log the URL
      try {
        const response = await axios.get(url);
        setDates(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [query]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data.map((product: Product) => (
        <li key={product._id}>{product.name}</li>
      ))}
    </div>
  );
}
