import { ListPopUpState, StatePopup } from "@components/PopUp";
import {PopUp} from "@components/PopUp";
import React, { ReactNode, createContext, useState } from "react";

interface PopupState {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWaring: (message: string) => void;
  hiddenPopup: (id: string) => void
}

export const PopUpContext = createContext<PopupState>({
  showSuccess: (_: string) => {},
  showError: (_: string) => {},
  showWaring: (_: string) => {},
  hiddenPopup: (_: string) => {}
});

type Props = {
  children: ReactNode;
};

export const PopupProvider = ({ children }: Props) => {
  const [listPoup, setListPoup] = useState<ListPopUpState[]>([]);

  const addMessage = (data: ListPopUpState) => {
    const newList = [...listPoup];
    if (newList.length >= 1) {
      newList.shift();
    }
    setListPoup([...newList, data]);
  };

  const showSuccess = (message: string) => {
    const id = `${Date.now()}-${message}`;
    const newListPopUp = {
      id,
      message,
      type: StatePopup.success,
    };
    addMessage(newListPopUp);
  };

  const showError = (message: string) => {
    const id = `${Date.now()}-${message}`;

    const newListPopUp = {
      id,
      message,
      type: StatePopup.error,
    };
    addMessage(newListPopUp);
  };

  const showWaring = (message: string) => {
    const id = `${Date.now()}-${message}`;
    const newListPopUp = {
      id,
      message,
      type: StatePopup.warn,
    };
    addMessage(newListPopUp);
  };

  const hiddenPopup = (id: string) => {
    const newList = [...listPoup];
    const newList1 = newList.filter(item => item.id !== id)
    setListPoup(newList1);
  };

  return (
    <PopUpContext.Provider
      value={{
        showError,
        showSuccess,
        showWaring,
        hiddenPopup
      }}
    >
      <>
        <div className="fixed z-[99999] top-[40px] left-[50%] flex flex-col justify-end translate-x-[-50%]">
          {listPoup.map((item) => {
            return (
              <PopUp key={item.id} message={item} />
            );
          })}
        </div>
        {children}
      </>
    </PopUpContext.Provider>
  );
};
