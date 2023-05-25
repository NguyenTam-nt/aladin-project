import React, { ChangeEvent, memo, useContext, useState } from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { TranslateContext } from "@contexts/Translation";
import { Button } from "@components/Button";
import TitleInput from "../components/TitleInput";
import { Input } from "@components/Input";
import { SelectInput } from "@components/SelectInput";
import { ICEditAccount } from "@assets/icons/ICEditAccount";
import { ICCamera } from "@assets/icons/ICCamera";

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

export const EditInfoAccount = () => {
    const [url , setUrl] = useState("https://s3-alpha-sig.figma.com/img/2e52/1670/c6d04f2582d9750e35ac9271f3d1643f?Expires=1685923200&Signature=ngoPFy~fH9WBHtbN4OU74eiERZl-0TuO55TuTDoNRnDNhigGz3qj578EF~0A~qL0MQkIpZPxngnOzEhdFsiRC2kycLBoivul1S7xHWyNcNpaeeUm8zostvnU8S-PaYU5SDRRmQyd~Uz1eTG5yOBYUmCa7JbQavrFPrlIpmwnDx13xITSgakAXwd5jKSVLR34OPBlQLAbaooE~G5nbhUWd~VkPel9ZacBGdH6rUfaTzR6028AJ2kcVfNv9yEcnRNNCpQPUT1HDKiaWqQRZzwZqaJ4Nxb9N1BxSSBbesVOq1pqzJAQO2tfDJHVg8HVMHfTYNrgIpLIV6PW-AmdNlX6Hw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4")
   
    const handleImageChange = (event:ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        setUrl(URL.createObjectURL(file));
      };
  return (
    <div className="px-[24px]">
      <HeaderAdmin title="info_manage._title" />
      <div className="flex items-center h-[48px]"></div>
      <div className=" grid  grid-cols-[88px_1fr]">
        <div>
          <img
            className="h-[88px] w-[88px] rounded-[44px] object-cover"
            src={url}
          ></img>
        </div>
        <div>
          <div className="flex flex-row  items-center">
            <div className="ml-[24px] flex flex-col  justify-center mr-[16px]">
              <p className=" leading-[32px] text-_32 font-bold ">
                Nguyễn Thanh Tùng
              </p>
              <label htmlFor="library_image">
                <div className="bg-bg_E4F1FF w-[166px] mt-[16px] flex h-[40px] justify-center items-center rounded-[10px] ">
                  <ICCamera></ICCamera>
                  <input
                    type="file"
                    accept="image/*"
                    id="library_image"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </label>
            </div>

            <ICEditAccount></ICEditAccount>
          </div>
        </div>
      </div>
      <InfoAccountTable />
    </div>
  );
};

const InfoAccountTable = memo(() => {
  const { t } = useContext(TranslateContext);

  return (
    <div className=" bg-white py-[40px] px-[24px]">
      <div className="grid grid-cols-2 gap-[24px]">
        <div>
          <TitleInput
            forId={AccoutnForm.name}
            name="info_manage._form_create._name._name"
          />
          <Input
            id={AccoutnForm.name}
            placeholder="info_manage._form_create._name._placeholder"
            className="h-[44px]"
          />
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.gender}
            name="info_manage._form_create._gender._name"
          />
          <SelectInput
            id={AccoutnForm.name}
            className="text-_14 !text-bg_7E8B99"
          >
            <>
              <option selected disabled>
                {t("info_manage._form_create._gender._placeholder")}
              </option>
              <option>{t("common._male")}</option>
              <option>{t("common._female")}</option>
            </>
          </SelectInput>
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.year}
            name="info_manage._form_create._birth._name"
          />
          <Input
            id={AccoutnForm.year}
            placeholder="info_manage._form_create._birth._placeholder"
            className="h-[44px]"
          />
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.name}
            name="info_manage._form_create._position._name"
          />
          <SelectInput
            id={AccoutnForm.name}
            className="text-_14 !text-bg_7E8B99"
          >
            <>
              <option selected disabled>
                {t("info_manage._form_create._position._placeholder")}
              </option>
              <option>Nhân viên</option>
              <option>Quản lý</option>
            </>
          </SelectInput>
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.email}
            name="info_manage._form_create._email._name"
          />
          <Input
            id={AccoutnForm.email}
            placeholder="info_manage._form_create._email._placeholder"
            className="h-[44px]"
          />
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.phone}
            name="info_manage._form_create._phone._name"
          />
          <Input
            id={AccoutnForm.phone}
            placeholder="info_manage._form_create._phone._placeholder"
            className="h-[44px]"
          />
        </div>

        <div className=" col-span-2">
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
