import React, { createContext, useCallback, useState, ReactNode } from 'react';
import { WaitScreen } from '../components/ui/WaitScreen';
import { Toast, ToastType, ToastPosition } from '../components/ui/Toast';
import { ModalConfirmacion } from '../components/ui/ModalConfirmacion';

export interface UIContextProps {
  showWaitScreen: (message?: string, duration?: number) => void;
  closeWaitScreen: () => void;
  showToast: (
    message: string,
    type?: ToastType,
    position?: ToastPosition,
    duration?: number
  ) => void;
  showConfirm: (options: ConfirmOptions) => Promise<boolean>;
  loading: boolean;
  scrollToTop: () => void;
}

export interface ConfirmOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'success' | 'info';
}

export const UIContext = createContext<UIContextProps>({
  showWaitScreen: () => {},
  closeWaitScreen: () => {},
  showToast: () => {},
  showConfirm: async () => false,
  loading: false,
  scrollToTop: () => {},
});

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 🌀 Loader
  const [loading, setLoading] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState('Procesando...');

  const showWaitScreen = useCallback((message?: string) => {
    setLoaderMessage(message || 'Procesando...');
    setLoading(true);
  }, []);

  const closeWaitScreen = useCallback(() => setLoading(false), []);

  // 🔔 Toast
  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('info');
  const [toastPosition, setToastPosition] =
    useState<ToastPosition>('bottom-right');
  const [toastDuration, setToastDuration] = useState(3500);

  const showToast = useCallback(
    (
      message: string,
      type: ToastType = 'info',
      position: ToastPosition = 'bottom-right',
      duration: number = 3500
    ) => {
      setToastMessage(message);
      setToastType(type);
      setToastPosition(position);
      setToastDuration(duration);
      setToastShow(true);
      setTimeout(() => setToastShow(false), duration);
    },
    []
  );

  // ⚠️ Confirm Modal
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmOptions, setConfirmOptions] = useState<ConfirmOptions>({});
  const [confirmResolver, setConfirmResolver] = useState<
    (value: boolean) => void
  >(() => (): void => {});

  const showConfirm = useCallback(
    (options: ConfirmOptions): Promise<boolean> => {
      return new Promise((resolve) => {
        setConfirmOptions(options);
        setConfirmResolver(() => resolve);
        setConfirmOpen(true);
      });
    },
    []
  );

  const handleConfirm = (): void => {
    confirmResolver(true);
    setConfirmOpen(false);
  };

  const handleCancel = (): void => {
    confirmResolver(false);
    setConfirmOpen(false);
  };

  // 🔝 Scroll al tope
  const scrollToTop = useCallback(() => {
    const main = document.querySelector('main, .main-content, .scrollable');
    if (main) {
      main.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <UIContext.Provider
      value={{
        showWaitScreen,
        closeWaitScreen,
        showToast,
        showConfirm,
        loading,
        scrollToTop,
      }}
    >
      {children}

      {/* Loader global */}
      <WaitScreen
        message={loaderMessage}
        variant="fullscreen-bordered"
        show={loading}
      />

      {/* Toast global */}
      <Toast
        message={toastMessage}
        type={toastType}
        show={toastShow}
        onClose={() => setToastShow(false)}
        duration={toastDuration}
        position={toastPosition}
      />

      {/* Confirm global */}
      <ModalConfirmacion
        show={confirmOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        {...confirmOptions}
      />
    </UIContext.Provider>
  );
};
