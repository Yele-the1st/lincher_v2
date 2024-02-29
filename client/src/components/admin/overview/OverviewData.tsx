"use client";

import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TooltipProps } from "recharts";

export function OverviewData() {
  interface UsersAnalyticsProps {}

  const { data, isLoading, isError } = useGetUsersAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data?.users?.last12Months?.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });

  return (
    <ResponsiveContainer width="100%" height={140}>
      <LineChart
        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        data={analyticsData}
        width={500}
        height={300}
      >
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#6101ee"
          strokeWidth={3}
          dot={{ stroke: "#6101ee", strokeWidth: 2, r: 3 }}
          activeDot={{ fill: "#030712", r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip: React.FC<TooltipProps<any, string>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload; // Extract the payload data
    return (
      <div className=" bg-background border py-2 px-4 rounded-xl">
        <p className="label">{`Date : ${data.name}`}</p>
        <p className="label">{`Count : ${data.count}`}</p>
      </div>
    );
  }

  return null;
};
