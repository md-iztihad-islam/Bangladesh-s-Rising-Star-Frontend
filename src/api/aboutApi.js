import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ABOUT_API = 'http://localhost:5011/api/v1/about';

export const aboutApi = createApi({
    reducerPath: "aboutApi",
    baseQuery: fetchBaseQuery({
        baseUrl: ABOUT_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        createAbout: builder.mutation({
            query: (aboutData) => ({
                url: "/add",
                method: "POST",
                body: aboutData
            })
        }),
        getAbout: builder.query({
            query: () => ({
                url: "/find",
                method: "GET"
            })
        }),
        updateAbout: builder.mutation({
            query: (aboutData) => ({
                url: "/update",
                method: "POST",
                body: aboutData
            })
        })
    })
});

export const { useCreateAboutMutation, useGetAboutQuery, useUpdateAboutMutation } = aboutApi;