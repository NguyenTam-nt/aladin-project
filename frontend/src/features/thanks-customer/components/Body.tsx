import React from "react";
import { useTranslation } from "react-i18next";
import { BodyList } from "./BodyList";
import { Pagination } from "@components/Paginnation";
import { usePagination } from "@hooks/usePagination";
import { windownSizeWidth, withResponsive } from "@constants/index";

export const Body = () => {
  const { t } = useTranslation();
  const { currentPage, setCurrentPage } = usePagination();
  return (
    <div className="w-rp py-[40px] lg:py-[120px]">
      <h3 className="title-48 text-secondary">{t("home.customer.title")}</h3>
      <BodyList />
      <div className="flex lg:justify-end mt-[40px]">
        <Pagination
          limit={windownSizeWidth > withResponsive._1024 ? 5 : 4}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={10}
        />
      </div>
    </div>
  );
};
