import React, { memo, useContext, useEffect } from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { TranslateContext } from "@contexts/Translation";
import { Button } from "@components/Button";
import TitleInput from "../components/TitleInput";
import { Input } from "@components/Input";
import { SelectInput } from "@components/SelectInput";
import { ICCamera } from "@assets/icons/ICCamera";
import { AuthContext } from "@contexts/AuthContext";
import { Avatar } from "@components/Avatar";
import { useFormik } from "formik";
import { useHandleImage } from "../hooks/useHandleImage";
import * as Yup from "yup";
import { uploadService } from "@services/uploadFile";
import { userService } from "@services/user";
import { PopUpContext } from "@contexts/PopupContext";
import { useNavigate } from "react-router-dom";
import { TextError } from "../components/TextError";

enum AccoutnForm {
  name = "fullname",
  gender = "gender",
  year = "yearOfBirth",
  position = "position",
  phone = "phoneNumber",
  email = "email",
  username = "username",
  password = "password",
}

export const EditInfoAccount = () => {
  const { user } = useContext(AuthContext);
  // const [url , setUrl] = useState(user?.imageUrl)
  const { file, preViewImage, handleChange } = useHandleImage(user?.imageUrl);
  return (
    <div className="px-[24px]">
      <HeaderAdmin title="info_manage._title" />
      <div className="flex items-center h-[48px]"></div>
      <div className=" grid  grid-cols-[88px_1fr]">
        <div>
          <Avatar size={88} link={preViewImage} name={user?.login ?? ""} />
        </div>
        <div>
          <div className="flex flex-row  items-center">
            <div className="ml-[24px] flex flex-col  justify-center mr-[16px]">
              <p className=" leading-[32px] text-_32 font-bold ">
                {user?.fullname ?? ""}
              </p>
              <label htmlFor="library_image">
                <div className="bg-bg_E4F1FF w-[166px] mt-[16px] flex h-[40px] justify-center items-center rounded-[10px] ">
                  <ICCamera></ICCamera>
                  <input
                    type="file"
                    accept="image/*"
                    id="library_image"
                    onChange={handleChange}
                    className="hidden"
                  />
                </div>
              </label>
            </div>

            {/* <ICEditAccount></ICEditAccount> */}
          </div>
        </div>
      </div>
      <InfoAccountTable file={file} />
    </div>
  );
};

const InfoAccountTable = memo(({ file }: { file: File | undefined }) => {
  const { t } = useContext(TranslateContext);
  const { user, updateUser } = useContext(AuthContext);
  const { showError, showSuccess } = useContext(PopUpContext);
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      fullname: "",
      yearOfBirth: "",
      gender: "",
      position: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("message.warn._required"),
      fullname: Yup.string().required("message.warn._required"),
      yearOfBirth: Yup.string().required("message.warn._required"),
      gender: Yup.string().required("message.warn._required"),
      position: Yup.string().required("message.warn._required"),
      phoneNumber: Yup.string().required("message.warn._required"),
    }),
    onSubmit: async (value) => {
      const formData = new FormData()
      let image = user?.imageUrl
      if(file) {
        formData.append('file', file)
        image = await uploadService.postImage(formData)
      }
      delete user?.password
      userService.update({
        ...user,
        ...value,
        imageUrl: image
      }).then(() => {
        updateUser({
          ...user,
          ...value,
          imageUrl: image
        })
        showSuccess("message.success._success")
        formik.resetForm()
      }).catch(() => {
        showError("message.error._error")
      })

    },
  });

  useEffect(() => {
    if (!user) return;
    formik.setFieldValue("email", user?.email || "");
    formik.setFieldValue("fullname", user?.fullname || "");
    formik.setFieldValue("yearOfBirth", user?.yearOfBirth || "");
    formik.setFieldValue("gender", user?.gender || "");
    formik.setFieldValue("position", user?.position || "");
    formik.setFieldValue("phoneNumber", user?.phoneNumber || "");
  }, [user]);

  const handleNavigate = () => {
    navigate(-1)
  }
  return (
    <div className=" bg-white py-[40px] px-[24px]">
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-[24px] [&>div]:relative">
        <div>
          <TitleInput
            forId={AccoutnForm.name}
            name="info_manage._form_create._name._name"
          />
          <Input
            id={AccoutnForm.name}
            name={AccoutnForm.name}
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="info_manage._form_create._name._placeholder"
            className="h-[44px]"
          />
          {formik.errors.fullname && formik.touched.fullname && <TextError message={formik.errors.fullname} />}
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.gender}
            name="info_manage._form_create._gender._name"
          />
          <SelectInput
            id={AccoutnForm.gender}
            name={AccoutnForm.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
            className="text-_14 !text-bg_7E8B99"
          >
            <>
              <option value="" disabled>
                {t("info_manage._form_create._gender._placeholder")}
              </option>
              <option value="Nam">{t("common._male")}</option>
              <option value="Nữ">{t("common._female")}</option>
            </>
          </SelectInput>
          {formik.errors.gender && formik.touched.gender && <TextError message={formik.errors.gender} />}
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.year}
            name="info_manage._form_create._birth._name"
          />
          <Input
            id={AccoutnForm.year}
            name={AccoutnForm.year}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.yearOfBirth}
            placeholder="info_manage._form_create._birth._placeholder"
            className="h-[44px]"
          />
           {formik.errors.yearOfBirth && formik.touched.yearOfBirth && <TextError message={formik.errors.yearOfBirth} />}
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.position}
            name="info_manage._form_create._position._name"
          />
          <Input
            id={AccoutnForm.position}
            name={AccoutnForm.position}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.position}
            placeholder="info_manage._form_create._position._placeholder"
            className="h-[44px]"
          />
          {formik.errors.position && formik.touched.position && <TextError message={formik.errors.position} />}
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.email}
            name="info_manage._form_create._email._name"
          />
          <Input
            id={AccoutnForm.email}
            name={AccoutnForm.email}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="info_manage._form_create._email._placeholder"
            className="h-[44px]"
          />
           {formik.errors.email && formik.touched.email && <TextError message={formik.errors.email} />}
        </div>

        <div>
          <TitleInput
            forId={AccoutnForm.phone}
            name="info_manage._form_create._phone._name"
          />
          <Input
            id={AccoutnForm.phone}
            name={AccoutnForm.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            placeholder="info_manage._form_create._phone._placeholder"
            className="h-[44px]"
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && <TextError message={formik.errors.phoneNumber} />}
        </div>

        <div className=" col-span-2">
          <div className="flex justify-end items-center">
            <Button
              onClick={handleNavigate}
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
