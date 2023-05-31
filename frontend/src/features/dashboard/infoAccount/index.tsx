import React, { memo, useContext } from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { TranslateContext } from "@contexts/Translation";
import { Button } from "@components/Button";
import { pathsAdmin } from "@constants/routerAdmin";
import { Link } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import { Avatar } from "@components/Avatar";

// interface IInfoAccountTableItem {
//   id: number;
//   name: string;
//   specialized: string;
//   email: string;
// }

export const InfoAccount = () => {
  const {user} = useContext(AuthContext)

  return (
    <div className="px-[24px]">
      <HeaderAdmin title="info_manage._title" />
      <div className="flex items-center h-[48px]"></div>
      <div className=" grid  grid-cols-[88px_1fr]">
        <div>
         <Avatar size={88} link={user?.imageUrl} name={user?.login || ""} />
        </div>
        <div className="ml-[24px] flex flex-col  justify-center ">
          <p className=" leading-[32px] text-_32 font-bold ">
            {user?.fullname}
          </p>
          <p className="mt-[15px]">{user?.position}</p>
        </div>
      </div>
      <InfoAccountTable />
      <div className="flex justify-end items-center mt-[40px]">
        <Link to={pathsAdmin.info_account.edit}>
          <Button
            onClick={() => {}}
            text="info_manage._edit_info_account"
            color="primary"
            className="!w-[250px]"
          />
        </Link>
      </div>
    </div>
  );
};


const InfoAccountTable = memo(() => {
  const { t } = useContext(TranslateContext);
  const {user} = useContext(AuthContext)
  return (
    <>
      <div className="pb-[14px] grid  grid-cols-[1fr_1fr_1fr]  mt-[40px] text-_18 font-semibold text-text_primary border-b-[1px] border-solid border-br_E9ECEF">
        <div>
          <p className="text-text_0058DB">{t("info_manage._form._name")}</p>
          <p className="mt-[16px]">{user?.fullname}</p>
        </div>
        <div>
          <p className="text-text_0058DB">{t("info_manage._form._gender")}</p>
          <p className="mt-[16px]">{user?.gender}</p>
        </div>
        <div>
          <p className="text-text_0058DB">{t("info_manage._form._birth")}</p>
          <p className="mt-[16px]"> {user?.yearOfBirth} </p>
        </div>
      </div>
      <div className="pb-[14px]    grid  grid-cols-[1fr_1fr_1fr]  mt-[40px] text-_18 font-semibold text-text_primary border-b-[1px] border-solid border-br_E9ECEF">
        <div>
          <p className="text-text_0058DB">{t("info_manage._form._email")}</p>
          <p className="mt-[16px]">{user?.email}</p>
        </div>
        <div>
          <p className="text-text_0058DB">{t("info_manage._form._phone")}</p>
          <p className="mt-[16px]">{user?.phoneNumber}</p>
        </div>
        <div>
          <p className="text-text_0058DB">{t("info_manage._form._position")}</p>
          <p className="mt-[16px]">{user?.position}</p>
        </div>
      </div>
    </>
  );
});
