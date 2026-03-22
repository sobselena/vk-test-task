import { useState, type FormEvent } from 'react';
import { AppLoader } from '../../../../components/app-loader';
import { useGetGenresQuery } from '../../../../redux/api';
import { FromToContainer } from '../from-to-container';
import { GenresContainer } from '../genres-container';

import styles from './filters.module.scss';
import { useSearchParams } from 'react-router';
import { Rating, Years } from '../../../../constants/filters';

export const Filters = () => {
  const { data, isLoading } = useGetGenresQuery();
  const currentYear = new Date().getFullYear();
  const [searchParams, setSearchParams] = useSearchParams();
  const [ratingInput, setRatingInput] = useState<number[]>([
    Number(searchParams.get('ratingFrom')) || Rating.MIN,
    Number(searchParams.get('ratingTo')) || Rating.MAX,
  ]);
  const [genres, setGenres] = useState<number[]>(
    searchParams.get('genres')?.split(',').map(Number) || []
  );
  const [yearsInput, setYearsInput] = useState<number[]>([
    Number(searchParams.get('yearsFrom')) || Years.MIN,
    Number(searchParams.get('yearsTo')) || currentYear,
  ]);

  function handleToggle(id: number) {
    if (genres.includes(id)) {
      setGenres((prev) => prev.filter((genreId) => genreId !== id));
    } else {
      setGenres((prev) => [...prev, id]);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (genres.length > 0) {
      params.set('genres', genres.join(','));
    } else {
      params.delete('genres');
    }
    params.set('ratingFrom', String(ratingInput[0]));
    params.set('ratingTo', String(ratingInput[1]));

    params.set('yearsFrom', String(yearsInput[0]));
    params.set('yearsTo', String(yearsInput[1]));

    setSearchParams(params);
  }

  return (
    <aside className={styles.filters}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.title}>Фильтры</h2>

        <h3 className={styles.subtitle}>Жанры</h3>
        {isLoading && <AppLoader />}
        {data?.genres && <GenresContainer data={data} onToggle={handleToggle} genres={genres} />}

        <h3 className={styles.subtitle}>Рейтинг</h3>
        <FromToContainer
          min={Rating.MIN}
          max={Rating.MAX}
          isRating={true}
          onChange={(value) => setRatingInput(value as number[])}
          value={ratingInput}
        />

        <h3 className={styles.subtitle}>Год Выпуска</h3>
        <FromToContainer
          min={Years.MIN}
          max={currentYear}
          onChange={(value) => setYearsInput(value as number[])}
          value={yearsInput}
        />

        <button className={styles.implementBtn}>Применить</button>
      </form>
    </aside>
  );
};
