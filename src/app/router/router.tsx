import { Paths } from '../../constants/paths';
import { AppLayout } from '../layouts/app-layout';
import { ErrorPage } from '../../pages/error';
import { AboutPage } from '../../pages/about';
import { CatalogPage } from '../../pages/catalog';
import { ChosenPage } from '../../pages/chosen';
import { NotFoundPage } from '../../pages/not-found';
import { createBrowserRouter, Navigate } from 'react-router';
import { FilmPage } from '../../pages/film';

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
        path: Paths.CATALOG,
        element: <CatalogPage />,
      },
      {
        path: Paths.CHOSEN,
        element: <ChosenPage />,
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
