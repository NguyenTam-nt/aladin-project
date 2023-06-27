import { ICArowDown } from "@assets/icons/ICArowDown";
import { Colors } from "@constants/color";
import type { ICategory } from "@typeRules/category";
import clsx from "clsx";
import React, { useState } from "react";

type Props = {
  data: ICategory;
  onChangeParent: (id: number) => void;
  onChangeChild: (id: number, idParent: number) => void;
  indexChild: number;
  isActive: boolean;
};

export const MenuBodyFilterItem = ({
  data,
  onChangeChild,
  onChangeParent,
  indexChild,
  isActive,
}: Props) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="text-GreyPrimary">
      <div className="flex cursor-pointer justify-between  py-[16px] border-b border-br_CBCBCB">
        <button
          onClick={() => {
            setIsShow(!isShow);
            onChangeParent(Number(data.id));
          }}
          className={clsx(
            "text-_14 flex-1 flex justify-start  lg:text-_16 font-semibold",
            {
              " text-primary": isActive,
            }
          )}
        >
          {data?.name}
        </button>
        {data?.listCategoryChild?.length ? (
          <button
            onClick={() => {
              setIsShow(!isShow);
            }}
            className={clsx(
              "w-[30px] flex items-center justify-center rounded-md hover:shadow-sm h-[30px]"
            )}
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
      {data?.listCategoryChild?.length ? (
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
          {data?.listCategoryChild?.length
            ? data?.listCategoryChild.map((item, index) => {
                const active = index === indexChild;
                return (
                  <li
                    key={index}
                    onClick={() => onChangeChild(index, Number(data.id))}
                    className="h-[32px] items-center"
                  >
                    <button
                      className={clsx(
                        "h-[24px] flex items-center text-[14px] hover:text-primary duration-300",
                        {
                          "text-primary": active,
                        }
                      )}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })
            : null}
        </ul>
      ) : null}
    </div>
  );
};
