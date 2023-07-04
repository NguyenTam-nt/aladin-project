import { ICArowDown } from "@assets/icons/ICArowDown";
import { Button } from "@components/Button";
import { Colors } from "@constants/color";
import { dataSortProduct } from "@constants/index";
import { useClickOutItem } from "@hooks/useClickOutItem";
import { useSearchParamHook } from "@hooks/useSearchParam";
import clsx from "clsx";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  onChangeSort: (sort: string) => void;
  sort?: string;
  nameP: string | undefined;
  nameC: string | undefined;
  handleClear: () => void;
};

export const MenuBofyFilterBySort = ({
  onChangeSort,
  sort,
  nameC,
  nameP,
  handleClear,
}: Props) => {
  const { t } = useTranslation();
  const { ref, isShow, handleToggleItem } = useClickOutItem();

  const handleSort = (sortAction: string) => {
    onChangeSort(sortAction);
  };

  return (
    <div className="flex justify-between gap-[24px] items-center">
      <h3
        onClick={handleClear}
        className="title-32 text-secondary w-fit cursor-pointer line-clamp-2"
      >
       {t("menu.list") + " "} 
        {nameC || nameP ? nameP + (nameC ? ` - ${nameC}` : "") : ` ${t("menu.footer")}` }
      </h3>
      <div className="flex items-center gap-x-[16px]">
        <span className="text-_14 w-max text-text_black">
          {t("common.sort_by")}:{" "}
        </span>
        <div ref={ref} className="w-[224px] relative z-[5]">
          <Button
            classNameParent="!w-full"
            onClick={handleToggleItem}
            withAnimation={false}
            image={
              <span>
                <ICArowDown color={Colors.primary} />
              </span>
            }
            text={dataSortProduct.find((i) => i.action === sort)?.name || ""}
            color="empty"
            className={clsx(
              "w-full justify-between bg-transparent h-[48px] border border-text_A1A0A3 px-[16px] text-_14 font-bold",
              {
                "rounded-br-none": isShow,
              }
            )}
          />
          <ul
            className={clsx(
              " absolute left-0 z-[1] top-[100%] bg-white  px-[16px] w-full text-_14 overflow-hidden h-0 ease-in duration-300",
              {
                "footer-animation-list": isShow,
                " rounded-br-[16px] border border-text_A1A0A3 border-t-0":
                  isShow,
              }
            )}
            style={{
              ["--footer-size" as string]: dataSortProduct.length,
              ["--height-li" as string]: "38px",
            }}
          >
            {!!dataSortProduct &&
              dataSortProduct.map((item, index) => {
                return (
                  <li
                    onClick={() => handleSort(item?.action || "")}
                    key={index}
                    className="h-[38px] items-center"
                  >
                    <button
                      // to={`${paths.news.prefix}?type=${item?.path}`}
                      className="h-full w-full flex items-center text-[14px] hover:text-primary duration-300"
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};
