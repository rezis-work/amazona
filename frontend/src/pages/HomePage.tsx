import Row from "../components/Row";
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
import { motion } from "framer-motion";
import GridOption from "../components/GridOption";
import { GetInTouch } from "../components/GetInTouch";

export default function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page] = useState(1);
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

  return (
    <>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{getError(error as unknown as ApiError)}</MessageBox>
      ) : (
        <div className="">
          <Helmet>
            <title>Famazona</title>
          </Helmet>
          <motion.div
            initial={{ y: 50, opacity: 0 }} // Initial position and opacity
            animate={{
              y: 0,
              opacity: 1,
              transition: { type: "spring", stiffness: 300 },
            }}
            className=" shadow-sm py-5 flex flex-col items-center justify-center mb-10 gap-2"
          >
            <h1 className=" text-4xl font-bold text-center mb-1">
              Welcome to the Famazona Shop
            </h1>
            <p>Anything you will imagine</p>
          </motion.div>
          <Carousel slides={slides} />
          <motion.div
            className=" mt-20 text-2xl font-semibold pl-5 lg:pl-0"
            initial={{ y: 50, opacity: 0 }} // Initial position and opacity
            animate={{
              y: 0,
              opacity: 1,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            Check out our sales
          </motion.div>
          <ProductsCarousel
            products={
              data && data.products ? filterProductsByPrice(data.products) : []
            }
          />
          <div className=" grid gird-cols-1 grid-flow-dense md:grid-cols-4 gap-6 m-6 mt-10">
            <GridOption
              title="Sweet gifts for less"
              image="https://links.papareact.com/1dy"
              className=" bg-pink-200 h-full mf:h-32"
            />
            <GridOption
              title="Shop Clothes"
              image="https://links.papareact.com/8ko"
              className=" bg-blue-100 col-span-2 row-span-2"
            />
            <GridOption
              title="Shop home"
              image="https://links.papareact.com/szu"
              className=" bg-pink-200 row-span-2"
            />
            <GridOption
              title="Shop Trend"
              image="https://links.papareact.com/n7r"
              className=" bg-yellow-100 h-64"
            />
            <GridOption
              title="Shop Kids"
              image="https://links.papareact.com/pj2"
              className=" bg-green-100 h-64 col-span-2"
            />
            <GridOption
              title="All need for March Day"
              image="https://links.papareact.com/m8e"
              className="bg-red-100 col-span-2 row-span-2"
            />
            <GridOption
              title="Shop Future style"
              image="https://links.papareact.com/gs1"
              className=" bg-orange-100 h-64"
            />
            <GridOption
              title="Shop Beauty"
              image="https://links.papareact.com/4y0"
              className=" bg-blue-100 h-64"
            />
            <GridOption
              title="Shop Sports"
              image="https://links.papareact.com/sq2"
              className=" bg-orange-100 h-64"
            />
            <GridOption
              title="Enjoy free Shopping"
              image="https://links.papareact.com/9fh"
              className=" bg-rose-100 h-64"
            />
            <GridOption
              title="Flash Deals"
              image="https://links.papareact.com/qx7"
              className=" bg-orange-200 h-64 col-span-2"
            />
          </div>
          <motion.div
            className=" mt-20 text-2xl font-semibold pl-5 lg:pl-0"
            initial={{ y: 50, opacity: 0 }} // Initial position and opacity
            animate={{
              y: 0,
              opacity: 1,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            Follow for New collection update
          </motion.div>
          <Row>
            <GetInTouch />
          </Row>
        </div>
      )}
    </>
  );
}
