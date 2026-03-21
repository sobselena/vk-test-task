import { useSearchParams } from 'react-router';
import type { Movie } from '../types/movies-api';
import { Years, Rating } from '../constants/filters';

export function useFilterResults(data: Movie[]) {
  const [searchParams] = useSearchParams();

  const genresParam = searchParams.get('genres');

  const yearsFrom = Number(searchParams.get('yearsFrom') ?? Years.MIN);
  const yearsTo = Number(searchParams.get('yearsTo') ?? new Date().getFullYear());

  const ratingFrom = Number(searchParams.get('ratingFrom') ?? Rating.MIN);
  const ratingTo = Number(searchParams.get('ratingTo') ?? Rating.MAX);

  const selectedGenres = genresParam ? genresParam.split(',').map(Number) : [];

  return data.filter((film) => {
    const filmYear = film.release_date ? Number(film.release_date.split('-')[0]) : Number.NaN;

    const matchesYear = Number.isNaN(filmYear) || (filmYear >= yearsFrom && filmYear <= yearsTo);

    const matchesRating = film.vote_average >= ratingFrom && film.vote_average <= ratingTo;

    const matchesGenres =
      selectedGenres.length === 0 ||
      selectedGenres.some((genreId) => film.genre_ids.includes(genreId));

    return matchesYear && matchesRating && matchesGenres;
  });
}
