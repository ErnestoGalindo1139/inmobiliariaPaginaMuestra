import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../../../auth/AuthProvider';
import { useModuloActual } from '../../hooks/useModuloActual';

interface Accion {
  /** Ícono a mostrar */
  icon?: React.ElementType;
  /** Texto del tooltip */
  tooltip?: string;
  /** Acción al hacer click */
  onClick: () => void;
  /** 👇 Nombre o ID de la acción en la BD (opcional) */
  permiso?: string | number;
}

interface TituloSeccionProps {
  /** Título principal */
  titulo: string;
  /** Descripción opcional debajo del título */
  descripcion?: string;
  /** Acciones (botones con íconos a la derecha o abajo en móvil) */
  acciones?: Accion[];
}

/** 🧩 Encabezado base para módulos o secciones — ahora 100% responsive */
export const TituloSeccion: React.FC<TituloSeccionProps> = ({
  titulo,
  descripcion,
  acciones = [],
}) => {
  const { tieneAccion } = useAuth();
  const moduloActual = useModuloActual();

  // 🔒 Filtra acciones según permisos del rol
  const accionesVisibles = acciones.filter((a) => {
    if (!a.permiso) return true; // Si no especifica permiso, siempre se muestra
    if (!moduloActual) return false;
    return tieneAccion(moduloActual.id_Modulo, a.permiso);
  });

  return (
    <div
      className="
        flex flex-col sm:flex-row sm:items-center sm:justify-between 
        gap-3 mb-6 transition-colors duration-300
      "
    >
      {/* 🔹 Título y descripción */}
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--color-text)]">
          {titulo}
        </h1>

        {descripcion && (
          <p className="text-[var(--color-muted)] text-sm mt-1">
            {descripcion}
          </p>
        )}
      </div>

      {/* 🔹 Botones de acción */}
      {accionesVisibles.length > 0 && (
        <div
          className="
            flex flex-wrap sm:flex-nowrap items-center justify-start sm:justify-end 
            gap-2 sm:gap-3 w-full sm:w-auto
          "
        >
          {accionesVisibles.map((accion, i) => {
            const Icono = accion.icon || Plus;
            return (
              <Button
                key={i}
                onClick={accion.onClick}
                title={accion.tooltip || ''}
                variant="primary"
                iconOnly
                icon={
                  <Icono
                    size={22}
                    strokeWidth={2.5}
                    style={{ color: 'white' }}
                  />
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
