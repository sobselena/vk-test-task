import styles from './catalog.module.scss';
import { ChosenFilms } from './components/chosen-films';
import { FilmsCatalog } from './components/films-catalog';
import { Filters } from './components/filters';

export const CatalogPage = () => (
  <div className={styles.catalogWrapper}>
    <Filters />
    <FilmsCatalog />
    <ChosenFilms />
  </div>
);
