import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '../../types/movies-api';
import { CHOSEN_MAX_COUNT } from '../../constants/chosen';

const initialState: { chosenMovies: Movie[] } = {
  chosenMovies: [],
};

const chosenSlice = createSlice({
  name: 'chosen',
  initialState,
  reducers: {
    setChosen: (state, { payload }: PayloadAction<{ movieData: Movie }>) => {
      const ids = new Set(state.chosenMovies.map(({ id }) => id));
      if (ids.has(payload.movieData.id)) return;

      state.chosenMovies =
        state.chosenMovies.length === CHOSEN_MAX_COUNT
          ? [state.chosenMovies[1], payload.movieData]
          : [...state.chosenMovies, payload.movieData];
    },

    deleteChosen: (state, { payload }: PayloadAction<{ movieId: number }>) => {
      state.chosenMovies = state.chosenMovies.filter(({ id }) => id !== payload.movieId);
    },
  },
});

export const { setChosen, deleteChosen } = chosenSlice.actions;
export default chosenSlice.reducer;
