import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const VENUE_API = 'https://api.bangladeshsrisingstars.com/api/v1/venue';
//const VENUE_API = 'http://localhost:8000/api/v1/venue';

export const venueApi = createApi({
    reducerPath: "venueApi",
    baseQuery: fetchBaseQuery({
        baseUrl: VENUE_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        createVenue: builder.mutation({
            query: (venueData) => ({
                url: "/create",
                method: "POST",
                body: venueData
            })
        }),
        getVenue: builder.query({
            query: () => ({
                url: "/all",
                method: "GET"
            })
        }),
        deleteVenue: builder.mutation({
            query: (venueId) => ({
                url: `/delete/${venueId}`,
                method: "DELETE",
            })
        }),
    })
});

export const { useCreateVenueMutation, useGetVenueQuery, useDeleteVenueMutation } = venueApi;