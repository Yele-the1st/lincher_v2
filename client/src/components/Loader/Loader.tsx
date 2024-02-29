import { FC } from "react";

interface LoaderProps {}

const Loader: FC<LoaderProps> = ({}) => {
  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" mt-6 w-full px-[80px] p-3 flex justify-center items-center overflow-hidden box-border">
        <div className=" w-2 h-2 rounded-full mr-1.5 bg-primary animate-loading"></div>
        <div
          style={{ animationDelay: "0.1s" }}
          className=" w-2 h-2 rounded-full mr-1.5 bg-primary animate-loading"
        ></div>
        <div
          style={{ animationDelay: "0.2s" }}
          className=" w-2 h-2 rounded-full mr-1.5 bg-primary animate-loading"
        ></div>
      </div>
    </div>
  );
};

export default Loader;
