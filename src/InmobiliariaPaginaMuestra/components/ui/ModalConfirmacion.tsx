import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

export interface ConfirmModalProps {
  /** Control de visibilidad */
  show: boolean;
  /** Título principal */
  title?: string;
  /** Mensaje de descripción */
  message?: string;
  /** Texto del botón de confirmación */
  confirmText?: string;
  /** Texto del botón de cancelar */
  cancelText?: string;
  /** Tipo visual del modal */
  type?: 'warning' | 'success' | 'info';
  /** Acción al confirmar */
  onConfirm: () => void;
  /** Acción al cancelar o cerrar */
  onCancel: () => void;
}

/** 🧩 Modal reutilizable de confirmación con animaciones y tema dinámico */
export const ModalConfirmacion: React.FC<ConfirmModalProps> = ({
  show,
  title = '¿Estás seguro?',
  message = 'Confirma para continuar con esta acción.',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'warning',
  onConfirm,
  onCancel,
}) => {
  const icons = {
    warning: <AlertTriangle size={50} className="text-amber-400" />,
    success: <CheckCircle2 size={50} className="text-emerald-400" />,
    info: <AlertTriangle size={50} className="text-[var(--color-primary)]" />,
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Fondo difuminado */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[51]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Contenedor del modal */}
          <motion.div
            className="fixed inset-0 z-[52] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div
              className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)]
                        rounded-xl shadow-xl p-6 text-center transition-colors duration-300"
            >
              {/* Icono principal */}
              <div className="flex justify-center mb-4">{icons[type]}</div>

              {/* Título */}
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">
                {title}
              </h2>

              {/* Mensaje */}
              <p className="text-[var(--color-muted)] text-sm mb-6">
                {message}
              </p>

              {/* Botones */}
              <div className="flex justify-center gap-3">
                <Button
                  variant="secondary"
                  onClick={onCancel}
                  className="min-w-[100px]"
                >
                  {cancelText}
                </Button>
                <Button
                  variant="primary"
                  onClick={onConfirm}
                  className="min-w-[100px]"
                >
                  {confirmText}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
