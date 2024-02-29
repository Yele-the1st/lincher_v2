"use client";

import { Metadata } from "next";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { OrdersSchema, Orders } from "./data/schema";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { motion } from "framer-motion";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";

export const metadata: Metadata = {
  title: "Maps",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default function Orders() {
  const { isLoading, data, error } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});

  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find(
          (user: any) => user._id === item.userId
        );
        const course = coursesData?.courses.find(
          (course: any) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "N" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [coursesData?.courses, data, usersData?.users]);

  console.log(orderData);

  // Function to parse data using MapsSchema
  function parseData(data: any): Orders[] {
    return data.map((item: any) => OrdersSchema.parse(item));
  }
  // Check if data is available and parse it using MapsSchema
  const orders: Orders[] = data ? parseData(orderData) : [];

  console.log(orders);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-4 flex">
        <div className="flex items-center py-2">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold tracking-tight"
          >
            {`Orders`}
          </motion.h1>
        </div>

        {orders.length !== 0 && (
          <DataTable data={orderData} columns={columns} />
        )}
      </div>
    </>
  );
}
