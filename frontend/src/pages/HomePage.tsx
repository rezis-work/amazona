import Row from "../components/Row";
import ListProducts from "../components/ListProducts";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../hooks/productHooks";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { useState } from "react";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const pageSize = 30;
  const { data, isLoading, error } = useGetProductsQuery(page, pageSize);
  return (
    <>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{getError(error as unknown as ApiError)}</MessageBox>
      ) : (
        <Row>
          <Helmet>
            <title>Famazona</title>
          </Helmet>
          <ListProducts products={data.products!} />
        </Row>
      )}
    </>
  );
}
