"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { ThemeSwitch } from "../theme/ThemeSwitch";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { PiUserCircleFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { getAuthSession } from "@/lib/auth";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { useSession } from "../../../node_modules/next-auth/react";
import toast from "react-hot-toast";
import { Library } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { User } from "@phosphor-icons/react";
import { UserAvatar } from "./UserAvatar";
import { cn } from "@/lib/utils";
import { NavItems } from "./NavItems";
import HeaderSidebar from "./HeaderSidebar";

interface HeaderProps {
  activeItem?: number;
}

const Header: FC<HeaderProps> = ({ activeItem }) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  const [scrollWidth, setScrollWidth] = useState("100%"); // Initial width
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
        });
      }
    }
    if (data === null) {
      if (isSuccess) {
        toast.success("Login Successfully");
      }
    }
  }, [data, isSuccess, socialAuth, user]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Define the starting width, width reduction per scroll, and the minimum width
      const initialWidth = 100; // Adjust as needed
      const widthReductionPerScroll = 0.05; // Adjust as needed
      const minWidth = 60; // Adjust as needed

      // Calculate the new width
      let newWidth = initialWidth - scrollY * widthReductionPerScroll;

      // Ensure the width doesn't go below the minimum width
      newWidth = Math.max(minWidth, newWidth);

      // Convert the width to Tailwind CSS format
      const tailwindWidth = newWidth + "%";

      // Update the state with the new width
      setScrollWidth(tailwindWidth);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={` w-full z-20 w- h-[90px] flex flex-col justify-end items-center px-6 fixed top-0`}
    >
      <div
        style={{ width: `${scrollWidth}`, minWidth: "360px" }}
        className=" h-16 backdrop-blur-md bg-background/75 border border-border/60 rounded-[16px] shadow-2xl pl-6 pr-3 flex items-center relative"
      >
        <Link
          href={`/`}
          className="mr-6 max-w-full flex items-center cursor-pointer"
        >
          <Library className=" stroke-primary" size={32} />
          <div className="ml-1 font-medium text-xl">lincher</div>
        </Link>

        <div className=" w-full justify-between items-center flex">
          <NavItems activeItem={activeItem} isMobile={false} />

          <div className=" flex space-x-2 items-center">
            <ThemeSwitch />
            {/* only for Mobile screens */}
            <div
              onClick={() => setOpenSidebar(true)}
              className="lg:hidden hover:bg-accent  dark:hover:bg-accent-hover  rounded-[8px] py-2 px-3"
            >
              <HiOutlineMenuAlt3
                size={20}
                className="cursor-pointer dark:text-background-foregroundD text-background-foregroundL "
              />
            </div>

            {user ? (
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "p-4 hidden lg:flex"
                )}
                href={`/dashboard/courses`}
              >
                <UserAvatar
                  className="shrink-0"
                  url={user?.avatar?.url}
                  name={user?.name}
                />
              </Link>
            ) : (
              <Button
                asChild
                variant={"default"}
                size={"default"}
                className="hidden md:flex"
              >
                <Link href={"/login"}>
                  <User size={20} className="mr-2" />
                  Sign in
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      {openSidebar && (
        <HeaderSidebar
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
          activeItem={activeItem}
        />
      )}
    </div>
  );
};

export default Header;
