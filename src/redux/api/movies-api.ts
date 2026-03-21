import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Genre, Genres, Movie, MoviesResponse } from '../../types/movies-api';
import { API_KEY } from '../../constants/movies-api';

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
    getMovies: builder.query<MoviesResponse, void>({
      query: () => 'discover/movie',
    }),
    getFilm: builder.query<Genre, number>({
      query: (id) => `find/${id}`,
    }),
    getFilmDetails: builder.query<Movie, number>({
      query: (movie_id) => `movie/${movie_id}`,
    }),
  }),
});

export const { useGetGenresQuery, useGetMoviesQuery, useGetFilmQuery, useGetFilmDetailsQuery } =
  moviesApi;
