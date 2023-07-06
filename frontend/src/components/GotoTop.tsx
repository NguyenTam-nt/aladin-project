import { ICGotoTop } from "@assets/icons/ICGotoTop";
import { windownSizeHeight, windownSizeWidth, withResponsive } from "@constants/index";
import React, { useEffect, useRef } from "react";

export const GotoTop = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const refScroll = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(refScroll.current) {
        if (document.documentElement.scrollTop >= windownSizeHeight) {
          refScroll.current!.style.display = "flex"
        } else {
          refScroll.current!.style.display = "none"
        }
      }
    }, {passive: true});

    return () => {
      window.removeEventListener("scroll", () => {
      });
    };
  }, []);
  return (
    <div
      ref={refScroll}
      onClick={handleScrollToTop}
      className="w-[40px] cursor-pointer h-[40px] 2xl:w-[54px] z-[10] right-0 hidden items-center justify-center 2xl:h-[54px] rounded-[8px_0_8px_0px] 2xl:rounded-[16px_0_16px_0] bg-text_A1A0A3"
    >
      <ICGotoTop width={windownSizeWidth > withResponsive._1024 ? 20 : 14} height={windownSizeWidth > withResponsive._1024 ? 20 : 14} />
    </div>
  );
};
