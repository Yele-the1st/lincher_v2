"use client";

import Loader from "@/components/Loader/Loader";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsFillPlusCircleFill, BsTrash3Fill } from "react-icons/bs";

interface EditCategoriesProps {}

const EditCategories: FC<EditCategoriesProps> = ({}) => {
  const {
    data,
    isLoading: loading,
    refetch,
  } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
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

  const handleCategoriesChange = (id: any, value: string) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((c: any) => (c._id === id ? { ...c, title: value } : c))
    );
  };

  const newCategoriesHandler = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("Category title cannot be empty");
    } else {
      setCategories((prevCategories: any) => [
        ...prevCategories,
        { title: "" },
      ]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryEmpty = (categories: any[]) => {
    return categories.some((c) => c.title === "");
  };

  const handleEdit = async (e: any) => {
    await editLayout({
      type: "Categories",
      categories,
    });
  };

  return (
    <div className=" bg-transparent">
      {loading ? (
        <Loader />
      ) : (
        <div className=" text-gray-900 dark:text-white py-10 flex flex-col text-center max-w-max mx-auto my-4 px-4">
          <div className=" rounded-[1rem] p-10">
            <h1 className="text-3xl mb-6 md:text-4xl text-center font-semibold">
              All Categories
            </h1>
            {categories &&
              categories.map((item: any, index: number) => {
                return (
                  <div key={index} className="p-3">
                    <div className=" flex items-center w-full justify-center">
                      <input
                        className=" border-none  outline-none w-[unset] bg-transparent appearance-none"
                        value={item.title}
                        placeholder="Enter categories title"
                        onChange={(e: any) =>
                          handleCategoriesChange(item._id, e.target.value)
                        }
                      />
                      <span className=" ml-6 flex-shrink-0">
                        <BsTrash3Fill
                          className={`text-gray-900 dark:text-white w-5 h-5 cursor-pointer `}
                          onClick={() => {
                            setCategories((prevCategory: any) =>
                              prevCategory.filter(
                                (c: any) => c._id !== item._id
                              )
                            );
                          }}
                        />
                      </span>
                    </div>
                  </div>
                );
              })}
            <div className=" mt-6">
              <BsFillPlusCircleFill
                className=" dark:text-white text-black w-5 h-5 cursor-pointer"
                onClick={newCategoriesHandler}
              />
            </div>
          </div>
          <div className=" flex px-4 pb-10 sm:px-6 sm:pb-12 lg:max-w-7xl  lg:px-8  800px:justify-end">
            <div
              className={` w-full 800px:w-[140px] flex items-center justify-center h-[44px] text-center rounded-[3px] mt-8 ${
                areCategoriesUnchanged(data?.layout?.categories, categories) ||
                isAnyCategoryEmpty(categories)
                  ? "cursor-not-allowed bg-accent dark:bg-background-darkHover text-gray-500"
                  : "cursor-pointer bg-primary text-white"
              } `}
              onClick={
                areCategoriesUnchanged(data?.layout?.categories, categories) ||
                isAnyCategoryEmpty(categories)
                  ? () => null
                  : handleEdit
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
        </div>
      )}
    </div>
  );
};

export default EditCategories;
