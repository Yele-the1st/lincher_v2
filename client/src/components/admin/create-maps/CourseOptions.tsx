"use client";

import { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { IoMdOptions } from "react-icons/io";
import { FaFileInvoice, FaFileLines, FaFileVideo } from "react-icons/fa6";

interface CourseOptionsProps {
  active: number;
  setActive: (active: number) => void;
}

const CourseOptions: FC<CourseOptionsProps> = ({ active, setActive }) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  // Corresponding icons for each option
  const icons = [FaFileLines, IoMdOptions, FaFileVideo, FaFileInvoice];

  return (
    <div>
      <div className={`w-full flex flex-col items-start pt-10`}>
        {options.map((option: any, index: number) => {
          const Icon = icons[index]; // Get the corresponding icon
          return (
            <div
              key={index}
              className={`relative ${
                index !== options.length - 1 ? "border-s-4" : "ml-1"
              } ${active + 1 > index ? "border-primary" : "border-secondary"}`}
            >
              <div className="mb-14 ms-8 flex items-center">
                <span
                  className={`absolute flex items-center shadow justify-center w-10 h-10 rounded-full -start-[22px] ring-4  ${
                    active + 1 > index
                      ? "bg-primary ring-primary/20 ring-ring-primary/80"
                      : "bg-accent ring-accent/30"
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
                <h3 className="">{option}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseOptions;
