import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Story"],
  endpoints: (builder) => ({
    getStories: builder.query({
      query: () => "/stories",
      providesTags: ["Story"],
    }),
    getStory: builder.query({
      query: (id) => `/stories/${id}`,
    }),
    addNewStory: builder.mutation({
      query: (initialStory) => ({
        url: "/stories",
        method: "POST",
        body: initialStory,
      }),
      invalidatesTags: ["Story"],
    }),
    updateStory: builder.mutation({
      query: (story) => ({
        url: `/stories/${story.id}`,
        method: "PATCH",
        body: story,
      }),
      invalidatesTags: ["Story"],
    }),
    likeStory: builder.mutation({
      query: (story) => ({
        url: `/stories/${story._id}/like`,
        method: "PATCH",
        body: story,
      }),
    }),
    deleteStory: builder.mutation({
      query: (story) => ({
        url: `/stories/${story._id}`,
        method: "DELETE",
        body: story,
      }),
      invalidatesTags: ["Story"],
    }),
  }),
});

export const {
  useGetStoriesQuery,
  useGetStoryQuery,
  useAddNewStoryMutation,
  useUpdateStoryMutation,
  useLikeStoryMutation,
  useDeleteStoryMutation,
} = apiSlice;
