import React, { useEffect, useMemo, useState } from "react";
import { TitleTopic } from "../home/components/TitleTopic";
import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { PolicyItem } from "../Policy/components/PolicyItem";
import { ICPlus } from "@assets/icons/ICPlus";
import { ICAdd } from "@assets/icons/ICAdd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SIZE_DATA, prefixRootRoute } from "@constants/index";
import { pathsAdmin } from "@constants/routerManager";
import { PlaceItem } from "./components/PlaceItem";
import PlaceService from "@services/PlaceService";
import type { PlaceType } from "@typeRules/place";
import { usePagination } from "@hooks/usePagination";
import { useHandleLoading } from "../components/Loading";
import { useShowMessage } from "../components/DiglogMessage";
import { Pagination } from "@components/Paginnation";
import type { IResponseData } from "@typeRules/index";

export const PlaceAdmin = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const { currentPage, setCurrentPage } = usePagination();
  const [placeResponse, setPlaceResponse] = useState<IResponseData<PlaceType>>()
  const [_, setSearchParam] = useSearchParams()
  const { showLoading } = useHandleLoading();
  const { showError, showSuccess, showWarning } = useShowMessage();

  useEffect(() => {
    getPlaceData(Number(currentPage))
  }, [currentPage])


  const getPlaceData = async (page:number) => {
    try {
      PlaceService.get({page: page, size: SIZE_DATA, sort: "id,desc"})
        .then(response => {
          setPlaceResponse(response)
        })
        .catch(error => {
        })
    } catch (error) {
    } 
  }

  const totalPage = useMemo(() => {
    return Math.ceil((placeResponse?.totalElementPage || 1) / SIZE_DATA)
  }, [placeResponse?.totalElement])
  

  const handelClickAddPlace = () => {
    navigation(
      `${prefixRootRoute.admin}/${pathsAdmin.place.prefix}/${pathsAdmin.place.add}`
    );
  };

  const handleDelete = (id: number) => {
    showLoading();
    PlaceService
      .delete(id)
      .then(() => {
          getPlaceData(Number(currentPage))
         showSuccess("adminPlace.notification.deleteSuccess");
      })
      .catch(() => {
        showError("adminPlace.notification.deleteError");
      });
  };

  const handleActive = (id: number) => {
    showLoading();
    PlaceService
      .delete(id)
      .then(() => {
          getPlaceData(Number(currentPage))
         showSuccess("adminPlace.notification.activeSuccess");
      })
      .catch(() => {
        showError("adminPlace.notification.activeError");
      });
  };


  return (
    <>
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline">
          <TitleTopic name="adminPlace.title" isRequired={false} />
        </div>
        <Button
          onClick={handelClickAddPlace} text="adminPlace.add_btn"
          className="max-w-[177px]"
          imageLeft={
            <span className="mr-2">
              <ICAdd />
            </span>
          }
          color={"empty"}
        />
      </div>
      <div className="grid grid-cols-4 gap-[24px]">
        {
          placeResponse && placeResponse.list && placeResponse.list.map((item: PlaceType, idx: any) => {
            return <PlaceItem data={item} onDelete={handleDelete} onActive={handleActive} key={idx} />
          })
        }
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
