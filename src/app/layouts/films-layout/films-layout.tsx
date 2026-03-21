import { Outlet } from 'react-router';
import { ChosenFilms } from '../../../pages/catalog/components/chosen-films';
import { Filters } from '../../../pages/catalog/components/filters';
import styles from './films-layout.module.scss';

export const FilmsLayout = () => (
  <div className={styles.wrapper}>
    <Filters />
    <main className={styles.main}>
      <Outlet />
    </main>
    <ChosenFilms />
  </div>
);
