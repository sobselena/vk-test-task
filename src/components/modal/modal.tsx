import { createPortal } from 'react-dom';

import styles from './modal.module.scss';
import { Overlay } from '../overlay';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <Overlay onClose={onClose} />

      <div className={styles.modal}>
        <div className={styles.content}>{children}</div>
      </div>
    </>,
    document.body
  );
};
