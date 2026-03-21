import styles from './film-card.module.scss';
import { useGetGenresQuery } from '../../redux/api';
import { AppLoader } from '../app-loader';
import { IMAGE_BASE_URL } from '../../constants/text';
import type { Movie } from '../../types/movies-api';
import { useNavigate } from 'react-router';

type Props = {
  moviesData: Movie;
  onFavorite?: () => void;
  onDelete?: (id: number) => void;
  isChosen?: boolean;
};

export const FilmCard = ({ moviesData, onFavorite, isChosen = false, onDelete }: Props) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetGenresQuery();
  const { id, title, poster_path, vote_average, release_date, genre_ids } = moviesData;

  const year = release_date.split('-')[0];

  const genresNames = genre_ids
    .map((genreId) => data?.genres.find(({ id }) => id === genreId)?.name)
    .filter(Boolean);

  return (
    <div className={styles.card}>
      <div className={styles.posterWrapper} onClick={() => navigate(`/catalog/${id}`)}>
        <img src={`${IMAGE_BASE_URL}${poster_path}`} alt={title} className={styles.poster} />

        <div className={styles.rating}>⭐ {vote_average.toFixed(1)}</div>
      </div>

      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{title}</h3>

          <div className={styles.actions}>
            {isChosen ? (
              <button className={styles.iconBtn} onClick={() => onDelete?.(id)}>
                🗑️
              </button>
            ) : (
              <>
                <button className={styles.iconBtn} onClick={onFavorite}>
                  ❤️
                </button>
                <button className={styles.iconBtn}>⚖️</button>
              </>
            )}
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
