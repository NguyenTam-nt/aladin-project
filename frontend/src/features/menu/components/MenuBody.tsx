import React from "react";
import { useTranslation } from "react-i18next";
import { MenuBodyFilterByCategory } from "./MenuBodyFilterByCategory";
import { MenuBofyFilterBySort } from "./MenuBofyFilterBySort";
import { MenuListData } from "./MenuListData";
import { Pagination } from "@components/Paginnation";
import { usePagination } from "@hooks/usePagination";
import { windownSizeWidth, withResponsive } from "@constants/index";
import { MenuBodyFilterMobile } from "./MenuBodyFilterMobile";

export const MenuBody = () => {
  const { t } = useTranslation();
  const { currentPage, setCurrentPage } = usePagination();

  return (
    <div className="w-rp py-[40px] lg:py-[120px]">
      <div className="flex gap-x-[78px]">
        {windownSizeWidth > withResponsive._1024 ? (
          <div className="w-[246px]">
            <MenuBodyFilterByCategory />
          </div>
        ) : null}
        <div className="flex-1">
          {windownSizeWidth > withResponsive._1024 ? (
            <MenuBofyFilterBySort />
          ) : (
            <MenuBodyFilterMobile />
          )}
          <MenuListData />
          <div className="flex lg:justify-end">
            <Pagination
              currentPage={currentPage}
              totalPages={5}
              setCurrentPage={setCurrentPage}
              limit={windownSizeWidth > withResponsive._1024 ? 5 : 4}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
