import { Button } from "@components/Button";
import { ModalContext } from "@contexts/ModalContext";
import React, { useContext } from "react";

type Props = {
    onSubmit?: () => void,
    isAdd?: boolean
}

export const GroupButtonAdmin = ({onSubmit, isAdd = true}:Props) => {
    const {hideModal} = useContext(ModalContext)
  return (
    <div className="flex justify-end items-center">
      <Button
       type="button"
        onClick={hideModal}
        text="button._cancel"
        color="empty"
        className="!w-[120px] border border-br_E9ECEF mr-[24px]"
      />
      <Button type="submit" onClick={() => onSubmit?.()}  text={isAdd ? "button._create" : "button._save"} color="primary" className="!w-[120px]" />
    </div>
  );
};
