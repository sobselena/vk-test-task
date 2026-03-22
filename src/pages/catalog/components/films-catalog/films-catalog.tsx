import { useCallback, useEffect, useRef, useState } from 'react';
import { useGetMoviesQuery } from '../../../../redux/api';
import { Catalog } from '../../../../components/catalog/catalog';
import { FilmCard } from '../../../../components/film-card';
import { FilmModal } from '../film-modal';
import type { Movie } from '../../../../types/movies-api';
import styles from './films-catalog.module.scss';

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
        const ids = new Set(prev.map((movieData) => movieData.id));
        const newMovies = data.results.filter((movieData) => !ids.has(movieData.id));
        return [...prev, ...newMovies];
      });
    }
  }, [data]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPage((prev) => prev + 1);
          }
        },
        {
          threshold: 0,
        }
      );

      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  return (
    <>
      <Catalog isLoading={isLoading}>
        {(searchInput) => {
          const filtered = movies.filter((film) =>
            film.title.toLowerCase().includes(searchInput.toLowerCase())
          );

          return filtered.length > 0 ? (
            filtered.map((film, index) => {
              const isLast = index === filtered.length - 1;

              if (isLast) {
                return (
                  <div ref={lastElementRef} key={film.id}>
                    <FilmCard
                      moviesData={film}
                      onFavorite={() => {
                        setSelectedFilm(film);
                        setIsOpen(true);
                      }}
                    />
                  </div>
                );
              }

              return (
                <FilmCard
                  key={film.id}
                  moviesData={film}
                  onFavorite={() => {
                    setSelectedFilm(film);
                    setIsOpen(true);
                  }}
                />
              );
            })
          ) : isLoading ? null : (
            <p className={styles.empty}>Нет фильмов</p>
          );
        }}
      </Catalog>

      <FilmModal onClose={() => setIsOpen(false)} isOpen={isOpen} selectedFilm={selectedFilm} />
    </>
  );
};
