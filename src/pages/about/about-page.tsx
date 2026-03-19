import { Link } from 'react-router';
import styles from './about-page.module.scss';
import { Paths } from '../../constants/paths';

export const AboutPage = () => (
  <section className={styles.about}>
    <h1 className={styles.title}>Кино в деталях. Без лишнего шума.</h1>
    <p className={styles.subtitle}>
      MovieApp - это интуитивный инструмент для поиска и структурирования информации о ваших любимых
      фильмах.
    </p>
    <p className={styles.description}>
      Мы объединили удобный каталог, систему сравнения характеристик и персональный список
      избранного в одном минималистичном интерфейсе.
    </p>
    <button className={styles.catalogBtn}>
      <Link to={Paths.CATALOG}>Перейти в каталог</Link>
    </button>
  </section>
);
