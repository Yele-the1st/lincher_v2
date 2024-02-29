import { FC, useState } from "react";

interface CoursePlayerProps {
  videoUrl: string;
  title: string;
}

const CoursePlayer: FC<CoursePlayerProps> = ({ videoUrl, title }) => {
  const [isError, setIsError] = useState(false);

  const handleOnError = () => {
    setIsError(true);
  };

  return (
    <div className="pt-[56%] relative">
      {!isError ? (
        <iframe
          src={videoUrl}
          className="border-none w-full h-full absolute top-0 left-0"
          allowFullScreen={true}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="YouTube video player"
          onError={handleOnError}
        ></iframe>
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600">
          <p>Sorry, the video could not be loaded.</p>
        </div>
      )}
    </div>
  );
};

export default CoursePlayer;
