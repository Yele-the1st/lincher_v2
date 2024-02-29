import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import Ratings from "@/utils/Ratings";

import { timeAgo } from "@/utils/TimeAgo";
import { Button, buttonVariants } from "../ui/button";
import {
  MonitorPlay,
  Newspaper,
  Infinity,
  Trophy,
  MessageSquareText,
  Target,
  AlertTriangle,
  Globe,
  Check,
  BadgeCheck,
} from "lucide-react";
import CoursePlayer from "../admin/create-maps/CoursePlayer";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CourseContentList from "./CourseContentList";

import { IoCloseOutline } from "react-icons/io5";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../payment/CheckOutForm";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import { UserAvatar } from "../Navigation/UserAvatar";
import { AiFillStar } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface CouseInfoProps {
  data: any;
  stripePromise: any;
  clientSecret: any;
}

const CouseInfo: FC<CouseInfoProps> = ({
  data,
  stripePromise,
  clientSecret,
}) => {
  const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState<boolean>(false);
  const [createOrder, { error, isLoading, isSuccess }] =
    useCreateOrderMutation();

  const router = useRouter();

  const discountPercentage =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item?._id == data?._id);

  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
    } else {
      router.push("/login");
    }
  };

  const handleOrderNow = (e: any) => {
    if (user) {
      createOrder({ courseId: data._id });
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push(`/course-access/${data._id}`);
    }
  }, [data._id, isSuccess, router]);

  return (
    <div>
      <div className="relative pt-[120px] pb-10 bg-secondary ">
        <div className=" mx-auto xl:max-w-7xl ">
          <div>
            <div className=" max-w-[60rem] xl:-mb-8 mx-auto xl:mx-[4.8rem] xl:max-w-[40rem] px-4  ">
              <div className=" relative -top-[0.8rem] flex whitespace-nowrap p-[0.4rem] -mx-[0.4rem] gap-2 flex-wrap">
                {data?.tags?.split(",").map((tag: string, index: number) => (
                  <Badge key={index} className="">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className=" block xl:hidden max-w-[60rem] mx-auto w-full h-full relative">
              <div className=" pb-[56.25%] h-0 relative">
                <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              </div>
            </div>

            <div className=" max-w-[60rem] mt-8 mx-auto xl:mx-[4.8rem] xl:max-w-[40rem] px-4 ">
              <div className="mb-4">
                <h1 className=" text-3xl md:text-5xl font-semibold ">
                  {data?.name}
                </h1>
              </div>

              <div className=" mb-6 text-base md:text-lg">
                {data?.description}
              </div>
              <div className=" w-full md:flex items-center mb-[0.8rem] ">
                <div className=" flex mb-[0.8rem] md:mb-0 items-center">
                  <Badge className=" py-1 px-1.5 bg-[#f6b100] text-black font-semibold mr-4">
                    Bestseller
                  </Badge>
                  <div className=" mr-2 text-[#f6b100] font-semibold ">
                    {Number.isInteger(data?.ratings)
                      ? data?.ratings.toFixed(1)
                      : data?.ratings.toFixed(2)}
                  </div>
                  <Ratings rating={data?.ratings} />
                </div>
                <div className=" flex items-center">
                  <h5>{`${data?.reviews?.length} Reviews`}</h5>
                  <div className=" ml-2"> </div>
                </div>
              </div>
              <div className=" mb-[0.8rem]">
                Curated by{" "}
                <strong>{data?.curator ? data?.curator : "Kunle Alawo"}</strong>
                , {data?.curatorInfo}
              </div>
              <div className=" mb-[0.8rem] gap-4 space-y-2 md:space-y-0 md:flex items-center ">
                <div className=" flex items-center ">
                  <AlertTriangle size={20} />
                  <div className=" ml-2">{`Last updated ${timeAgo(
                    data?.createdAt
                  )}`}</div>
                </div>
                <div className="flex items-center ">
                  <Globe size={20} />
                  <div className=" ml-2 ">English</div>
                </div>
              </div>
              <div className=" flex xl:hidden">
                {isPurchased ? (
                  <Link
                    href={`/course-access/${data._id}`}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      " w-full mt-4"
                    )}
                  >
                    Enter to Course
                  </Link>
                ) : data?.price === 0 ? (
                  <Button
                    onClick={handleOrderNow}
                    size={"lg"}
                    className=" w-full mt-4"
                  >
                    {isLoading ? (
                      <div className=" w-full flex justify-center items-center overflow-hidden">
                        <div className=" py-2 justify-center space-x-1.5 flex items-center">
                          <div className=" w-2 h-2 rounded-full bg-primary-foreground  animate-loading"></div>
                          <div
                            style={{ animationDelay: "0.1s" }}
                            className=" w-2 h-2 rounded-full bg-primary-foreground animate-loading"
                          ></div>
                          <div
                            style={{ animationDelay: "0.2s" }}
                            className=" w-2 h-2 rounded-full bg-primary-foreground  animate-loading"
                          ></div>
                        </div>
                      </div>
                    ) : (
                      "Enroll Now"
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleOrder}
                    size={"lg"}
                    className=" w-full mt-4"
                  >
                    Buy Now ${data?.price}
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className=" hidden xl:block transform-gpu transition-opacity duration-200 ease-linear absolute h-[100vh] top-[9.2rem] ml-[50.6rem]">
            <div className=" shadow-xl sticky top-28 w-[24rem] bg-white">
              <div className=" w-full h-full relative">
                <div className=" pb-[56.25%] h-0 relative">
                  <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
                </div>
              </div>
              <div className=" w-full p-6 text-black">
                <div className=" flex items-center justify-between">
                  <div className=" flex items-center">
                    <h1 className="font-bold text-4xl">
                      {data?.price === 0 ? "Free" : "₦" + data?.price}
                    </h1>

                    <h5 className=" pl-3 text-xl font-semibold line-through opacity-70 ">
                      ₦{data?.estimatedPrice}
                    </h5>
                  </div>

                  <Badge>{discountPercentagePrice}% Off</Badge>
                </div>
                {isPurchased ? (
                  <Link
                    href={`/course-access/${data._id}`}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      " w-full mt-4"
                    )}
                  >
                    Enter to Course
                  </Link>
                ) : data?.price === 0 ? (
                  <Button
                    onClick={handleOrderNow}
                    size={"lg"}
                    className=" w-full mt-4"
                  >
                    {isLoading ? (
                      <div className=" w-full flex justify-center items-center overflow-hidden">
                        <div className=" py-2 justify-center space-x-1.5 flex items-center">
                          <div className=" w-2 h-2 rounded-full bg-primary-foreground  animate-loading"></div>
                          <div
                            style={{ animationDelay: "0.1s" }}
                            className=" w-2 h-2 rounded-full bg-primary-foreground animate-loading"
                          ></div>
                          <div
                            style={{ animationDelay: "0.2s" }}
                            className=" w-2 h-2 rounded-full bg-primary-foreground  animate-loading"
                          ></div>
                        </div>
                      </div>
                    ) : (
                      "Enroll Now"
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleOrder}
                    size={"lg"}
                    className=" w-full mt-4"
                  >
                    Buy Now ${data?.price}
                  </Button>
                )}
                <h1 className=" mt-4 mb-2 font-semibold text-base">
                  This course Includes:
                </h1>
                <div className="  space-y-2 text-black/70">
                  <div className="flex items-center space-x-2">
                    <MonitorPlay size={16} />
                    <p>54 hours on-demand video</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Newspaper size={16} />
                    <p>Assignments & Resources</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Infinity size={16} />
                    <p>Full lifetime access</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquareText size={16} />
                    <p>Premium Support</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target size={16} />
                    <p>Multiple Projects</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy size={16} />
                    <p>Certificate of completion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mx-auto xl:max-w-7xl ">
        <div className=" max-w-[60rem] mx-auto xl:mx-[4.8rem] xl:max-w-[40rem] px-4 ">
          <div className=" w-full text-black dark:text-white mt-8">
            <div className=" border border-border/50  rounded-[3px] p-4">
              <div className=" text-[1.3rem] lg:text-[1.5rem] leading-[1.2] mt-2 font-Poppins font-[600]">
                What you will learn from this course?
              </div>
              {data?.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full text-sm font-[400] flex lg:items-center py-2"
                  key={index}
                >
                  <div className=" w-[15px] mr-1">
                    <Check size={20} />
                  </div>
                  <p className="pl-2">{item.title}</p>
                </div>
              ))}
              <div className=" text-[1.3rem] lg:text-[1.5rem] leading-[1.2] mt-2 font-Poppins font-[600]">
                What are the prerequisites for this course?
              </div>
              {data?.prerequisites?.map((item: any, index: number) => (
                <div
                  className="w-full text-sm font-[400] flex lg:items-center py-2"
                  key={index}
                >
                  <div className=" w-[15px] mr-1">
                    <Check size={20} />
                  </div>
                  <p className="pl-2">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className=" mt-6 border border-border/50 rounded-[3px] p-4">
            <div className=" text-[1.3rem] lg:text-[1.5rem] leading-[1.2] mt-2 font-Poppins font-[600]">
              Course Content
            </div>
            <CourseContentList data={data?.courseData} isDemo={true} />
          </div>

          <div className=" text-[1.3rem] flex items-center lg:text-[1.5rem] leading-[1.2] mt-8 font-Poppins font-[600]">
            <AiFillStar color="#f6b100" size={26} className={`mr-1`} />
            <div className=" flex items-center">
              <div className=" mr-2 font-semibold ">
                {Number.isInteger(data?.ratings)
                  ? data?.ratings.toFixed(1)
                  : data?.ratings.toFixed(2)}
              </div>
            </div>
            <div className=" flex items-center">
              <h5>{`${data?.reviews?.length} Reviews`}</h5>
              <div className=" ml-2"> </div>
            </div>
          </div>

          <div className="my-8 space-y-4">
            {data?.reviews &&
              [...data.reviews].reverse().map((item: any, index: number) => (
                <div key={index} className="w-full">
                  <div className="flex">
                    <UserAvatar
                      className="shrink-0"
                      url={item?.user?.avatar?.url}
                      name={item?.user.name}
                    />
                    <div className=" pl-2">
                      <div className="flex items-center">
                        <h5 className="text-base pr-2">{item.user.name}</h5>
                        <Ratings rating={item.rating} />
                      </div>
                      <p>{item.comment}</p>
                      <small className="text-opacity-75">
                        {timeAgo(item.createdAt)}
                      </small>
                    </div>
                  </div>
                  {item.commentReplies.map((item: any, index: number) => (
                    <div key={index} className=" w-full flex lg:ml-16 my-5">
                      <UserAvatar
                        className="shrink-0"
                        url={item?.user?.avatar?.url}
                        name={item?.user.name}
                      />
                      <div className="pl-3">
                        <div className=" flex items-center">
                          <h5 className="text-base">{item.user.name}</h5>{" "}
                          {item.user.role === "admin" && (
                            <BadgeCheck
                              size={14}
                              className=" ml-1 text-primary"
                            />
                          )}
                        </div>
                        <p>{item.comment}</p>
                        <small className=" opacity-70">
                          {timeAgo(item?.createdAt)}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
      {open && (
        <div className=" w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center ">
          <div className=" w-[500px] min-h-fit bg-white border border-border/50  rounded-xl shadow p-3">
            <div className=" w-full flex justify-end">
              <Button
                onClick={() => setOpen(false)}
                size={"icon"}
                variant={"ghost"}
                className=" text-black"
              >
                <IoCloseOutline size={20} />
              </Button>
            </div>
            <div className=" w-full">
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckOutForm setOpen={setOpen} data={data} user={user} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouseInfo;
