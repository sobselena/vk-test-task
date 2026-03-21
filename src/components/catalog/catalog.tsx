import { useState, type ReactNode } from 'react';
import { AppLoader } from '../app-loader';
import styles from './catalog.module.scss';

type Props = {
  children: (searchInput: string) => ReactNode;
  isLoading?: boolean;
};

export const Catalog = ({ children, isLoading = false }: Props) => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <>
      <div className={styles.searchInputContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Поиск по названию фильма"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div className={styles.filmsContainer}>
        {isLoading && <AppLoader />}
        {children(searchInput)}
      </div>
    </>
  );
};
