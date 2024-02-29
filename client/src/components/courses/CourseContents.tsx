import { useGetCourseContentsQuery } from "@/redux/features/courses/coursesApi";
import { FC, useState } from "react";
import Loader from "@/components/Loader/Loader";
import Heading from "@/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Navigation/Header";
import CourseContentList from "./CourseContentList";

interface CourseContentsProps {
  id: string;
  user: any;
}

const CourseContents: FC<CourseContentsProps> = ({ id, user }) => {
  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetCourseContentsQuery(id, { refetchOnMountOrArgChange: true });

  const data = contentData?.content;

  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Heading
            title={data[activeVideo]?.title}
            description={"anything"}
            keywords={data[activeVideo]?.tags}
          />
          <div className=" mt-24 w-full grid lg:grid-cols-10">
            <div className=" col-span-full lg:col-span-7">
              <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                refetch={refetch}
              />
            </div>
            <div className=" col-span-full lg:col-span-3">
              <CourseContentList
                data={data}
                setActiveVideo={setActiveVideo}
                activeVideo={activeVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContents;
