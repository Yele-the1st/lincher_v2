import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "course/create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: (data) => ({
        url: "course/get-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `course/delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    getCourseEdit: builder.query({
      query: ({ id }) => ({
        url: `course/get-course-edit/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `course/edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `course/get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseContents: builder.query({
      query: (id) => ({
        url: `course/get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addNewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: `course/add-question`,
        method: "PUT",
        body: {
          question,
          courseId,
          contentId,
        },
        credentials: "include" as const,
      }),
    }),
    addAnswerInQuestion: builder.mutation({
      query: ({ answer, questionId, courseId, contentId }) => ({
        url: `course/add-answer`,
        method: "PUT",
        body: {
          answer,
          questionId,
          courseId,
          contentId,
        },
        credentials: "include" as const,
      }),
    }),
    addReviewInCourse: builder.mutation({
      query: ({ review, rating, courseId }) => ({
        url: `course/add-review/${courseId}`,
        method: "PUT",
        body: {
          review,
          rating,
        },
        credentials: "include" as const,
      }),
    }),
    addReplyInReview: builder.mutation({
      query: ({ courseId, comment, reviewId }) => ({
        url: `course/add-review-reply`,
        method: "PUT",
        body: {
          courseId,
          reviewId,
          comment,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useGetCourseEditQuery,
  useEditCourseMutation,
  useGetCourseDetailsQuery,
  useGetCourseContentsQuery,
  useAddNewQuestionMutation,
  useAddAnswerInQuestionMutation,
  useAddReviewInCourseMutation,
  useAddReplyInReviewMutation,
} = courseApi;
