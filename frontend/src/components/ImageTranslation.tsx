import React, { useRef, MouseEvent } from "react";

export const ImageTranslation = ({ link }: { link: string }) => {
  const refImage = useRef<HTMLImageElement>(null);
  const refOffsetTop = useRef<number>(0)
  const refOffsetLeft = useRef<number>(0)

  const handleMouseEnter = (e: MouseEvent<HTMLImageElement>) => {
    const {top, left} = e.currentTarget.getBoundingClientRect();
    refOffsetTop.current =  top + window.scrollY
    refOffsetLeft.current = left
  }

  const handleMouseMove = (e: MouseEvent<HTMLImageElement>) => {
    const { pageX, pageY } = e;
    const offsetX = pageX - refOffsetLeft.current;
    const offsetY = pageY - refOffsetTop.current ;
    
    refImage.current!.style.transition = "all 0.25s ease"
    refImage.current!.style.transformOrigin = `${offsetX}px ${offsetY}px`;
  };

  const handleMouseOut = (e: MouseEvent<HTMLImageElement>) => {

    refImage.current!.style.transition = "all 0.25s cubic-bezier(0.77, 0, 0.175, 1)"
  };

  return (
    <img
      ref={refImage}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseOut}
      className="w-full  object-cover h-full image_hover"
      src={link}
      alt=""
    />
  );
};
