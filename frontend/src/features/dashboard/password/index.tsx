import React, { memo } from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
// import { TranslateContext } from "@contexts/Translation";
import { Button } from "@components/Button";
import TitleInput from "../components/TitleInput";
import { Input } from "@components/Input";

enum AccoutnForm {
  name = "name",
  gender = "gender",
  year = "year",
  position = "position",
  phone = "phone",
  email = "email",
  username = "username",
  password = "password",
}

export const EditPassword = () => {
  return (
    <div className="px-[24px]">
      <HeaderAdmin title="info_manage._title" />
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
    </div>
  );
};

const InfoAccountTable = memo(() => {
  // const { t } = useContext(TranslateContext);
  return (
    <div className=" bg-white py-[40px] px-[24px]">
      <div className="grid grid-cols-1 gap-[24px]">
        <div>
          <TitleInput
            forId={AccoutnForm.name}
            name="info_manage._form_create._old_password._name"
          />
          <Input
            id={AccoutnForm.name}
            type="password"
            placeholder="info_manage._form_create._old_password._placeholder"
            className="h-[44px]"
          />
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.name}
            name="info_manage._form_create._new_password._name"
          />
          <Input
            id={AccoutnForm.name}
            type="password"
            placeholder="info_manage._form_create._new_password._placeholder"
            className="h-[44px]"
          />
        </div>
        <div>
          <TitleInput
            forId={AccoutnForm.name}
            name="info_manage._form_create._re_new_password._name"
          />
          <Input
            id={AccoutnForm.name}
            type="password"
            placeholder="info_manage._form_create._re_new_password._placeholder"
            className="h-[44px]"
          />
        </div>
        <div>
          <div className="flex justify-end items-center">
            <Button
              onClick={() => {}}
              text="button._cancel"
              color="empty"
              className="!w-[120px] border border-br_E9ECEF mr-[24px]"
            />
            <Button
              onClick={() => {}}
              text="button._edit"
              color="primary"
              className="!w-[120px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
