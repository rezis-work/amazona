import { CartItem, ShippingAddress } from "./Cart";
import { User } from "./User";

export type Order = {
  _id: string;
  orderItems: CartItem[];
  shippingAddress: ShippingAddress;
  user: User;
  createdAt: string;
  isPaid: boolean;
  paidAt: string;
  isDeliveredAt: boolean;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
