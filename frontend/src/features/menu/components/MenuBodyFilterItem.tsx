import { ICArowDown } from "@assets/icons/ICArowDown";
import { Colors } from "@constants/color";
import clsx from "clsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const MenuBodyFilterItem = ({ data }: { data: any }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="text-GreyPrimary">
      <div className="flex justify-between  py-[16px] border-b border-br_CBCBCB">
        <h4 className="text-_14  lg:text-_16 font-semibold">{data.title}</h4>
        {!!data?.listItem ? (
          <button
            className={clsx(
              "w-[30px] flex items-center justify-center rounded-md hover:shadow-sm h-[30px]"
            )}
            onClick={() => {
              setIsShow(!isShow);
            }}
          >
            <span
              className={clsx(" duration-300 ease-in", {
                "rotate-[180deg] ": isShow,
              })}
            >
              <ICArowDown color={Colors.text_black} />
            </span>
          </button>
        ) : null}
      </div>
      <ul
        className={clsx(
          "mt-[16px]  text-_14 pl-[24px] overflow-hidden h-0 ease-in duration-300",
          {
            "footer-animation-list": isShow,
          }
        )}
        style={{
          ["--footer-size" as string]: 3,
          ["--height-li" as string]: "32px",
        }}
      >
        {!!data?.listItem &&
          data?.listItem.map((item: any, index: number) => {
            return (
              <li key={index} className="h-[32px] items-center">
                <Link
                  // to={`${paths.news.prefix}?type=${item?.path}`}
                  to="#"
                  className="h-[24px] flex items-center text-[14px] hover:text-primary duration-300"
                >
                  {item}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
