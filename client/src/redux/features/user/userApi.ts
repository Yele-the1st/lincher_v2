import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "user/update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    deletePicture: builder.mutation<void, void>({
      query: () => ({
        url: "user/delete-user-avatar",
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    EditProfile: builder.mutation({
      query: ({ name }) => ({
        url: "user/update-user-info",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "user/update-user-password",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "user/get-all-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getAllAdminUsers: builder.query({
      query: () => ({
        url: "user/get-all-admin-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateUserRole: builder.mutation({
      query: ({ email, role }) => ({
        url: "user/update-user-roles",
        method: "PUT",
        body: { email, role },
        credentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useDeletePictureMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useGetAllAdminUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userApi;
