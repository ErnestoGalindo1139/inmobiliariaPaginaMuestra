import { motion } from 'framer-motion';
import { Loader2, LucideIcon } from 'lucide-react';
import React from 'react';

type Variant =
  | 'fullscreen'
  | 'fullscreen-bordered'
  | 'card'
  | 'minimal'
  | 'floating';

export interface WaitScreenProps {
  message?: string;
  variant?: Variant;
  icon?: LucideIcon;
  show?: boolean;
  size?: number;
}

/** 🚗 WaitScreen – estilo marketplace autos (claro) */
export const WaitScreen = ({
  message = 'Procesando...',
  variant = 'fullscreen',
  icon: Icon = Loader2,
  show = true,
  size = 56,
}: WaitScreenProps): React.JSX.Element | null => {
  if (!show) return null;

  /** 🎯 Paleta fija */
  const PRIMARY = '#2563eb'; // azul confianza
  const TEXT = '#1f2937';
  const BG = '#ffffff';
  const BORDER = '#e5e7eb';

  const variants: Record<Variant, string> = {
    fullscreen:
      'fixed inset-0 z-[50] flex items-center justify-center backdrop-blur-sm',
    'fullscreen-bordered':
      'fixed inset-0 z-[50] flex items-center justify-center backdrop-blur-md',
    card: 'flex items-center justify-center p-10 rounded-2xl border shadow-xl bg-white',
    minimal:
      'flex flex-col items-center justify-center py-6 px-8 rounded-xl border bg-white',
    floating: 'fixed bottom-8 right-8 p-6 border rounded-xl shadow-lg bg-white',
  };

  const containerClasses = variants[variant];
  const isBordered = variant === 'fullscreen-bordered';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className={containerClasses}
      style={{
        backgroundColor:
          variant === 'fullscreen' || variant === 'fullscreen-bordered'
            ? 'rgba(255,255,255,0.85)'
            : BG,
        color: TEXT,
      }}
    >
      {isBordered ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col items-center justify-center p-10 rounded-2xl border bg-white"
          style={{
            borderColor: PRIMARY,
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          }}
        >
          <WaitIconAndText
            Icon={Icon}
            message={message}
            size={size}
            primary={PRIMARY}
            text={TEXT}
          />
        </motion.div>
      ) : (
        <WaitIconAndText
          Icon={Icon}
          message={message}
          size={size}
          primary={PRIMARY}
          text={TEXT}
        />
      )}
    </motion.div>
  );
};

/** 🔹 Subcomponente reutilizable */
const WaitIconAndText = ({
  Icon,
  message,
  size,
  primary,
  text,
}: {
  Icon: LucideIcon;
  message: string;
  size: number;
  primary: string;
  text: string;
}): React.JSX.Element => (
  <motion.div
    initial={{ scale: 0.96, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.25 }}
    className="flex flex-col items-center justify-center text-center"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
      className="mb-5"
      style={{ color: primary }}
    >
      <Icon size={size} className="animate-spin" />
    </motion.div>

    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-base font-medium max-w-xs"
      style={{ color: text }}
    >
      {message}
    </motion.p>
  </motion.div>
);
