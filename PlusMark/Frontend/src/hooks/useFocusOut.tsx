import { useState, useEffect, useRef } from "react";

const useFocusOut = (intialState: boolean = false) => {
  const [clickShow, setClickShow] = useState<boolean>(intialState);
  const [hoverShow, setHoverShow] = useState<boolean>(intialState);
  const ref = useRef<any>(null);

  const handleClickInside = (callback?: () => void) => {
    if (callback) {
      callback();
    }
    setClickShow(false);
    setHoverShow(false);
  };

  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) setClickShow(false);
  };

  const handleHover = (e: any) => {
    if (ref.current && ref.current.contains(e.target)) {
      setHoverShow(true);
    } else setHoverShow(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    document.addEventListener("mouseover", handleHover);
    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("mouseover", handleHover);
    };
  }, [ref]);

  return {
    clickShow,
    setClickShow,
    handleClickInside,
    hoverShow,
    setHoverShow,
    ref,
  };
};

export default useFocusOut;
