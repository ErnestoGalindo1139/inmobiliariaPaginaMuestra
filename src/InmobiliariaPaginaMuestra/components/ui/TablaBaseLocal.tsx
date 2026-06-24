import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash, Eye } from 'lucide-react';
import { Button } from './Button';

export interface LocalColumn<T extends Record<string, unknown>> {
  key: keyof T;
  label: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TablaBaseLocalProps<T extends Record<string, unknown>> {
  data: T[];
  columns: LocalColumn<T>[];
  onEdit?: (row: T) => void;
  onView?: (row: T) => void;
  onDelete?: (row: T) => void;
  showActions?: boolean;
  emptyMessage?: string;
  compact?: boolean; // 👈 Para tablas dentro de modales
}

export const TablaBaseLocal = <T extends Record<string, unknown>>({
  data,
  columns,
  onEdit,
  onView,
  onDelete,
  showActions = true,
  emptyMessage = 'No hay datos para mostrar.',
  compact = true,
}: TablaBaseLocalProps<T>) => {
  const sizeClass = compact ? 'p-2 text-sm' : 'p-3 text-base';

  return (
    <div className="overflow-x-auto w-full border border-[var(--color-border)] rounded-xl shadow-sm bg-[var(--color-surface)]">
      <table className="w-full min-w-max text-[var(--color-text)]">
        {/* 🔹 Encabezados */}
        <thead className="bg-[var(--color-bg)]/40 border-b border-[var(--color-border)]">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`${sizeClass} text-[var(--color-primary)] uppercase font-semibold text-xs border-r border-[var(--color-border)] ${
                  col.align === 'center'
                    ? 'text-center'
                    : col.align === 'right'
                      ? 'text-right'
                      : 'text-left'
                }`}
              >
                {col.label}
              </th>
            ))}

            {showActions && (
              <th
                className={`${sizeClass} text-center uppercase text-[var(--color-primary)] text-xs`}
              >
                Acciones
              </th>
            )}
          </tr>
        </thead>

        {/* 🔸 Cuerpo */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (showActions ? 1 : 0)}
                className={`${sizeClass} text-center text-[var(--color-muted)] italic`}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t border-[var(--color-border)] hover:bg-[var(--color-primary)]/5 transition"
              >
                {columns.map((col) => {
                  const value = row[col.key];
                  return (
                    <td
                      key={String(col.key)}
                      className={`${sizeClass} border-r border-[var(--color-border)] ${
                        col.align === 'center'
                          ? 'text-center'
                          : col.align === 'right'
                            ? 'text-right'
                            : 'text-left'
                      }`}
                    >
                      {col.render
                        ? col.render(value, row)
                        : String(value ?? '-')}
                    </td>
                  );
                })}

                {showActions && (
                  <td
                    className={`${sizeClass} text-center border-l border-[var(--color-border)]`}
                  >
                    <div className="flex justify-center items-center gap-2">
                      {onView && (
                        <Button
                          iconOnly
                          variant="secondary"
                          icon={<Eye size={15} />}
                          onClick={() => onView(row)}
                          title="Ver"
                        />
                      )}
                      {onEdit && (
                        <Button
                          iconOnly
                          variant="secondary"
                          icon={<Pencil size={15} />}
                          onClick={() => onEdit(row)}
                          title="Editar"
                        />
                      )}
                      {onDelete && (
                        <Button
                          type="button"
                          iconOnly
                          variant="secondary"
                          icon={<Trash size={15} />}
                          onClick={() => onDelete(row)}
                          title="Eliminar"
                        />
                      )}
                    </div>
                  </td>
                )}
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
