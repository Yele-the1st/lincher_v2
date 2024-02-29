"use client";

import Loader from "@/components/Loader/Loader";
import CourseContents from "@/components/courses/CourseContents";
import UserProtected from "@/hooks/userProtected";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

interface pageProps {
  params: any;
}

const Page: FC<pageProps> = ({ params }) => {
  const id = params.id;
  const { isLoading, error, data } = useLoadUserQuery({});
  const router = useRouter();

  useEffect(() => {
    if (typeof data !== "undefined" && typeof error !== "undefined") {
      if (data) {
        const isPurchased = data?.user?.courses.find(
          (item: any) => item?._id === id
        );
        if (!isPurchased) {
          router.push("/");
          return;
        }
      }
      if (error) {
        router.push("/");
        return;
      }
    }
  }, [data, error, id, router]);

  return (
    <UserProtected>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseContents id={id} user={data?.user} />
        </div>
      )}
    </UserProtected>
  );
};

export default Page;
