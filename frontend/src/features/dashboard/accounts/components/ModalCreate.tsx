import { Input } from "@components/Input";
import { SelectInput } from "@components/SelectInput";
import { ModalContext } from "@contexts/ModalContext";
import { PopUpContext } from "@contexts/PopupContext";
import { TranslateContext } from "@contexts/Translation";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { TextError } from "@features/dashboard/components/TextError";
import { TitleForm } from "@features/dashboard/components/TitleForm";
import TitleInput from "@features/dashboard/components/TitleInput";
import { userService } from "@services/user";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup"

enum AccoutnForm {
  name = "fullname",
  gender = "gender",
  year = "yearOfBirth",
  position = "position",
  phone = "phoneNumber",
  email = "email",
  username = "login",
  password = "password",
}

type Props = {
  onSubmit: () => void
}

export const ModalCreate = ({onSubmit}:Props) => {
  const { t } = useContext(TranslateContext);
  const {showSuccess, showError} = useContext(PopUpContext)
  const {hideModal} = useContext(ModalContext)

  const formik = useFormik({
    initialValues: {
      email: "",
      login: "",
      password: "",
      fullname: "",
      yearOfBirth: "",
      gender: "",
      position: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("message.warning._required"),
      login: Yup.string().required("message.warning._required"),
      password: Yup.string().required("message.warning._required"),
      fullname: Yup.string().required("message.warning._required"),
      yearOfBirth: Yup.string().required("message.warning._required"),
      gender: Yup.string().required("message.warning._required"),
      position: Yup.string().required("message.warning._required"),
      phoneNumber: Yup.string().required("message.warning._required"),
    }),
    onSubmit: (values) => {
        userService.post(values).then((_) => {
          showSuccess("message.success._success");
          onSubmit()
          formik.resetForm()
        }).catch(() => {
          showError("message.error._error");
        }).finally(() => {
          hideModal()
        })
    }
  })

  return (
    <div className="w-[800px] bg-white py-[40px] px-[24px]">
      <TitleForm title="account._form_create._title" />
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-[24px] [&>div]:relative">
        <div>
          <TitleInput
            forId={AccoutnForm.name}
            name="account._form_create._name._name"
          />
          <Input
            id={AccoutnForm.name}
            placeholder="account._form_create._name._placeholder"
            className="h-[44px]"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            name={AccoutnForm.name}
            onBlur={formik.handleBlur}
          />
        </div>
      {formik.errors.fullname && formik.touched.fullname && <TextError message={formik.errors.fullname} />}
        <div>
          <TitleInput
            forId={AccoutnForm.gender}
            name="account._form_create._gender._name"
          />
          <SelectInput
            id={AccoutnForm.gender}
            className="text-_14 !text-bg_7E8B99"
            name={AccoutnForm.gender}
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <>
              <option value="" disabled>
                {t("account._form_create._gender._placeholder")}
              </option>
              <option value={"Nam"}>{t("common._male")}</option>
              <option value={"Nữ"}>{t("common._female")}</option>
            </>
          </SelectInput>
          {formik.errors.gender && formik.touched.gender && <TextError message={formik.errors.gender} />}
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.year}
            name="account._form_create._year._name"
          />
          <Input
            id={AccoutnForm.year}
            value={formik.values.yearOfBirth}
            onChange={formik.handleChange}
            placeholder="account._form_create._year._placeholder"
            className="h-[44px]"
            name={AccoutnForm.year}
          />
           {formik.errors.yearOfBirth && formik.touched.yearOfBirth && <TextError message={formik.errors.yearOfBirth} />}
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.position}
            name="account._form_create._position._name"
          />
          <Input
           id={AccoutnForm.position} 
           name={AccoutnForm.position}
           value={formik.values.position}
           onChange={formik.handleChange}
            placeholder="account._form_create._position._placeholder"
            className="h-[44px]"
          />
        {formik.errors.position && formik.touched.position && <TextError message={formik.errors.position} />}
        </div>
        <div>
          <TitleInput
            forId={AccoutnForm.email}
            name="account._form_create._email._name"
          />
          <Input
            id={AccoutnForm.email}
            name={AccoutnForm.email}
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="account._form_create._email._placeholder"
            className="h-[44px]"
          />
        {formik.errors.email && formik.touched.email && <TextError message={formik.errors.email} />}
        </div>
        <div>
          <TitleInput
            forId={AccoutnForm.phone}
            name="account._form_create._phone._name"
          />
          <Input
            id={AccoutnForm.phone}
            name={AccoutnForm.phone}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            placeholder="account._form_create._phone._placeholder"
            className="h-[44px]"
          />
        </div>
        {formik.errors.phoneNumber && formik.touched.phoneNumber && <TextError message={formik.errors.phoneNumber} />}
        <div>
          <TitleInput
            forId={AccoutnForm.username}
            name="account._form_create._username._name"
          />
          <Input
            id={AccoutnForm.username}
            name={AccoutnForm.username}
            value={formik.values.login}
            onChange={formik.handleChange}
            placeholder="account._form_create._username._placeholder"
            className="h-[44px]"
          />
          {formik.errors.login && formik.touched.login && <TextError message={formik.errors.login} />}
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.password}
            name="account._form_create._password._name"
          />
          <Input
            id={AccoutnForm.password}
            name={AccoutnForm.password}
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="account._form_create._password._placeholder"
            className="h-[44px]"
          />
            <div>{formik.errors.password && formik.touched.password && <TextError message={formik.errors.password} />}
        </div>
        <div className=" mt-[24px] col-span-2">
          <GroupButtonAdmin />
        </div>
      </div>
    </form>
    </div>
  );
};
