"use client";

import OverviewPage from "@/components/admin/overview";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="">
      <OverviewPage />
    </div>
  );
};

export default page;
