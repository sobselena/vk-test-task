import styles from './film-card.module.scss';
import { useGetGenresQuery } from '../../redux/api';

import { IMAGE_BASE_URL } from '../../constants/text';
import type { Movie } from '../../types/movies-api';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setChosen } from '../../redux/reducers/chosen-slice';
import { getGenreNames } from '../../utils';

type Props = {
  moviesData: Movie;
  onFavorite?: () => void;
  onDelete?: (id: number) => void;
  isChosen?: boolean;
};

export const FilmCard = ({ moviesData, onFavorite, isChosen = false, onDelete }: Props) => {
  const navigate = useNavigate();
  const { data } = useGetGenresQuery();
  const { id, title, poster_path, vote_average, release_date, genre_ids } = moviesData;
  const dispatch = useDispatch();
  const year = release_date.split('-')[0];

  const genresNames = getGenreNames(genre_ids, data?.genres);

  function handleCompare(movieData: Movie) {
    dispatch(setChosen({ movieData }));
  }
  return (
    <div className={styles.card}>
      <div className={styles.posterWrapper} onClick={() => navigate(`/film/${id}`)}>
        <img src={`${IMAGE_BASE_URL}${poster_path}`} alt={title} className={styles.poster} />

        <div className={styles.rating}>⭐ {vote_average.toFixed(1)}</div>
      </div>

      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{title}</h3>

          <div className={styles.actions}>
            <>
              {isChosen ? (
                <button className={styles.iconBtn} onClick={() => onDelete?.(id)}>
                  🗑️
                </button>
              ) : (
                <button className={styles.iconBtn} onClick={onFavorite}>
                  ❤️
                </button>
              )}
              <button className={styles.iconBtn} onClick={() => handleCompare(moviesData)}>
                ⚖️
              </button>
            </>
          </div>
        </div>

        <div className={styles.meta}>
          <span className={styles.year}>{year}</span>
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
