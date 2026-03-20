import { AppLoader } from '../../../../components/app-loader';
import { useGetGenresQuery } from '../../../../redux/api';
import styles from './filters.module.scss';

export const Filters = () => {
  const { data, isLoading } = useGetGenresQuery();
  console.log(data);
  return (
    <section className={styles.filters}>
      <h2 className={styles.title}>Фильтры</h2>
      <h3 className={styles.subtitle}>Жанры</h3>
      {isLoading && <AppLoader />}
      {data?.genres &&
        data.genres.map((genreData) => (
          <div className={styles.genresWrapper} key={genreData.id}>
            <label>
              <input type="checkbox" name="action" />
              {genreData.name}
            </label>
          </div>
        ))}
    </section>
  );
};
