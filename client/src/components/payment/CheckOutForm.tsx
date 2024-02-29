import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

interface CheckOutFormProps {
  setOpen: any;
  data: any;
  user: any;
}

const CheckOutForm: FC<CheckOutFormProps> = ({ setOpen, data, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });
      if (error) {
        setMessage(error.message);
        setIsLoading(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setIsLoading(false);
        createOrder({ courseId: data?._id, payment_info: paymentIntent });
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      setMessage("Error confirming payment. Please try again.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);

      socket.emit("notification", {
        title: "New Order",
        message: `You have a new order from ${data?.name} `,
        userId: user?._id,
      });

      router.push(`/course-access/${data._id}`);
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    data._id,
    data.course.name,
    data?.name,
    error,
    orderData,
    router,
    user?._id,
  ]);

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className=" !text-foreground"
    >
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <Button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className=" mt-4"
      >
        {isLoading ? "Paying..." : "Pay now"}
      </Button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className=" text-[red] font-Poppins pt-2">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckOutForm;
