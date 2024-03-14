import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ApiError } from "../types/ApiError";
import ProductShow from "../components/ProductShow";
import { getError } from "../utils";

export default function ProductPage() {
  const params = useParams();
  const { slug } = params;
  const {
    data: product,
    refetch,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!);

  return (
    <>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{getError(error as unknown as ApiError)}</MessageBox>
      ) : !product ? (
        <MessageBox>Product Not Found</MessageBox>
      ) : (
        <div>
          <Helmet>
            <title>Famazona Products</title>
          </Helmet>
          <ProductShow product={product} />
        </div>
      )}
    </>
  );
}
