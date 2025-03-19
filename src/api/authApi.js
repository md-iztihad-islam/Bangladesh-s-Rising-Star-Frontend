import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "./authSlice";

const PLAYERS_API = 'http://localhost:5011/api/v1/players';

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: PLAYERS_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        registerPlayer: builder.mutation({
            query: (playerData) => ({
                url: "/register",
                method: "POST",
                body: playerData,
            }),
        }),
        loginPlayer: builder.mutation({
            query: (inputData) => ({
                url: "/signin",
                method: "POST",
                body: inputData,
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                    await dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }));
                } catch (error) {
                    console.log("Error: ", error);
                }
            }
        }),
        logoutPlayer: builder.mutation({
            query: () => ({
                url: "/signout",
                method: "GET",
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}){
                try {
                    await queryFulfilled;
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log("Error: ", error);
                }
            }
        }),
        loadUser: builder.query({
            query: () => ({
                url: "/profile",
                method: "GET"
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                //dispatching the action when the query starts
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.data }));
                } catch (error) {
                    console.log(error);     
                }
            }
        }),
        searchPlayer: builder.query({
            query: (email) => ({
                url:`/search/${email}`,
                method: "GET",
            })
        }),
        searchPlayerWithId: builder.query({
            query: (playerId) => ({
                url:`/find/${playerId}`,
                method: "GET",
            })
        }),

    })
});

export const { useRegisterPlayerMutation, useLoginPlayerMutation, useLogoutPlayerMutation, useLoadUserQuery, useSearchPlayerQuery, useSearchPlayerWithIdQuery } = authApi;