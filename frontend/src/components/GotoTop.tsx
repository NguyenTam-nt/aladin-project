import { ICGotoTop } from "@assets/icons/ICGotoTop";
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
      className="w-[54px] fixed bottom-[210px] z-[10] right-0 hidden items-center justify-center h-[54px] rounded-[16px_0_16px_0] bg-text_A1A0A3"
    >
      <ICGotoTop />
    </button>
  );
};
