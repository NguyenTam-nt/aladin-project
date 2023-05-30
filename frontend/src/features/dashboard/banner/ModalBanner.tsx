import React, { ChangeEvent, useContext, useEffect } from "react";
import { TitleForm } from "../components/TitleForm";
import TitleInput from "../components/TitleInput";
import { Input } from "@components/Input";
import { InputUploadFile } from "../components/InputUploadFIle";
import { useHandleImage } from "../hooks/useHandleImage";
import { ImagePreview } from "../components/ImagePreview";
import { GroupButtonAdmin } from "../components/GroupButtonAdmin";
import type { IBanner } from "@typeRules/banner";
import { uploadService } from "@services/uploadService";
import { bannerService } from "@services/banner";
import { PopUpContext } from "@contexts/PopupContext";
import { ModalContext } from "@contexts/ModalContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TranslateContext } from "@contexts/Translation";
import { TextError } from "../components/TextError";
import { translateService } from "@services/translate";

type Props = {
  data: IBanner;
  onSubmit: (data: IBanner) => void;
};

export const ModalBanner = ({ data, onSubmit }: Props) => {
  const { preViewImage, handleChange, file } = useHandleImage(data.link);
  const { showSuccess, showError } = useContext(PopUpContext);
  const { hideModal } = useContext(ModalContext);
  const {isVn} = useContext(TranslateContext)
  const formik = useFormik({
    initialValues: {
      title: "",
      titleKo: "",
      // link: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("message.warn._required"),
      titleKo: Yup.string().required("message.warn._required"),
    }),onSubmit: async (values) => {
      // const handleSubmit = async () => {
        const formData = new FormData();
        let image = "";
        if (file) {
          formData.append("file", file);
          image = await uploadService.postImage(formData);
        }
        bannerService
          .putBanner({
            ...data,
            ...values,
            link: image ? image : data.link,
          })
          .then((data) => {
            onSubmit(data);
            showSuccess("message.success._success");
            hideModal();
          })
          .catch(() => {
            showError("message.error._error");
          });
      // };
    }})


  const handleTranslate = async (name: string, value: string) => {
    try {
      const content = await translateService.post(value);
      formik.setFieldValue(`${name}Ko`, content);
    } catch (error) {}
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    if (isVn) {
      const { name, value } = event.target;
      handleTranslate(name, value);
    }
    formik.handleBlur(event);
  };

  useEffect(() => {
    if(data) {
      formik.setFieldValue("title", data.title)
      formik.setFieldValue("titleKo", data.titleKo)
    }
  },[data])


  return (
    <form onSubmit={formik.handleSubmit} className="w-[1144px] py-[40px] px-[24px] bg-white">
      <TitleForm title="admin._banner._form._title_edit" />
      <div className="grid grid-cols-1 gap-y-[24px]">
        <div className="relative">
          <TitleInput forId="" name="admin._banner._form._name" />
          <Input onBlur={handleBlur} onChange={formik.handleChange} name={isVn ? "title" : "titleKo"} value={isVn ? formik.values.title : formik.values.titleKo} placeholder="admin._banner._form._name_placeholder" />
       {formik.errors.title && formik.touched.title &&  <TextError message={formik.errors.title ?? ""} />}  
        </div>
        <div>
          <TitleInput forId="" name="admin._banner._form._upload" />
          <div className="flex h-[168px] gap-x-[24px]">
            <div className="w-[424px] h-full">
              <InputUploadFile onChange={handleChange} />
            </div>
            <div className="flex-1 h-full">
              <ImagePreview url={preViewImage} />
            </div>
          </div>
        </div>
        <GroupButtonAdmin isAdd={false} />
      </div>
    </form>
  );
};
