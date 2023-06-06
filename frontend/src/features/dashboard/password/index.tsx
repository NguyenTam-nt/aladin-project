import React, { memo, useCallback, useContext } from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
// import { TranslateContext } from "@contexts/Translation";
import { Button } from "@components/Button";
import TitleInput from "../components/TitleInput";
import { Input } from "@components/Input";
import { AuthContext } from "@contexts/AuthContext";
import { Avatar } from "@components/Avatar";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TextError } from "../components/TextError";
import { userService } from "@services/user";
import { PopUpContext } from "@contexts/PopupContext";

enum AccoutnForm {
  currentPassword = "currentPassword",
  newPassword = "newPassword",
  confirmPassword = "confirmPassword",
}

export const EditPassword = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="px-[24px]">
      <HeaderAdmin title="info_manage._title" />
      <div className=" grid  grid-cols-[88px_1fr]">
        <div>
          <Avatar link={user?.imageUrl} name={user?.login || ""} size={88} />
        </div>
        <div className="ml-[24px] flex flex-col  justify-center ">
          <p className=" leading-[32px] text-_32 font-bold ">
            {user?.fullname || ""}
          </p>
          <p className="mt-[15px]">{user?.position}</p>
        </div>
      </div>
      <InfoAccountTable />
    </div>
  );
};

const InfoAccountTable = memo(() => {
  const { user } = useContext(AuthContext);
  const { showError, showSuccess } = useContext(PopUpContext);
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("message.warn._required"),
      newPassword: Yup.string()
        .required("message.warn._required")
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
          "message.warn._validate_password"
        )
        .notOneOf([Yup.ref("currentPassword")], "message.warn._password_old"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("newPassword")],
        "message.warn._confirm_password"
      ),
    }),
    onSubmit: (values) => {
      const password = values.newPassword;
      userService
        .update({
          ...user,
          password,
        })
        .then(() => {
          showSuccess("message.success._success");
          resetForm()
        })
        .catch(() => {
          showError("message.error._error");
        });
    },
  });

  const resetForm = useCallback(() => {
    formik.resetForm();
  }, []);

  return (
    <div className=" bg-white py-[40px] px-[24px]">
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 gap-[24px] [&>div]:relative"
      >
        <div>
          <TitleInput
            forId={AccoutnForm.currentPassword}
            name="info_manage._form_create._old_password._name"
          />
          <Input
            id={AccoutnForm.currentPassword}
            type="password"
            name={AccoutnForm.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="info_manage._form_create._old_password._placeholder"
            className="h-[44px]"
          />
          {formik.errors.currentPassword && formik.touched.currentPassword && (
            <TextError message={formik.errors.currentPassword} />
          )}
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.newPassword}
            name="info_manage._form_create._new_password._name"
          />
          <Input
            id={AccoutnForm.newPassword}
            name={AccoutnForm.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            placeholder="info_manage._form_create._new_password._placeholder"
            className="h-[44px]"
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <TextError message={formik.errors.newPassword} />
          )}
        </div>
        <div>
          <TitleInput
            forId={AccoutnForm.confirmPassword}
            name="info_manage._form_create._re_new_password._name"
          />
          <Input
            id={AccoutnForm.confirmPassword}
            type="password"
            name={AccoutnForm.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="info_manage._form_create._re_new_password._placeholder"
            className="h-[44px]"
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <TextError message={formik.errors.confirmPassword} />
          )}
        </div>
        <div>
          <div className="flex justify-end items-center">
            <Button
              onClick={resetForm}
              text="button._cancel"
              color="empty"
              className="!w-[120px] border border-br_E9ECEF mr-[24px]"
            />
            <Button
              type="submit"
              text="button._edit"
              color="primary"
              className="!w-[120px]"
            />
          </div>
        </div>
      </form>
    </div>
  );
});
