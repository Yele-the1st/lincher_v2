import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoursesAnalytics: builder.query({
      query: () => ({
        url: "analytics/get-course-analytics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getUsersAnalytics: builder.query({
      query: () => ({
        url: "analytics/get-user-analytics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getOrdersAnalytics: builder.query({
      query: () => ({
        url: "analytics/get-order-analytics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetCoursesAnalyticsQuery,
  useGetUsersAnalyticsQuery,
  useGetOrdersAnalyticsQuery,
} = analyticsApi;
