import {useCallback} from 'react';
import {useModal} from '../../../../hooks/useModal';

export enum TypeModalWaitProcess {
  cancelbill = 'CANCELBILL',
  refusebill = 'REFUSEDBILL',
}

export const useWaitProcess = () => {
  const modalConfirmCancel = useModal();
  const modalRefuse = useModal();

  const handleShowModalAction = useCallback((type: TypeModalWaitProcess) => {
    switch (type) {
      case TypeModalWaitProcess.cancelbill:
        modalConfirmCancel.handleShow();
        break;
      case TypeModalWaitProcess.refusebill:
        modalRefuse.handleShow();
      default:
        break;
    }
  }, []);

  return {
    modalConfirmCancel,
    modalRefuse,
    handleShowModalAction
  };
};
