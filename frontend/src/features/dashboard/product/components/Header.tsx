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
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  onChange: (id: number) => void;
  idCategory?: number;
};

export const Header = memo(({ onChange, idCategory }: Props) => {
  const { t } = useTranslation();
  const [indexParent, setIndexParent] = useState(-1);
  const [indexChild, setIndexChild] = useState(-1);
  const params = useLocation();
  // const newQueryParameters: URLSearchParams =  new URLSearchParams(params.search);
  const [searchParams, setSearchParam] = useSearchParams(params.search);

  const { categories, fechData } = useGetCategory();
  const { ref, isShow, handleToggleItem, handleShow } = useClickOutItem();
  const childRef = useClickOutItem();
  const navigation = useNavigate();

  useEffect(() => {
    if (categories.length) {
      const categoryChild = searchParams.get("categoryChild");
      const categoryParent = searchParams.get("categoryParent");
      if (categoryChild || categoryParent) {
        let indexP = -1;
        if (categoryParent) {
          if (typeof Number(categoryParent) === "number") {
            indexP = categories.findIndex(
              (i) => i.id === Number(categoryParent)
            );
            const id = document.getElementById(`category-${indexP}`);
            if (id) {
              id.scrollIntoView({
                behavior: "smooth",
              });
            }
            setIndexParent(indexP);
          }
        }

        if (categoryChild) {
          if (typeof Number(categoryChild) === "number") {
            if (indexP !== -1) {
              const indexC =
                categories[indexP].listCategoryChild?.findIndex(
                  (i) => i.id === Number(categoryChild)
                ) || -1;

              const idChild = document.getElementById(
                `category-child-${indexC}`
              );
              if (idChild) {
                idChild.scrollIntoView({
                  behavior: "smooth",
                });
              }

              setIndexChild(indexC);
            }
          }
        }
      }
    }
  }, [searchParams, categories]);

  const handleChangeCategoryParent = (id: number) => {
    const index = categories.findIndex((i) => i.id === id);
    if (indexParent !== index) {
      setIndexParent(index);
      setIndexChild(-1);
      onChange(id);
      if (searchParams.has("page")) {
        searchParams.set("page", searchParams.get("page") + "");
      }
      searchParams.set("categoryParent", id + "");
      searchParams.sort();
      setSearchParam(searchParams);
    }
  };

  const handleSelectCategorySub = (index: number) => {
    setIndexChild(index);
    const id = categories?.[indexParent]?.listCategoryChild?.[index]?.id;
    onChange(Number(id));
    // newQueryParameters.set("categoryParent", categories?.[indexParent].id + "");
    if (searchParams.has("categoryChild")) {
      searchParams.delete("categoryChild");
    }
    searchParams.append("categoryChild", id + "");
    searchParams.sort();

    setSearchParam(searchParams);
  };

  const handleNavigate = () => {
    navigation(
      `${prefixRootRoute.admin}/${pathsAdmin.product.prefix}/${pathsAdmin.product.add}`
    );
  };
  return (
    <div className="flex items-baseline justify-between">
      <TitleTopic name="adminProduct.title" isRequired={false} />

      <div className="flex items-center flex-1 justify-end gap-x-[24px]">
        <div ref={childRef.ref} className="relative">
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
                  // "footer-animation-list": isShow,
                  " border h-[250px] border-text_A1A0A3 border-t-0": isShow,
                }
              )}
              // style={{
              //   ["--footer-size" as string]: categories.length,
              //   ["--height-li" as string]: "38px",
              // }}
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
                        key={index}
                        onClick={() => {
                          childRef.handleShow();
                          handleChangeCategoryParent(Number(item.id));
                        }}
                        className={clsx(
                          "h-[38px] relative list-category-item hover:bg-bg_rgba_103_203_248_1 px-[16px] flex justify-between items-center",
                          { "bg-bg_rgba_103_203_248_1": active }
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
                        <span className=" rotate-[-90deg]">
                          <ICArowDown color={Colors.text_black} />
                        </span>
                      </li>
                    );
                  })}
              </InfiniteScroll>
            </ul>
          </div>
          {!!categories &&
          indexParent !== 1 &&
          categories[indexParent]?.listCategoryChild?.length ? (
            <ul
              className={clsx(
                " absolute left-[100%] z-[1] top-[100%] bg-white  overflow-y-auto list-facilities  w-0 text-_14 overflow-hidden h-0 ease-in duration-300",
                {
                  " border h-[250px] w-[301px] border-text_A1A0A3":
                    childRef.isShow && isShow,
                }
              )}
            >
              {categories[indexParent]?.listCategoryChild?.map(
                (item, index: number) => {
                  const active = index === indexChild;
                  return (
                    <li
                      onClick={() => {
                        handleShow();
                        handleSelectCategorySub(index);
                      }}
                      key={index}
                      className={clsx(
                        "h-[38px] relative list-category-item px-[16px] hover:bg-bg_rgba_103_203_248_1 flex justify-between items-center",
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
