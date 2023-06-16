import React from "react";
import { TitleTopic } from "../home/components/TitleTopic";
import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { PolicyItem } from "../Policy/components/PolicyItem";
import { ICPlus } from "@assets/icons/ICPlus";
import { ICAdd } from "@assets/icons/ICAdd";
import { useNavigate } from "react-router-dom";
import { prefixRootRoute } from "@constants/index";
import { pathsAdmin } from "@constants/routerManager";
import { PlaceItem } from "./components/PlaceItem";

export const PlaceAdmin = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const handelClickAddPlace = () => {
    navigation(
      `${prefixRootRoute.admin}/${pathsAdmin.place.prefix}/${pathsAdmin.place.add}`
    );
  };
  return (
    <>
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline">
          <TitleTopic name="adminPlace.title" isRequired={false} />
        </div>
        <Button
          onClick={handelClickAddPlace} text="adminPlace.addBtn"
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
          [1,2,3,4,5,6, 1,2,3,4,5,6, 1,2,3,4,5,6].map(() => {
            return [{name: "Tên cơ sở - Số 23 Ngụy Như Kon Tum", phone: "0325333665"}].map((item: any, idx: any) => {
              return <PlaceItem data={item} key={idx} />
            })
          })
        }
      </div>
    </>
  );
};
