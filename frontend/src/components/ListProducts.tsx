import { Product } from "../types/Product";
import ProductItem from "./ProductItem";
import { v4 as uuidv4 } from "uuid";

interface ListProductsProps {
  products: Product[];
}

export default function ListProducts({ products }: ListProductsProps) {
  return (
    <>
      {products?.map((product: Product) => (
        <li key={uuidv4()} className=" mt-6">
          <ProductItem product={product} />
        </li>
      ))}
    </>
  );
}
