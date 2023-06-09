import { ICArowDown } from "@assets/icons/ICArowDown";
import { Button } from "@components/Button";
import { Colors } from "@constants/color";
import { useClickOutItem } from "@hooks/useClickOutItem";
import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";

const dataFilter = [
  "Mới nhất",
  "Cũ nhất",
  "Từ cao đến thấp",
  "Từ thấp đến cao",
];

export const MenuBofyFilterBySort = () => {
  const { t } = useTranslation();
  const { ref, isShow, handleToggleItem } = useClickOutItem();

  return (
    <div className="flex justify-between items-center">
      <h3 className="title-32 text-secondary">Danh sách Lẩu</h3>
      <div className="flex items-center gap-x-[16px]">
        <span className="text-_14 text-text_black">
          {t("common.sort_by")}:{" "}
        </span>
        <div   ref={ref} className="w-[224px] relative">
          <Button
            onClick={handleToggleItem}
            image={
              <span>
                <ICArowDown color={Colors.primary} />
              </span>
            }
            text="Mới nhất"
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
              ["--footer-size" as string]: dataFilter.length,
              ["--height-li" as string]: "38px",
            }}
          >
            {!!dataFilter &&
              dataFilter.map((item: any, index: number) => {
                return (
                  <li key={index} className="h-[38px] items-center">
                    <button
                      // to={`${paths.news.prefix}?type=${item?.path}`}
                      className="h-full w-full flex items-center text-[14px] hover:text-primary duration-300"
                    >
                      {item}
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
