import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Topics", "Progress", "Quizzes", "Attempts", "Students", "Invites"],
  endpoints: (builder) => ({
    getTopics: builder.query({
      query: () => "/topics",
      providesTags: ["Topics"]
    }),
    createTopic: builder.mutation({
      query: (body) => ({
        url: "/topics",
        method: "POST",
        body
      }),
      invalidatesTags: ["Topics"]
    }),
    updateTopic: builder.mutation({
      query: ({ topicId, ...body }) => ({
        url: `/topics/${topicId}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["Topics"]
    }),
    getProgress: builder.query({
      query: (userId) => `/progress?userId=${userId}`,
      providesTags: ["Progress"]
    }),
    updateProgress: builder.mutation({
      query: (body) => ({
        url: "/progress",
        method: "POST",
        body
      }),
      invalidatesTags: ["Progress"]
    }),
    addLesson: builder.mutation({
      query: ({ topicId, ...body }) => ({
        url: `/topics/${topicId}/lessons`,
        method: "POST",
        body
      }),
      invalidatesTags: ["Topics"]
    }),
    updateLesson: builder.mutation({
      query: ({ topicId, lessonIndex, ...body }) => ({
        url: `/topics/${topicId}/lessons/${lessonIndex}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["Topics"]
    }),
    getQuizzes: builder.query({
      query: (topicId) => (topicId ? `/quizzes?topicId=${topicId}` : "/quizzes")
    }),
    getQuiz: builder.query({
      query: (quizId) => `/quizzes/${quizId}`
    }),
    createQuiz: builder.mutation({
      query: (body) => ({
        url: "/quizzes",
        method: "POST",
        body
      })
    }),
    updateQuiz: builder.mutation({
      query: ({ quizId, ...body }) => ({
        url: `/quizzes/${quizId}`,
        method: "PUT",
        body
      })
    }),
    deleteQuiz: builder.mutation({
      query: (quizId) => ({
        url: `/quizzes/${quizId}`,
        method: "DELETE"
      })
    }),
    getPublicQuiz: builder.query({
      query: (quizId) => `/quizzes/${quizId}/public`
    }),
    submitQuizAttempt: builder.mutation({
      query: ({ quizId, ...body }) => ({
        url: `/quizzes/${quizId}/attempt`,
        method: "POST",
        body
      })
    }),
    getAttempts: builder.query({
      query: ({ quizId, userId } = {}) => {
        const params = new URLSearchParams();
        if (quizId) params.set("quizId", quizId);
        if (userId) params.set("userId", userId);
        const qs = params.toString();
        return `/attempts${qs ? `?${qs}` : ""}`;
      }
    }),
    createInvite: builder.mutation({
      query: () => ({
        url: "/invites",
        method: "POST"
      }),
      invalidatesTags: ["Invites"]
    }),
    getInvites: builder.query({
      query: () => "/invites",
      providesTags: ["Invites"]
    }),
    signupStudent: builder.mutation({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body
      }),
      invalidatesTags: ["Invites", "Students"]
    }),
    getStudents: builder.query({
      query: () => "/students",
      providesTags: ["Students"]
    }),
    getStudent: builder.query({
      query: (id) => `/students/${id}`,
      providesTags: ["Students"]
    }),
    updateStudent: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: ["Students"]
    })
  })
});

export const {
  useGetTopicsQuery,
  useCreateTopicMutation,
  useUpdateTopicMutation,
  useGetProgressQuery,
  useUpdateProgressMutation,
  useAddLessonMutation,
  useUpdateLessonMutation,
  useGetQuizzesQuery,
  useGetQuizQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useGetPublicQuizQuery,
  useSubmitQuizAttemptMutation,
  useGetAttemptsQuery,
  useCreateInviteMutation,
  useGetInvitesQuery,
  useSignupStudentMutation,
  useGetStudentsQuery,
  useGetStudentQuery,
  useUpdateStudentMutation
} = api;

