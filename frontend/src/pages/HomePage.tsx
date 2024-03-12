import Row from "../components/Row";
import ListProducts from "../components/ListProducts";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../hooks/productHooks";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{getError(error as unknown as ApiError)}</MessageBox>
      ) : (
        <Row>
          <Helmet>
            <title>Amazona</title>
          </Helmet>
          <ListProducts products={products!} />
        </Row>
      )}
    </>
  );
}
