import { langs } from "@constants/footer";
import { TranslateContext } from "@contexts/Translation";
import React, { useContext, useEffect, useState } from "react";
import { ButtonFooterChangeLang } from "./ButtonFooterChangeLang";
import { viewPageService } from "@services/viewpage";
import { useLocation } from "react-router-dom";

export const FooterOver = () => {
  const { t } = useContext(TranslateContext);
  const location = useLocation();
  const [countPage, setCountPage] = useState<number>(() => {
    try {
      return JSON.parse(localStorage.getItem("view-count") || "");
    } catch (error) {
      return 0;
    }
  });

  useEffect(() => {
    viewPageService.putView().then((view) => {
      setCountPage(view);
      localStorage.setItem("view-count", JSON.stringify(view));
    });
  }, [location.pathname]);
  return (
    <div className="py-[27px] xl:py-[50px]  bg-secondary  text-[14px]">
      <div className="w-rp flex flex-col-reverse m992:flex-row justify-between items-center">
        <span className="text-text_white text-center m992:text-left mt-[24px] m992:mt-0">
          {t("home.footer.access_count")}: {countPage}
        </span>
        <span className="text-text_white text-center m992:text-left mt-[24px] m992:mt-0">
        Copyright @2022 - Design by Aladin Technology Company
        </span>
        <div className="flex">
          {langs.map((item) => {
            return (
              <ButtonFooterChangeLang
                key={item.id}
                type={item.id}
                text={item.text}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
