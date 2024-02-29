"use client";

import { FC, useEffect, useState } from "react";

import { motion } from "framer-motion";
import CourseCard from "@/components/routes/courses/CourseCard";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

interface indexProps {}

const Library: FC<indexProps> = ({}) => {
  const { data, isLoading } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const { data: userData, isLoading: userLoading } = useLoadUserQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    if (data && userData) {
      const userCourseIds = userData?.user?.courses?.map(
        (course: { _id: any }) => course._id
      );
      const filteredCourses = data?.courses.filter((course: { _id: any }) =>
        userCourseIds.includes(course?._id)
      );

      setCourses(filteredCourses);
    }
  }, [data, userData]);

  return (
    <div>
      <div>
        <div className="flex items-center px-4 py-2">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold tracking-tight"
          >
            {`Library`}
          </motion.h1>
        </div>

        {/* <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
              </div>
            </form>
          </div> */}
        <div className=" p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
            {courses &&
              courses.map((course: any, index: number) => (
                <motion.figure
                  key={index}
                  initial={{ opacity: 0, y: -100 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.25 },
                  }}
                >
                  <>
                    <CourseCard course={course} />
                  </>
                </motion.figure>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
