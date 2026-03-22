import { createPortal } from 'react-dom';

import styles from './modal.module.scss';
import { Overlay } from '../overlay';
import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

export const Modal = ({ isOpen, onClose, children, title }: Props) => {
  useEffect(() => {
    document.body.classList.toggle('modal-open', isOpen);

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return createPortal(
    <>
      <Overlay onClose={onClose} />

      <div className={styles.modal}>
        {title && (
          <header className={styles.titleContainer}>
            <h2 className={styles.title}>{title}</h2>
          </header>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </>,
    document.body
  );
};
