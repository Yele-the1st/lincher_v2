"use client";

import { lazy, Suspense, FC, useEffect, useState } from "react";

import CourseOptions from "./CourseOptions";
import CourseOptionsMobile from "./CourseOptionsMobile";
import { useCreateCourseMutation } from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import { motion } from "framer-motion";

const LazyCourseInformation = lazy(() => import("./CourseInformation"));
const LazyCourseData = lazy(() => import("./CourseData"));
const LazyCourseContent = lazy(() => import("./CourseContent"));
const LazyCoursePreview = lazy(() => import("./CoursePreview"));

interface CreateCourseProps {}

const CreateMaps: FC<CreateCourseProps> = ({}) => {
  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created successfully");
      redirect("/admin/maps");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    type: "youtube",
    tags: "",
    level: "",
    categories: "",
    demoUrl: "",
    thumbnail: "",
    curator: "",
    curatorInfo: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  console.log(courseData);

  const handleSubmit = async () => {
    // format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));

    // format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    // format course content array
    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        videoLength: courseContent.videoLength,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );

    // prep data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      categories: courseInfo.categories,
      price: courseInfo.price,
      type: courseInfo.type,
      estimatedPrice: courseInfo.estimatedPrice,
      curator: courseInfo.curator,
      curatorInfo: courseInfo.curatorInfo,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data = courseData;

    if (!isLoading) {
      await createCourse(data);
    }
  };

  return (
    <div>
      <div className="p-4 bg-transparent">
        <div className="flex items-center p-4 py-2">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold tracking-tight"
          >
            {`Create Maps`}
          </motion.h1>
        </div>
        <div className=" dark:bg-background-dark bg-background sm:px-4 py-4 ">
          <div className=" min-h-screen w-full xl:flex">
            <div className=" flex w-full xl:hidden justify-center">
              <CourseOptionsMobile active={active} setActive={setActive} />
            </div>
            <div className=" w-full xl:w-8/12">
              {active === 0 && (
                <Suspense fallback={<Loader />}>
                  <LazyCourseInformation
                    courseInfo={courseInfo}
                    setCourseInfo={setCourseInfo}
                    active={active}
                    setActive={setActive}
                  />
                </Suspense>
              )}
              {active === 1 && (
                <Suspense fallback={<Loader />}>
                  <LazyCourseData
                    benefits={benefits}
                    setBenefits={setBenefits}
                    prerequisites={prerequisites}
                    setPrerequisites={setPrerequisites}
                    active={active}
                    setActive={setActive}
                  />
                </Suspense>
              )}
              {active === 2 && (
                <Suspense fallback={<Loader />}>
                  <LazyCourseContent
                    courseContentData={courseContentData}
                    setCourseContentData={setCourseContentData}
                    handleSubmit={handleSubmit}
                    active={active}
                    setActive={setActive}
                  />
                </Suspense>
              )}
              {active === 3 && (
                <Suspense fallback={<Loader />}>
                  <LazyCoursePreview
                    courseData={courseData}
                    handleCourseCreate={handleCourseCreate}
                    active={active}
                    setActive={setActive}
                    isLoading={isLoading}
                    isEdit={false}
                  />
                </Suspense>
              )}
            </div>
            <div className=" hidden w-4/12 xl:flex justify-center">
              <CourseOptions active={active} setActive={setActive} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMaps;
