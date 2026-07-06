import * as React from 'react';
import { Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton } from '@fluentui/react';

interface ModalFormProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  onSubmit?: () => void;
}

export const ModalForm: React.FC<ModalFormProps> = ({ title, isOpen, onClose, children, onSubmit }) => {
  return (
    <Dialog
      hidden={!isOpen}
      onDismiss={onClose}
      dialogContentProps={{ type: DialogType.largeHeader, title: title || '' }}
      modalProps={{ isBlocking: false }}
    >
      <div>{children}</div>
      <DialogFooter>
        <DefaultButton onClick={onClose}>Cancelar</DefaultButton>
        <PrimaryButton onClick={onSubmit} text="Aceptar" />
      </DialogFooter>
    </Dialog>
  );
};

export default ModalForm;
