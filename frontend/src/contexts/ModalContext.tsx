import { prefixRootRoute } from "@constants/index";
import clsx from "clsx";
import {
  useLayoutEffect,
  useState,
  createContext,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";

interface ModalState {
  isShow: boolean;
  setElementModal: (elm: JSX.Element) => void;
  hideModal: () => void;
}

export const ModalContext = createContext<ModalState>({
  isShow: false,
  setElementModal(_) {},
  hideModal() {},
});

type Props = {
  children: ReactNode;
};

export default function ModalProvider({ children }: Props) {
  const [isShow, setShowModal] = useState(false);
  const [element, setElement] = useState<JSX.Element>(<></>);
  const { pathname } = useLocation();
  //   const {} = useRoutes
  const setElementModal = (elm: JSX.Element) => {
    setElement(elm);
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    window.addEventListener("popstate", function () {
      if (isShow) {
        hideModal();
      }
    });

    return () => {
      window.removeEventListener("popstate", () => {});
    };
  }, [isShow]);

  useLayoutEffect(() => {
    // if(isShow) {
    // }else {
    // document.body
    // }
    // isShow
    //   ? (document.body.style.overflowY = "hidden")
    //   : (document.body.style.overflowY = "auto");
  }, [isShow]);

  const isAdmin = useMemo(() => {
    return pathname.includes(prefixRootRoute.admin);
  }, [pathname]);

  return (
    <ModalContext.Provider
      value={{
        isShow,
        setElementModal,
        hideModal,
      }}
    >
      <>
        {isShow ? (
          <div
            className={clsx(
              "fixed z-30 inset-0 w-full h-[100vh] overflow-x-hidden  overflow-y-auto flex justify-center overscroll-y-auto"
            )}
          >
            <div
              className={clsx("fixed inset-0 bg-header_bg z-30", {
                " backdrop-blur-[4px]": !isAdmin,
              })}
              onClick={hideModal}
            ></div>
            <div
              className={clsx(
                "relative z-[31] overflow-hidden mt-auto w-auto h-auto mb-auto  scale-animate",
                { "rounded-[32px_0_32px_0]": !isAdmin }
              )}
            >
              {element}
            </div>
          </div>
        ) : (
          <></>
        )}
        {children}
      </>
    </ModalContext.Provider>
  );
}
