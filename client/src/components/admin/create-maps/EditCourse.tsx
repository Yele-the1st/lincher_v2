"use client";

import { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import CourseOptionsMobile from "./CourseOptionsMobile";
import {
  useCreateCourseMutation,
  useEditCourseMutation,
  useGetCourseEditQuery,
} from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

interface EditCourseProps {
  id: string;
}

const EditCourse: FC<EditCourseProps> = ({ id }) => {
  const { data, isLoading, isError, refetch } = useGetCourseEditQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  );

  const [editCourse, { isSuccess, error }] = useEditCourseMutation();

  const course = data?.course;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Updated successfully");
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

  useEffect(() => {
    if (course) {
      setCourseInfo({
        name: course.name,
        description: course.description,
        price: course.price,
        estimatedPrice: course.estimatedPrice,
        type: course.type,
        tags: course.tags,
        level: course.level,
        categories: course?.categories,
        demoUrl: course.demoUrl,
        thumbnail: course.thumbnail?.url,
      });
      setBenefits(course.benefits);
      setPrerequisites(course.prerequisites);
      setCourseContentData(course.courseData);
    }
  }, [course]);

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
        title: courseContent.title,
        description: courseContent.description,
        videoLength: courseContent.videoLength,
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

    await editCourse({ id: course._id, data });
  };

  return (
    <div>
      <div className="p-4 bg-transparent">
        <div className=" dark:bg-background-dark bg-background mt-12 sm:px-4 py-4 ">
          <div className=" min-h-screen w-full xl:flex">
            <div className=" flex w-full xl:hidden justify-center">
              <CourseOptionsMobile active={active} setActive={setActive} />
            </div>
            <div className=" w-full xl:w-8/12">
              {active === 0 && (
                <CourseInformation
                  courseInfo={courseInfo}
                  setCourseInfo={setCourseInfo}
                  active={active}
                  setActive={setActive}
                />
              )}
              {active === 1 && (
                <CourseData
                  benefits={benefits}
                  setBenefits={setBenefits}
                  prerequisites={prerequisites}
                  setPrerequisites={setPrerequisites}
                  active={active}
                  setActive={setActive}
                />
              )}
              {active === 2 && (
                <CourseContent
                  courseContentData={courseContentData}
                  setCourseContentData={setCourseContentData}
                  handleSubmit={handleSubmit}
                  active={active}
                  setActive={setActive}
                />
              )}
              {active === 3 && (
                <CoursePreview
                  courseData={courseData}
                  handleCourseCreate={handleCourseCreate}
                  active={active}
                  setActive={setActive}
                  isLoading={isLoading}
                  isEdit={true}
                />
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

export default EditCourse;
