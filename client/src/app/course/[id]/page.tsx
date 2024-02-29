"use client";

import CourseDetails from "@/components/courses/CourseDetails";
import { FC } from "react";

const page: FC = ({ params }: any) => {
  return (
    <div>
      <CourseDetails id={params.id} />
    </div>
  );
};

export default page;
