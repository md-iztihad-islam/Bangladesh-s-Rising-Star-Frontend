import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TOURNAMENT_API = 'http://localhost:5011/api/v1/tournament';

export const tournamentApi = createApi({
    reducerPath: "tournamentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: TOURNAMENT_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        createTournament: builder.mutation({
            query: (tournamentData) => ({
                url: "/create",
                method: "POST",
                body: tournamentData
            })
        }),
        getTournament: builder.query({
            query: () => ({
                url: "/alltournaments",
                method: "GET"
            })
        }),
        getTournamentById: builder.query({
            query: (id) => ({
                url: `/${id}/tournament`,
                method: "GET"
            })
        }),
        deleteTournament: builder.mutation({
            query: (id) => ({
                url: `/${id}/delete`,
                method: "DELETE"
            })
        }),
        createTeam: builder.mutation({
            query: ({ tournamentId, teamData }) => ({
                url: `/${tournamentId}/createteam`,
                method: "POST",
                body: teamData
            })
        }),
        getTeam: builder.query({
            query: (tournamentId) => ({
                url: `/${tournamentId}/allteams`,
                method: "GET"
            })
        }),
        getTeamById: builder.query({
            query: ({ tournamentId, teamId }) => ({
                url: `/${tournamentId}/${teamId}/team`,
                method: "GET"
            })
        }),
        deleteTeam: builder.mutation({
            query: ({ tournamentId, teamId }) => ({
                url: `${tournamentId}/${teamId}/delete`,
                method: "DELETE"
            })
        }),
        updateTeam: builder.mutation({
            query: ({ tournamentId, teamId, teamObject }) => ({
                url: `${tournamentId}/${teamId}/updateteam`,
                method: "POST",
                body: teamObject
            }),
        }),
        addPlayer: builder.mutation({
            query: ({ tournamentId, teamId, registrationNo }) => ({
                url: `${tournamentId}/${teamId}/addplayer`,
                method: "POST",
                body: {registrationNo}
            })
        }),
        teamPlayer: builder.query({
            query: ({ tournamentId, teamId }) => ({
                url: `${tournamentId}/${teamId}/teamplayer`,
                method: "GET",
            })
        }),
        addmatch: builder.mutation({
            query: ({ tournamentId, matchData }) => ({
                url: `${tournamentId}/creatematch`,
                method: "POST",
                body: matchData
            })
        }),
        getMatchByTournament: builder.query({
            query: (tournamentId) => ({
                url: `${tournamentId}/getmatch`,
                method: "GET"
            })
        }),
        getMatchById: builder.query({
            query: ({tournamentId, matchId}) => ({
                url: `/${tournamentId}/${matchId}/getmatch`,
                method: "GET"
            })
        }),
        updateMatch: builder.mutation({
            query: ({tournamentId, matchId, matchData}) => ({
                url: `/${tournamentId}/${matchId}/updatematch`,
                method: "POST",
                body: matchData
            })
        }),
        getAllMatches: builder.query({
            query: () => ({
                url: "/matches",
                method: "GET"
            })
        }),
    })
});

export const { useCreateTournamentMutation, useGetTournamentQuery, useGetTournamentByIdQuery, useDeleteTournamentMutation, useCreateTeamMutation, useDeleteTeamMutation, useGetTeamByIdQuery, useGetTeamQuery, useAddPlayerMutation, useTeamPlayerQuery, useAddmatchMutation, useGetMatchByTournamentQuery, useGetMatchByIdQuery, useUpdateMatchMutation, useGetAllMatchesQuery, useUpdateTeamMutation } = tournamentApi;