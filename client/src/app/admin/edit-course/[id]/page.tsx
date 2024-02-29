"use client";

import { FC } from "react";
import Heading from "@/utils/Heading";
import DashboardHeader from "@/components/admin/dashboardHeader";
import EditCourse from "@/components/admin/create-maps/EditCourse";

interface pageProps {}

const page: FC = ({ params }: any) => {
  const id = params?.id;
  return (
    <div>
      <Heading
        title="Lincher - Admin"
        description="Elearning is a platform for students to learn and get help from teachers "
        keywords="Programing, MERN, Redux, Machine Learning"
      />
      <div className="">
        <EditCourse id={id} />
      </div>
    </div>
  );
};

export default page;
