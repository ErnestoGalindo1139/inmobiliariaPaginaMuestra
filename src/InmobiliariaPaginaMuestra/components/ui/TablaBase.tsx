import React, { useState, useMemo } from 'react';
import {
  Eye,
  Pencil,
  Trash,
  Check,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  ArrowUpDown,
} from 'lucide-react';
import { Button } from './Button';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';

/* ============================
  🧩 Tipos
============================ */
export interface TableColumn<T extends Record<string, unknown>> {
  key: keyof T;
  label: string;
  alignHeader?: 'left' | 'center' | 'right';
  alignBody?: 'left' | 'center' | 'right';
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface TablaBaseProps<T extends Record<string, unknown>> {
  data: T[];
  columns: TableColumn<T>[];
  pageSize?: number;
  cellSize?: 'sm' | 'md' | 'lg';
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onPageChange?: (page: number) => void;

  // 👇 Nuevo: renderizar acciones personalizadas por fila
  customActions?: (row: T) => React.ReactNode;
}

/* ============================
  🧭 Encabezado Drag + Sort
============================ */
interface SortableHeaderProps {
  id: string;
  label: string;
  onSort?: () => void;
  align?: 'left' | 'center' | 'right';
  isSorted?: boolean;
  direction?: 'asc' | 'desc';
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  id,
  label,
  onSort,
  align = 'center',
  isSorted,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : undefined,
  };

  const alignClass =
    align === 'center'
      ? 'justify-center text-center'
      : align === 'right'
        ? 'justify-end text-right'
        : 'justify-start text-left';

  return (
    <th
      ref={setNodeRef}
      style={style}
      {...attributes}
      title={label} // ✅ Tooltip automático del header
      className={`relative p-3 font-semibold text-[var(--color-text)] uppercase text-[0.85rem] select-none transition-all border-r border-[var(--color-border)]
    ${isDragging ? 'bg-[var(--color-primary)]/10 shadow-md backdrop-blur-sm' : ''}`}
    >
      <div
        className={`flex items-center ${alignClass} gap-2 px-1 py-1 rounded-md cursor-pointer hover:bg-[var(--color-primary)]/10`}
      >
        <div
          {...listeners}
          className="cursor-grab active:cursor-grabbing opacity-60 hover:opacity-100"
        >
          <GripVertical size={14} />
        </div>
        <button
          type="button"
          onClick={onSort}
          className="flex items-center gap-1"
        >
          <span>{label}</span>
          <ArrowUpDown
            size={14}
            className={`transition-transform ${
              isSorted ? 'text-[var(--color-primary)] rotate-180' : 'opacity-40'
            }`}
          />
        </button>
      </div>
    </th>
  );
};

/* ============================
   🧮 Tabla principal
============================ */
export const TablaBase = <T extends Record<string, unknown>>({
  data,
  columns,
  pageSize = 5,
  cellSize = 'md',
  onView,
  onEdit,
  onDelete,
  onPageChange,
  customActions,
}: TablaBaseProps<T>): React.JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(pageSize);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [colOrder, setColOrder] = useState(columns.map((c) => String(c.key)));

  const totalPages = Math.max(1, Math.ceil(data.length / size));

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const key = sortConfig.key as keyof T;
      const valA = a[key];
      const valB = b[key];
      if (valA == null) return 1;
      if (valB == null) return -1;
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const startIndex = (currentPage - 1) * size;
  const currentData = sortedData.slice(startIndex, startIndex + size);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  };

  const handleSort = (key: string): void => {
    setSortConfig((prev) =>
      prev && prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    );
  };

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setColOrder((items) => {
        const oldIndex = items.indexOf(String(active.id)); // 👈 fuerza a string
        const newIndex = items.indexOf(String(over!.id)); // 👈 fuerza a string
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const orderedColumns = colOrder
    .map((key) => columns.find((col) => String(col.key) === key))
    .filter(Boolean) as TableColumn<T>[];

  const sizeClass =
    cellSize === 'sm'
      ? 'p-2 text-xs'
      : cellSize === 'lg'
        ? 'p-4 text-[1rem]'
        : 'p-3 text-sm';

  return (
    <div className="bg-[var(--color-surface)] rounded-xl overflow-hidden border border-[var(--color-border)] shadow-sm transition-all duration-300 flex flex-col">
      {/* 🔹 Contenedor con scroll horizontal solo para la tabla */}
      <div className="overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={colOrder}
            strategy={horizontalListSortingStrategy}
          >
            <table className="w-full min-w-max">
              <thead className="bg-[var(--color-bg)]/40 border-r border-[var(--color-border)]">
                <tr>
                  {orderedColumns.map((col) => (
                    <SortableHeader
                      key={String(col.key)}
                      id={String(col.key)}
                      label={col.label}
                      align={col.alignHeader}
                      onSort={() => handleSort(String(col.key))}
                      isSorted={sortConfig?.key === String(col.key)}
                      direction={sortConfig?.direction}
                    />
                  ))}

                  {(onView || onEdit || onDelete || customActions) && (
                    <th
                      className={`${sizeClass} text-center font-semibold lg:sticky lg:right-0 bg-[var(--color-surface)] border-l border-r border-[var(--color-border)] z-10`}
                    >
                      Acciones
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {currentData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={
                        orderedColumns.length +
                        (onView || onEdit || onDelete || customActions ? 1 : 0)
                      }
                      className={`${sizeClass} text-center text-[var(--color-muted)]`}
                    >
                      Sin datos disponibles
                    </td>
                  </tr>
                ) : (
                  currentData.map((row, i) => (
                    <motion.tr
                      key={i}
                      layout
                      className="border-t border-[var(--color-border)] hover:bg-[var(--color-primary)]/5 transition-all"
                    >
                      {orderedColumns.map((col) => {
                        const value = row[col.key];
                        const align =
                          col.alignBody === 'center'
                            ? 'text-center'
                            : col.alignBody === 'right'
                              ? 'text-right'
                              : 'text-left';
                        return (
                          <td
                            key={String(col.key)}
                            className={`${sizeClass} ${align} text-[var(--color-text)] max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap border-r border-[var(--color-border)]`}
                            title={String(value ?? '')}
                          >
                            {col.render
                              ? col.render(value, row)
                              : String(value ?? '-')}
                          </td>
                        );
                      })}

                      {(onView || onEdit || onDelete || customActions) && (
                        <td
                          className={`${sizeClass} text-center lg:sticky lg:right-0 bg-[var(--color-surface)] border-l border-[var(--color-border)] z-10`}
                        >
                          <div className="flex justify-center items-center gap-3">
                            {onView && (
                              <Button
                                onClick={() => onView(row)}
                                variant="secondary"
                                iconOnly
                                icon={<Eye size={16} />}
                                title="Ver"
                              />
                            )}
                            {onEdit && (
                              <Button
                                onClick={() => onEdit(row)}
                                variant="secondary"
                                iconOnly
                                icon={<Pencil size={16} />}
                                title="Editar"
                              />
                            )}
                            {onDelete && (
                              <Button
                                onClick={() => onDelete(row)}
                                variant="secondary"
                                iconOnly
                                icon={
                                  row.sn_Activo ? (
                                    <Trash size={16} />
                                  ) : (
                                    <Check size={16} />
                                  )
                                }
                                title={row.sn_Activo ? 'Desactivar' : 'Activar'}
                              />
                            )}
                            {customActions && customActions(row)}
                          </div>
                        </td>
                      )}
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </SortableContext>
        </DndContext>
      </div>

      {/* 📊 Footer fijo fuera del scroll */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 border-t border-[var(--color-border)] text-sm text-[var(--color-muted)] bg-[var(--color-surface)]">
        <div>
          Página <b className="text-[var(--color-text)]">{currentPage}</b> de{' '}
          <b className="text-[var(--color-text)]">{totalPages}</b> · Total:{' '}
          <b className="text-[var(--color-text)]">{data.length}</b> registros
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            Mostrar
            <select
              value={size}
              onChange={(e) => {
                setSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-transparent border border-[var(--color-border)] rounded-md px-2 py-1 text-[var(--color-text)] focus:outline-none"
            >
              {[5, 10, 20, 50].map((n) => (
                <option
                  key={n}
                  value={n}
                  className="bg-[var(--color-bg)] text-[var(--color-text)]"
                >
                  {n}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="secondary"
              iconOnly
              size="sm"
              icon={<ChevronLeft size={18} />}
              title="Anterior"
            />
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="secondary"
              iconOnly
              size="sm"
              icon={<ChevronRight size={18} />}
              title="Siguiente"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
