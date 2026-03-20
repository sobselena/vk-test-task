import { AppLoader } from '../../../../components/app-loader';
import { FilmCard } from '../../../../components/film-card';
import { useGetMoviesQuery } from '../../../../redux/api';
import styles from './films-catalog.module.scss';

export const FilmsCatalog = () => {
  const { data, isLoading } = useGetMoviesQuery();
  console.log(data);
  return (
    <section className={styles.filmsCatalog}>
      <div className={styles.searchInputContainer}>
        <input type="text" className={styles.searchInput} placeholder="Поиск по названию фильма" />
      </div>

      <div className={styles.filmsContainer}>
        {isLoading && <AppLoader />}

        {data?.results?.map((film) => (
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
