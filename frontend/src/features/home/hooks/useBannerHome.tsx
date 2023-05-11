import { width } from "@constants/container";
import { useRef, MouseEvent } from "react";

export const useBannerHome = (length:number) => {
    const refImage = useRef<HTMLDivElement>(null);
    const refImageDev = useRef<HTMLDivElement>(null);
    const refImageLink = useRef<HTMLImageElement>(null);
  
  
    const handleMouseIn = (event: MouseEvent<HTMLDivElement>) => {
      refImageDev.current!.style.display = "block"
      const { pageX } = event;
      const { offsetLeft } = event.currentTarget;
      const offset = pageX - offsetLeft;
      console.log({ offset });
      if (offset > width / length / 2) {
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
      const { offsetLeft } = event.currentTarget;
      const offset = pageX - offsetLeft;
  
      if (offset > width / length / 2) {
        refImageLink.current!.style.right = "0"
        refImage.current!.style.flexDirection = "row-reverse";
      } else {
        refImageLink.current!.style.right = "unset"
        refImage.current!.style.flexDirection = "row";
      }
  
      refImageDev.current!.style.width = "0px";
      // refImageLink.current!.style.right = "0"
    };
  
    return {
        refImage,
        refImageDev,
        refImageLink,
        handleMouseIn,
        handleMouseOut
    }
}