import type { Genre } from '../types/movies-api';

export function getGenreNames(genreIds: number[], genres: Genre[] = []): string[] {
  return genreIds
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter((name): name is string => name !== undefined);
}
