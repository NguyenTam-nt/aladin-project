import React, { useMemo } from "react";

export const useSwiperNavigationRef = () => {
  const navigationPrevRef = React.useRef<HTMLDivElement>(null);
  const navigationNextRef = React.useRef<HTMLDivElement>(null);

  const handleNext = () => {
    navigationNextRef.current?.click();
  };

  const handlePre = () => {
    navigationPrevRef.current?.click();
  };

  const NavigationElement = useMemo(() => {
    return (
      <>
        <div className="hidden" ref={navigationPrevRef} />
        <div className="hidden" ref={navigationNextRef} />
      </>
    );
  }, []);

  return {
    navigationPrevRef,
    navigationNextRef,
    handleNext,
    handlePre,
    NavigationElement
  };
};
