import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '../../types/movies-api';

const initialState: { movies: Movie[] } = {
  movies: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavorite: (state, { payload }: PayloadAction<{ movieData: Movie }>) => {
      state.movies = [...state.movies, payload.movieData];
      localStorage.setItem('favoriteFilms', JSON.stringify(state.movies));
    },
    deleteFavorite: (state, { payload }: PayloadAction<{ movieId: number }>) => {
      state.movies = state.movies.filter(({ id }) => id !== payload.movieId);
      localStorage.setItem('favoriteFilms', JSON.stringify(state.movies));
    },
  },
});

export const { setFavorite, deleteFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
