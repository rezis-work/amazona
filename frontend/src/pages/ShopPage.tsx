import Row from "../components/Row";
import ListProducts from "../components/ListProducts";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../hooks/productHooks";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import FilterSidebar from "../components/FilterSidebar";
import { useState } from "react";

export default function ShopPage() {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const { data, isLoading, error } = useGetProductsQuery(page, pageSize);

  const handlePageChange = (newPage) => setPage(newPage);
  const handleNext = () =>
    setPage((prev) => (data?.totalPages > prev ? prev + 1 : prev));
  const handlePrevious = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{getError(error as unknown as ApiError)}</MessageBox>
      ) : (
        <div className="">
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
            <Helmet>
              <title>Famazona Shop</title>
            </Helmet>
            <ListProducts products={data.products!} />
          </Row>
          <div className="pagination">
            <button onClick={handlePrevious} disabled={page === 1}>
              Previous
            </button>
            {Array.from({ length: data?.totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={page === index + 1 ? "active" : ""}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={handleNext} disabled={page === data?.totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
