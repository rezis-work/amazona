import { useLocation } from "react-router-dom";
import { useFetchProducts } from "../hooks/productHooks";
import ListProducts from "./ListProducts";
import Row from "./Row";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPageInput() {
  const query = useQuery().get("query");
  const { data, loading, error } = useFetchProducts(query || "");
  console.log(data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Row>
      {data && data.products && <ListProducts products={data?.products} />}
    </Row>
  );
}
