import DynamicButton from "@components/Buttons/DynamicButton";
import LinearButton from "@components/Buttons/LinearButton";
import { ModalContext } from "@contexts/contextModal";
import React, { memo, useContext } from "react";
interface Props {
  textCancel?: string;
  text?: string;
  onCancel?: () => void;
  onSubmit: () => void;
}
const GroupButton = memo(
  ({
    text = "button.add",
    textCancel = "button.cancel",
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
          text={text}
          onClick={onSubmit}
          className="!rounded-none"
        />
      </div>
    );
  }
);

export default GroupButton;
