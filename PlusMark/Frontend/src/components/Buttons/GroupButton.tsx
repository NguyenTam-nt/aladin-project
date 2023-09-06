import DynamicButton from "@components/Buttons/DynamicButton";
import LinearButton from "@components/Buttons/LinearButton";
import { ModalContext } from "@contexts/contextModal";
import clsx from "clsx";
import React, { memo, useContext } from "react";
interface Props {
  textCancel?: string;
  text?: string;
  onCancel?: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
}
const GroupButton = memo(
  ({
    text = "button.add",
    textCancel = "button.cancel",
    isLoading = false,
    onCancel,
    onSubmit,
  }: Props) => {
    const { setShowModal, closeModal, setContentModal } =
      useContext(ModalContext);
    return (
      <div className="flex gap-6">
        <LinearButton
          text={textCancel}
          className="h-12"
          onClick={() => {
            onCancel || closeModal();
          }}
        />
        <DynamicButton
          normal={false}
          gradien={true}
          disabled={isLoading}
          text={text}
          onClick={onSubmit}
          className={"!rounded-none " + (isLoading && "!cursor-not-allowed")}
        />
      </div>
    );
  }
);

export default GroupButton;
