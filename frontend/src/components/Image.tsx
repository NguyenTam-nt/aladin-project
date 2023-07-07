import useInView from "@hooks/useInView";
import React, { ImgHTMLAttributes, memo, useEffect, useRef } from "react";

export const Image = memo(({ ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
  const { ref, isInView } = useInView<HTMLImageElement>();
  useEffect(() => {
    if (isInView && ref.current) {
      ref.current.src = ref.current.alt;
    }
  }, [isInView]);
  return <img ref={ref} {...props} />;
})
