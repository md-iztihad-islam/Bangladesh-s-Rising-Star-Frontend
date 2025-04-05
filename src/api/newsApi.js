import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//const NEWS_API = 'https://api.bangladeshsrisingstars.com/api/v1/news';
const NEWS_API = 'http://localhost:8000/api/v1/news';

const newsApi = createApi({
    reducerPath: "newsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: NEWS_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        createNews: builder.mutation({
            query: (formData) => ({
                url: "/create",
                method: "POST",
                body: formData
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