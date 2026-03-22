import { Paths } from '../../constants/paths';
import { AppLayout } from '../layouts/app-layout';
import { ErrorPage } from '../../pages/error';
import { AboutPage } from '../../pages/about';
import { ChosenCatalog } from '../../pages/chosen';
import { NotFoundPage } from '../../pages/not-found';
import { createBrowserRouter, Navigate } from 'react-router';
import { FilmPage } from '../../pages/film';
import { FilmsLayout } from '../layouts/films-layout';
import { FilmsCatalog } from '../../pages/catalog/components/films-catalog';

export const router = createBrowserRouter([
  {
    path: Paths.ROOT,
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to={Paths.ABOUT} replace />,
      },
      {
        path: Paths.ABOUT,
        element: <AboutPage />,
      },
      {
        element: <FilmsLayout />,
        children: [
          {
            path: Paths.CATALOG,
            element: <FilmsCatalog />,
          },
          {
            path: Paths.CHOSEN,
            element: <ChosenCatalog />,
          },
        ],
      },

      {
        path: Paths.FILM,
        element: <FilmPage />,
      },
    ],
  },
  {
    path: Paths.NOT_FOUND,
    element: <NotFoundPage />,
  },
  {
    path: Paths.OTHER_PATHS,
    element: <Navigate to={Paths.NOT_FOUND} replace />,
  },
]);
