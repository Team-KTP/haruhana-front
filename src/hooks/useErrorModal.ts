import { useState, useCallback } from 'react';

interface ErrorModalState {
  isOpen: boolean;
  title?: string;
  message: string;
  type?: 'error' | 'warning' | 'info';
}

export const useErrorModal = () => {
  const [modalState, setModalState] = useState<ErrorModalState>({
    isOpen: false,
    message: '',
    type: 'error',
  });

  const showError = useCallback((message: string, title?: string) => {
    setModalState({
      isOpen: true,
      message,
      title,
      type: 'error',
    });
  }, []);

  const showWarning = useCallback((message: string, title?: string) => {
    setModalState({
      isOpen: true,
      message,
      title,
      type: 'warning',
    });
  }, []);

  const showInfo = useCallback((message: string, title?: string) => {
    setModalState({
      isOpen: true,
      message,
      title,
      type: 'info',
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return {
    modalState,
    showError,
    showWarning,
    showInfo,
    closeModal,
  };
};
