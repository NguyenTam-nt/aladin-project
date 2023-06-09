import React from "react";
import { useTranslation } from "react-i18next";
import { MenuBodyFilterByCategory } from "./MenuBodyFilterByCategory";
import { MenuBofyFilterBySort } from "./MenuBofyFilterBySort";
import { MenuListData } from "./MenuListData";
import { Pagination } from "@components/Paginnation";
import { usePagination } from "@hooks/usePagination";

export const MenuBody = () => {
  const { t } = useTranslation();
  const { currentPage, setCurrentPage } = usePagination();
  console.log({ currentPage });
  return (
    <div className="w-rp py-[120px]">
      <div className="flex gap-x-[78px]">
        <MenuBodyFilterByCategory />
        <div className="flex-1">
          <MenuBofyFilterBySort />
          <MenuListData />
          <div className="flex justify-end">
            <Pagination
              currentPage={currentPage}
              totalPages={5}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
