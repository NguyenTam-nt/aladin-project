import { ICCategory } from "@assets/icons/ICCategory";
import { ICClear } from "@assets/icons/ICClear";
import { ICFilter } from "@assets/icons/ICFilter";
import { ICPlus } from "@assets/icons/ICPlus";
import { Button } from "@components/Button";
import { Checkbox } from "@components/Checkbox";
import { prefixRootRoute } from "@configs/index";
import { Colors } from "@constants/color";
import { pathDocumentsHandle } from "@constants/contain";
import { pathsAdmin } from "@constants/routerAdmin";
import { InputAdmin } from "@features/dashboard/components/InputAdmin";
import clsx from "clsx";
import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
const data = ["Tin tức", "Đào tạo", "Học bổng", "Sinh viên"];

export const HeaderFilter = () => {
  const navigation = useNavigate();
  const handleNavigateCategory = () => {
    navigation(
      `${prefixRootRoute.admin}/${pathsAdmin.documents.prefix}/${pathsAdmin.documents_category.prefix}`
    );
  };

  const handleNavigateCreateDocuments = () => {
    navigation(
      `${prefixRootRoute.admin}/${pathsAdmin.documents.prefix}/${pathDocumentsHandle.add}`
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
        text="admin.documents.btn_category"
        imageLeft={
          <span className="mr-2">
            <ICCategory />
          </span>
        }
        color="empty"
        className="h-full max-w-[197px] border border-secondary text-secondary"
      />
      <Button
        onClick={handleNavigateCreateDocuments}
        imageLeft={
          <span className="mr-2">
            <ICPlus color={Colors.text_white} />
          </span>
        }
        className="max-w-[220px] h-full"
        text="admin.documents.btn_create"
        color="primary"
      />
    </div>
  );
};

const ListFilter = memo(() => {
  const [isShow, setIsShow] = useState(false);
  const handleShow = () => {
    setIsShow(!isShow);
  };
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
          ["--footer-size" as string]: data.length + 2,
          ["--height-li" as string]: "40px",
        }}
      >
        <ul className="border-b border-br_E9ECEF px-[16px]">
          {data.map((item, index) => {
            const id = `${item}_${index}`;
            return (
              <li key={index} className="flex items-center h-[40px]">
                <span>
                  <Checkbox id={id} />
                </span>
                <label htmlFor={id} className="ml-[19px] line-clamp-1">
                  {item}
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
});
