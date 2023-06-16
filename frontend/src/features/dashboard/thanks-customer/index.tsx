import React from "react";
import { TitleTopic } from "../home/components/TitleTopic";
import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { ICAdd } from "@assets/icons/ICAdd";
import { ThanksCustomerItem } from "./components/ThanksCustomerItem";
import { Pagination } from "@components/Paginnation";
import { usePagination } from "@hooks/usePagination";
import { useNavigate } from "react-router-dom";
import { prefixRootRoute } from "@constants/index";
import { pathsAdmin } from "@constants/routerManager";

export const ThanksCustomer = () => {
  const { t } = useTranslation();
  const { currentPage, setCurrentPage } = usePagination();
  const navigation = useNavigate();
  const handleNavigation = () => {
    navigation(
      `${prefixRootRoute.admin}/${pathsAdmin.thankCustomer.prefix}/${pathsAdmin.thankCustomer.add}`
    );
  };
  return (
    <>
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline">
          <TitleTopic name="customer.title" isRequired={false} />
          <span className="text-_14 ml-4 italic text-text_secondary">
            {t("customer.maxItem")} *
          </span>
        </div>
        <Button
          onClick={handleNavigation}
          className="max-w-[177px]"
          text="customer.add"
          imageLeft={
            <span className="mr-2">
              <ICAdd />
            </span>
          }
          color={"empty"}
        />
      </div>
      <div className="grid grid-cols-4 gap-[24px]">
        <ThanksCustomerItem />
        <ThanksCustomerItem />
        <ThanksCustomerItem />
        <ThanksCustomerItem />
        <ThanksCustomerItem />
        <ThanksCustomerItem />
      </div>
      <div className="flex justify-end">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={10}
        />
      </div>
    </>
  );
};
