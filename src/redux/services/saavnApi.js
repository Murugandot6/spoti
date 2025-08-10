import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const saavnApi = createApi({
    reducerPath: "saavnApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jiosaavn-api-privatecvc2.vercel.app", // Base URL from saavn-search.js
    }),
    endpoints: (builder) => ({
        searchSongs: builder.query({
            query: (query) => `/search/songs?query=${query}&limit=50`, // Generic search for songs
        }),
        getSongDetailsById: builder.query({
            query: (id) => `/songs?id=${id}`, // Assuming an endpoint to get song by ID
        }),
    })
})

export const {
    useSearchSongsQuery,
    useGetSongDetailsByIdQuery,
} = saavnApi