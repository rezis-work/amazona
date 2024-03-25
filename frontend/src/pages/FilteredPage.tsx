import { useLocation } from "react-router-dom";
import { useGetFilteredProductsQuery } from "../hooks/productHooks";
import { useContext, useState } from "react";
import { Store } from "../Store";
import { Product } from "../types/Product";
import FilterSidebar from "../components/FilterSidebar";
import Row from "../components/Row";
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      <button
        className={` fixed z-30 left-0 top-14 w-[100px] h-[50px] text-white flexs justify-center items-center rounded-br-lg ${
          isSidebarOpen
            ? "bg-red-500 font-bold text-2xl"
            : "bg-blue-500 text-xl font-semibold"
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "X" : "Filters"}
      </button>
      <div
        className={`fixed inset-y-0 left-0 top-32 transform rounded-tr-xl py-10 text-left ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-primaryColor text-white p-5 transition duration-300 ease-in-out z-20`}
      >
        <FilterSidebar />
      </div>
      <Row>
        {products?.map((product: Product) => (
          <div key={product._id}>{product.name}</div>
        )) || <div>No products found</div>}
      </Row>
    </div>
  );
};

export default FilteredPage;
