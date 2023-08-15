import { DeleteManageIcon, TrashCanIcon } from "@assets/icons";
import { ModalContext } from "@contexts/contextModal";
import React, { useContext } from "react";
interface Props {
  typeBox: "WARNING" | "SUCCESS";
  message: string;
  noteMessage?: string;
  messageHightLight?: string;
  enableIcon?: boolean;
  handleConfirm: () => void;
}
function ConfirmBox(props: Props) {
  const {
    typeBox,
    message,
    noteMessage,
    messageHightLight,
    enableIcon = true,
    handleConfirm,
  } = props;
  const { closeModal } = useContext(ModalContext);
  return (
    <div className="p-3 bg-white rounded-md pb-8 px-8 max-w-[417px]">
      <div>
        <div className="hover:cursor-pointer mb-10" onClick={closeModal}>
          <DeleteManageIcon className="ml-auto" width={16} height={16} />
        </div>

        {enableIcon && (
          <div className="mb-6 flex justify-center">
            <TrashCanIcon width={33} />
          </div>
        )}

        <div className="mb-5">
          <p className={"text-normal text-center font-normal "}>
            {message} &nbsp;
            {messageHightLight && (
              <span className="text-buttonSucces font-bold">
                {messageHightLight}
              </span>
            )}
          </p>

          {noteMessage && (
            <p className="text-small font-normal italic text-center text-gray-300 mt-3">
              {noteMessage}
            </p>
          )}
        </div>

        <div className="flex items-center justify-center">
          <button
            className="text-normal font-normal py-10px px-5 mr-5 rounded-md text-gray-300 border border-gray-300"
            onClick={closeModal}
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className={
              "text-normal font-bold py-10px px-5 rounded-md text-white border border-gray-100 " +
              (typeBox === "WARNING" ? "bg-main" : "bg-buttonSucces")
            }
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBox;
