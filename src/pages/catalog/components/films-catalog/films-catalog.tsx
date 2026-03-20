import { useState, type ChangeEvent } from 'react';
import { AppLoader } from '../../../../components/app-loader';
import { FilmCard } from '../../../../components/film-card';
import { useGetMoviesQuery } from '../../../../redux/api';
import styles from './films-catalog.module.scss';
import { useSearchParams } from 'react-router';
import { Rating, Years } from '../../../../constants/filters';

export const FilmsCatalog = () => {
  const { data, isLoading } = useGetMoviesQuery();
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchParams] = useSearchParams();
  const genresParam = searchParams.get('genres');
  const yearsFrom = Number(searchParams.get('yearsFrom')) || Years.MIN;
  const yearsTo = Number(searchParams.get('yearsTo')) || new Date().getFullYear();
  const ratingFrom = Number(searchParams.get('ratingFrom')) || Rating.MIN;
  const ratingTo = Number(searchParams.get('ratingTo')) || Rating.MAX;

  const selectedGenres = genresParam ? genresParam.split(',').map(Number) : [];
  return (
    <section className={styles.filmsCatalog}>
      <div className={styles.searchInputContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Поиск по названию фильма"
          value={searchInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
        />
      </div>

      <div className={styles.filmsContainer}>
        {isLoading && <AppLoader />}

        {data?.results
          ?.filter((film) => {
            const search = searchInput.toLowerCase();

            const matchesSearch = film.title.toLowerCase().includes(search);

            const filmYear = film.release_date
              ? Number(film.release_date.split('-')[0])
              : Number.NaN;

            const matchesYear =
              Number.isNaN(filmYear) || (filmYear >= yearsFrom && filmYear <= yearsTo);

            const matchesRating = film.vote_average >= ratingFrom && film.vote_average <= ratingTo;

            const matchesGenres =
              selectedGenres.length === 0 ||
              selectedGenres.some((genreId) => film.genre_ids.includes(genreId));

            return matchesSearch && matchesYear && matchesRating && matchesGenres;
          })
          .map((film) => (
            <FilmCard
              key={film.id}
              title={film.title}
              poster={film.poster_path}
              rating={film.vote_average}
              year={film.release_date?.split('-')[0]}
              genres_ids={film.genre_ids}
            />
          ))}
      </div>
    </section>
  );
};
