import {useRef} from 'react';
import {ModalCustomMethod} from '../components/ModalCustom';

export const useModal = () => {
  const refModal = useRef<ModalCustomMethod>(null);

  const handleShow = () => {
    refModal.current?.show(false);
  };

  const handleHidden = () => {
    refModal.current?.hide();
  };

  return {refModal, handleHidden, handleShow};
};
