import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import { FC, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/utils/Heading";
import Header from "../Navigation/Header";
import CouseInfo from "./CouseInfo";
import Footer from "../Navigation/Footer";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from "@/redux/features/orders/ordersApi";
import { loadStripe, Stripe } from "@stripe/stripe-js";

interface CourseDetailsProps {
  id: string;
}

const CourseDetails: FC<CourseDetailsProps> = ({ id }) => {
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    if (config && config.publishableKey) {
      const publishableKey: string = config.publishableKey;
      const promise = loadStripe(publishableKey);
      setStripePromise(promise);
    }

    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, createPaymentIntent, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [config, createPaymentIntent, data, paymentIntentData]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.course?.name + "- Lincher"}
            description=" Lincher is a programming community which is developed by Yele for helping developers  "
            keywords={data?.course?.tags}
          />
          <Header />
          <div className="h-full min-h-[120vh]">
            {stripePromise && (
              <CouseInfo
                data={data?.course}
                stripePromise={stripePromise}
                clientSecret={clientSecret}
              />
            )}
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
