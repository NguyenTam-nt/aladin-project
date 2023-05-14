import { withResponsive } from "@constants/container";
import useWindowResize from "@hooks/useWindowResize";
import { useRef, MouseEvent, useMemo } from "react";

export const useBannerHome = (length:number) => {
    const refImage = useRef<HTMLDivElement>(null);
    const refImageDev = useRef<HTMLDivElement>(null);
    const refImageLink = useRef<HTMLImageElement>(null);
    const {width} = useWindowResize()
    const item = useMemo(() => {
      return width >= withResponsive._1024 ? length : width >= withResponsive._640 ? 3 : 2
    }, [length, width])
  
    const handleMouseIn = (event: MouseEvent<HTMLDivElement>) => {
      refImageDev.current!.style.display = "block"
      const { pageX } = event;
      const { left:offsetLeft } = event.currentTarget.getBoundingClientRect();
      const offset = pageX - offsetLeft;
      if (offset > width / item / 2) {
        refImageLink.current!.style.right = "0"
        refImage.current!.style.flexDirection = "row-reverse";
        // refImageLink.current!.style.right = `${width / 5}px`
      } else {
        refImageLink.current!.style.right = "unset"
        refImage.current!.style.flexDirection = "row";
      }
  
      refImageDev.current!.style.width = "100%";
    };
  
    const handleMouseOut = (event: MouseEvent<HTMLDivElement>) => {
      const { pageX } = event;
      const { left:offsetLeft } = event.currentTarget.getBoundingClientRect();
      const offset = pageX - offsetLeft;
  
      if (offset > width / item / 2) {
        refImageLink.current!.style.right = "0"
        refImage.current!.style.flexDirection = "row-reverse";
      } else {
        refImageLink.current!.style.right = "unset"
        refImage.current!.style.flexDirection = "row";
      }
  
      refImageDev.current!.style.width = "0px";
      // refImageLink.current!.style.right = "0"
    };

    const withRe = useMemo(() => {
      return width >= withResponsive._1024 ? width / length : width >= withResponsive._640 ? width / 3 : width/2
    }, [width, length])
  
    return {
        refImage,
        refImageDev,
        refImageLink,
        handleMouseIn,
        handleMouseOut,
        withRe,
        width
    }
}