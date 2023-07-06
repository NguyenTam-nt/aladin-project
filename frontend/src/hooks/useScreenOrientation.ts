import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";

const getOrientation = () =>
  isMobile ? window.innerHeight < window.innerWidth : false;
export const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState(getOrientation());

  const updateOrientation = () => {
    if (isMobile) {
      setOrientation((l) => !l);
    }
  };

  useEffect(() => {
    window.addEventListener("orientationchange", updateOrientation);
    return () => {
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  return { isFullScreen: orientation };
};
