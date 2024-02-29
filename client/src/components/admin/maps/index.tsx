"use client";

import { Metadata } from "next";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { Maps, MapsSchema } from "./data/schema";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { motion } from "framer-motion";

export const metadata: Metadata = {
  title: "Maps",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default function Maps() {
  const { isLoading, data, error } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  console.log(data);

  // Function to parse data using MapsSchema
  function parseData(data: any): Maps[] {
    return data.map((item: any) => MapsSchema.parse(item));
  }
  // Check if data is available and parse it using MapsSchema
  const maps: Maps[] = data ? parseData(data.courses) : [];

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-4 flex">
        <div className="flex items-center py-2">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold tracking-tight"
          >
            {`Maps`}
          </motion.h1>
        </div>

        <DataTable data={maps} columns={columns} />
      </div>
    </>
  );
}
