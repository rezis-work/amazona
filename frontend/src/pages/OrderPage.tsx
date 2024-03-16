import { useContext } from "react";
import { Store } from "../Store";
import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuuery } from "../hooks/orderHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Helmet } from "react-helmet-async";

export default function OrderPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: OrderId } = params;

  const { data: order, isLoading, error } = useGetOrderDetailsQuuery(OrderId!);

  return isLoading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox>{getError(error as unknown as ApiError)}</MessageBox>
  ) : !order ? (
    <MessageBox>Order Not Found</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order {OrderId}</title>
      </Helmet>
      <h1 className=" font-bold text-2xl mb-10 text-center">Order {OrderId}</h1>
      <div className=" flex flex-col lg:flex-row">
        <div className=" basis-2/3">
          <div>
            <h2 className=" font-semibold text-xl mb-5 pl-5">Shipping</h2>
          </div>
          <div>
            <div className=" p-5">
              <div className=" border-[1px] p-5 mb-5 rounded-md">
                <p>
                  <span className=" text-lg">Name:</span>{" "}
                  {order.shippingAddress.fullName}
                </p>
                <p>
                  <span className=" text-lg">Address:</span>{" "}
                  <span className=" mr-3">
                    {order.shippingAddress.address},
                  </span>
                  <span className=" mr-3">{order.shippingAddress.city},</span>
                  <span className=" mr-3">
                    {order.shippingAddress.postalCode},
                  </span>
                  <span>{order.shippingAddress.country}</span>
                </p>
              </div>
              <h2 className=" mb-2">Delivery:</h2>
              {order.isDelivered ? (
                <MessageBox>Delivered at {order.deliveredAt}</MessageBox>
              ) : (
                <MessageBox>Not Delivered</MessageBox>
              )}
            </div>
            <div className=" mb-5 pl-5">
              <div className=" mt-3">
                <h2 className=" mb-2">Payment</h2>
              </div>
              <p className=" mb-5 font-semibold">
                Method: {order.paymentMethod}
              </p>
              <div>
                {order.isPaid ? (
                  <MessageBox>Paid at {order.paidAt}</MessageBox>
                ) : (
                  <MessageBox>Not Paid</MessageBox>
                )}
              </div>
            </div>
            <div className=" pl-5">
              <div>
                <h2 className=" mb-2 text-xl">Items:</h2>
              </div>
              <div>
                {order.orderItems.map((item) => (
                  <div key={item._id} className=" flex mb-5  border-[1px] p-5">
                    <div className=" basis-2/4">
                      <Link to={`/product/${item.slug}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className=" w-20 mb-1"
                        />
                      </Link>
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </div>
                    <div className=" basis-1/4 text-lg">
                      <span>Amount: {item.quantity}</span>
                    </div>
                    <div className=" basis-1/4">
                      <span className=" text-green-600 text-lg">
                        Price: ${item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className=" basis-1/3 border-l border-b border-r xl:ml-10 mt-10 xl:mt-0 ">
          <div>
            <div>
              <h2 className=" text-center text-xl font-bold">Order Summary</h2>
            </div>
            <div className="pl-5 mt-10 mb-8">
              <ul className=" list-none">
                <li className="  text-xl font-semibold">Items Price:</li>
                <li className=" text-xl">${order.itemsPrice.toFixed(2)}</li>
              </ul>
            </div>
            <div className="pl-5 mt-10 mb-8">
              <ul className=" list-none">
                <li className="  text-xl font-semibold">Shipping Price:</li>
                <li className=" text-xl">${order.shippingPrice.toFixed(2)}</li>
              </ul>
            </div>
            <div className="pl-5 mt-10 mb-8">
              <ul className=" list-none">
                <li className="  text-xl font-semibold">Tax Price:</li>
                <li className=" text-xl">${order.taxPrice.toFixed(2)}</li>
              </ul>
            </div>
            <div className="pl-5 mt-10 mb-8">
              <ul className=" list-none">
                <li className="  text-xl font-semibold">Order Total Price:</li>
                <li className=" text-xl">${order.totalPrice.toFixed(2)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
