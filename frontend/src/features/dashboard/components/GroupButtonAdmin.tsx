import { Button } from "@components/Button";
import { ModalContext } from "@contexts/ModalContext";
import React, { useContext } from "react";

type Props = {
    onSubmit: () => void
}

export const GroupButtonAdmin = ({onSubmit}:Props) => {
    const {hideModal} = useContext(ModalContext)
  return (
    <div className="flex justify-end items-center">
      <Button
        onClick={hideModal}
        text="button._cancel"
        color="empty"
        className="!w-[120px] border border-br_E9ECEF mr-[24px]"
      />
      <Button onClick={onSubmit}  text="button._create" color="primary" className="!w-[120px]" />
    </div>
  );
};
