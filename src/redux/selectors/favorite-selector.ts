import { useAppSelector } from '../hooks';

export const useFavoriteSelector = () => useAppSelector((state) => state.favorite);
