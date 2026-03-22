import { useCallback, useEffect, useRef, useState } from 'react';
import { useGetMoviesQuery } from '../../../../redux/api';
import { Catalog } from '../../../../components/catalog/catalog';
import { FilmCard } from '../../../../components/film-card';
import { FilmModal } from '../film-modal';
import type { Movie } from '../../../../types/movies-api';
import styles from './films-catalog.module.scss';
import { useFilterResults } from '../../../../hooks';

export const FilmsCatalog = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetMoviesQuery(page);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<Movie | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (data?.results) {
      setMovies((prev) => {
        const ids = new Set(prev.map((m) => m.id));
        const newMovies = data.results.filter((m) => !ids.has(m.id));
        return [...prev, ...newMovies];
      });
    }
  }, [data]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  const filteredMovies = useFilterResults(movies);

  return (
    <>
      <Catalog isLoading={isLoading}>
        {(searchInput) => {
          const filtered = filteredMovies.filter((film) =>
            film.title.toLowerCase().includes(searchInput.toLowerCase())
          );

          return (
            <>
              {filtered.length === 0 && !isLoading && <p className={styles.empty}>Нет фильмов</p>}
              {filtered.map((film) => (
                <FilmCard
                  key={film.id}
                  moviesData={film}
                  onFavorite={() => {
                    setSelectedFilm(film);
                    setIsOpen(true);
                  }}
                />
              ))}

              <div ref={lastElementRef} />
            </>
          );
        }}
      </Catalog>

      <FilmModal onClose={() => setIsOpen(false)} isOpen={isOpen} selectedFilm={selectedFilm} />
    </>
  );
};
