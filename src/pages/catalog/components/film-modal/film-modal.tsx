import { Modal } from '../../../../components/modal';
import { IMAGE_BASE_URL, OVERVIEW_LIMIT } from '../../../../constants/text';
import { useSetFavoriteMutation } from '../../../../redux/api';
import type { Movie } from '../../../../types/movies-api';
import styles from './film-modal.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedFilm: Movie | null;
};

export const FilmModal = ({ isOpen, onClose, selectedFilm }: Props) => {
  const [setFavorite] = useSetFavoriteMutation();
  if (!isOpen || !selectedFilm) return null;

  const { title, overview, poster_path } = selectedFilm;
  const shortOverview =
    overview?.length > OVERVIEW_LIMIT
      ? `${overview.slice(0, OVERVIEW_LIMIT)}...`
      : overview || 'Описание отсутствует';

  const posterUrl = poster_path ? `${IMAGE_BASE_URL}${poster_path}` : '/placeholder.png';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={posterUrl} alt={title} className={styles.poster} loading="lazy" />

          <div className={styles.descriptionContainer}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.overview}>{shortOverview}</p>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={onClose} className={styles.cancel}>
            Отмена
          </button>

          <button
            type="button"
            className={styles.addBtn}
            onClick={async () => {
              await setFavorite(selectedFilm.id);
              onClose();
            }}
          >
            Добавить в избранные
          </button>
        </div>
      </div>
    </Modal>
  );
};
