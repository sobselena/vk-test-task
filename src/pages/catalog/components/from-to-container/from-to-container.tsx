import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';
import styles from './from-to-container.module.scss';

type Props = {
  min: number;
  max: number;
  isRating?: boolean;
  pushable?: number;
};
export const FromToContainer = ({ min, max, isRating = false }: Props) => {
  const [resultInput, setResultInput] = useState([min, max]);
  const emoji = isRating ? '⭐' : '🗓️';
  return (
    <div className={styles.fromToContainer}>
      <div className={styles.fromToRow}>
        <div className={styles.fromToValue}>{`${resultInput[0]} ${emoji}`}</div>
        <span>-</span>
        <div className={styles.fromToValue}>{`${resultInput[1]} ${emoji}`}</div>
      </div>

      <Slider
        range
        min={min}
        max={max}
        value={resultInput}
        pushable={isRating ? 0.1 : 1}
        className={styles.slider}
        onChange={(value) => setResultInput(value as number[])}
        styles={{
          track: { backgroundColor: 'var(--color-primary)', height: 4 },
          rail: { backgroundColor: 'var(--color-bg)', height: 4 },
          handle: {
            borderColor: 'var(--color-primary)',
            backgroundColor: 'var(--color-bg)',
            width: 18,
            height: 18,
            marginTop: -7,
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          },
        }}
      />
    </div>
  );
};
