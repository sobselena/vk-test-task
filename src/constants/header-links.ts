import type { LinkConfig } from '../types/link-config';
import { Paths } from './paths';

export const BASE_HEADER_LINKS: LinkConfig[] = [
  {
    link: Paths.ROOT,
    text: 'MoviesCatalog',
    key: 'app',
    isLogo: true,
  },
  {
    link: Paths.ABOUT,
    text: 'О нас',
    key: 'about',
  },
  {
    link: Paths.CATALOG,
    text: 'Каталог',
    key: 'catalog',
  },
  {
    link: Paths.CHOSEN,
    text: 'Избранные',
    key: 'chosen',
  },
];
