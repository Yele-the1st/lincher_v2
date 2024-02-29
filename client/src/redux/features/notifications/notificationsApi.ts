import { apiSlice } from "../api/apiSlice";

export const noticationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotications: builder.query({
      query: () => ({
        url: `notification/get-all-notifications`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateNotificationStatus: builder.mutation({
      query: (id) => ({
        url: `notification/update-notification/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllNoticationsQuery,
  useUpdateNotificationStatusMutation,
} = noticationsApi;
