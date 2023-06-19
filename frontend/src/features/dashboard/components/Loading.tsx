import { useModalContext } from "@contexts/hooks/modal";
import React from "react";

export const Loading = () => {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export const useHandleLoading = () => {
  const { setElementModal, hideModal } = useModalContext();
  const showLoading = () => {
    setElementModal(<Loading />);
  };

  return {
    showLoading,
    hideLoading: hideModal,
  };
};
