import { Helmet } from "react-helmet-async";
import CartShow from "../components/CartShow";
export default function CartPage() {
  // const navigate = useNavigate();

  // const {
  //   state: {
  //     cart: { cartItem },
  //   },
  //   dispatch,
  // } = useContext(Store);

  // const updateCartHandler = (item: CartItem, quantity: number) => {
  //   if (item.countInStock < quantity) {
  //     toast.warn("Sorry. Product is out of stock");
  //     return;
  //   }
  //   dispatch({
  //     type: "CART_ADD_ITEM",
  //     payload: { ...item, quantity },
  //   });
  // };

  return (
    <div className=" px-5">
      <Helmet>
        <title>Shopping cart</title>
      </Helmet>
      <h1 className=" text-2xl font-bold text-primaryColor">Shopping Cart</h1>
      <CartShow />
    </div>
  );
}
