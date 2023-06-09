import { ModalContext } from "@contexts/ModalContext";
import { useContext } from "react";

export const useModalContext = () => {
  const { setElementModal, hideModal, isShow } = useContext(ModalContext);

  return { setElementModal, hideModal, isShow };
};
