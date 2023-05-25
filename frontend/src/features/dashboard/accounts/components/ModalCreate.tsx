import { Input } from "@components/Input";
import { SelectInput } from "@components/SelectInput";
import { TranslateContext } from "@contexts/Translation";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { TitleForm } from "@features/dashboard/components/TitleForm";
import TitleInput from "@features/dashboard/components/TitleInput";
import React, { useContext } from "react";

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

export const ModalCreate = () => {
  const { t } = useContext(TranslateContext);
  return (
    <div className="w-[800px] bg-white py-[40px] px-[24px]">
      <TitleForm title="account._form_create._title" />
      <div className="grid grid-cols-2 gap-[24px]">
        <div>
          <TitleInput
            forId={AccoutnForm.name}
            name="account._form_create._name._name"
          />
          <Input
            id={AccoutnForm.name}
            placeholder="account._form_create._name._placeholder"
            className="h-[44px]"
          />
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.gender}
            name="account._form_create._gender._name"
          />
          <SelectInput
            id={AccoutnForm.name}
            className="text-_14 !text-bg_7E8B99"
          >
            <>
              <option selected disabled>
                {t("account._form_create._gender._placeholder")}
              </option>
              <option>{t("common._male")}</option>
              <option>{t("common._female")}</option>
            </>
          </SelectInput>
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.year}
            name="account._form_create._year._name"
          />
          <Input
            id={AccoutnForm.year}
            placeholder="account._form_create._year._placeholder"
            className="h-[44px]"
          />
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.name}
            name="account._form_create._position._name"
          />
          <SelectInput
            id={AccoutnForm.name}
            className="text-_14 !text-bg_7E8B99"
          >
            <>
              <option selected disabled>
                {t("account._form_create._position._placeholder")}
              </option>
              <option>Nhân viên</option>
              <option>Quản lý</option>
            </>
          </SelectInput>
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.email}
            name="account._form_create._email._name"
          />
          <Input
            id={AccoutnForm.email}
            placeholder="account._form_create._email._placeholder"
            className="h-[44px]"
          />
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.phone}
            name="account._form_create._phone._name"
          />
          <Input
            id={AccoutnForm.phone}
            placeholder="account._form_create._phone._placeholder"
            className="h-[44px]"
          />
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.username}
            name="account._form_create._username._name"
          />
          <Input
            id={AccoutnForm.username}
            placeholder="account._form_create._username._placeholder"
            className="h-[44px]"
          />
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.password}
            name="account._form_create._password._name"
          />
          <Input
            id={AccoutnForm.password}
            placeholder="account._form_create._password._placeholder"
            className="h-[44px]"
          />
        </div>
        <div className=" col-span-2">
          <GroupButtonAdmin onSubmit={() => {}} />
        </div>
      </div>
    </div>
  );
};
