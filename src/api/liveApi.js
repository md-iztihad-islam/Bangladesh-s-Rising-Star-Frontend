import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const LIVE_API = 'http://localhost:5011/api/v1/live';

export const liveApi = createApi({
    reducerPath: "liveApi",
    baseQuery: fetchBaseQuery({
        baseUrl: LIVE_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        createLive: builder.mutation({
            query: (liveData) => ({
                url: "/add",
                method: "POST",
                body: liveData
            })
        }),
        getLive: builder.query({
            query: () => ({
                url: "/alllive",
                method: "GET"
            })
        }),
        getLiveById: builder.query({
            query: (id) => ({
                url: `/${id}/live`,
                method: "GET"
            })
        }),
        updateLive: builder.mutation({
            query: ({id, liveData}) => ({
                url: `/${id}/update`,
                method: "POST",
                body: liveData
            })
        }),
        deleteLive: builder.mutation({
            query: (id) => ({
                url: `/${id}/delete`,
                method: "DELETE"
            })
        })
    })
});

export const { useCreateLiveMutation, useGetLiveQuery, useGetLiveByIdQuery, useUpdateLiveMutation, useDeleteLiveMutation } = liveApi;