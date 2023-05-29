import { Input } from "@components/Input";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { TitleForm } from "@features/dashboard/components/TitleForm";
import TitleInput from "@features/dashboard/components/TitleInput";
import { useHandleImage } from "@features/dashboard/hooks/useHandleImage";
import type { IPost } from "@typeRules/post";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { ChangeEvent, useContext, useEffect, useMemo } from "react";
import { TranslateContext } from "@contexts/Translation";
import { TextError } from "@features/dashboard/components/TextError";
import { uploadService } from "@services/uploadService";
import { ModalContext } from "@contexts/ModalContext";
import { translateService } from "@services/translate";

enum BannerForm {
  name = "name",
  des = "description",
  path = "path",
}

type Props = {
  type?: "ADD" | "EDIT";
  onSubmit: (data: IPost) => void;
  data?: IPost
  isAny?: boolean
};

export const ModalHandlePost = ({ type = "ADD", onSubmit, data, isAny = false}: Props) => {
  const { isVn } = useContext(TranslateContext);
  const { hideModal } = useContext(ModalContext);

  const isAdd = useMemo(() => {
    return type === "ADD";
  }, [type]);

  const formik = useFormik({
    initialValues: {
      title: "",
      titleKo: "",
      description: "",
      descriptionKo: "",
      image: "",
      link: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("message.warn._required"),
      titleKo: Yup.string().required("message.warn._required"),
      description: Yup.string().required("message.warn._required"),
      descriptionKo: Yup.string().required("message.warn._required"),
      // image:  Yup.string().required("message.warn._required"),
      link: Yup.string().required("message.warn._required"),
    }),
    onSubmit: async (values) => {
      try {
        if (isAdd && !file) {
          handleMessageFile();
          return;
        }
        const formData = new FormData();
        let image: string = "";
        if (file) {
          formData.append("file", file);
          image = await uploadService.postImage(formData);
        }
        if (isAdd) {
          onSubmit({
            ...values,
            outstanding: true,
            image: image,
          });
        }else {
          onSubmit({
            ...data,
            ...values,
            image: image ? image : data?.image,
          });
        }
        hideModal();
      } catch (error) {}
    },
  });

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

  const {
    preViewImage,
    handleChange,
    handleDelete,
    file,
    handleMessageFile,
    message,
  } = useHandleImage(formik.values.image);

  useEffect(() => {
      if(!isAdd && data) {
        formik.setFieldValue("title", data.title);
        formik.setFieldValue("titleKo", data.titleKo);
        formik.setFieldValue("description", data.description);
        formik.setFieldValue("descriptionKo", data.descriptionKo);
        formik.setFieldValue("image", data.image);
        formik.setFieldValue("link", data.link);
      }
  }, [isAdd, data])


  return (
    <div className="w-[788px] bg-white py-[40px] px-[24px]">
      <TitleForm
        title={
          isAdd
            ? "admin._home._banner._form._title"
            : "admin._home._banner._form._title_edit"
        }
      />
      <div className="grid grid-cols-1 gap-[24px]">
        <div className="relative">
          <TitleInput
            forId={BannerForm.name}
            name="admin._home._banner._form._name"
          />
          <Input
            id={BannerForm.name}
            value={isVn ? formik.values.title : formik.values.titleKo}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            name={isVn ? "title" : "titleKo"}
            placeholder="admin._home._banner._form._name_placeholder"
          />
          {formik.errors.title && formik.touched.title && (
            <TextError message={formik.errors.title ?? ""} />
          )}
        </div>

        <div className="relative">
          <TitleInput
            forId={BannerForm.des}
            name="admin._home._banner._form._des"
          />
          <Input
            id={BannerForm.des}
            value={
              isVn ? formik.values.description : formik.values.descriptionKo
            }
            onChange={formik.handleChange}
            onBlur={handleBlur}
            name={isVn ? "description" : "descriptionKo"}
            placeholder="admin._home._banner._form._des_placeholder"
          />
          {formik.errors.description && formik.touched.descriptionKo && (
            <TextError message={formik.errors.descriptionKo ?? ""} />
          )}
        </div>

        <div className="relative">
          <TitleInput
            forId={BannerForm.des}
            name="admin._home._banner._form._upload"
          />
          <div className="flex items-center h-[168px]">
            <div className="w-[442px] h-full mr-[24px]">
              <InputUploadFile onChange={handleChange} />
            </div>
            {preViewImage ? (
              <div className="w-[250px] h-full">
                <ImagePreview isVideos={isAny} onDelete={handleDelete} url={preViewImage} />
              </div>
            ) : null}
          </div>
          {message && <TextError message={message} />}
        </div>
        <div>
          <TitleInput
            forId={BannerForm.path}
            name="admin._home._banner._form._path"
          />
          <Input
            id={BannerForm.path}
            onChange={formik.handleChange}
            value={formik.values.link}
            name="link"
            placeholder="admin._home._banner._form._path_placeholder"
          />
        </div>
        <div>
          <GroupButtonAdmin isAdd={isAdd} onSubmit={formik.handleSubmit} />
        </div>
      </div>
    </div>
  );
};
