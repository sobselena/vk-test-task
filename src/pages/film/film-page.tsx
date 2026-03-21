import { useNavigate, useParams } from 'react-router';
import { useGetFilmDetailsQuery } from '../../redux/api';
import styles from './film-page.module.scss';
import { AppLoader } from '../../components/app-loader';
import { IMAGE_BASE_URL } from '../../constants/text';

export const FilmPage = () => {
  const { filmId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetFilmDetailsQuery(Number(filmId));
  const year = data?.release_date?.split('-')[0];

  return (
    <section className={styles.film}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Назад
      </button>
      {isLoading && <AppLoader />}
      {data?.id && (
        <div className={styles.container}>
          <img
            src={`${IMAGE_BASE_URL}${data.poster_path}`}
            alt={data.title}
            className={styles.poster}
          />

          <div className={styles.info}>
            <h1 className={styles.title}>
              {data.title} {year && <span>({year})</span>}
            </h1>

            <div className={styles.rating}>⭐ {data.vote_average.toFixed(1)}</div>

            <p className={styles.overview}>{data.overview}</p>

            <div className={styles.meta}>
              <span>Язык: {data.original_language.toUpperCase()}</span>
              <span>Популярность: {Math.round(data.popularity)}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
