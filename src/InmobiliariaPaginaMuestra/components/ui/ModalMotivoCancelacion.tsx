import React, { useState, useEffect } from 'react';
import { ModalBase } from './ModalBase';
import { Button } from './Button';
import { TextAreaField } from './Inputs';

interface ModalMotivoCancelacionProps {
  isOpen: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  placeholder?: string;
  variant?: 'primary' | 'danger' | 'secondary';
  onClose: () => void;
  onConfirm: (motivo: string) => void;
}

export const ModalMotivoCancelacion: React.FC<ModalMotivoCancelacionProps> = ({
  isOpen,
  title = 'Especificar motivo',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  placeholder = 'Escribe el motivo...',
  variant = 'primary',
  onClose,
  onConfirm,
}) => {
  const [motivo, setMotivo] = useState('');

  useEffect(() => {
    if (!isOpen) setMotivo('');
  }, [isOpen]);

  const handleConfirm = (): void => {
    if (!motivo.trim()) return;
    onConfirm(motivo.trim());
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm">
      <TextAreaField
        name="motivo"
        label="Motivo"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
        placeholder={placeholder}
      />

      <div className="flex justify-end gap-3 pt-4 border-t border-[var(--color-border)]">
        <Button variant="secondary" onClick={onClose} type="button">
          {cancelText}
        </Button>
        <Button
          variant={variant}
          onClick={handleConfirm}
          disabled={!motivo.trim()}
          type="button"
        >
          {confirmText}
        </Button>
      </div>
    </ModalBase>
  );
};
