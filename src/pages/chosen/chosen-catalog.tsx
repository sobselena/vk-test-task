import { useDispatch } from 'react-redux';
import { useFavoriteSelector } from '../../redux/selectors/favorite-selector';
import { Catalog } from '../../components/catalog/catalog';
import { FilmCard } from '../../components/film-card';
import { deleteFavorite } from '../../redux/reducers/favorite-slice';
import { singleToast } from '../../utils';
import styles from './chosen-catalog.module.scss';
import { useFilterResults } from '../../hooks';

export const ChosenCatalog = () => {
  const favoriteData = useFavoriteSelector();
  const dispatch = useDispatch();
  const filteredMovies = useFilterResults(favoriteData.movies ?? []);
  return (
    <>
      <Catalog isLoading={false}>
        {(searchInput: string) =>
          filteredMovies.length > 0 ? (
            filteredMovies
              .filter((film) => {
                const search = searchInput.toLowerCase();
                return film.title.toLowerCase().includes(search);
              })
              .map((film) => (
                <FilmCard
                  key={film.id}
                  moviesData={film}
                  isChosen
                  onDelete={() => {
                    singleToast(`Фильм ${film.title} был удален из избранного`);
                    dispatch(deleteFavorite({ movieId: film.id }));
                  }}
                />
              ))
          ) : (
            <p className={styles.empty}>Нет фильмов</p>
          )
        }
      </Catalog>
    </>
  );
};
