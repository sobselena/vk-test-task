import { useNavigate, useParams } from 'react-router';
import { useGetFilmDetailsQuery } from '../../redux/api';
import styles from './film-page.module.scss';
import { AppLoader } from '../../components/app-loader';
import { IMAGE_BASE_URL } from '../../constants/text';

export const FilmPage = () => {
  const { filmId } = useParams();
  const navigate = useNavigate();
  const { data: filmDetails, isLoading } = useGetFilmDetailsQuery(Number(filmId), {
    skip: !filmId,
  });
  const releaseYear = filmDetails?.release_date?.split('-')[0];

  const genreNames = filmDetails?.genres?.length
    ? filmDetails.genres.map((genre) => genre.name).join(', ')
    : '-';

  return (
    <section className={styles.film}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Назад
      </button>

      {isLoading && <AppLoader />}

      {filmDetails?.id && (
        <div className={styles.container}>
          <img
            src={`${IMAGE_BASE_URL}${filmDetails.poster_path}`}
            alt={filmDetails.title}
            className={styles.poster}
          />

          <div className={styles.info}>
            <h1 className={styles.title}>
              {filmDetails.title} {releaseYear && <span>({releaseYear})</span>}
            </h1>

            <div className={styles.rating}>⭐ {filmDetails.vote_average.toFixed(1)}</div>

            <p className={styles.overview}>{filmDetails.overview}</p>

            <div className={styles.meta}>
              <span>Жанры: {genreNames}</span>
              <span>Язык: {filmDetails.original_language.toUpperCase()}</span>
              <span>Популярность: {Math.round(filmDetails.popularity)}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
