import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { FavoriteMoviesResponse, Genre, Genres, MoviesResponse } from '../../types/movies-api';
import { API_KEY } from '../../constants/movies-api';
import { singleToast } from '../../utils';

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
    setFavorite: builder.mutation<FavoriteMoviesResponse, number>({
      query: (account_id) => ({
        url: `account/${account_id}/favorite`,
        method: 'POST',
        body: {
          media_type: 'movie',
          media_id: account_id,
          favorite: true,
        },
      }),

      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          singleToast('Фильм был добавлен в Избранные', 'success');
        } catch {
          singleToast('Не удалось добавить фильм в Избранные', 'error');
        }
      },
    }),
  }),
});

export const { useGetGenresQuery, useGetMoviesQuery, useGetFilmQuery, useSetFavoriteMutation } =
  moviesApi;
