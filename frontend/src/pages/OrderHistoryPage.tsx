import { useNavigate } from "react-router-dom";
import { useGetOrderHistoryQuery } from "../hooks/orderHooks";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const { data: orders, isLoading, error } = useGetOrderHistoryQuery();

  console.log("Fetched orders:", orders);

  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1 className=" mb-10 font-bold text-2xl">Order History</h1>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{getError(error as unknown as ApiError)}</MessageBox>
      ) : (
        <div className=" border">
          <div>
            {orders?.map((order) => (
              <ul key={order._id} className=" border">
                <li className="border lg:text-4xl md:text-lg text-sm pl-5">
                  ID - {order._id}
                </li>
                <li className="border lg:text-4xl md:text-lg text-sm pl-5 py-2">
                  DATE - {order.createdAt.substring(0, 10)}
                </li>
                <li className="border lg:text-4xl md:text-lg text-sm pl-5 py-2">
                  TOTAL - ${order.totalPrice.toFixed(2)}
                </li>
                <li className="border lg:text-4xl md:text-lg text-sm pl-5 py-2">
                  PAID - {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                </li>
                <li className="border lg:text-4xl md:text-lg text-sm pl-5 py-2">
                  DELIVERED -{" "}
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "No"}
                </li>
                <li className="border lg:text-4xl md:text-lg text-sm pl-5 py-2">
                  {" "}
                  ACTIONS -{" "}
                  <button
                    type="button"
                    className=" lg:text-lg px-2 lg:px-8 lg:py-2 rounded-lg bg-primaryColor text-white hover:bg-black"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </li>
              </ul>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
