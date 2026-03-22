import { useAppSelector } from '../hooks';

export const useChosenSelector = () => useAppSelector((state) => state.chosen);
