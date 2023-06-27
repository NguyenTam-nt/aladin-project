import { ICAdd } from "@assets/icons/ICAdd";
import { ICArowDown } from "@assets/icons/ICArowDown";
import { ICFilter } from "@assets/icons/ICFilter";
import { Colors } from "@constants/color";
import { prefixRootRoute } from "@constants/index";
import { pathsAdmin } from "@constants/routerManager";
import { useGetCategory } from "@features/dashboard/category-product/useGetCategory";
import { Button } from "@features/dashboard/components/Button";
import { TitleTopic } from "@features/dashboard/home/components/TitleTopic";
import { useClickOutItem } from "@hooks/useClickOutItem";
import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParamHook } from "@hooks/useSearchParam";
import { useCategoryFilter } from "./useCategoryFilter";

type Props = {
  onChange: (id: number) => void;
};

export const Header = memo(({ onChange }: Props) => {
  const {
    indexChild,
    indexParent,
    handleChangeCategoryParent,
    handleSelectCategorySub,
    categories,
    fechData,
  } = useCategoryFilter({ onChange });

  const { ref, isShow, handleToggleItem, handleShow } = useClickOutItem();
  const childRef = useClickOutItem();
  const navigation = useNavigate();
  const handleNavigate = () => {
    navigation(
      `${prefixRootRoute.admin}/${pathsAdmin.product.prefix}/${pathsAdmin.product.add}`
    );
  };
  return (
    <div className="flex items-baseline justify-between">
      <TitleTopic name="adminProduct.title" isRequired={false} />

      <div className="flex items-center flex-1 justify-end gap-x-[24px]">
        <div ref={childRef.ref} className="relative z-[3]">
          <div ref={ref} className="relative">
            <Button
              onClick={handleToggleItem}
              className="max-w-[301px]"
              text="adminProduct.filter"
              imageLeft={
                <span className="mr-[12px]">
                  <ICFilter />
                </span>
              }
              image={
                <span className="ml-[22px]">
                  <ICArowDown color={Colors.TrueBlue500} />
                </span>
              }
              color={"empty"}
            />
            <ul
              className={clsx(
                " absolute left-0 z-[1] top-[100%] bg-white  overflow-y-auto list-facilities w-full text-_14 overflow-hidden h-0 ease-in duration-300",
                {
                  "footer-animation-list": isShow,
                  " border max-h-[250px] border-text_A1A0A3 border-t-0": isShow,
                }
              )}
              style={{
                ["--footer-size" as string]: categories.length,
                ["--height-li" as string]: "38px",
              }}
              id="category-filter"
            >
              <InfiniteScroll
                hasMore
                loader={<></>}
                next={fechData}
                dataLength={categories.length}
                scrollableTarget="category-filter"
              >
                {!!categories &&
                  categories.map((item, index: number) => {
                    const active = index === indexParent;
                    return (
                      <li
                        id={`category-${index}`}
                        key={item.id}
                        onClick={() => {
                          childRef.handleShow();
                          handleChangeCategoryParent(Number(item.id));
                        }}
                        className={clsx(
                          "h-[38px] relative list-category-item hover:bg-slate-200 px-[16px] flex justify-between items-center",
                          { "bg-slate-200": active }
                        )}
                      >
                        <button
                          className={clsx(
                            "h-full w-full font-semibold flex items-center text-_16 hover:text-TrueBlue_500 duration-300",
                            {
                              " hover:text-black": active,
                            }
                          )}
                        >
                          {item.name}
                        </button>
                        {item.listCategoryChild?.length ? (
                          <span className=" rotate-[-90deg]">
                            <ICArowDown color={Colors.text_black} />
                          </span>
                        ) : null}
                      </li>
                    );
                  })}
              </InfiniteScroll>
            </ul>
          </div>
          {!!categories &&
          indexParent !== -1 &&
          categories[indexParent]?.listCategoryChild?.length ? (
            <ul
              className={clsx(
                " absolute left-[100%] z-[1] top-[100%] bg-white  overflow-y-auto list-facilities  w-0 text-_14 overflow-hidden h-0 ease-in duration-300",
                {
                  "footer-animation-list": isShow,
                  " border max-h-[250px] w-[301px] border-text_A1A0A3":
                    childRef.isShow && isShow,
                }
              )}
              style={{
                ["--footer-size" as string]:
                  categories[indexParent]?.listCategoryChild?.length,
                ["--height-li" as string]: "38px",
              }}
            >
              {categories[indexParent]?.listCategoryChild?.map(
                (item, index: number) => {
                  const active = index === indexChild;
                  return (
                    <li
                      onClick={() => {
                        handleShow();
                        childRef.handleShow();
                        handleSelectCategorySub(
                          index,
                          Number(categories[indexParent].id)
                        );
                      }}
                      key={item.id}
                      className={clsx(
                        "h-[38px] relative list-category-item px-[16px] hover:bg-slate-200 flex justify-between items-center",
                        { "bg-bg_rgba_103_203_248_1": active }
                      )}
                      id={`category-child-${index}`}
                    >
                      <button
                        className={clsx(
                          "h-full w-full font-semibold flex items-center text-_16 hover:text-TrueBlue_500 duration-300",
                          {
                            " hover:text-black": active,
                          }
                        )}
                      >
                        {item.name}
                      </button>
                    </li>
                  );
                }
              )}
            </ul>
          ) : null}
        </div>

        <Button
          onClick={handleNavigate}
          className="max-w-[177px]"
          text="adminProduct.add"
          imageLeft={
            <span className="mr-2">
              <ICAdd />
            </span>
          }
          color={"empty"}
        />
      </div>
    </div>
  );
});
