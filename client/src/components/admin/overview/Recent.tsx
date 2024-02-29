import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { getInitials } from "@/utils/string";
import { useEffect, useState } from "react";

export function RecentSales() {
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
          avatar: user?.avatar?.url,
        };
      });
      setOrderData(temp);
    }
  }, [coursesData?.courses, data, usersData?.users]);

  return (
    <div className="h-[300px] overflow-y-scroll">
      <ScrollArea orientation="vertical">
        {orderData &&
          orderData.map((order: any, index: any) => (
            <div key={index} className="flex mb-4 items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={order.avatar} alt="Avatar" />
                <AvatarFallback>
                  {order.userName && getInitials(order.userName)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {order.userName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {order.userEmail}
                </p>
              </div>
              <div className="ml-auto font-medium max-w-[100px] md:max-w-full truncate">
                {order.title}
              </div>
            </div>
          ))}
      </ScrollArea>
    </div>
  );
}
