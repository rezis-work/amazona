import { useLocation } from "react-router-dom";
import { useFetchProducts } from "../hooks/productHooks";
import { Product } from "../types/Product";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPageInput() {
  const query = useQuery().get("query");
  const { data, loading, error } = useFetchProducts(query);

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
