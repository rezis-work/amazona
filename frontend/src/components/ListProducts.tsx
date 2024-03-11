import { Product } from "../types/Product";

interface ListProductsProps {
  products: Product[];
}

export default function ListProducts({ products }: ListProductsProps) {
  return (
    <>
      {products?.map((product: Product) => (
        <li key={product.slug} className="">
          <img className=" mb-2" src={product.image} alt={product.name} />
          <h2 className="">{product.name}</h2>
          <p className="">{product.price}$</p>
        </li>
      ))}
    </>
  );
}
