import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useCallback } from 'react';

interface ModalBaseProps {
  /** Controla la visibilidad del modal */
  isOpen: boolean;
  /** Función para cerrar el modal */
  onClose: () => void;
  /** Título opcional */
  title?: string;
  /** Contenido del modal */
  children: React.ReactNode;
  /** Tamaño máximo (sm, md, lg, xl, full) */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Modo visual */
  variant?: 'centered' | 'fullscreen';
  /** Permitir cerrar haciendo clic fuera del modal */
  closeOnBackdrop?: boolean;
}

/** 🧩 Modal reutilizable con temas claro/oscuro y colores del sistema */
export const ModalBase: React.FC<ModalBaseProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md',
  variant = 'centered',
  closeOnBackdrop = true,
}) => {
  const sizes: Record<string, string> = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full h-full rounded-none',
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose();
    }
  };

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return (): void => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, handleEscape]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className={`bg-[var(--color-surface)] border border-[var(--color-border)]
              rounded-xl shadow-xl w-[95%] mx-auto ${sizes[maxWidth]}
              ${variant === 'fullscreen' ? 'h-full' : ''}
              overflow-hidden transition-colors duration-300`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* HEADER */}
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg)]/40">
                <h2 className="text-lg font-semibold text-[var(--color-text)]">
                  {title}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[var(--color-text)]/70 hover:text-[var(--color-primary)] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {/* BODY */}
            <div className="p-6 overflow-y-auto max-h-[80vh] text-[var(--color-text)]">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
