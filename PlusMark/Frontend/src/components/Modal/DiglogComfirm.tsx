import { ICClear } from "@assets/iconElements/ICClear";
import { ICDeleteTrashLight } from "@assets/iconElements/ICDeleteTrashLight";
import { ICQuestion } from "@assets/iconElements/ICQuestion";
import DynamicButton from "@components/Buttons/DynamicButton";
import LinearButton from "@components/Buttons/LinearButton";
import { ModalContext } from "@contexts/contextModal";
import useI18n from "@hooks/useI18n";
import { ReactNode, useContext } from "react";

interface Props {
  icon?: ReactNode;
  message: string;
  messageBold?: string;
  messageEnd?: string;
  onClick?: ({ }) => void;
  onClear?: () => void;
  isQuestion?: boolean;
}

export const DiglogComfirm = (props: Props) => {
  const { message, onClear, onClick, isQuestion = false } = props;
  const { setShowModal, closeModal, setContentModal } =
    useContext(ModalContext);
  const { t } = useI18n();
  return (
    <>
      <div className="flex items-center flex-col bg-white justify-center md:w-[600px] lg:w-[800px] h-auto p-8 bg-__white font-PublicSans relative">
        <button
          onClick={() => setShowModal(false)}
          className="text-text_7E8B99 absolute top-4 text-_16 right-4"
        >
          <ICClear />
        </button>
        <div>
          {
            isQuestion ? <ICQuestion /> : <ICDeleteTrashLight width={120} height={120} />
          }
        </div>
        <span className="mt-10 mb-[33px] text-center text-black02 text-normal1 font-semibold">
          {t(message)}
        </span>
        <div className="flex flex-row justify-center gap-x-[24px]">
          <LinearButton
            text="button.cancel"
            className="w-fit h-12"
            onClick={() => closeModal()}
          />
          <DynamicButton
            className="h-12 !rounded-none"
            gradien={true}
            onClick={onClick}
            normal={false}
            text="button.confirm"
          />
        </div>
      </div>
    </>
  );
};

export const useShowConfirm = () => {
  const { setShowModal, setContentModal } = useContext(ModalContext);

  const showConfirm = (message: string, onClick: () => void) => {
    setContentModal(<DiglogComfirm message={message} onClick={onClick} />);
    setShowModal(true);
  };
  const showQuestion = (message: string, onClick: () => void) => {
    setContentModal(<DiglogComfirm message={message} onClick={onClick} isQuestion={true} />);
    setShowModal(true);
  };
  return {
    showConfirm,
    showQuestion
  };
};
