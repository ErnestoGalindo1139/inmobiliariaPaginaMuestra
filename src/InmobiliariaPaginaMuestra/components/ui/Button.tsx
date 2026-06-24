import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual del botón */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  /** Mostrar spinner de carga */
  loading?: boolean;
  /** Ícono opcional */
  icon?: React.ReactNode;
  /** Si el botón es solo un ícono */
  iconOnly?: boolean;
  /** Tamaño opcional */
  size?: 'sm' | 'md' | 'lg';
}

/** 🔘 Botón adaptable al tema y estilo global */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  loading = false,
  icon,
  iconOnly = false,
  size = 'md',
  className = '',
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none text-sm';

  const variants: Record<string, string> = {
    primary: `
      bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]
      text-white focus:ring-[var(--color-primary)]
    `,
    secondary: `
      bg-[var(--color-surface)] hover:bg-[var(--color-border)]
      border border-[var(--color-border)]
      text-[var(--color-text)] focus:ring-[var(--color-border)]
    `,
    danger: `
      bg-red-500 hover:bg-red-400 text-white focus:ring-red-500
    `,
    ghost: `
      bg-transparent hover:bg-[var(--color-primary)]/10
      text-[var(--color-primary)] focus:ring-[var(--color-primary)]
    `,
  };

  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  // 👇 Si es un botón solo de ícono
  const iconOnlyClasses = iconOnly
    ? 'w-9 h-9 p-0 flex items-center justify-center'
    : sizes[size];

  return (
    <button
      className={`${base} ${variants[variant]} ${iconOnlyClasses} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          {!iconOnly && 'Cargando...'}
        </>
      ) : (
        <>
          {icon && <span className="flex items-center">{icon}</span>}
          {!iconOnly && children}
        </>
      )}
    </button>
  );
};
