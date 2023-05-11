import React, { useRef, MouseEvent } from "react";

export const ImageTranslation = ({ link }: { link: string }) => {
  const refImage = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLImageElement>) => {
    const { pageX, pageY } = e;
    const { offsetLeft, offsetTop } = e.currentTarget;
    const offsetX = pageX - offsetLeft;
    const offsetY = pageY - offsetTop;
    refImage.current!.style.transition = "all 0.25s ease"
    refImage.current!.style.transformOrigin = `${offsetX}px ${offsetY}px`;
  };

  const handleMouseOut = (e: MouseEvent<HTMLImageElement>) => {

    refImage.current!.style.transition = "all 0.25s cubic-bezier(0.77, 0, 0.175, 1)"
  };

  return (
    <img
      ref={refImage}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseOut}
      className="w-full  object-cover h-full image_hover"
      src={link}
      alt=""
    />
  );
};
