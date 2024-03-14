import { Helmet } from "react-helmet-async";
import CartShow from "../components/CartShow";
export default function CartPage() {
  return (
    <div className=" px-5">
      <Helmet>
        <title>Shopping cart</title>
      </Helmet>
      <h1 className=" pb-5 border-b-[1px] border-b-primaryColor text-2xl font-bold text-primaryColor">
        Shopping Cart
      </h1>
      <CartShow />
    </div>
  );
}
