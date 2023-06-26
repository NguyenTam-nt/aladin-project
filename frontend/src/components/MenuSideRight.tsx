import React, { useEffect, useMemo, useRef } from "react";
import { MenusRight } from "./MenusRight";
import { ContactSilde } from "./contactSilde";
import { prefixRootRoute, windownSizeHeight } from "@constants/index";
import clsx from "clsx";
import { useLocation } from "react-router-dom";

export const MenuSideRight = () => {
  const refScroll = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isAdmin = useMemo(() => {
    return pathname.includes(prefixRootRoute.admin);
  }, [pathname]);
  useEffect(() => {
    window.addEventListener("scroll", () => {
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
    });

    if (pathname !== prefixRootRoute.public) {
      refScroll.current!.style.opacity = "1";
    } else if (document.documentElement.scrollTop < windownSizeHeight) {
      refScroll.current!.style.opacity = "0";
    }

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, [pathname]);

  return (
    <div
      ref={refScroll}
      className={clsx(
        "fixed bottom-[calc(7%_+_56px)] opacity-0 duration-300 ease-linear 3xl:bottom-[calc(10%_+_78px)] [&>button]:rounded-[8px_0_8px_0]  2xl:[&>button]:rounded-[16px_0_16px_0] [&>button]:w-[40px] [&>button]:h-[40px] 2xl:[&>button]:w-[54px] 2xl:[&>button]:h-[54px] z-[11] gap-y-[16px] 2xl:gap-y-[24px] group-contact right-0 flex flex-col",
        {
          " opacity-0 hidden": isAdmin,
        }
      )}
    >
      <MenusRight />
      <ContactSilde />
    </div>
  );
};
