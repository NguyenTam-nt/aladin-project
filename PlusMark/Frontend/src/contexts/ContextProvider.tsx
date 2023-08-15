import ToastItem from "commons/components/ToastItem";
import AuthProvider from "./AuthContext";
import { CartProvider } from "./CartContext";
import ToastContexProvider, { ToastContex, ToastProps } from "./ToastContex";
import ModalProvider, { ModalContext } from "./contextModal";

interface Props {
  children: JSX.Element;
}

const 
ContextProvider = (props: Props) => {
  const { children } = props;
  return (
    <AuthProvider>
      <ModalProvider>
        <ToastContexProvider>
          <CartProvider>
            <ModalContext.Consumer>
              {({ contentModal, showModal, backdropRef, closeModal }) => {
                return (
                  <ToastContex.Consumer>
                    {({ listToast, onAddToast, onUnmountToast }) => {
                      return (
                        <div className="h-auto min-h-full">
                          <div className="relative w-full h-full">
                            {/* backdrop */}
                            <div
                              className="h-screen w-screen fixed top-0 left-0 z-[888] bg-[rgba(0,0,0,0.3)] flex-col items-center justify-center"
                              style={{ display: showModal ? "flex" : "none" }}
                              ref={backdropRef}
                              onClick={(e) => {
                                const div = e.target as HTMLDivElement;
                                if (backdropRef.current) {
                                  if (backdropRef.current === div) {
                                    closeModal();
                                  }
                                }
                              }}
                            >
                              {/* <div className="max-h-[80vh] overflow-y-auto"> */}
                              {contentModal}
                              {/* </div> */}
                            </div>
                            {/* <ToastContex.Consumer>
                        {
                          ()=> {
                            return(
                              <div>

                              </div>
                            )
                          }
                        }
                    </ToastContex.Consumer> */}

                            {listToast.length > 0 && (
                              <div className="w-[300px] max-h-[550px] fixed right-0 top-[100px] z-max overflow-y-scroll hiddenScroll">
                                {listToast.map((item: ToastProps) => {
                                  return (
                                    <ToastItem key={item.idToast} data={item} />
                                  );
                                })}
                              </div>
                            )}
                            {/* </div> */}
                            {children}
                          </div>
                        </div>
                      );
                    }}
                  </ToastContex.Consumer>
                );
              }}
            </ModalContext.Consumer>
          </CartProvider>
        </ToastContexProvider>
      </ModalProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
