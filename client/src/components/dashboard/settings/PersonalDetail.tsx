"use client";

import { Button } from "@/components/ui/button";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useEditProfileMutation } from "@/redux/features/user/userApi";
import { X } from "@phosphor-icons/react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsFillPersonFill } from "react-icons/bs";

interface PersonalDetailProps {
  setOpen: (open: boolean) => void;
  name: string;
  email: string;
}

const PersonalDetail: FC<PersonalDetailProps> = ({ setOpen, name, email }) => {
  const [editProfile, { isSuccess, error }] = useEditProfileMutation();
  const { isLoading: meLoading, refetch } = useLoadUserQuery(undefined);

  const [newName, setNewName] = useState(name);

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
    if (error) {
      console.log(error);
    }
    if (isSuccess) {
      toast.success("Profile updated successfully");
    }
  }, [error, isSuccess, refetch]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (newName !== "") {
      await editProfile({
        name: newName,
      });
    }
  };

  return (
    <div>
      <div className=" pointer-events-auto fixed top-0 right-0 bottom-0 left-0 z-10 bg-[rgba(0,0,0,0.6)] select-none box-border block  ">
        <div className=" visible pointer-events-auto flex absolute items-center justify-center h-[100vh] w-full top-0 select-none box-border">
          <div className=" overflow-hidden w-[360px] flex flex-col justify-between z-[100] relative max-h-[90vh] bg-background dark:bg-background-darkHover backdrop-blur-[32px] rounded-[16px] visible pointer-events-auto box-border select-none   ">
            <Button
              variant={"secondary"}
              size={"icon"}
              onClick={() => setOpen(false)}
              className=" h-6 w-6 top-6 right-6 absolute z-[100]"
            >
              <X />
            </Button>
            <div className=" h-[220px] w-full ">
              <Image
                className=" w-full h-full object-cover overflow-hidden "
                src="/assets/k2/kk.webp"
                alt="The 3D journey starts here"
                width={400}
                height={400}
                priority
              />
            </div>

            {/* <div className="text-[16px] leading-6 text-background-foregroundL dark:text-white font-semibold mt-[24px] mb-[8px] text-center">
              Update your profile
            </div> */}
            <div className=" py-2 px-6">
              <label className={` hidden `}>Username</label>
              <div className="mt-2">
                <div
                  className={`  flex rounded-md h-[44px] shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary`}
                >
                  <span className="flex select-none items-center px-3 ">
                    <BsFillPersonFill className=" h-5 w-5" />
                  </span>
                  <input
                    type="text"
                    name=""
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    id="name"
                    className={`block flex-1 border-0 bg-transparent w-full h-full py-1.5 pl-1   outline-none  focus:ring-0 sm:text-sm sm:leading-6`}
                  />
                </div>
              </div>
            </div>
            <div className=" p-6 text-sm flex justify-center gap-2">
              <Button
                variant={"secondary"}
                onClick={() => setOpen(false)}
                className=" opacity-55 w-full shadow-md whitespace-nowrap "
              >
                Cancel
              </Button>
              <Button
                variant={"secondary"}
                onClick={handleSubmit}
                className=" w-full shadow-2xl whitespace-nowrap"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetail;
