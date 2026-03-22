import { useChosenSelector } from '../../../../redux/selectors/chosen-selector';
import styles from './chosen-films.module.scss';
import { IMAGE_BASE_URL } from '../../../../constants/text';
import { useDispatch } from 'react-redux';
import { deleteChosen } from '../../../../redux/reducers/chosen-slice';
import { useNavigate } from 'react-router';
import { CHOSEN_MAX_COUNT } from '../../../../constants/chosen';
import { CompareModal } from '../compare-modal.ts';
import { useState } from 'react';

export const ChosenFilms = () => {
  const { chosenMovies } = useChosenSelector();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function handleDelete(movieId: number) {
    dispatch(deleteChosen({ movieId }));
  }
  async function handleClick(movieId: number) {
    await navigate(`film/${movieId}`);
  }

  return (
    <>
      <section className={styles.chosenWrapper}>
        {chosenMovies.map((movieData) => (
          <div key={movieData.id} className={styles.card}>
            <div className={styles.posterWrapper} onClick={() => handleClick(movieData.id)}>
              <img
                src={`${IMAGE_BASE_URL}${movieData.poster_path}`}
                alt={movieData.title}
                className={styles.poster}
              />
            </div>

            <h3 className={styles.title}>{movieData.title}</h3>

            <button className={styles.deleteBtn} onClick={() => handleDelete(movieData.id)}>
              x
            </button>
          </div>
        ))}
        {chosenMovies.length === CHOSEN_MAX_COUNT && (
          <button className={styles.compareBtn} onClick={() => setIsOpen(true)}>
            Сравнить фильмы
          </button>
        )}
      </section>
      <CompareModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
