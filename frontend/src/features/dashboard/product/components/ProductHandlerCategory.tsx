import { ICArowDown } from "@assets/icons/ICArowDown";
import TitleInput from "@components/TitleInput";
import { Colors } from "@constants/color";
import { useGetCategory } from "@features/dashboard/category-product/useGetCategory";
import { TextError } from "@features/dashboard/components/TextError";
import { useClickOutItem } from "@hooks/useClickOutItem";
import { CategoryType, ICategoryItem } from "@typeRules/category";
import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  onChange: (data: { id: number; idParent: number | undefined }) => void;
  category?: ICategoryItem;
  message?: string
};

export const ProductHandlerCategory = memo(({ onChange, category, message }: Props) => {
  const { ref, isShow, handleToggleItem } = useClickOutItem();
  const { categories, fechData } = useGetCategory();
  const [indexActive, setIndex] = useState<number>(-1);
  const [subIndex, setSubIndex] = useState<number>(-1);
  const handleSelectCategory = (index: number) => {
    if (indexActive !== index) {
      setIndex(index);
      setSubIndex(-1);
      onChange({
        id: Number(categories[index].id),
        idParent: categories[index].listCategoryChild?.length ? undefined :  Number(categories[index]?.idParent || 0),
      });
    }
  };
  const handleSelectCategorySub = (index: number) => {
    setSubIndex(index);
    onChange({
      id: Number(categories[indexActive]?.listCategoryChild?.[index]?.id),
      idParent: Number(
        categories[indexActive]?.listCategoryChild?.[index]?.idParent || 0
      ),
    });
  };

  useEffect(() => {
    if (category) {
      if (category?.type === CategoryType.child) {
        const index = categories.findIndex(
          (i) => i.id === Number(category?.idParent)
        );
        setIndex(index);
        const indexSub =
          categories[index]?.listCategoryChild?.findIndex(
            (i) => i.id === category.id
          ) ?? -1;
          console.log({indexSub})
        setSubIndex(indexSub);
      } else {
        const index = categories.findIndex(
          (i) => i.id === Number(category?.id)
        );
        setIndex(index);
      }
    }
  }, [category, categories]);

  return (
    <div className=" col-span-1">
      <TitleInput name="adminProduct.form.category" />
      <div ref={ref} className="relative w-full  z-[5]">
        <button
          onClick={handleToggleItem}
          className={clsx(
            "w-full  py-[13px] px-[16px] h-[48px] flex justify-between items-center border-[1px] border-solid border-text_A1A0A3",
            {
              "!border-TrueBlue_500": isShow,
            }
          )}
        >
          <span className={clsx("text-text_A1A0A3 line-clamp-1 text-_14", {
            "!text-GreyPrimary": indexActive !== -1
          })}>
            {indexActive !== -1
              ? `${categories[indexActive].name} ${
                  categories[indexActive]?.listCategoryChild?.[subIndex]?.name
                    ? "- " +
                      categories[indexActive]?.listCategoryChild?.[subIndex]
                        ?.name
                    : ""
                }`
              : "Chọn danh mục"}
          </span>
          <span>
            <ICArowDown color={Colors.text_A1A0A3} />
          </span>
        {message && <TextError message={message} />}  
        </button>
        <div
          className={clsx(
            "w-full h-0 ease-linear duration-200 z-[5] shadow-sm bg-white absolute top-[48px] left-0 grid grid-cols-2  ",
            {
              "h-[144px]": isShow,
            }
          )}
        >
          <div
            id="category-product"
            className="h-full overflow-y-auto category-select-group list-facilities"
          >
            <InfiniteScroll
              hasMore
              loader={<></>}
              next={fechData}
              dataLength={categories.length}
              scrollableTarget="category-product"
            >
              {categories.map((item, index) => {
                const isActive = indexActive === index;
                return (
                  <button
                    onClick={() => handleSelectCategory(index)}
                    key={index}
                    className={clsx(
                      "w-full flex justify-between items-center h-[48px] py-[13px] px-[16px]",
                      {
                        "bg-TrueBlue_500 text-text_white": isActive,
                      }
                    )}
                  >
                    <div className=" line-clamp-1">{item.name}</div>{" "}
                    {item.listCategoryChild?.length ? (
                      <span className=" rotate-[-90deg]">
                        <ICArowDown
                          color={
                            isActive ? Colors.text_white : Colors.text_black
                          }
                        />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </InfiniteScroll>
          </div>
          {indexActive !== -1 ? (
            <div className="h-full overflow-y-auto  category-select-group list-facilities">
              {categories[indexActive] &&
              categories[indexActive]?.listCategoryChild
                ? [...(categories[indexActive]?.listCategoryChild || [])].map(
                    (item, index) => {
                      const isActive = subIndex === index;
                      return (
                        <button
                          onClick={() => handleSelectCategorySub(index)}
                          key={index}
                          className={clsx(
                            "w-full flex justify-start items-center h-[48px] py-[13px] px-[16px]",
                            {
                              "bg-TrueBlue_500 text-text_white": isActive,
                            }
                          )}
                        >
                          <div className=" text-left line-clamp-1">{item.name}</div>{" "}
                        </button>
                      );
                    }
                  )
                : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});
