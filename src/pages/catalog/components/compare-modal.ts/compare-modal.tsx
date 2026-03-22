import { Modal } from '../../../../components/modal';
import { CHOSEN_MAX_COUNT } from '../../../../constants/chosen';
import { useChosenSelector } from '../../../../redux/selectors/chosen-selector';
import { IMAGE_BASE_URL } from '../../../../constants/text';
import styles from './compare-modal.module.scss';
import { useGetGenresQuery } from '../../../../redux/api';
import { getGenreNames } from '../../../../utils';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CompareModal = ({ isOpen, onClose }: Props) => {
  const { chosenMovies } = useChosenSelector();
  const { data } = useGetGenresQuery();
  if (chosenMovies.length !== CHOSEN_MAX_COUNT || !isOpen) return null;
  const [movie1, movie2] = chosenMovies;

  const genresNames1 = getGenreNames(chosenMovies[0].genre_ids, data?.genres);
  const genresNames2 = getGenreNames(chosenMovies[1].genre_ids, data?.genres);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <button className={styles.closeBtn} onClick={onClose}>
          x
        </button>
        <div className={styles.posters}>
          <img src={`${IMAGE_BASE_URL}${movie1.poster_path}`} alt={movie1.title} />
          <img src={`${IMAGE_BASE_URL}${movie2.poster_path}`} alt={movie2.title} />
        </div>

        <table className={styles.table}>
          <tbody>
            <tr>
              <td>Название</td>
              <td className={styles.movieTitle}>{movie1.title}</td>
              <td className={styles.movieTitle}>{movie2.title}</td>
            </tr>

            <tr>
              <td>Год</td>
              <td>
                <span className={styles.year}>{movie1.release_date?.split('-')[0]}</span>
              </td>
              <td>
                <span className={styles.year}>{movie2.release_date?.split('-')[0]}</span>
              </td>
            </tr>

            <tr>
              <td>Рейтинг</td>
              <td>{movie1.vote_average} ⭐</td>
              <td>{movie2.vote_average} ⭐</td>
            </tr>

            <tr>
              <td>Жанры</td>
              <td className={styles.genres}>{genresNames1.join(', ')}</td>
              <td className={styles.genres}>{genresNames2.join(', ')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  );
};
