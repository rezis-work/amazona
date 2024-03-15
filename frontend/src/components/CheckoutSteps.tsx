export default function CheckoutSteps(props: {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}) {
  return (
    <div className="flex justify-between py-4 px-6  items-center">
      <div
        className={`w-1/4 text-center py-2 rounded ${
          props.step1 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        Sign-in
      </div>
      <div
        className={`${
          props.step1 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
        } w-8 h-1`}
      ></div>
      <div
        className={`w-1/4 text-center py-2 rounded ${
          props.step2 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        Shipping
      </div>
      <div
        className={`${
          props.step3 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
        } w-8 h-1`}
      ></div>
      <div
        className={`w-1/4 text-center py-2 rounded ${
          props.step3 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        Payment
      </div>
      <div
        className={`${
          props.step4 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
        } w-8 h-1`}
      ></div>
      <div
        className={`w-1/4 text-center py-2 rounded ${
          props.step4 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        Place Order
      </div>
    </div>
  );
}
