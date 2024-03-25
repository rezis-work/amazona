import Row from "../components/Row";
import ListProducts from "../components/ListProducts";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../hooks/productHooks";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { useState } from "react";
import Carousel from "../components/Carousel";
import { Product } from "../types/Product";
import ProductsCarousel from "../components/ProductsCarousel";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const pageSize = 30;
  const { data, isLoading, error } = useGetProductsQuery(page, pageSize);
  const slides = [
    <div className=" w-full">
      <img src="../images/bannerOne.webp" alt="banner one" />
    </div>,
    <div className=" w-full">
      <img src="../images/bannerTwo.webp" alt="banner two" />
    </div>,
    <div className=" w-full">
      <img src="../images/bannerThree.webp" alt="banner three" />
    </div>,
  ];

  const filterProductsByPrice = (products: Product[]): Product[] => {
    return products.filter(
      (product) => product.price >= 100 && product.price <= 150
    );
  };

  console.log(data?.products);

  return (
    <>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{getError(error as unknown as ApiError)}</MessageBox>
      ) : (
        <div>
          <Helmet>
            <title>Famazona</title>
          </Helmet>
          <Carousel slides={slides} />
          <ProductsCarousel
            products={
              data && data.products ? filterProductsByPrice(data.products) : []
            }
          />
          <Row>
            <ListProducts products={data?.products} />
          </Row>
        </div>
      )}
    </>
  );
}
