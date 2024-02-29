"use client";

import Loader from "@/components/Loader/Loader";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface EditHeroProps {}

const EditHero: FC<EditHeroProps> = ({}) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const {
    data,
    isLoading: loading,
    refetch,
  } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
    if (isSuccess) {
      toast.success("Hero updated successfully!");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, error, isSuccess, refetch]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async (e: any) => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <div className=" bg-transparent">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className=" w-full 1000px:flex items-center">
            <div className="mx-auto h-full grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-10 sm:px-6 sm:py-12 lg:max-w-7xl lg:grid-cols-2 lg:px-4">
              <div className="relative">
                <div className=" text-6xl md:text-7xl font-semibold font-Poppins tracking-tight text-background-foregroundL dark:text-background-foregroundD ">
                  <textarea
                    className=" appearance-none bg-transparent outline-none w-full "
                    value={title}
                    rows={4}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <p className="mt-8 max-w-sm font-light font-Poppins text-background-foregroundL dark:text-background-foregroundD ">
                  <textarea
                    className=" appearance-none bg-transparent outline-none w-full h-full "
                    value={subTitle}
                    rows={4}
                    onChange={(e) => setSubTitle(e.target.value)}
                  />
                </p>
              </div>
              <div className=" relative">
                <input
                  type="file"
                  name=""
                  id="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpdate}
                />
                <label htmlFor="file">
                  <div className=" p-2 dark:bg-background-darkHover bg-accent shadow-md rounded-[16px]">
                    <Image
                      priority
                      quality={100}
                      src={image}
                      alt=""
                      height={1000}
                      width={1000}
                      className="h-full w-full rounded-[16px]"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className=" flex px-4 pb-10 sm:px-6 sm:pb-12 lg:max-w-7xl  lg:px-8  800px:justify-end">
            <div
              className={` w-full 800px:w-[140px] flex items-center justify-center h-[44px] text-center rounded-[3px] mt-8 ${
                data?.layout?.banner?.title !== title ||
                data?.layout?.banner?.subTitle !== subTitle ||
                data?.layout?.banner?.image?.url !== image
                  ? "cursor-pointer bg-primary text-white"
                  : "cursor-not-allowed bg-accent dark:bg-background-darkHover text-gray-500"
              } `}
              onClick={
                data?.layout?.banner?.title !== title ||
                data?.layout?.banner?.subTitle !== subTitle ||
                data?.layout?.banner?.image?.url !== image
                  ? handleEdit
                  : () => null
              }
            >
              {isLoading ? (
                <div className=" w-full flex justify-center items-center">
                  <div className=" justify-center flex items-center">
                    <div className=" w-2 h-2 rounded-full mr-1.5 bg-gray-100 animate-loading"></div>
                    <div
                      style={{ animationDelay: "0.1s" }}
                      className=" w-2 h-2 rounded-full mr-1.5 bg-gray-100 animate-loading"
                    ></div>
                    <div
                      style={{ animationDelay: "0.2s" }}
                      className=" w-2 h-2 rounded-full bg-gray-100 animate-loading"
                    ></div>
                  </div>
                </div>
              ) : (
                <div>Save</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditHero;
