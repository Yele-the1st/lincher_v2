import Link from "next/link";
import { FC } from "react";
import { BaseCard } from "./base-card";
import Image from "next/image";
import Ratings from "@/utils/Ratings";
import { cn } from "@/lib/utils";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Badge } from "@/components/ui/badge";
import { Youtube } from "lucide-react";
import { FaYoutube } from "react-icons/fa6";

interface CourseCardProps {
  course: any;
  isProfile?: boolean;
}

const CourseCard: FC<CourseCardProps> = ({ course, isProfile }) => {
  console.log(course.reviews);

  return (
    <BaseCard className="rounded-xl p-4 hover:shadow-lg">
      <Link
        href={
          !isProfile ? `/course/${course._id}` : `course-access/${course._id}`
        }
      >
        <div className="relative overflow-hidden rounded-xl w-full h-[180px]">
          <Image
            className="w-screen h-full object-cover"
            src={course.thumbnail.url}
            alt=""
            height={400}
            width={400}
          />
          {course.type === "youtube" && (
            <div className=" absolute top-2 right-2 ">
              <FaYoutube size={30} className="fill-white" />
            </div>
          )}
        </div>
        <div className=" pt-4">
          <h1 className="font-medium text-base text-ellipsis line-clamp-1 ">
            {course.name}
          </h1>
          <p className="opacity-75 text-sm">
            {course?.curator ? course?.curator : "Kunle Alawo"}
          </p>
        </div>
        <div className=" w-full flex justify-between items-center pt-2">
          <Ratings rating={course.ratings} />
          <h5 className={cn(isProfile && "hidden lg:inline")}>
            {course.purchased} techies
          </h5>
        </div>
        <div className=" w-full flex items-center justify-between pt-2">
          <div className="flex">
            <h3 className="">
              {course.price === 0 ? <Badge>Free</Badge> : course.price + "N"}
            </h3>
          </div>
          <div className=" flex items-center">
            <AiOutlineUnorderedList size={20} />
            <h5 className=" pl-2">{course.courseData?.length} Lectures</h5>
          </div>
        </div>
      </Link>
    </BaseCard>
  );
};

export default CourseCard;
