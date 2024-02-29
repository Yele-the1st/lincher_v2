"use client";

import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/redux/features/user/userApi";
import { X } from "@phosphor-icons/react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface DeleteUserProps {
  setOpen: (open: boolean) => void;
  userId: string;
}

const DeleteUser: FC<DeleteUserProps> = ({ setOpen, userId }) => {
  const [deleteUser, { isSuccess, error }] = useDeleteUserMutation();
  const { isLoading: meLoading, refetch } = useGetAllUsersQuery({});

  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (isSuccess) {
      toast.success("User deleted successfully");
    }
    if (isSuccess) {
      refetch();
      setOpen(false);
    }
  }, [error, isSuccess, refetch, setOpen]);

  const handleDelete = async (e: any) => {
    if (userId !== "") {
      const id = userId;
      await deleteUser(id);
    }
  };

  return (
    <div>
      <div className=" pointer-events-auto fixed top-0 right-0 bottom-0 left-0 z-[70] bg-[rgba(0,0,0,0.6)] select-none box-border block  ">
        <div className=" visible pointer-events-auto flex absolute items-center justify-center h-[100vh] w-full top-0 select-none box-border">
          <div className=" overflow-hidden w-[360px] flex flex-col justify-between z-[100] relative max-h-[90vh] bg-background dark:bg-background-darkHover backdrop-blur-[32px] rounded-[16px] visible pointer-events-auto box-border select-none   ">
            <button
              onClick={() => setOpen(false)}
              className=" h-6 w-6 dark:bg-background-darkHover dark:hover:bg-background-darkHover/70 bg-accent hover:bg-accent/90 flex justify-center items-center  top-6 right-6 absolute cursor-pointer z-[100] rounded-md text-center"
            >
              <X />
            </button>
            <div className=" h-[200px] w-full ">
              <Image
                className=" w-full h-full object-cover overflow-hidden "
                src="/assets/k2/delete.jpg"
                alt="The 3D journey starts here"
                width={400}
                height={400}
                priority
              />
            </div>

            <div className="text-[16px] leading-6 text-background-foregroundL dark:text-white font-semibold mt-[24px] mb-[8px] text-center">
              Are you sure you want to delete this user?
            </div>

            <div className=" p-6 text-sm flex justify-center gap-2">
              <button
                onClick={() => setOpen(false)}
                className=" h-[44px] rounded-[3px] px-4  w-full  pb-[1px] shadow-md bg-accent dark:bg-[rgba(255,255,255,.03)] text-background-foregroundL/30 dark:hover:text-white hover:text-background-foregroundL  dark:text-[rgba(255,255,255,.4)] leading-4 whitespace-nowrap "
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className=" h-[44px] rounded-[3px] px-4  w-full pb-[1px] bg-red-100 shadow-2xl text-red-600 leading-4 whitespace-nowrap"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
