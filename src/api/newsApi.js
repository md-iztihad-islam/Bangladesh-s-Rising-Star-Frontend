import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const NEWS_API = 'http://localhost:5011/api/v1/news';

const newsApi = createApi({
    reducerPath: "newsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: NEWS_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        createNews: builder.mutation({
            query: (newsData) => ({
                url: "/create",
                method: "POST",
                body: newsData
            })
        }),
        getNews: builder.query({
            query: () => ({
                url: "/allnews",
                method: "GET"
            })
        }),
        getNewsById: builder.query({
            query: (id) => ({
                url: `/${id}/news`,
                method: "GET"
            })
        }),
        deleteNews: builder.mutation({
            query: (id) => ({
                url: `/${id}/delete`,
                method: "DELETE"
            })
        })
    })
});

export const { useCreateNewsMutation, useGetNewsQuery, useGetNewsByIdQuery, useDeleteNewsMutation } = newsApi;

export default newsApi;