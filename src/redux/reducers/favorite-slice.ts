import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '../../types/movies-api';

const savedMovies: string | null = localStorage.getItem('favoriteMovies');
const initialState: { movies: Movie[]; chosenMovies: Movie[] } = {
  movies: savedMovies ? (JSON.parse(savedMovies) as Movie[]) : [],
  chosenMovies: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavorite: (state, { payload }: PayloadAction<{ movieData: Movie }>) => {
      const hasMovie = state.movies.find((movieData) => movieData.id === payload.movieData.id);
      if (hasMovie) return;
      state.movies = [...state.movies, payload.movieData];
      localStorage.setItem('favoriteMovies', JSON.stringify(state.movies));
    },

    deleteFavorite: (state, { payload }: PayloadAction<{ movieId: number }>) => {
      state.movies = state.movies.filter(({ id }) => id !== payload.movieId);
      localStorage.setItem('favoriteMovies', JSON.stringify(state.movies));
    },
  },
});

export const { setFavorite, deleteFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
