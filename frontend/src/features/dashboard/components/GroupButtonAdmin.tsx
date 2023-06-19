import React, { useContext } from "react";
import { Button } from "./Button";
import { useModalContext } from "@contexts/hooks/modal";

type Props = {
  onSubmit?: () => void;
  onCacel?: () => void;
  isAdd?: boolean;
  loading?: boolean;
};

export const GroupButtonAdmin = ({
  onSubmit,
  isAdd = true,
  onCacel,
  loading = false
}: Props) => {
  const { hideModal } = useModalContext();
  return (
    <div className="flex justify-end items-center mt-[24px]">
      <Button
        type="button"
        onClick={onCacel ? onCacel : hideModal}
        text="button._cancel"
        color="empty"
        className="!w-[120px] mr-[24px]"
      />
      <Button
        disabled={loading}
        type="submit"
        onClick={() => onSubmit?.()}
        text={!loading ? isAdd ? "button._create" : "button._save" : "submitting..."}
        color="primary"
        className="!w-[120px]"
      />
    </div>
  );
};
