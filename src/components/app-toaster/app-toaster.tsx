import { Toaster } from 'react-hot-toast';
import { AUTOCLOSE_NOTIFICATION_DELAY } from '../../constants/toaster';

export const AppToaster = () => (
  <Toaster
    position="top-center"
    gutter={12}
    containerStyle={{
      margin: '0.8rem',
      zIndex: 101,
    }}
    toastOptions={{
      duration: AUTOCLOSE_NOTIFICATION_DELAY,

      style: {
        backgroundColor: 'var(--color-bg)',
        border: 'var(--border-default)',
        color: 'var(--color-text)',

        fontFamily: 'var(--font-primary)',
        fontSize: '1.4rem',
        fontWeight: 500,

        borderRadius: '1.2rem',
        padding: '1.2rem 1.6rem',

        boxShadow: 'var(--shadow-button)',

        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',

        maxWidth: '42rem',
      },
    }}
  />
);
