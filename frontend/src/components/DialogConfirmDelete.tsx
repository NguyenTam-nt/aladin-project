import { useContext } from "react";
import { ICClear } from "@assets/icons/ICClear";
import { ModalContext } from "@contexts/ModalContext";
import { Button } from "./Button";

type Props = {
  message: string;
  onClick?: any;
};

export default function DialogConfirmDelete({ message, onClick }: Props) {
  const { hideModal } = useContext(ModalContext);

  return (
    <div className="max-w-full w-[678px] 2xl:w-[800px] h-auto p-[28px]  lg:p-[54px] flex flex-col justify-center lg:justify-between items-center rounded-[10px] bg-white">
      <span>
        <ICClear width={90} height={112} />
      </span>
      <p className="text-center md:text-_24 font-semibold mt-[22px] mb-[33px]">
        {message}
      </p>
      <div className="flex w-full justify-center ">
        <Button
          onClick={hideModal}
          color="empty"
          className=" w-[120px] h-[40px] border border-text_C53434 text-text_C53434"
          text="button._cancel"
        />
        <Button
          onClick={onClick}
          color="primary"
          className=" h-[40px] w-[120px] ml-3  bg-text_C53434 font-bold"
          text="button._delete"
        />
      </div>
    </div>
  );
}
