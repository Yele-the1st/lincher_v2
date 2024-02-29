import { FC } from "react";
import CoursePlayer from "./CoursePlayer";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Ratings from "@/utils/Ratings";
import { IoAlarm, IoCheckmarkDoneOutline, IoGlobeSharp } from "react-icons/io5";
import { PiSealWarningFill } from "react-icons/pi";
import { TbPointFilled } from "react-icons/tb";
import { BsGlobe } from "react-icons/bs";

interface CoursePreviewProps {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isLoading: boolean;
  isEdit?: boolean;
}

const CoursePreview: FC<CoursePreviewProps> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isLoading,
  isEdit,
}) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  const todayDate = new Date().toLocaleDateString();

  return (
    <div>
      <div className="w-full mt-6 m-auto">
        <CoursePlayer
          videoUrl={courseData?.demoUrl}
          title={courseData?.title}
        />
      </div>
      <div className=" text-black dark:text-white">
        <div className=" mt-4 mb-[0.4rem] lg:mb-[0.8rem] max-w-[104.8rem]  text-[2.0rem] lg:text-[2.4rem] leading-[1.2] font-[700] font-Poppins">
          {courseData?.name}
        </div>
        <div className=" mb-[0.8rem] lg:mb-[1.6rem] font-[400] leading-[1.4] text-[1.2rem] lg:text-[1.4rem]">
          {courseData?.description}
        </div>
        <div className=" w-full md:flex items-center leading-[1.4] text-[1.0rem] font-[400]  lg:text-[1.1rem] mb-[0.8rem] ">
          <div className=" flex mb-[0.8rem] md:mb-0 items-center">
            <div className=" py-1 px-1.5 bg-[#f6b100] text-black font-semibold mr-4">
              Bestseller
            </div>
            <div className=" mr-2 text-[#f6b100] font-semibold ">2.7</div>
            <Ratings rating={2.7} />
          </div>
          <div className=" flex items-center">
            <h5>(356 ratings),</h5>
            <div className=" ml-2"> 204 Students.</div>
          </div>
        </div>
        <div className=" leading-[1.4] text-[1.0rem] font-[400]  lg:text-[1.1rem] mb-[0.8rem]">
          Created by <strong>{courseData?.curator}</strong>
        </div>
        <div className=" leading-[1.4] text-[1.0rem] font-[400]  lg:text-[1.1rem] mb-[0.8rem] flex items-center ">
          <div className=" flex items-center ">
            <PiSealWarningFill className=" w-6 h-6" />
            <div className=" ml-2">Last updated {todayDate}</div>
          </div>
          <div className=" ml-4 flex items-center ">
            <BsGlobe className=" w-5 h-5" />
            <div className=" ml-2 ">English</div>
          </div>
        </div>
        <div className=" mt-4 leading-[1.4] text-[1.0rem] font-[400]  lg:text-[1.1rem] mb-[0.8rem]">
          <div className="pb-1 gap-1 flex items-center">
            <TbPointFilled className=" w-4 h-4" />
            <span>Full lifetime access</span>
          </div>
          <div className="pb-1 gap-1 flex items-center">
            <TbPointFilled className=" w-4 h-4" />
            <span>Certificate of Completion</span>
          </div>
          <div className="pb-1 gap-1 flex items-center">
            <TbPointFilled className=" w-4 h-4" />
            <span>Premium Support</span>
          </div>
          <div className="pb-1 gap-1 flex items-center">
            <TbPointFilled className=" w-4 h-4" />
            <span>Source code included</span>
          </div>
        </div>
      </div>

      <div className=" w-full mt-10 text-black dark:text-white">
        <div className=" flex items-center">
          <h1 className="font-bold text-4xl">
            {courseData?.price === 0 || "0" ? "Free" : "$" + courseData?.price}
          </h1>

          <h5 className=" pl-3 text-[20px] line-through opacity-80 ">
            ${courseData?.estimatedPrice}
          </h5>

          <h4 className="pl-5 text-base">{discountPercentagePrice}% Off</h4>
        </div>
        <div className=" mt-2 flex items-center text-red-600 ">
          <IoAlarm className=" w-5 h-5" />
          <div className=" ml-2 text-sm lg:text-base">
            13 hours left at this price!
          </div>
        </div>
      </div>
      {courseData?.price === "0" ? (
        <div className=" cursor-pointer w-full flex items-center  mt-3 md:w-auto ">
          <button className="w-full lg:w-[180px]" type="button">
            <div className=" w-full h-[44px] rounded-[3px] px-4 inline-flex justify-center items-center text-center max-w-full bg-primary text-white shadow mb-[24px]  text-[15px] font-medium ">
              <div className=" align-middle h-full flex justify-between items-center">
                <div className=" flex items-center">Enroll Now</div>
              </div>
            </div>
          </button>
        </div>
      ) : (
        <div className=" cursor-pointer w-full flex items-center  mt-3 md:w-auto ">
          <button className="w-full lg:w-[180px]" type="button">
            <div className=" w-full h-[44px] rounded-[3px] px-4 inline-flex justify-center items-center text-center max-w-full bg-primary text-white shadow mb-[24px]  text-[15px] font-medium ">
              <div className=" align-middle h-full flex justify-between items-center">
                <div className=" flex items-center">
                  Buy Now ${courseData?.price}
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      <div className=" w-full text-black dark:text-white mt-2">
        <div className=" border dark:border-[#1E1E1E] rounded-[3px] border-[rgb(232,237,241)] p-4">
          <div className=" text-[1.3rem] lg:text-[1.5rem] leading-[1.2] mt-2 font-Poppins font-[600]">
            What you will learn from this course?
          </div>
          {courseData?.benefits?.map((item: any, index: number) => (
            <div
              className="w-full leading-[1.4] text-[1.0rem] font-[400]  lg:text-[1.1rem] flex 800px:items-center py-2"
              key={index}
            >
              <div className=" w-[15px] mr-1">
                <IoCheckmarkDoneOutline className={` w-5 h-5`} />
              </div>
              <p className="pl-2">{item.title}</p>
            </div>
          ))}
          <div className=" text-[1.3rem] lg:text-[1.5rem] leading-[1.2] mt-2 font-Poppins font-[600]">
            What are the prerequisites for this course?
          </div>
          {courseData?.prerequisites?.map((item: any, index: number) => (
            <div
              className="w-full leading-[1.4] text-[1.0rem] font-[400]  lg:text-[1.1rem] flex 800px:items-center py-2"
              key={index}
            >
              <div className=" w-[15px] mr-1">
                <IoCheckmarkDoneOutline className={` w-5 h-5`} />
              </div>
              <p className="pl-2">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className=" mt-6 rounded-md flex w-full items-center justify-between relative h-[44px] border shadow-sm ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary cursor-not-allowed  ">
        <input
          type="text"
          name=""
          id=""
          placeholder="Discount code..."
          className=" w-full px-3 rounded-md bg-transparent h-full block flex-1 border-0 py-1.5 outline-none  placeholder:text-gray-400 focus:ring-0 sm:leading-6  "
        />
        <div
          className={` w-[120px] md:w-[180px] p-2 justify-center h-full text-sm flex items-center rounded-[3px]  my-3 font-Poppins text-white bg-primary cursor-pointer`}
        >
          Apply
        </div>
      </div>

      <div className="w-full flex items-center gap-5 justify-between">
        <div
          className=" w-full 800px:w-[140px] flex items-center justify-center h-[44px] text-center text-white bg-primary rounded-[3px] cursor-pointer mt-8 "
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className=" w-full 800px:w-[140px] flex items-center justify-center h-[44px] text-center text-white bg-primary rounded-[3px] cursor-pointer mt-8 "
          onClick={() => createCourse()}
        >
          {isLoading ? (
            <div className=" w-full flex justify-center items-center">
              <div className=" justify-center flex items-center">
                <div className=" w-2 h-2 rounded-full mr-1.5 bg-primary-foreground animate-loading"></div>
                <div
                  style={{ animationDelay: "0.1s" }}
                  className=" w-2 h-2 rounded-full mr-1.5 bg-primary-foreground  animate-loading"
                ></div>
                <div
                  style={{ animationDelay: "0.2s" }}
                  className=" w-2 h-2 rounded-full bg-primary-foreground  animate-loading"
                ></div>
              </div>
            </div>
          ) : (
            <div>{isEdit ? "Edit" : "Create"}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
