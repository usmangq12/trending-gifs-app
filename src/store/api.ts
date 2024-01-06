import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  endpoints: (builder) => ({
    serachGifs: builder.query({
      query: (query) => ({
        url: `?api_key=${API_KEY}&q=${query}&limit=25`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSerachGifsQuery } = api;
