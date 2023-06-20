import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BodyList } from "./BodyList";
import { Pagination } from "@components/Paginnation";
import { usePagination } from "@hooks/usePagination";
import { SIZE_DATA, prefixRootRoute, windownSizeWidth, withResponsive } from "@constants/index";
import type { IResponseData, IReview } from "@typeRules/index";
import { pathsAdmin } from "@constants/routerManager";
import { reviewService } from "@services/thanksCustomer";
import { useNavigate } from "react-router-dom";

export const Body = () => {
  const { t } = useTranslation();
  const { currentPage, setCurrentPage } = usePagination();
  const [reviews, setReviews] = useState<IResponseData<IReview>>()


  useEffect(() => {
    handleGetData(Number(currentPage))
  }, [currentPage])

  const handleGetData = (page:number) => {
    reviewService.get({page: page, size: SIZE_DATA, sort: "show,desc"}).then((data) => {
      setReviews(data)
    })
  }

  const totalPage = useMemo(() => {
    return Math.ceil((reviews?.totalElementPage || 1) / SIZE_DATA)
  }, [reviews?.totalElementPage])

  return (
    <div className="w-rp py-[40px] lg:py-[120px]">
      <h3 className="title-48 text-secondary">{t("home.customer.title")}</h3>
      <BodyList data={reviews?.list || []} />
      <div className="flex lg:justify-end mt-[40px]">
        <Pagination
          limit={windownSizeWidth > withResponsive._1024 ? 5 : 4}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPage}
        />
      </div>
    </div>
  );
};
