import { ToastProps, ToastContex } from "@contexts/ToastContex";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";

interface ToastItemProps {
  data: ToastProps;
}
function ToastItem({ data }: ToastItemProps) {
  const { onUnmountToast } = useContext(ToastContex);
  const [isHidePopUp, setIsHidePopUp] = useState(false);
  const [second, setSecond] = useState<number>(3000);

  useEffect(() => {
    const timeOut = setInterval(() => {
      const time = second - 100;
      setSecond(time);
      if (time === 0) {
        onUnmountToast(data.idToast);
        setIsHidePopUp(true);
      }
    }, 100);

    return () => {
      clearInterval(timeOut);
    };
  }, [second]);
  return !isHidePopUp ? (
    <div
      key={data.idToast}
      className={clsx("toast-animate rounded-md pt-[13px] pb-[15px] mr-4 px-2 text-center  mb-1", {
        "bg-[#E9FFEA]": data.type == 'success',
        "bg-[#ff8b8b]": data.type == 'error',
        "bg-[#ffe062]": data.type == 'warn',
      })}
    >
      {data.message}
    </div>
  ) : null;
}

export default ToastItem;
