import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { HiMiniXMark } from "react-icons/hi2";
// import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { NavItems } from "./NavItems";
import { Button, buttonVariants } from "../ui/button";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { UserAvatar } from "./UserAvatar";

interface HeaderSidebarProps {
  openSidebar: boolean;
  setOpenSidebar: (openSidebar: boolean) => void;
  activeItem?: number;
}

const HeaderSidebar: FC<HeaderSidebarProps> = ({
  openSidebar,
  setOpenSidebar,
  activeItem,
}) => {
  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div
      id="screen"
      onClick={handleClose}
      className={` lg:hidden fixed inset-0 h-full w-full bg-[rgb(0,0,0,0.5)] z-10 transition-colors duration-150 ease-in-out 800px:hidden`}
    >
      <aside
        style={{
          boxShadow: "0px 4px 40px rgba(0, 0, 0, 0.10)",
          transform: `${
            openSidebar
              ? "translate3d(0px , 0px, 0px)"
              : "translate3d(420px , 0px, 0px)"
          }`,
        }}
        className=" dark:bg-background-darkHover bg-background max-w-[420px] block absolute top-0 bottom-0 right-0 w-full h-full overflow-y-auto transition-[transform] ease-in-out duration-700      "
      >
        <div className=" pr-6 pl-8 flex items-center justify-end dark:bg-background-darkHover bg-background h-16  ">
          <div className=" ml-4 ">
            <button
              type="button"
              className=" mr-1 h-[44px] dark:hover:bg-accent-hover hover:bg-accent relative flex justify-between items-center text-center max-w-full bg-transparent rounded-[8px] font-medium text-[15px] w-[44px] transition-all ease-in-out duration-300   "
              onClick={() => setOpenSidebar(false)}
            >
              <div className=" align-middle h-full w-full flex justify-center items-center">
                <div className=" flex items-center h-full w-full justify-center">
                  <HiMiniXMark
                    size={20}
                    className="cursor-pointer dark:text-background-foregroundD text-background-foregroundL shrink-0 align-middle "
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className=" px-8 pb-8 ">
          <div className=" w-full pb-4">
            <Image
              height={339}
              width={339}
              className=" inline-block max-h-[339px] mb-4 max-w-full bg-transparent "
              src="/svg/Innovation-bro.svg"
              alt={""}
            />
            <p className=" text-background-foregroundL dark:text-background-foregroundD mb-4 text-base font-Poppins font-light text-center ">
              Get the best courses, set up classes and, use lincher.com ai bot,
              to get personalized support.
            </p>
            <div className=" flex flex-col items-center justify-center space-y-3">
              {user ? (
                <Link
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    " mt-4 flex"
                  )}
                  href={`/dashboard/courses`}
                >
                  <UserAvatar
                    className="shrink-0"
                    url={user?.avatar?.url}
                    name={user?.name}
                    size={70}
                  />
                </Link>
              ) : (
                <>
                  <Button asChild>
                    <Link href={"/login"}>Sign in</Link>
                  </Button>
                  <Button asChild className=" text-base" variant={"link"}>
                    <Link href={"/register"}>Create an account</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className=" lg:hidden">
            <NavItems activeItem={activeItem} isMobile={true} />
          </div>
          {/* <div className="flex items-start justify-center w-full gap-4 ">
            <Link href={``} className=" p-[10px]">
              <FaTwitter
                size={20}
                className="cursor-pointer dark:text-background-foregroundD text-background-foregroundL "
              />
            </Link>
            <Link href={``} className=" p-[10px]">
              <FaFacebook
                size={20}
                className="cursor-pointer dark:text-background-foregroundD text-background-foregroundL "
              />
            </Link>
            <Link href={``} className=" p-[10px]">
              <FaLinkedin
                size={20}
                className="cursor-pointer dark:text-background-foregroundD text-background-foregroundL "
              />
            </Link>
            <Link href={``} className=" p-[10px]">
              <FaInstagram
                size={20}
                className="cursor-pointer dark:text-background-foregroundD text-background-foregroundL "
              />
            </Link>
          </div> */}
        </div>
      </aside>
    </div>
  );
};

export default HeaderSidebar;
