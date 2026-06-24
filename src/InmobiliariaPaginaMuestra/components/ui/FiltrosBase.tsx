import React, { useState } from 'react';
import { Search, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

interface FiltrosBaseProps {
  /** Contenido (inputs, selects, etc.) */
  children: React.ReactNode;
  /** Título opcional */
  titulo?: string;
  /** Acción al presionar el botón de búsqueda */
  onSearch?: () => void;
  /** Acción al presionar el botón de limpiar filtros */
  onClear?: () => void;
  /** Texto alternativo del botón Buscar */
  searchLabel?: string;
  /** Texto alternativo del botón Limpiar */
  clearLabel?: string;
  /** Si los botones van abajo del contenido */
  accionesAbajo?: boolean;
  /** Si el panel debe poder expandirse */
  expandible?: boolean;
  /** Texto del tooltip o botón expandir */
  toggleLabel?: string;

  /** 🔹 Control externo del estado abierto */
  isOpen?: boolean;
  /** 🔹 Control externo del evento toggle */
  onToggle?: () => void;
}

/** 🎛️ Contenedor base para filtros de módulos */
export const FiltrosBase: React.FC<FiltrosBaseProps> = ({
  children,
  titulo = 'Filtros de búsqueda',
  onSearch,
  onClear,
  searchLabel = 'Buscar',
  clearLabel = 'Limpiar',
  accionesAbajo = false,
  expandible = false,
  toggleLabel = 'Mostrar más filtros',
  isOpen,
  onToggle,
}) => {
  // Estado interno (solo si no se controla desde fuera)
  const [internalOpen, setInternalOpen] = useState(!expandible);

  // Decide cuál estado usar
  const abierto = isOpen ?? internalOpen;
  const toggle = onToggle ?? (() => setInternalOpen((prev) => !prev));

  const renderButtons = (): React.JSX.Element => (
    <div className="flex justify-end gap-2">
      {onClear && (
        <Button
          variant="secondary"
          icon={<RefreshCw size={16} />}
          onClick={onClear}
        >
          {clearLabel}
        </Button>
      )}
      {onSearch && (
        <Button
          variant="primary"
          icon={
            <Search size={16} strokeWidth={3.5} style={{ color: 'white' }} />
          }
          onClick={onSearch}
        >
          {searchLabel}
        </Button>
      )}
    </div>
  );

  return (
    <div className="filtros-base bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 mb-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <h2 className="text-[var(--color-text)] font-medium tracking-wide">
          {titulo}
        </h2>

        <div className="flex items-center gap-2">
          {/* Botón expandir */}
          {expandible && (
            <Button
              variant="ghost"
              iconOnly
              title={toggleLabel}
              onClick={toggle}
              icon={
                abierto ? <ChevronUp size={18} /> : <ChevronDown size={18} />
              }
            />
          )}
          {!accionesAbajo && renderButtons()}
        </div>
      </div>

      {/* Contenido colapsable */}
      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            key="filtros"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex flex-wrap gap-3 items-center">{children}</div>

            {accionesAbajo && (
              <div className="mt-5 border-t border-[var(--color-border)] pt-3">
                {renderButtons()}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
