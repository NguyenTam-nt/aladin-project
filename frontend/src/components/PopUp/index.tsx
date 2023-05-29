import { ICError } from "@assets/icons/ICError";
import { ICSuccess } from "@assets/icons/ICSuccess";
import { ICWarning } from "@assets/icons/ICWarning";
import { PopUpContext } from "@contexts/PopupContext";
import { TranslateContext } from "@contexts/Translation";
import clsx from "clsx";
import { memo, useContext, useEffect, useState } from "react";

export enum StatePopup {
  success = "SUCCESS",
  error = "ERROR",
  warn = "WARNING",
}

export type ListPopUpState = {
  id?: string;
  message: string;
  type: StatePopup;
};

type Props = {
  message: ListPopUpState;
};

export const PopUp = memo(({ message }: Props) =>  {
  const [isHidePopUp, setIsHidePopUp] = useState(false);
  const [second, setSecond] = useState<number>(3000);
  const {t} = useContext(TranslateContext)
  const {hiddenPopup} = useContext(PopUpContext)

  useEffect(() => {
    let timeLine = 3000
    const timeOut = setInterval(() => {
      timeLine -= 100;
      if(timeLine === 100) {
        setSecond(timeLine);
      }
      if (timeLine <= 0) {
        console.log("delete", message.id)
        hiddenPopup(message.id ?? "")
        setIsHidePopUp(true);
      }
    }, 100);

    return () => {
      clearInterval(timeOut);
    };
  }, [message, hiddenPopup]);

  return !isHidePopUp ? (
    <div
      className={clsx(
        "w-[300px] h-[55px] bg-white max-w-auto mt-3 bg-white-color rounded-md shadow-lg popup-show",
        { "popup-hide": second === 100 }
      )}
    >
      <div
        className={clsx(
          "flex items-center p-[24px] h-full  border-solid border-[1px] rounded-md"
        )}
      >
        <span className="text-[20px]">
          {message.type === StatePopup.warn && <ICWarning />}
          {message.type === StatePopup.success && <ICSuccess />}
          {message.type === StatePopup.error && <ICError />}
        </span>
        <span className="text-px16 ml-2">{t(message.message)}</span>
      </div>
    </div>
  ) : (
    <></>
  );
})
