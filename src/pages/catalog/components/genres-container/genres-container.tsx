import type { Genres } from '../../../../types/movies-api';
import styles from './genres-container.module.scss';

type Props = {
  data: Genres;
  genres: number[];
  onToggle: (id: number) => void;
};
export const GenresContainer = ({ data, onToggle, genres }: Props) => (
  <div className={styles.genresContainer}>
    {data.genres.map((genreData) => (
      <label key={genreData.id}>
        <input
          type="checkbox"
          name="action"
          onChange={() => onToggle(genreData.id)}
          checked={genres.includes(genreData.id)}
        />
        {genreData.name}
      </label>
    ))}
  </div>
);
