import { createContext, ReactNode, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const ModalContext = createContext<any>(null);

type Props = {
  children?: ReactNode;
};

const ModalProvider: React.FC<Props> = ({ children }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<JSX.Element>(<></>);
  const { pathname } = useLocation();
  const navigate = useNavigate()

  let backdropRef = useRef();
  const closeModal = () => {

    setContentModal(<></>);
    setShowModal(false);
    if(pathname.includes('/cart/payment') ) {
      navigate("/")
    }
  };

  const valueContext = {
    showModal,
    setShowModal,
    contentModal,
    setContentModal,
    closeModal,
    backdropRef,
  };
  return (
    <ModalContext.Provider value={valueContext}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
