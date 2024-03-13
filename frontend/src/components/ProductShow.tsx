import { Product } from "../types/Product";
import { useContext, useState } from "react";
import Rating from "./Rating";
import { useNavigate } from "react-router-dom";
import { convertProductToCartItem } from "../utils";
import { Store } from "../Store";
import { toast } from "react-toastify";
interface ProductProps {
  product: Product;
}

export default function ProductShow({ product }: ProductProps) {
  const [currentImage, setCurrentImage] = useState(product.image);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const navigate = useNavigate();

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product!._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product!.countInStock < quantity) {
      toast.warn("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...convertProductToCartItem(product!), quantity },
    });
    toast.success("Product added to the cart");
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-14">
      <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-1 px-4">
          <div className=" h-64 md:h-80 rounded-lg bg-white mb-4 flex justify-center items-start">
            <img
              src={currentImage}
              alt={product.name}
              className="w-[200px] h-full object-center object-cover  scale-75 hover:scale-100 duration-300"
            />
          </div>
          <div className=" flex justify-around gap-2 h-44 mb-5">
            <img
              className=" cursor-pointer"
              src={product.image}
              alt={product.name}
              onClick={() => setCurrentImage(product.image)}
            />
            <img
              className=" cursor-pointer"
              src={product.image}
              alt={product.name}
              onClick={() => setCurrentImage(product.image)}
            />
            <img
              className=" cursor-pointer"
              src={product.image}
              alt={product.name}
              onClick={() => setCurrentImage(product.image)}
            />
          </div>
        </div>

        <div className="md:flex-1 px-4">
          <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
            {product.name}
          </h2>
          <p className="text-gray-500 text-sm mb-10">
            By{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              {product.brand}
            </a>
          </p>

          <div className=" mb-5">
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </div>

          <div className="flex items-center space-x-4 my-4 mb-8">
            <div>
              <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                <span className="text-indigo-400 mr-1 mt-1">$</span>
                <span className="font-bold text-indigo-600 text-3xl">
                  {product.price}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-green-500 text-xl font-semibold mb-2">
                {product.countInStock ? (
                  <p className=" flex items-center gap-3">
                    <span className=" bg-green-500 rounded-lg text-white text-sm py-[0.5px] px-2">
                      In stock
                    </span>{" "}
                    {product.countInStock}
                  </p>
                ) : (
                  <p className=" text-red-500">Unnavable</p>
                )}
              </div>
              <p className="text-gray-400 text-sm">
                Ships from and sold by{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  {product.brand}
                </a>
              </p>
            </div>
          </div>

          <p className="text-gray-500">Description:</p>
          <p className=" text-primaryColor text-md">{product.description}</p>
        </div>

        <div className="md:flex-1 px-4">
          <div className="p-6 rounded-lg bg-gray-100">
            <div className="flex justify-between items-center flex-col gap-5">
              <span className="text-xl font-bold text-gray-700">
                Grab Your new {product.name}
              </span>
              <button
                onClick={addToCartHandler}
                className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
