import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from './api';
import { setupListeners } from '@reduxjs/toolkit/query';
import favoriteReducer from './reducers/favorite-slice';
import chosenReducer from './reducers/chosen-slice';

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    favorite: favoriteReducer,
    chosen: chosenReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
