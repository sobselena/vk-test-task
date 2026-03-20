import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Genres } from '../../types/movies-api';

export const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzhhZDdhN2QwOTkyMzA3YjE1NjUyZGNjYjE2YWNiYSIsIm5iZiI6MTczNzQwMzkzOS45NDUsInN1YiI6IjY3OGVhZTIzOWQ1ZTM2M2QxOTY1MDkyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q1wLVZJlqDytGiT_O6cbm22wCeP02hc7ZF8xD6rc3Jc';
export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${API_KEY}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getGenres: builder.query<Genres, void>({
      query: () => 'genre/movie/list',
    }),
  }),
});

export const { useGetGenresQuery } = moviesApi;
