import { useState, useEffect, useRef, useCallback } from "react";

export function useClickOutItem(intialState = false) {
  const [isShow, setShow] = useState(intialState);
  const ref = useRef<any>(null);

  const handleShowItem = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) setShow(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleShowItem, true);

    return () => {
      document.removeEventListener("click", handleShowItem, true);
    };
  }, [ref]);

  const handleToggleItem = () => {
    setShow(!isShow);
  }

  const handleShow = () => {
    setShow(true);
  };

  const handleHiden = () => {
    setShow(false);
  };

  return { isShow, handleHiden, handleShow, ref, handleToggleItem, setShow };
}
