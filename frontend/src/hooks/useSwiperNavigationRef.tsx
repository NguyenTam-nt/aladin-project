import React, { useMemo, useState } from "react";
import type { Swiper } from "swiper/types";

export const useSwiperNavigationRef = () => {
  const navigationPrevRef = React.useRef<HTMLDivElement>(null);
  const navigationNextRef = React.useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    navigationNextRef.current?.click();
  };

  const handlePre = () => {
    navigationPrevRef.current?.click();
  };

  const onActiveIndexChange = (swiper: Swiper) => {
    setCurrentIndex(swiper.realIndex);
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
    NavigationElement,
    currentIndex,
    onActiveIndexChange
  };
};
