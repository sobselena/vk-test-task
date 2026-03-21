import { useState } from 'react';
import { useGetMoviesQuery } from '../../../../redux/api';
import { useFilterResults } from '../../../../hooks';
import { Catalog } from '../../../../components/catalog/catalog';
import { FilmCard } from '../../../../components/film-card';
import { FilmModal } from '../film-modal';
import type { Movie } from '../../../../types/movies-api';

export const FilmsCatalog = () => {
  const { data, isLoading } = useGetMoviesQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<Movie | null>(null);
  const filteredMovies = useFilterResults(data?.results ?? []);
  return (
    <>
      <Catalog isLoading={isLoading}>
        {(searchInput: string) =>
          filteredMovies
            .filter((film) => {
              const search = searchInput.toLowerCase();
              return film.title.toLowerCase().includes(search);
            })
            .map((film) => (
              <FilmCard
                key={film.id}
                moviesData={film}
                onFavorite={() => {
                  setSelectedFilm(film);
                  setIsOpen(true);
                }}
              />
            ))
        }
      </Catalog>
      <FilmModal onClose={() => setIsOpen(false)} isOpen={isOpen} selectedFilm={selectedFilm} />
    </>
  );
};
