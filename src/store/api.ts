import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const api: any = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  endpoints: (builder) => ({
    serachGifs: builder.query({
      query: ({ query, offset = 0, limit = 25 }) => ({
        url: `?api_key=${API_KEY}&q=${query}&limit=${limit}&offset=${offset}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response.data;
      },
      // forceRefetch({ currentArg, previousArg }) {
      //   return currentArg !== previousArg;
      // },
      // serializeQueryArgs: ({ endpointName }) => {
      //   return endpointName;
      // },
      // merge: (currentState, incomingState) => {
      //   const allGifs = [...currentState, ...incomingState];
      //   return allGifs;
      // },
    }),
  }),
});

export const { useSerachGifsQuery } = api;
