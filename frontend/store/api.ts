import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Message {
  id: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}),
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], void>({
      query: () => "/messages",
      providesTags: ["Messages"],
    }),
    addMessage: builder.mutation<Message, { message: string }>({
      query: (body) => ({
        url: "/messages",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Messages"],
    }),
    updateMessage: builder.mutation<Message, { id: number; message: string }>({
      query: ({ id, ...body }) => ({
        url: `/messages/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Messages"],
    }),
    deleteMessage: builder.mutation<void, number>({
      query: (id) => ({
        url: `/messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;