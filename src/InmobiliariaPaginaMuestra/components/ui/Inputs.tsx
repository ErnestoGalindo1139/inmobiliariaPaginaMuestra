import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { format } from 'date-fns';
import { Calendar, Eye, EyeOff } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import {
  formatToCurrency,
  unformatFromCurrency,
} from '../../helpers/formatosNumero';
import { es } from 'date-fns/locale';

/* 🧠 Tipos comunes */
type BorderWidth = 'thin' | 'normal' | 'thick';

/* ──────────────────────────────── */
/* 🔹 INPUT FIELD */
/* ──────────────────────────────── */
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  borderWidth?: BorderWidth;
  tipoCampo?:
    | 'numeric'
    | 'decimal'
    | 'alphanumeric'
    | 'phone'
    | 'text'
    | 'email';
  showCurrency?: boolean;
  formatCurrency?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      hint,
      className,
      tipoCampo,
      onChange,
      onBlur,
      onFocus,
      value,
      showCurrency = false,
      formatCurrency = false,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [displayValue, setDisplayValue] = useState<string>('');

    // Regex para validación
    const regexMap: Record<string, RegExp> = {
      numeric: /^[0-9]*$/,
      decimal: /^[0-9.,]*$/,
      alphanumeric: /^[a-zA-Z0-9\s]*$/,
      phone: /^[0-9+\-\s()]*$/,
      text: /^[a-zA-ZÀ-ÿ\s]*$/,
      email: /^[a-zA-Z0-9@._\-+]*$/,
    };

    const inputModeMap: Record<
      string,
      React.HTMLAttributes<HTMLInputElement>['inputMode']
    > = {
      numeric: 'numeric',
      decimal: 'decimal',
      phone: 'tel',
      email: 'email',
      alphanumeric: 'text',
      text: 'text',
    };

    // Efecto para inicializar el valor formateado
    useEffect(() => {
      if (formatCurrency && value && !isFocused) {
        setDisplayValue(formatToCurrency(String(value)));
      } else if (formatCurrency && value && isFocused) {
        setDisplayValue(unformatFromCurrency(String(value)));
      } else {
        setDisplayValue((value as string) || '');
      }
    }, [value, formatCurrency, isFocused]);

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ): void => {
      const value = e.target.value;

      if (tipoCampo && regexMap[tipoCampo]) {
        const regex = regexMap[tipoCampo];
        if (value === '' || regex.test(value)) {
          setDisplayValue(value);

          // Para campos de moneda, enviar el valor sin formato
          if (formatCurrency) {
            const unformattedValue = unformatFromCurrency(value);
            const syntheticEvent = {
              ...e,
              target: {
                ...e.target,
                value: unformattedValue,
                name: e.target.name,
              },
            };
            onChange?.(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
          } else {
            onChange?.(e);
          }
        }
      } else {
        setDisplayValue(value);
        onChange?.(e);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
      setIsFocused(true);
      if (formatCurrency && value) {
        setDisplayValue(unformatFromCurrency(String(value)));
      }
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
      setIsFocused(false);
      if (formatCurrency && value) {
        setDisplayValue(formatToCurrency(String(value)));
      }
      onBlur?.(e);
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-[var(--color-text)] opacity-90">
            {label}
          </label>
        )}

        <div className="relative">
          {showCurrency && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 font-semibold">
              $
            </span>
          )}
          <input
            ref={ref}
            {...props}
            value={displayValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            inputMode={tipoCampo ? inputModeMap[tipoCampo] : props.inputMode}
            className={`w-full rounded-lg border border-[var(--color-input-border)]
              bg-[var(--color-input-bg)] text-[var(--color-text)]
              placeholder:text-[var(--color-muted)]/80
              focus:outline-none focus:border-[var(--color-primary)]
              focus:ring-2 focus:ring-[var(--color-primary)]/40
              transition-all duration-200 p-2.5
              ${showCurrency ? 'pl-7' : 'pl-3'}
              ${className || ''}`}
          />
        </div>

        {hint && (
          <span className="text-xs text-[var(--color-muted)] mt-0.5">
            {hint}
          </span>
        )}
      </div>
    );
  }
);
InputField.displayName = 'InputField';

interface PasswordFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    { label, hint, className, onChange, onBlur, onFocus, value, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
      setDisplayValue(value || '');
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setDisplayValue(e.target.value);
      onChange?.(e);
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-[var(--color-text)] opacity-90">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            {...props}
            type={showPassword ? 'text' : 'password'}
            value={displayValue}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={`w-full rounded-lg border border-[var(--color-input-border)]
              bg-[var(--color-input-bg)] text-[var(--color-text)]
              placeholder:text-[var(--color-muted)]/80
              focus:outline-none focus:border-[var(--color-primary)]
              focus:ring-2 focus:ring-[var(--color-primary)]/40
              transition-all duration-200 p-2.5 pr-10
              ${className || ''}`}
          />

          {/* 👁️ Toggle */}
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2
              text-[var(--color-muted)]
              hover:text-[var(--color-primary)]
              transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {hint && (
          <span className="text-xs text-[var(--color-muted)] mt-0.5">
            {hint}
          </span>
        )}
      </div>
    );
  }
);

PasswordField.displayName = 'PasswordField';

/* ──────────────────────────────── */
/* 🔹 SELECT FIELD */
/* ──────────────────────────────── */
interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  hint?: string;
  borderWidth?: BorderWidth;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    { label, options, hint, borderWidth = 'normal', className, ...props },
    ref
  ) => {
    const borderClass =
      borderWidth === 'thin'
        ? 'border'
        : borderWidth === 'thick'
          ? 'border-2'
          : 'border-[1.5px]';

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-[var(--color-text)] opacity-90">
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            {...props}
            className={`w-full appearance-none rounded-lg ${borderClass} border-[var(--color-input-border)]
              bg-[var(--color-input-bg)] text-[var(--color-text)]
              placeholder:text-[var(--color-muted)]/80
              hover:border-[var(--color-primary)]/40
              focus:outline-none focus-visible:outline-none
              focus:border-[var(--color-primary)]
              focus:ring-2 focus:ring-[var(--color-primary)]/30
              transition-all duration-200 p-2.5 pr-8 shadow-sm cursor-pointer
              ${className || ''}`}
          >
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                }}
              >
                {opt.label}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
            ▼
          </span>
        </div>

        {hint && (
          <span className="text-xs text-[var(--color-muted)] mt-0.5">
            {hint}
          </span>
        )}
      </div>
    );
  }
);
SelectField.displayName = 'SelectField';

/* ──────────────────────────────── */
/* 🔹 TEXTAREA FIELD */
/* ──────────────────────────────── */
interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  borderWidth?: BorderWidth;
}

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  TextAreaFieldProps
>(({ label, hint, className, borderWidth = 'normal', ...props }, ref) => {
  const borderClass =
    borderWidth === 'thin'
      ? 'border'
      : borderWidth === 'thick'
        ? 'border-2'
        : 'border-[1.5px]';

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[var(--color-text)] opacity-90">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        {...props}
        className={`w-full min-h-[90px] rounded-lg ${borderClass} border-[var(--color-input-border)]
            bg-[var(--color-input-bg)] text-[var(--color-text)]
            placeholder:text-[var(--color-muted)]/80
            hover:border-[var(--color-primary)]/40
            focus:outline-none focus-visible:outline-none
            focus:border-[var(--color-primary)]
            focus:ring-2 focus:ring-[var(--color-primary)]/30
            transition-all duration-200 p-2.5 shadow-sm
            ${className || ''}`}
      />
      {hint && (
        <span className="text-xs text-[var(--color-muted)] mt-0.5">{hint}</span>
      )}
    </div>
  );
});
TextAreaField.displayName = 'TextAreaField';

/* ──────────────────────────────── */
/* 🔹 DATE FIELD */
/* ──────────────────────────────── */
interface DateFieldProps {
  label?: string;
  hint?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  borderWidth?: BorderWidth;
  disabled?: boolean;
}

export const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  (
    {
      label,
      hint,
      value,
      onChange,
      placeholder = 'Seleccionar fecha...',
      borderWidth = 'normal',
      disabled = false,
    },
    ref
  ) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selected, setSelected] = useState<Date | null>(value || null);
    const containerRef = useRef<HTMLDivElement>(null);

    // 🧠 Sincroniza el valor externo (por ejemplo, al limpiar filtros)
    useEffect(() => {
      setSelected(value || null);
    }, [value]);

    const borderClass =
      borderWidth === 'thin'
        ? 'border'
        : borderWidth === 'thick'
          ? 'border-2'
          : 'border-[1.5px]';

    const handleSelect = (date: Date | undefined): void => {
      const newDate = date || null;
      setSelected(newDate);
      onChange?.(newDate);
      setShowCalendar(false);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent): void => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setShowCalendar(false);
        }
      };

      if (showCalendar) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return (): void => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [showCalendar]);

    return (
      <div ref={containerRef} className="flex flex-col gap-1.5 relative">
        {label && (
          <label className="text-sm font-medium text-[var(--color-text)] opacity-90">
            {label}
          </label>
        )}
        <div
          className={`relative rounded-lg ${borderClass} border-[var(--color-input-border)]
          bg-[var(--color-input-bg)] text-[var(--color-text)]
          hover:border-[var(--color-primary)]/40
          focus-within:border-[var(--color-primary)]
          transition-all duration-200 shadow-sm`}
        >
          <input
            ref={ref}
            readOnly
            value={selected ? format(selected, 'yyyy-MM-dd') : ''}
            placeholder={placeholder}
            disabled={disabled}
            onClick={() => setShowCalendar((prev) => !prev)}
            className="w-full cursor-pointer bg-transparent text-[var(--color-text)]
                        placeholder:text-[var(--color-muted)]/70 p-2.5 pl-10 focus:outline-none"
          />
          <Calendar
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] pointer-events-none"
          />
        </div>

        {showCalendar && (
          <div
            className="absolute z-20 top-[calc(100%+4px)] bg-[var(--color-surface)]
                border border-[var(--color-border)] rounded-xl shadow-lg p-3 space-y-2"
          >
            <DayPicker
              mode="single"
              selected={selected || undefined}
              onSelect={handleSelect}
              navLayout="around"
              captionLayout="dropdown"
              locale={es}
              showOutsideDays
              startMonth={new Date(2020, 0)}
              endMonth={new Date(2030, 11)}
              classNames={{
                // 🔹 Día actual (hoy)
                today: `text-[var(--color-primary)] font-semibold`,

                // 🔹 Día seleccionado
                selected: `bg-[var(--color-primary)] text-white rounded-full font-semibold`,

                // 🔹 Flechas
                chevron: `fill-[var(--color-primary)]`,
                months_dropdown: `border border-[var(--color-primary)] rounded-md text-[var(--color-text)] bg-[var(--color-bg)]`,
                years_dropdown: `border border-[var(--color-primary)] rounded-md text-[var(--color-text)] bg-[var(--color-bg)]`,
              }}
            />

            {/* 🔹 BOTONES DE ACCIÓN */}
            <div className="flex justify-between items-center pt-3 mt-3 border-t border-[var(--color-border)]">
              {/* CANCELAR (izquierda) */}
              <button
                onClick={() => setShowCalendar(false)}
                className="px-3 py-1.5 rounded-md text-sm font-medium
               bg-[#3a7f3a] hover:bg-[#2f6b2f] text-white transition"
              >
                Cancelar
              </button>

              {/* PANEL DERECHO (Hoy + Limpiar) */}
              <div className="flex gap-2">
                {/* HOY */}
                <button
                  onClick={() => {
                    const today = new Date();
                    setSelected(today);
                    onChange?.(today);
                    setShowCalendar(false);
                  }}
                  className="px-3 py-1.5 rounded-md text-sm font-medium
                 bg-[#3da3e3] hover:bg-[#1e90d6] text-white transition"
                >
                  Hoy
                </button>

                {/* LIMPIAR */}
                <button
                  onClick={() => {
                    setSelected(null);
                    onChange?.(null);
                    setShowCalendar(false);
                  }}
                  className="px-3 py-1.5 rounded-md text-sm font-medium
                 bg-[#d9534f] hover:bg-[#c94441] text-white transition"
                >
                  Limpiar
                </button>
              </div>
            </div>
          </div>
        )}
        {hint && (
          <span className="text-xs text-[var(--color-muted)] mt-0.5">
            {hint}
          </span>
        )}
      </div>
    );
  }
);
DateField.displayName = 'DateField';

/* ──────────────────────────────── */
/* 🔹 FILE FIELD */
/* ──────────────────────────────── */
interface FileFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  label?: string;
  hint?: string;
  borderWidth?: BorderWidth;
  accept?: string; // ej: ".pdf,.xml,.jpg,.jpeg,.png"
  onFileSelect?: (file: File | null) => void; // callback cuando el usuario elige archivo
  value?: File | string | null; // File (nuevo) o string (ruta/URL existente)
  readOnly?: boolean; // modo visualización/solo lectura
}

export const FileField = React.forwardRef<HTMLInputElement, FileFieldProps>(
  (
    {
      label,
      hint,
      borderWidth = 'normal',
      className,
      accept = '.pdf,.xml,.jpg,.jpeg,.png',
      onFileSelect,
      value = null,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    const [fileName, setFileName] = React.useState<string>('');
    const [dragActive, setDragActive] = React.useState<boolean>(false);

    // ▶️ usar 'value' para mostrar nombre de archivo existente o el File actual
    React.useEffect(() => {
      if (value instanceof File) {
        setFileName(value.name);
      } else if (typeof value === 'string' && value.length > 0) {
        const parts = value.split(/[\\/]/);
        setFileName(parts[parts.length - 1]);
      } else {
        setFileName('');
      }
    }, [value]);

    const borderClass =
      borderWidth === 'thin'
        ? 'border'
        : borderWidth === 'thick'
          ? 'border-2'
          : 'border-[1.5px]';

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const file = e.target.files?.[0] || null;
      setFileName(file ? file.name : '');
      onFileSelect?.(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      setDragActive(false);
      if (readOnly) return;
      const file = e.dataTransfer.files?.[0] || null;
      if (file) {
        setFileName(file.name);
        onFileSelect?.(file);
      }
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-[var(--color-text)] opacity-90">
            {label}
          </label>
        )}

        <div
          onDragOver={(e) => {
            if (readOnly) return;
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`
            relative flex flex-col items-center justify-center text-center rounded-lg ${borderClass}
            ${dragActive ? 'border-[var(--color-primary)]' : 'border-[var(--color-input-border)]'}
            ${readOnly ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-input-bg)]'}
            text-[var(--color-text)] transition-all duration-200 py-3 px-2
            ${className || ''}
          `}
        >
          {/* input file oculto cuando no es readOnly */}
          {!readOnly && (
            <input
              ref={ref}
              type="file"
              accept={accept}
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
              {...props}
            />
          )}

          <div className="flex flex-col items-center gap-1">
            {fileName ? (
              <>
                <span className="text-sm font-medium text-[var(--color-muted)]">
                  📎 {fileName}
                </span>

                {/* si value es string (ruta/URL), mostrar botón para ver/descargar */}
                {typeof value === 'string' && value.length > 0 && (
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-primary)] text-sm underline mt-1"
                  >
                    Ver archivo
                  </a>
                )}
              </>
            ) : (
              <span className="text-[0.85rem] text-[var(--color-muted)]">
                {readOnly
                  ? 'Sin archivo adjunto'
                  : 'Haz clic o arrastra un archivo aquí'}
              </span>
            )}

            {/* pista visual cuando está en drag */}
            {!readOnly && dragActive && (
              <span className="text-xs text-[var(--color-primary)]/80">
                Suelta para adjuntar
              </span>
            )}
          </div>
        </div>

        {hint && (
          <span className="text-xs text-[var(--color-muted)] mt-0.5">
            {hint}
          </span>
        )}
      </div>
    );
  }
);
FileField.displayName = 'FileField';

interface CheckFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  hint?: string;
  color?: string;
}

export const CheckField = React.forwardRef<HTMLInputElement, CheckFieldProps>(
  (
    {
      label,
      hint,
      checked,
      onChange,
      disabled = false,
      color = 'var(--color-primary)',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={`flex flex-col gap-1.5 ${
          disabled ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {label && (
          <label className="text-sm font-medium text-[var(--color-text)] opacity-90">
            {label}
          </label>
        )}

        <label
          className={`flex items-center gap-2 cursor-pointer relative ${className || ''}`}
        >
          {/* ✅ Input cerrado correctamente */}
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            {...props}
            className={`peer appearance-none w-5 h-5 rounded-md border border-[var(--color-input-border)]
              bg-[var(--color-input-bg)] transition-all duration-200
              focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:outline-none`}
            style={{
              borderColor: checked ? color : 'var(--color-input-border)',
              backgroundColor: checked ? color : 'var(--color-input-bg)',
            }}
          />

          {/* 🔹 Icono de check */}
          <svg
            className={`absolute left-[3px] pointer-events-none ${
              checked ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-150`}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>

          {/* 🔸 Texto (children) */}
          <span
            className={`text-sm ${
              disabled
                ? 'text-[var(--color-muted)]'
                : 'text-[var(--color-text)]'
            }`}
          >
            {children}
          </span>
        </label>

        {hint && (
          <span className="text-xs text-[var(--color-muted)] mt-0.5">
            {hint}
          </span>
        )}
      </div>
    );
  }
);
CheckField.displayName = 'CheckField';

interface CheckInlineFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  color?: string;
}

export const CheckInlineField = React.forwardRef<
  HTMLInputElement,
  CheckInlineFieldProps
>(
  (
    {
      checked,
      onChange,
      disabled = false,
      color = 'var(--color-primary)',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <label
        className={`relative flex items-center justify-center cursor-pointer select-none ${
          disabled ? 'opacity-60 cursor-not-allowed' : ''
        } ${className || ''}`}
      >
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          {...props}
          className={`peer appearance-none w-5 h-5 rounded-md border border-[var(--color-input-border)]
            bg-[var(--color-input-bg)] transition-all duration-200
            focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:outline-none`}
          style={{
            borderColor: checked ? color : 'var(--color-input-border)',
            backgroundColor: checked ? color : 'var(--color-input-bg)',
          }}
        />
        {/* Icono de check */}
        <svg
          className={`absolute pointer-events-none ${
            checked ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-150`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </label>
    );
  }
);
CheckInlineField.displayName = 'CheckInlineField';

interface SwitchFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SwitchField = React.forwardRef<HTMLInputElement, SwitchFieldProps>(
  (
    {
      label,
      checked = false,
      onChange,
      disabled = false,
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: {
        track: 'w-8 h-4',
        thumb: 'w-3 h-3 translate-x-[2px]',
        active: 'translate-x-[1.05rem]',
      },
      md: {
        track: 'w-10 h-5',
        thumb: 'w-4 h-4 translate-x-[3px]',
        active: 'translate-x-[1.25rem]',
      },
      lg: {
        track: 'w-12 h-6',
        thumb: 'w-5 h-5 translate-x-[4px]',
        active: 'translate-x-[1.55rem]',
      },
    }[size];

    return (
      <label
        className={`inline-flex items-center gap-2 cursor-pointer select-none ${
          disabled ? 'opacity-60 cursor-not-allowed' : ''
        } ${className || ''}`}
      >
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
          className="sr-only"
        />

        {/* 🟦 Track */}
        <div
          className={`relative ${sizes.track} rounded-full transition-all duration-300 border
            ${
              checked
                ? 'bg-[var(--color-primary)] border-[var(--color-primary)] shadow-[0_0_6px_var(--color-primary)]'
                : 'border-[var(--color-border)] bg-[color:var(--switch-bg,theme(colors.slate.400))]'
            }
            ${disabled ? '' : 'hover:ring-2 hover:ring-[var(--color-primary)]/30'}
          `}
          style={{
            // Contraste adaptativo: usa prefers-color-scheme
            ['--switch-bg' as any]:
              window.matchMedia &&
              window.matchMedia('(prefers-color-scheme: dark)').matches
                ? '#2d2f31' // fondo oscuro cuando tema dark
                : '#d1d5db', // gris medio cuando tema claro
          }}
        >
          {/* ⚪ Thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 rounded-full shadow-md transition-all duration-300 ease-[cubic-bezier(.22,1.61,.36,1)] ${
              checked ? sizes.active : sizes.thumb
            }`}
            style={{
              backgroundColor: checked ? '#fff' : '#f0f0f0',
              width:
                size === 'sm' ? '0.9rem' : size === 'lg' ? '1.3rem' : '1.1rem',
              height:
                size === 'sm' ? '0.9rem' : size === 'lg' ? '1.3rem' : '1.1rem',
            }}
          />
        </div>

        {label && (
          <span className="text-sm text-[var(--color-text)]">{label}</span>
        )}
      </label>
    );
  }
);

SwitchField.displayName = 'SwitchField';
