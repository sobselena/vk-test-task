import type { Genres } from '../../../../types/movies-api';
import styles from './genres-container.module.scss';

type Props = {
  data: Genres;
};
export const GenresContainer = ({ data }: Props) => (
  <div className={styles.genresContainer}>
    {data.genres.map((genreData) => (
      <label key={genreData.id}>
        <input type="checkbox" name="action" />
        {genreData.name}
      </label>
    ))}
  </div>
);
