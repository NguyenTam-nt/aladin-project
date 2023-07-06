import React, { useEffect, useMemo, useRef } from "react";
import { MenusRight } from "./MenusRight";
import { ContactSilde } from "./contactSilde";
import {
  prefixRootRoute,
  windownSizeHeight,
} from "@constants/index";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { useScreenOrientation } from "@hooks/useScreenOrientation";

export const MenuSideRight = () => {
  const refScroll = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isAdmin = useMemo(() => {
    return pathname.includes(prefixRootRoute.admin);
  }, [pathname]);

  const handleScroll = () => {
    if (refScroll.current) {
      if (window.location.pathname === prefixRootRoute.public) {
        if (document.documentElement.scrollTop >= windownSizeHeight) {
          refScroll.current!.style.opacity = "1";
        } else {
          refScroll.current!.style.opacity = "0";
        }
      } else {
        refScroll.current!.style.opacity = "1";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (pathname !== prefixRootRoute.public) {
      refScroll.current!.style.opacity = "1";
    } else if (document.documentElement.scrollTop < windownSizeHeight) {
      refScroll.current!.style.opacity = "0";
    }
  }, [pathname]);

  const { isFullScreen } = useScreenOrientation();

  return (
    <div
      ref={refScroll}
      className={clsx(" opacity-0 duration-300 ease-linear ")}
    >
      <div
        className={clsx(
          "[&>button]:rounded-[8px_0_8px_0] fixed bottom-[calc(7%_+_56px)] 3xl:bottom-[calc(10%_+_78px)]  z-[11]  group-contact right-0   2xl:[&>button]:rounded-[16px_0_16px_0] [&>button]:w-[40px] gap-y-[16px] 2xl:gap-y-[24px] flex flex-col justify-end [&>button]:h-[40px] 2xl:[&>button]:w-[54px] 2xl:[&>button]:h-[54px]",
          {
            "opacity-0 z-[-2]": isAdmin,
            "!bottom-[16px] gap-y-[12px]": isFullScreen,
          }
        )}
      >
        <MenusRight />
        <ContactSilde />
      </div>
    </div>
  );
};
