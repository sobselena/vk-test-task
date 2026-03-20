import { AppLoader } from '../../../../components/app-loader';
import { useGetGenresQuery } from '../../../../redux/api';
import { FromToContainer } from '../from-to-container';
import { GenresContainer } from '../genres-container';

import styles from './filters.module.scss';

export const Filters = () => {
  const { data, isLoading } = useGetGenresQuery();
  const currentYear = new Date().getFullYear();
  return (
    <aside className={styles.filters}>
      <form>
        <h2 className={styles.title}>Фильтры</h2>

        <h3 className={styles.subtitle}>Жанры</h3>
        {isLoading && <AppLoader />}
        {data?.genres && <GenresContainer data={data} />}

        <h3 className={styles.subtitle}>Рейтинг</h3>
        <FromToContainer min={0} max={10} isRating={true} />

        <h3 className={styles.subtitle}>Год Выпуска</h3>
        <FromToContainer min={1990} max={currentYear} />

        <button className={styles.implementBtn}>Применить</button>
      </form>
    </aside>
  );
};
