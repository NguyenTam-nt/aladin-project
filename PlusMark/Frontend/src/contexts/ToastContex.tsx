import React, { ReactNode, createContext, useState } from "react";

interface Props {
  children: ReactNode;
}
export interface ToastProps {
  idToast: number;
  type: string;
  message: string;
}

export const ToastContex = createContext<any>(null);
function ToastContexProvider({ children }: Props) {
  const [listToast, setListToast] = useState<ToastProps[]>([]);

  const onAddToast = (data: { type: string; message: string }) => {
    const id = new Date().getTime();
    const newToast = {
      idToast: id,
      type: data.type,
      message: data.message,
    };
    setListToast((prevState) => {
      return [...prevState, newToast];
    });
  };

  const onUnmountToast = (id: number) => {
    const newListToast = listToast.filter((toastItem) => {
      return toastItem.idToast !== id;
    });
    setListToast(newListToast);
  };
  const valueContext = { listToast, onAddToast, onUnmountToast };

  return (
    <ToastContex.Provider value={valueContext}>{children}</ToastContex.Provider>
  );
}

export default ToastContexProvider;
