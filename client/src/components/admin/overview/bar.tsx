"use client";

import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function OverviewBar() {
  const { data, isLoading, isError } = useGetCoursesAnalyticsQuery({});

  console.log(data);

  const analyticsData: any = [];

  data &&
    data.courses.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });

  const minValue = 0;

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={analyticsData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="uv"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
