import styles from './film-card.module.scss';
import { useGetGenresQuery } from '../../redux/api';
import { AppLoader } from '../app-loader';

type Props = {
  title: string;
  poster: string;
  rating: number;
  year: string;
  genres_ids: number[];
};

export const FilmCard = ({ title, poster, rating, year, genres_ids }: Props) => {
  const { data, isLoading } = useGetGenresQuery();
  const genresNames = genres_ids
    .map((genreId) => data?.genres.find(({ id }) => id === genreId)?.name)
    .filter(Boolean);

  return (
    <div className={styles.card}>
      <div className={styles.posterWrapper}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt={title}
          className={styles.poster}
        />

        <div className={styles.rating}>⭐ {rating.toFixed(1)}</div>
      </div>

      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{title}</h3>

          <div className={styles.actions}>
            <button className={styles.iconBtn}>❤️</button>
            <button className={styles.iconBtn}>⚖️</button>
          </div>
        </div>

        <div className={styles.meta}>
          <span className={styles.year}>{year}</span>
          {isLoading && <AppLoader />}
          {genresNames.map((genreName) => (
            <span key={genreName} className={styles.genreName}>
              {genreName}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
