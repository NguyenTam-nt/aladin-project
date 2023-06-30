import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import React, { memo, useEffect } from "react";
import { HomeTopicType, ITopicHome } from "@typeRules/home";
import { useHandleImage } from "../useHandleImage";
import TitleInput from "@components/TitleInput";
import { ICDeleteTrashLight } from "@assets/icons/ICDeleteTrashLight";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import clsx from "clsx";
import { useFormik } from "formik";
import { uploadService } from "@services/upload";
import * as Yup from "yup";
import { TextError } from "@features/dashboard/components/TextError";
import { GroupInputContent } from "@features/dashboard/components/GroupInputContent";

type Props = {
  type: HomeTopicType;
  data?: ITopicHome;
  onSubmit: (data: ITopicHome) => void;
  onDelete?: (id: number) => void;
};

export const TopicByType = memo(({ type, data, onSubmit, onDelete }: Props) => {
  const formik = useFormik<ITopicHome>({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("message.form.required")
        .max(40, "message.form.max"),
      content: Yup.string()
        .required("message.form.required")
        .max(350, "message.form.max"),
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
          resetImage()
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
    refInput,
    handleDelete,
    file,
    handleMessageFile,
    message,
    resetImage
  } = useHandleImage(data?.linkMedia || "");

  const handleSetData = (listBanner?: ITopicHome) => {
    formik.setFieldValue("title", listBanner?.title || "");
    formik.setFieldValue("content", listBanner?.content || "");
  };

  useEffect(() => {
    if (data) {
      handleSetData(data);
    }
  }, [data]);

  const handleResetData = () => {
    if(!data) {
      resetImage();
      formik.resetForm()
    }else {
      handleSetData(data)
    }
  }

  return (
    <>
      <div
        className={clsx("grid grid-cols-1 relative gap-x-[24px]", {
          "grid-cols-[288px_1fr]": type !== HomeTopicType.sales,
        })}
      >
        {type !== HomeTopicType.sales ? (
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
                //   onClick={handleClickInput}
                className={clsx("h-full w-full max-h-[190px]", {
                  hidden: !preViewImage.trim(),
                })}
              >
                <ImagePreview onDelete={handleDelete} url={preViewImage} />
              </div>
            </div>
          </div>
        ) : null}
        <div className="flex-1">
          <GroupInputContent
            title={formik.values.title ?? ""}
            content={formik.values.content ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            titleError={formik.touched.title && formik.errors.title ? formik.errors.title : ""}
            contentError={formik.touched.content && formik.errors.content ? formik.errors.content : ""}
          />
        </div>
        {(type !== HomeTopicType.sales && data) ? (
          <button
            onClick={deleteBanner}
            className=" absolute bottom-0 flex items-center justify-center right-[-64px] h-[190px] w-[40px] bg-bg_F1F1F1"
          >
            <ICDeleteTrashLight />
          </button>
        ) : null}
      </div>
      <GroupButtonAdmin
        onCancel={handleResetData}
        onSubmit={formik.handleSubmit}
        isAdd={false}
      />
    </>
  );
});
