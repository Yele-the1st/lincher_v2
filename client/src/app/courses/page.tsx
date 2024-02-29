"use client";

import { FC, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "@/components/Loader/Loader";
import Header from "@/components/Navigation/Header";
import Heading from "@/utils/Heading";
import { motion } from "framer-motion";
import CourseCard from "@/components/routes/courses/CourseCard";

interface pageProps {}

const CoursePage: FC<pageProps> = ({}) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetAllCoursesQuery({});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.courses);
    }

    if (category !== "All") {
      setCourses(
        data?.courses.filter((item: any) => item.categories === category)
      );
    }

    if (search) {
      setCourses(
        data?.courses.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [category, data?.courses, search]);

  const categories = categoriesData?.layout.categories;

  return (
    <div>
      <Heading
        title="Lincher | The future of Learning"
        description="Lincher is a platform for student to learn and get help from teachers"
        keywords="Programming, courses, Machine Learning"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header activeItem={1} />
          <div className="mx-auto max-w-7xl mt-28 px-6 lg:px-12">
            <div className=" gap-3 w-full flex items-center flex-wrap">
              <div
                className={`h-[35px] ${
                  category === "All" ? "bg-primary text-white" : "bg-secondary"
                } px-3 rounded-xl flex items-center justify-center cursor-pointer`}
                onClick={() => setCategory("All")}
              >
                All
              </div>
              {categories &&
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        category === item.title
                          ? "bg-primary text-white"
                          : "bg-secondary"
                      } px-3 rounded-xl flex items-center justify-center cursor-pointer`}
                      onClick={() => setCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
            </div>
            {courses && courses.length === 0 && (
              <p className={` justify-center min-h-[50vh] flex items-center`}>
                {search
                  ? "No courses found!"
                  : "No courses found in this category. please try another one"}
              </p>
            )}
            <div className=" mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
              {courses &&
                courses.map((course: any, index: number) => (
                  <>
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
                  </>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursePage;
