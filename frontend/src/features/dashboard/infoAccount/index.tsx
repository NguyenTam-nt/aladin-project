import React, { memo, useContext,  useState } from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { TranslateContext } from "@contexts/Translation";
import { Button } from "@components/Button";
import { pathsAdmin } from "@constants/routerAdmin";
import { Link } from "react-router-dom";

interface IInfoAccountTableItem {
  id: number;
  name: string;
  specialized: string;
  email: string;
}

export const InfoAccount = () => {

  return (
    <div className="px-[24px]">
      <HeaderAdmin title="info_manage._title" />
      <div className="flex items-center h-[48px]"></div>
      <div className=" grid  grid-cols-[88px_1fr]">
        <div>
          <img
            className="h-[88px] w-[88px] rounded-[44px] object-cover"
            src="https://s3-alpha-sig.figma.com/img/2e52/1670/c6d04f2582d9750e35ac9271f3d1643f?Expires=1685923200&Signature=ngoPFy~fH9WBHtbN4OU74eiERZl-0TuO55TuTDoNRnDNhigGz3qj578EF~0A~qL0MQkIpZPxngnOzEhdFsiRC2kycLBoivul1S7xHWyNcNpaeeUm8zostvnU8S-PaYU5SDRRmQyd~Uz1eTG5yOBYUmCa7JbQavrFPrlIpmwnDx13xITSgakAXwd5jKSVLR34OPBlQLAbaooE~G5nbhUWd~VkPel9ZacBGdH6rUfaTzR6028AJ2kcVfNv9yEcnRNNCpQPUT1HDKiaWqQRZzwZqaJ4Nxb9N1BxSSBbesVOq1pqzJAQO2tfDJHVg8HVMHfTYNrgIpLIV6PW-AmdNlX6Hw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          ></img>
        </div>
        <div className="ml-[24px] flex flex-col  justify-center ">
          <p className=" leading-[32px] text-_32 font-bold ">
            Nguyễn Thanh Tùng
          </p>
          <p className="mt-[15px]">Trưởng phòng</p>
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

  return (
    <>
      <div className="pb-[14px] grid  grid-cols-[1fr_1fr_1fr]  mt-[40px] text-_18 font-semibold text-text_primary border-b-[1px] border-solid border-br_E9ECEF">
        <div>
          <p className="text-text_0058DB">{t("info_manage._form._name")}</p>
          <p className="mt-[16px]">Nguyễn Thanh Tùng</p>
        </div>
        <div>
          <p className="text-text_0058DB">{t("info_manage._form._gender")}</p>
          <p className="mt-[16px]">Nam</p>
        </div>
        <div>
          <p className="text-text_0058DB">{t("info_manage._form._birth")}</p>
          <p className="mt-[16px]"> 1994 </p>
        </div>
      </div>
      <div className="pb-[14px]    grid  grid-cols-[1fr_1fr_1fr]  mt-[40px] text-_18 font-semibold text-text_primary border-b-[1px] border-solid border-br_E9ECEF">
        <div>
          <p className="text-text_0058DB">{t("info_manage._form._email")}</p>
          <p className="mt-[16px]">tungnui@gmail.com</p>
        </div>
        <div>
          <p className="text-text_0058DB">{t("info_manage._form._phone")}</p>
          <p className="mt-[16px]">012345678</p>
        </div>
        <div>
          <p className="text-text_0058DB">{t("info_manage._form._position")}</p>
          <p className="mt-[16px]">Trưởng phòng</p>
        </div>
      </div>
    </>
  );
});
