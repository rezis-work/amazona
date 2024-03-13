import { Product } from "../types/Product";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useContext } from "react";
import { Store } from "../Store";
import { CartItem } from "../types/Cart";
import { convertProductToCartItem } from "../utils";
import { toast } from "react-toastify";

export default function ProductItem({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      toast.warn("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
    toast.success(`${item.name} added to the cart`);
  };

  return (
    <div className=" border-[1px] p-3 pt-0 rounded-md">
      <Link to={`/product/${product?.slug}`}>
        <img
          className="scale-75 hover:scale-100 transition-transform duration-300 mx-auto mb-5"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className=" flex flex-col justify-center items-center">
        <Link to={`/product/${product?.slug}`}>
          <h2 className=" text-2xl font-semibold max-w-[150px]">
            {product.name.substring(0, 10)}
          </h2>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <p className=" text-center mt-5 font-medium text-xl">
          ${product.price}
        </p>
        {product.countInStock === 0 ? (
          <button
            className=" bg-gray-500 py-3 px-5 text-textPrimary mt-4 rounded-md text-xl "
            disabled
          >
            Out of stock
          </button>
        ) : (
          <button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
            className=" bg-primaryColor py-3 px-5 text-textPrimary mt-4 rounded-md text-xl hover:bg-black duration-200"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
