"use client";

import { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { IoMdOptions } from "react-icons/io";
import { FaFileInvoice, FaFileLines, FaFileVideo } from "react-icons/fa6";

interface CourseOptionsMobileProps {
  active: number;
  setActive: (active: number) => void;
}

const CourseOptionsMobile: FC<CourseOptionsMobileProps> = ({
  active,
  setActive,
}) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  // Corresponding icons for each option
  const icons = [FaFileLines, IoMdOptions, FaFileVideo, FaFileInvoice];

  return (
    <div className=" w-full pt-4 pb-10">
      <ol className="flex items-center ">
        {options.map((option: any, index: number) => {
          const Icon = icons[index]; // Get the corresponding icon
          return (
            <li
              key={index}
              className={`flex w-full items-center ${
                index !== options.length - 1
                  ? "after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block "
                  : ""
              } ${
                active + 1 > index
                  ? "border-primary after:border-primary"
                  : "border-gray-200 dark:border-accent-hover after:border-gray-200 dark:after:border-accent-hover"
              } `}
            >
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ring-4  ${
                  active + 1 > index
                    ? "bg-primary ring-primary/20 ring-ring-primary/80"
                    : "bg-accent dark:bg-accent-hover ring-accent/30 dark:ring-background-darkHover"
                }`}
              >
                {active > index ? (
                  <IoMdCheckmark
                    className={`w-5 h-5 ${
                      active + 1 > index
                        ? "text-white"
                        : "dark:text-white text-black"
                    }`}
                  />
                ) : (
                  <Icon
                    className={`w-5 h-5 ${
                      active + 1 > index
                        ? "text-white"
                        : "dark:text-white text-black"
                    }`}
                  />
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default CourseOptionsMobile;
