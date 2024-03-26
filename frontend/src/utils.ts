import { ApiError } from "./types/ApiError";
import { CartItem } from "./types/Cart";
import { Product } from "./types/Product";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const getError = (error: ApiError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const convertProductToCartItem = (product: Product): CartItem => {
  const cartItem: CartItem = {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    quantity: 1,
  };
  return cartItem;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
