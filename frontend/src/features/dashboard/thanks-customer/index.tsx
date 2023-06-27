import React, { useEffect, useMemo, useState } from "react";
import { TitleTopic } from "../home/components/TitleTopic";
import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { ICAdd } from "@assets/icons/ICAdd";
import { ThanksCustomerItem } from "./components/ThanksCustomerItem";
import { Pagination } from "@components/Paginnation";
import { usePagination } from "@hooks/usePagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SIZE_DATA, prefixRootRoute } from "@constants/index";
import { pathsAdmin } from "@constants/routerManager";
import type { IResponseData, IReview } from "@typeRules/index";
import { reviewService } from "@services/thanksCustomer";
import { policyService } from "@services/policy";
import { useShowMessage } from "../components/DiglogMessage";
import { Loading, useHandleLoading } from "../components/Loading";

export const ThanksCustomer = () => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<IResponseData<IReview>>();

  const { currentPage, setCurrentPage } = usePagination();
  const [_, setSearchParam] = useSearchParams();
  const { showLoading } = useHandleLoading();
  const { showError, showSuccess } = useShowMessage();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleGetData(Number(currentPage));
  }, [currentPage]);

  const handleGetData = (page: number) => {
    setLoading(true);
    reviewService
      .get({ page: page, size: SIZE_DATA, sort: "show,desc" })
      .then((data) => {
        setReviews(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const navigation = useNavigate();
  const handleNavigation = () => {
    navigation(
      `${prefixRootRoute.admin}/${pathsAdmin.thankCustomer.prefix}/${pathsAdmin.thankCustomer.add}`
    );
  };

  const totalPage = useMemo(() => {
    return Math.ceil((reviews?.totalElementPage || 1) / SIZE_DATA);
  }, [reviews?.totalElement]);

  const handleDelete = (id: number) => {
    showLoading();
    reviewService
      .delete(id)
      .then(() => {
        const newReviews = [...reviews!.list];
        const index = newReviews.findIndex((item) => item.id === id);
        newReviews.splice(index, 1);
        if (Number(currentPage) >= totalPage && newReviews.length <= 0) {
          let page = currentPage;
          page = page - 1;
          setSearchParam({ page: `${page}` });
          setCurrentPage(page);
        } else {
          handleGetData(Number(currentPage));
        }
        showSuccess("customer.message_delete_success");
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          showError(error?.response?.data?.message);
        } else {
          showError("message.actions.error.delete_banner");
        }
      });
  };

  const updateStar = (data: IReview) => {
    showLoading();
    reviewService
      .patch(Number(data.id))
      .then((data) => {
        const newReviews = [...reviews!.list];
        const index = newReviews.findIndex((item) => item.id === data.id);
        newReviews.splice(index, 1, data);
        setReviews({
          totalElement: reviews?.totalElement || 0,
          totalElementPage: reviews?.totalElementPage || 0,
          list: [...newReviews],
        });
        showSuccess("customer.message_update_success");
      })
      .catch((error) => {
        showError(
          error.response?.data?.message || "message.actions.error.delete_banner"
        );
      });
  };

  return (
    <>
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline">
          <TitleTopic name="customer.title" isRequired={false} />
          <span className="text-_14 ml-2 3xl:ml-4 italic text-text_secondary">
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
      {loading && reviews ? (
        <div className="flex items-center justify-center h-[200px]">
          <Loading />
        </div>
      ) : null}
      <div className="grid grid-cols-4 gap-[24px]">
        {reviews?.list.map((item, index) => {
          return (
            <ThanksCustomerItem
              onUpdate={updateStar}
              onDelete={handleDelete}
              key={index}
              data={item}
            />
          );
        })}
      </div>
      <div className="flex justify-end">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPage}
        />
      </div>
    </>
  );
};
