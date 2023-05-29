import { prefixRootRoute } from "@configs/index";
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
  const params = useLocation()
//   const {} = useRoutes
  const setElementModal = (elm: JSX.Element) => {
    setElement(elm);
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    window.addEventListener("popstate", function (event) {
        console.log({event})
        if(isShow) {
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
    return params.pathname.includes(prefixRootRoute.admin)
  }, [params.pathname])

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
          <div className={clsx("fixed z-30 inset-0 w-full h-[100vh] overflow-x-hidden  overflow-y-auto flex justify-center overscroll-y-auto", {"mt-[96px]": isAdmin})}>
            <div
              className="fixed inset-0 bg-bg_0_0_0_003 z-30"
              onClick={hideModal}
            ></div>
            <div className="relative z-[31] mt-auto w-auto h-auto mb-auto  scale-animate">
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
