import { ICDeleteTrashLight } from "@assets/icons/ICDeleteTrashLight";
import TitleInput from "@components/TitleInput";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { GroupInputContent } from "@features/dashboard/components/GroupInputContent";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { Input } from "@features/dashboard/components/Input";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { TextError } from "@features/dashboard/components/TextError";
import { useHandleImage } from "@features/dashboard/home/useHandleImage";
import { uploadService } from "@services/upload";
import type { HomeTopicType, ITopicHome } from "@typeRules/home";
import clsx from "clsx";
import { useFormik } from "formik";
import React, { memo, useEffect } from "react";
import * as Yup from "yup";

type Props = {
  data?: ITopicHome;
  onSubmit: (data: ITopicHome) => void;
  onDelete?: (id: number) => void;
};

export const BannerHomeItem = memo(({ data, onSubmit, onDelete }: Props) => {
  const formik = useFormik<ITopicHome>({
    initialValues: {
      title: "",
      content: "",
      redirectUrl: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().trim()
        .required("message.form.required")
        .max(40, "message.form.max"),
      content: Yup.string().trim()
        .required("message.form.required")
        .max(350, "message.form.max"),
      redirectUrl: Yup.string().required("message.form.required"),
    }),
    onSubmit: async (dataValue) => {
      try {
        if (!preViewImage && !file) {
          handleMessageFile();
          return;
        }
        let link = data?.linkMedia || null;
        let id = data?.id || null;
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          const images = await uploadService.postImage(formData);
          link = images.list?.[0].linkMedia || null;
        }
        onSubmit({
          ...dataValue,
          linkMedia: link || "",
          id,
        });
        if (!data) {
          formik.resetForm();
          resetImage();
        }
      } catch (error) {}
    },
  });

  const deleteBanner = () => {
    if (data) onDelete?.(Number(data?.id));
  };

  const {
    preViewImage,
    handleChange,
    handleDelete,
    file,
    handleMessageFile,
    message,
    resetImage,
    refInput,
  } = useHandleImage(data?.linkMedia || "");

  const handleSetData = (listBanner?: ITopicHome) => {
    formik.setFieldValue("title", listBanner?.title || "");
    formik.setFieldValue("content", listBanner?.content || "");
    formik.setFieldValue("redirectUrl", listBanner?.redirectUrl || "");
  };

  useEffect(() => {
    if (data) {
      handleSetData(data);
    }
  }, [data]);

  const handleResetData = () => {
    if (!data) {
      resetImage();
      formik.resetForm();
    } else {
      handleSetData(data);
    }
  };

  return (
    <div>
      {/* {!!data?.linkMedia ? ( */}
      <div className="mt-[24px]">
        <div className="grid grid-cols-[288px_1fr] relative gap-x-[24px]">
          <div className="flex flex-col">
            <TitleInput
              isRequired={true}
              forId=""
              name="button._upload_image"
            />
            <div className="flex-1">
              <div
                className={clsx("h-full max-h-[190px]", {
                  hidden: !!preViewImage.trim(),
                })}
              >
                <InputUploadFile ref={refInput} onChange={handleChange} />
                <TextError message={message} />
              </div>
              <div
                // onClick={handleClickInput}
                className={clsx("h-full w-full max-h-[190px]", {
                  hidden: !preViewImage.trim(),
                })}
              >
                <ImagePreview onDelete={handleDelete} url={preViewImage} />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <GroupInputContent
              title={formik.values.title || ""}
              content={formik.values.content || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              titleError={
                formik.touched.title && formik.errors.title
                  ? formik.errors.title
                  : ""
              }
              contentError={
                formik.touched.content && formik.errors.content
                  ? formik.errors.content
                  : ""
              }
            />
          </div>
          {data ? (
            <button
              onClick={deleteBanner}
              className=" absolute bottom-0 flex items-center justify-center right-[-64px] h-[190px] w-[40px] bg-bg_F1F1F1"
            >
              <ICDeleteTrashLight />
            </button>
          ) : null}
        </div>
        <div className="mt-4">
          <TitleInput name="adminBanner.link" />
          <Input
            name="redirectUrl"
            value={formik.values.redirectUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="adminBanner.link_placeholder"
          />
          {formik.errors.redirectUrl && formik.touched.redirectUrl && (
            <TextError message={formik.errors.redirectUrl} />
          )}
        </div>
        <GroupButtonAdmin
          onCancel={handleResetData}
          onSubmit={formik.handleSubmit}
          isAdd={false}
        />
      </div>
      {/* ) : null} */}
    </div>
  );
})
