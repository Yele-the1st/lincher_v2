"use client";

import { Metadata } from "next";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { Users, UsersSchema } from "./data/schema";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { motion } from "framer-motion";

export const metadata: Metadata = {
  title: "Maps",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default function UsersSection() {
  const { isLoading, data, error } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  // Function to parse data using MapsSchema
  function parseData(data: any): Users[] {
    return data.map((item: any) => UsersSchema.parse(item));
  }
  // Check if data is available and parse it using MapsSchema
  const users: Users[] = data ? parseData(data.users) : [];

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-4 mb-36 flex">
        <div className="flex items-center py-2">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold tracking-tight"
          >
            {`Create Maps`}
          </motion.h1>
        </div>

        <DataTable data={users} columns={columns} />
      </div>
    </>
  );
}
