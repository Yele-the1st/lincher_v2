"use client";

import Link from "next/link";
import { FC } from "react";

export const navItemsData = [
  { name: "Home", url: "/" },
  { name: "Courses", url: "/courses" },
  { name: "About", url: "/about" },
];

interface NavItemsProps {
  activeItem?: number;
  isMobile: boolean;
}

export const NavItems: FC<NavItemsProps> = ({ activeItem, isMobile }) => {
  return (
    <div>
      <div className="hidden lg:flex relative items-center justify-start gap-x-1">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Link href={`${i.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:bg-accent-dark bg-accent"
                    : "bg-inherit"
                } hover:bg-accent transition-colors duration-300 ease-in-out dark:hover:bg-accent-hover rounded-[8px] py-2 px-3 justify-start items-center mr-0 text-sm flex static`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="flex 900px:hidden mt-5">
          <div className="w-full text-center py-6">
            {navItemsData &&
              navItemsData.map((i, index) => (
                <Link href={`${i.url}`} key={index} passHref>
                  <div className="block">
                    <div
                      className={`${
                        activeItem === index ? "bg-accent" : "bg-inherit"
                      } hover:bg-secondary/50 rounded-md transition-colors duration-300 ease-in-out dark:hover:bg-accent-hover py-2 px-3 justify-start items-center mr-0 text-sm flex static`}
                    >
                      <button className="h-[32px] relative flex justify-between items-center text-center max-w-full bg-transparent rounded-[8px] font-bold text-sm w-auto cursor-pointer">
                        <div className="h-full flex items-center justify-center w-full">
                          <div className="w-full h-full flex items-center leading-[1]">
                            {i.name}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
