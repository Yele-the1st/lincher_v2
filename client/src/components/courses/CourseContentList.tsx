import { ChevronDown, ChevronUp, MonitorPlay } from "lucide-react";
import { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { Button } from "../ui/button";

interface CourseContentListProps {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
}

const CourseContentList: FC<CourseContentListProps> = ({
  data,
  activeVideo,
  setActiveVideo,
  isDemo,
}) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  const getSectionInfo = (section: string) => {
    const sectionVideos = data.filter(
      (item: any) => item.videoSection === section
    );
    const sectionVideoCount = sectionVideos.length;
    const sectionVideoLength = sectionVideos.reduce(
      (totalLength: number, item: any) => totalLength + item.videoLength,
      0
    );
    const sectionContentHours = sectionVideoLength / 60;

    return {
      videos: sectionVideos,
      count: sectionVideoCount,
      length: sectionVideoLength,
      hours: sectionContentHours,
    };
  };

  const renderVideos = (sectionVideos: any[]) => {
    return sectionVideos.map((item: any) => {
      const contentLength = item.videoLength / 60;
      const videoIndex = data.findIndex((videoItem: any) => videoItem === item);
      return (
        <div
          key={item._id}
          className={`w-full ${
            videoIndex === activeVideo ? "bg-secondary" : ""
          } cursor-pointer rounded-md transition-all p-2`}
          onClick={() =>
            !isDemo && setActiveVideo && setActiveVideo(videoIndex)
          }
        >
          <div className="flex items-center">
            <div>
              <MonitorPlay size={20} className="mr-2 text-primary" />
            </div>
            <h1 className="text-sm inline-block break-words">{item.title}</h1>
          </div>
          <h5 className="pl-8">
            {item.videoLength > 60
              ? contentLength.toFixed(2)
              : item.videoLength}{" "}
            {item.videoLength > 60 ? "hours" : "minutes"}
          </h5>
        </div>
      );
    });
  };

  const videoSections: string[] = [
    ...new Set<string>(data?.map((item: any) => item.videoSection)),
  ];

  return (
    <div
      className={` mt-[10px] w-full p-2 sm:p-4 md:p-6 lg:p-0  ${
        !isDemo && " md:ml-[-30px] sticky md:top-24 md:left-0 z-30 "
      }`}
    >
      {videoSections.map((section: string) => {
        const isSectionVisible = visibleSections.has(section);
        const { videos, count, length, hours } = getSectionInfo(section);

        return (
          <div className={`${!isDemo && "border-b"} py-2`} key={section}>
            <div className="w-full h-full">
              <div className="w-full flex justify-between items-center">
                <div>
                  <h2 className=" text-base font-semibold ">{section}</h2>
                  <h5 className=" text-sm">
                    {count} Lessons {length < 60 ? length : hours.toFixed(2)}{" "}
                    {length > 60 ? "hours" : "minutes"}
                  </h5>
                </div>

                <Button
                  onClick={() => toggleSection(section)}
                  className=" cursor-pointer"
                  variant={"ghost"}
                  size={"icon"}
                >
                  {isSectionVisible ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </Button>
              </div>
            </div>

            {isSectionVisible && (
              <div className="w-full">{renderVideos(videos)}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
