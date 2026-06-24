import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertTriangle, X, CircleX } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center';

export interface ToastProps {
  message: string;
  type?: ToastType;
  show?: boolean;
  duration?: number;
  onClose?: () => void;
  position?: ToastPosition;
}

/** 🚗 Toast claro – marketplace autos */
export const Toast = ({
  message,
  type = 'info',
  show = true,
  duration = 3500,
  onClose,
  position = 'top-right',
}: ToastProps): React.JSX.Element | null => {
  useEffect(() => {
    if (!show || !onClose) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!show) return null;

  const palette = {
    success: '#16a34a',
    error: '#dc2626',
    info: '#2563eb',
    warning: '#d97706',
  };

  const icons = {
    success: <CheckCircle2 size={22} />,
    error: <CircleX size={22} />,
    info: <Info size={22} />,
    warning: <AlertTriangle size={22} />,
  };

  const positionClasses: Record<ToastPosition, string> = {
    'top-left': 'top-6 left-6',
    'top-right': 'top-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  const variants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 30, scale: 0.94 },
  };

  const color = palette[type];

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.3 }}
        className={`fixed z-[9999] flex items-center gap-3 px-5 py-3 rounded-xl border bg-white ${positionClasses[position]}`}
        style={{
          borderLeft: `5px solid ${color}`,
          color: '#1f2937',
          boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
        }}
      >
        {/* Ícono */}
        <div
          className="flex items-center justify-center rounded-full p-2"
          style={{
            backgroundColor: `${color}15`,
            color,
          }}
        >
          {icons[type]}
        </div>

        {/* Mensaje */}
        <p className="text-sm font-medium max-w-[280px]">{message}</p>

        {/* Cerrar */}
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 p-1 rounded hover:bg-gray-100 transition"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        )}

        {/* Progreso */}
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: 0 }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
          className="absolute bottom-0 left-0 h-[3px]"
          style={{
            backgroundColor: color,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};
