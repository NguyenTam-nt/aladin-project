import React, { useRef, MouseEvent } from "react";

export const ImageTranslation = ({ link }: { link: string }) => {
  const refImage = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLImageElement>) => {
    const { pageX, pageY } = e;
    const { offsetLeft, offsetTop } = e.currentTarget;
    const offsetX = pageX - offsetLeft;
    const offsetY = pageY - offsetTop;
    refImage.current!.style.transformOrigin = `${offsetX}px ${offsetY}px`;
  };
  return (
    <img
      ref={refImage}
      onMouseMove={handleMouseMove}
      className="w-full  object-cover h-full image_hover"
      src={link}
      alt=""
    />
  );
};
