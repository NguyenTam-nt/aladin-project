import { ICCategory } from "@assets/icons/ICCategory";
import { ICClear } from "@assets/icons/ICClear";
import { ICFilter } from "@assets/icons/ICFilter";
import { ICPlus } from "@assets/icons/ICPlus";
import { Button } from "@components/Button";
import { Checkbox } from "@components/Checkbox";
import { prefixRootRoute } from "@configs/index";
import { Colors } from "@constants/color";
import { pathNewsHandle } from "@constants/contain";
import { pathsAdmin } from "@constants/routerAdmin";
import { TranslateContext } from "@contexts/Translation";
import { InputAdmin } from "@features/dashboard/components/InputAdmin";
import { newsService } from "@services/newsService";
import type { ICategory } from "@typeRules/news";
import clsx from "clsx";
import React, { memo, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const HeaderFilter = memo(() => {
  const navigation = useNavigate();
  const handleNavigateCategory = () => {
    navigation(
      `${prefixRootRoute.admin}/${pathsAdmin.news.prefix}/${pathsAdmin.news_category.prefix}`
    );
  };

  const handleNavigateCreateNews = () => {
    navigation(
      `${prefixRootRoute.admin}/${pathsAdmin.news.prefix}/${pathNewsHandle.add}`
    );
  };

  return (
    <div className="flex items-center gap-x-[12px] 2xl:gap-x-[24px] h-[48px]">
      <InputAdmin />
      <Button
        text="button._delete"
        imageLeft={
          <span className="mr-2">
            <ICClear />
          </span>
        }
        color="empty"
        className="border border-text_C53434 text-text_C53434 h-full max-w-[93px]"
      />
      <ListFilter />
      <Button
        onClick={handleNavigateCategory}
        text="admin.news.btn_category"
        imageLeft={
          <span className="mr-2">
            <ICCategory />
          </span>
        }
        color="empty"
        className="h-full max-w-[197px] border border-secondary text-secondary"
      />
      <Button
        onClick={handleNavigateCreateNews}
        imageLeft={
          <span className="mr-2">
            <ICPlus color={Colors.text_white} />
          </span>
        }
        className="max-w-[170px] h-full"
        text="admin.news.btn_create"
        color="primary"
      />
    </div>
  );
})

const ListFilter = memo(() => {
  const [isShow, setIsShow] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { isVn } = useContext(TranslateContext);
  const handleShow = () => {
    setIsShow(!isShow);
  };
  useEffect(() => {
    newsService.get().then((data) => {
      setCategories(data.data);
    });
  }, []);
  return (
    <div className=" relative h-full">
      <Button
        onClick={handleShow}
        text="button._filter"
        imageLeft={
          <span className="mr-2">
            <ICFilter />
          </span>
        }
        color="empty"
        className="border border-secondary text-secondary h-full max-w-[110px]"
      />
      <div
        className={clsx(
          "absolute bg-white z-[5] h-0 overflow-hidden w-[227px] shadow-lg ease-in duration-300 top-[100%] left-0 text-_14 text-text_primary mt-[12px]",
          { "footer-animation-list": isShow }
        )}
        style={{
          ["--footer-size" as string]: categories.length + 2,
          ["--height-li" as string]: "40px",
        }}
      >
        <ul className="border-b border-br_E9ECEF px-[16px]">
          {categories.map((item, index) => {
            const id = `${item}_${index}`;
            return (
              <li key={index} className="flex items-center h-[40px]">
                <span>
                  <Checkbox id={id} />
                </span>
                <label htmlFor={id} className="ml-[19px] line-clamp-1">
                  {isVn ? item.name : item.nameKo}
                </label>
              </li>
            );
          })}
        </ul>
        <div className="h-[80px] justify-between px-[16px]  flex items-center">
          <Button
            text="button._reset"
            color="empty"
            className=" text-text_primary w-fit h-[32px]"
          />
          <Button
            text="button._accept"
            color="primary"
            className="w-[88px] h-[32px]"
          />
        </div>
      </div>
    </div>
  );
})
