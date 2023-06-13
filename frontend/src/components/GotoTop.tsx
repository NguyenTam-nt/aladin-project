import { ICGotoTop } from "@assets/icons/ICGotoTop";
import { windownSizeWidth, withResponsive } from "@constants/index";
import React, { useEffect, useRef } from "react";

export const GotoTop = () => {
  const refScroll = useRef<HTMLButtonElement>(null);
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {

      if (document.documentElement.scrollTop >= 120) {
        refScroll.current!.style.display = "flex"
      } else {
        refScroll.current!.style.display = "none"
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {
      });
    };
  }, []);
  return (
    <button
      ref={refScroll}
      onClick={handleScrollToTop}
      className="w-[40px] h-[40px] lg:w-[54px] fixed bottom-[210px] z-[10] right-0 hidden items-center justify-center lg:h-[54px] rounded-[8px_0_8px_0px] lg:rounded-[16px_0_16px_0] bg-text_A1A0A3"
    >
      <ICGotoTop width={windownSizeWidth > withResponsive._1024 ? 20 : 14} height={windownSizeWidth > withResponsive._1024 ? 20 : 14} />
    </button>
  );
};
