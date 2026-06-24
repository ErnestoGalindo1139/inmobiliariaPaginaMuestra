import React from 'react';
import { motion, Variants } from 'framer-motion';

type TipoAnimacion =
  | 'desvanecer'
  | 'deslizar-derecha'
  | 'deslizar-izquierda'
  | 'subir'
  | 'bajar'
  | 'zoom'
  | 'rebote'
  | 'flotar'
  | 'escala-lenta'
  | 'giro';

interface AnimacionPaginaProps {
  /** Tipo de animación (en español) */
  tipo?: TipoAnimacion;
  /** Duración de la animación */
  duracion?: number;
  /** Contenido de la página */
  children: React.ReactNode;
  /** Retraso opcional */
  retraso?: number;
}

/** 🎬 Componente envoltorio para animaciones de páginas */
export const AnimacionPagina: React.FC<AnimacionPaginaProps> = ({
  tipo = 'desvanecer',
  duracion = 0.35,
  retraso = 0,
  children,
}) => {
  // 🎨 Definición de animaciones
  const animaciones: Record<TipoAnimacion, Variants> = {
    desvanecer: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    'deslizar-derecha': {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -40 },
    },
    'deslizar-izquierda': {
      initial: { opacity: 0, x: -40 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 40 },
    },
    subir: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -40 },
    },
    bajar: {
      initial: { opacity: 0, y: -40 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 40 },
    },
    zoom: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    },
    rebote: {
      initial: { opacity: 0, y: 30, scale: 0.95 },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 150, damping: 12 },
      },
      exit: { opacity: 0, y: 20, scale: 0.95 },
    },
    flotar: {
      initial: { opacity: 0, y: 15 },
      animate: {
        opacity: 1,
        y: [0, -3, 0, 3, 0],
        transition: { repeat: Infinity, duration: 4 },
      },
      exit: { opacity: 0, y: 15 },
    },
    'escala-lenta': {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
    giro: {
      initial: { opacity: 0, rotateY: 90 },
      animate: { opacity: 1, rotateY: 0 },
      exit: { opacity: 0, rotateY: -90 },
    },
  };

  const variante = animaciones[tipo];

  return (
    <motion.div
      variants={variante}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: duracion,
        delay: retraso,
        ease: 'easeOut',
      }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
};
