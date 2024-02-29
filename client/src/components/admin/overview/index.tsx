"use client";

import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OverviewData } from "./OverviewData";
import { RecentSales } from "./Recent";
import { motion } from "framer-motion";
import { OverviewBar } from "./bar";
import {
  useGetAllAdminUsersQuery,
  useGetAllUsersQuery,
} from "@/redux/features/user/userApi";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { Activity, BookText, Gem, Users } from "lucide-react";

interface indexProps {}

const OverviewPage: FC<indexProps> = ({}) => {
  const {
    isLoading: userLoading,
    data: userData,
    error: userError,
  } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });

  const {
    isLoading: adminLoading,
    data: adminData,
    error: adminError,
  } = useGetAllAdminUsersQuery({}, { refetchOnMountOrArgChange: true });

  const {
    isLoading: coursesLoading,
    data: coursesData,
    error: coursesError,
  } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });

  const {
    isLoading: subLoading,
    data: subData,
    error: subError,
  } = useGetAllOrdersQuery({}, { refetchOnMountOrArgChange: true });

  console.log(subData);

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center py-2">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold tracking-tight"
        >
          Overview
        </motion.h1>
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle> Users Analytics</CardTitle>
              <CardDescription>Last 12 months analytics data.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <OverviewData />
            </CardContent>
          </Card>
          <div className="grid col-span-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Courses
                </CardTitle>
                <BookText />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {coursesData?.courses?.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userData?.users?.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Subscribtions
                </CardTitle>
                <Activity />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {subData?.orders?.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Creators
                </CardTitle>
                <Gem />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {adminData?.users?.length}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
          {/* <Card className="col-span-full lg:col-span-4">
            <CardHeader>
              <CardTitle> Course Analytics</CardTitle>
              <CardDescription>Last 12 months analytics data.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <OverviewBar />
            </CardContent>
          </Card> */}
          <Card className="col-span-full ">
            <CardHeader>
              <CardTitle>Recent Subscribtions</CardTitle>
              <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
