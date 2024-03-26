import { useContext, useEffect } from "react";
import { Store } from "../Store";
import { Link, useParams } from "react-router-dom";
import {
  useGetOrderDetailsQuuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../hooks/orderHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

export default function OrderPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  console.log(userInfo);
  const params = useParams();
  const { id: OrderId } = params;

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuuery(OrderId!);

  console.log(order);

  const { mutateAsync: payOrder, isLoading: loadingPay } =
    usePayOrderMutation();

  const testPayHandler = async () => {
    await payOrder({ orderId: OrderId! });
    refetch();
    toast.success("Order is paid");
  };

  const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();

  const { data: paypalConfig } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (paypalConfig && paypalConfig.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions", // Corrected typo
          value: {
            clientId: paypalConfig.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };
      loadPaypalScript();
    }
  }, [paypalConfig, paypalDispatch]);

  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: "vertical" },
    createOrder(__, actions) {
      return actions.order
        .create({
          purchase_units: [
            {
              amount: {
                value: order!.totalPrice.toString(),
              },
            },
          ],
        })
        .then((OrderId: string) => {
          return OrderId;
        });
    },
    onApprove(__, actions) {
      return actions.order!.capture().then(async (details) => {
        try {
          await payOrder({ orderId: OrderId!, ...details });
          refetch();
          toast.success("Order is paid successfully");
        } catch (err) {
          toast.error(getError(err as ApiError));
        }
      });
    },
    onError: (err) => {
      toast.error(getError(err as ApiError));
    },
  };

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
                  <MessageBox className="bg-green-100 border-l-4 border-green-500 text-green-700">
                    Paid at {order.paidAt}
                  </MessageBox>
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
            {!order.isPaid && (
              <div>
                {isPending ? (
                  <LoadingBox />
                ) : isRejected ? (
                  <MessageBox>Error in connecting to PayPal</MessageBox>
                ) : (
                  <div className=" flex flex-col">
                    <PayPalButtons
                      {...paypalbuttonTransactionProps}
                    ></PayPalButtons>
                    <button
                      className=" mt-5 bg-black text-white py-5 rounded-md hover:bg-primaryColor hover:text-textPrimary text-xl"
                      onClick={testPayHandler}
                    >
                      Pay
                    </button>
                  </div>
                )}
                {loadingPay && <LoadingBox />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
