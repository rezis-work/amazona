import { useLocation } from "react-router-dom";
import { useGetFilteredProductsQuery } from "../hooks/productHooks";
import { useContext } from "react";
import { Store } from "../Store";
import { Product } from "../types/Product";
// Uncomment the next line when you're ready to display the products
// import ListProducts from "../components/ListProducts";

const FilteredPage = () => {
  const location = useLocation();
  const queryParams = location.search;
  const {
    data: products,
    isLoading,
    error,
  } = useGetFilteredProductsQuery(queryParams);

  const { state } = useContext(Store);
  console.log(state.filters);
  if (!Array.isArray(products)) {
    return <div>No products found</div>;
  }
  if (isLoading) return <div>Loading...</div>;

  // Handle error state
  if (error) return <div>Error: {error.message}</div>;

  // Once you have the ListProducts component ready and the products structure is confirmed,
  // uncomment the next line to display the products.
  // return <ListProducts products={products} />;
  return (
    <div>
      {products?.map((product: Product) => (
        <div key={product._id}>{product.name}</div>
      )) || <div>No products found</div>}
    </div>
  );
};

export default FilteredPage;
