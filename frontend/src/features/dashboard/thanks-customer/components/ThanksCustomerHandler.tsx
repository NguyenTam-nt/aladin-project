import Editor from "@components/Editor";
import TitleInput from "@components/TitleInput";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { Input } from "@features/dashboard/components/Input";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { useHandleLoading } from "@features/dashboard/components/Loading";
import { TextError } from "@features/dashboard/components/TextError";
import { Textarea } from "@features/dashboard/components/Textarea";
import { TitleTopic } from "@features/dashboard/home/components/TitleTopic";
import { useHandleImage } from "@features/dashboard/home/useHandleImage";
import { policyService } from "@services/policy";
import { reviewService } from "@services/thanksCustomer";
import { uploadService } from "@services/upload";
import type { IReview } from "@typeRules/index";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

export const ThanksCustomerHandler = () => {
  const params = useParams();
  const isAdd = useMemo(() => {
    return !params.id;
  }, []);

  const { showLoading } = useHandleLoading();
  const { showError, showSuccess } = useShowMessage();
  const [review, setReview] = useState<IReview>();
  const navigation = useNavigate();
  const imageProduct = useHandleImage(review?.linkProduct || "");
  const imageAvatar = useHandleImage(review?.linkGuest || "");

  useEffect(() => {
    if (!isAdd) {
      reviewService.getById(Number(params.id)).then((data) => {
        setReview(data);
        formik.setFieldValue("fullname", data.fullname);
        formik.setFieldValue("career", data.career);
        formik.setFieldValue("comment", data.comment);
      });
    }
  }, [isAdd]);

  const formik = useFormik<IReview>({
    initialValues: {
      comment: "",
      fullname: "",
      career: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required("message.form.required"),
      fullname: Yup.string().required("message.form.required"),
      career: Yup.string().required("message.form.required"),
    }),
    onSubmit: async (data) => {
      try {
        if (isAdd && (!imageProduct.file || !imageAvatar.file)) {
          if (!imageProduct.file) {
            imageProduct.handleMessageFile();
            // return;
          }
          if (!imageAvatar.file) {
            imageAvatar.handleMessageFile();
          }

          return;
        }
        showLoading();
        let linkAvatar = review?.linkGuest || "";
        let linkProduct = review?.linkProduct || "";

        if (imageProduct.file || imageAvatar.file) {
          if (imageProduct.file) {
            const formDataProduct = new FormData();
            formDataProduct.append("file", imageProduct.file);
            const images = await uploadService.postImage(formDataProduct);
            linkProduct =
              images?.list[0].linkMedia || review?.linkProduct || "";
          }

          if (imageAvatar.file) {
            const formDataAvatar = new FormData();
            formDataAvatar.append("file", imageAvatar.file);
            const images = await uploadService.postImage(formDataAvatar);
            linkAvatar = images?.list[0].linkMedia || review?.linkProduct || "";
          }
        }
        if (isAdd) {
          reviewService
            .post({ ...data, linkGuest: linkAvatar, linkProduct, id: null })
            .then(() => {
              showSuccess("customer.message_post_success");
              // goBack();
              formik.resetForm();
              imageProduct.resetImage();
              imageAvatar.resetImage();
            })
            .catch(() => {
              showError("message.actions.error.delete_banner");
            });
        } else {
          reviewService
            .update({ ...review, linkGuest: linkAvatar, linkProduct, ...data })
            .then(() => {
              showSuccess("customer.message_update_success");
              // goBack();
            })
            .catch(() => {
              showError("message.actions.error.delete_banner");
            });
        }
      } catch (error) {}
    },
  });

  const goBack = () => {
    navigation(-1);
  };

  return (
    <div>
      <TitleTopic
        name={isAdd ? "customer.form.title_add" : "customer.form.title_edit"}
        isRequired={false}
      />
      <div className="grid grid-cols-2 gap-[24px]">
        <div className=" col-span-2 flex items-center gap-x-[24px]">
          <div>
            <TitleInput name="customer.form.upload_image_product" />
            <div className="w-[288px] h-[190px]">
              {!imageProduct.preViewImage ? (
                <InputUploadFile onChange={imageProduct.handleChange} />
              ) : (
                <ImagePreview
                  url={imageProduct.preViewImage}
                  onDelete={imageProduct.handleDelete}
                />
              )}
            </div>
            <TextError message={imageProduct.message} />
          </div>
          <div>
            <TitleInput name="customer.form.upload_avatar" />
            <div className="w-[288px] h-[190px]">
              {!imageAvatar.preViewImage ? (
                <InputUploadFile onChange={imageAvatar.handleChange} />
              ) : (
                <ImagePreview
                  url={imageAvatar.preViewImage}
                  onDelete={imageAvatar.handleDelete}
                />
              )}
            </div>
            <TextError message={imageAvatar.message} />
          </div>
        </div>
        <div>
          <TitleInput name="customer.form.name" />
          <Input
            name="fullname"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="customer.form.name_placeholder"
          />
          {formik.errors.fullname && formik.touched.fullname && (
            <TextError message={formik.errors.fullname} />
          )}
        </div>
        <div>
          <TitleInput name="customer.form.job" />
          <Input
            name="career"
            value={formik.values.career}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="customer.form.job_placeholder"
          />
          {formik.errors.career && formik.touched.career && (
            <TextError message={formik.errors.career} />
          )}
        </div>

        <div className=" col-span-2">
          <TitleInput name="customer.form.comment" />
          <Textarea
            name="comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={180}
            placeholder="customer.form.comment_placeholder"
          />
          {formik.errors.comment && formik.touched.comment && (
            <TextError message={formik.errors.comment} />
          )}
        </div>

        <div className=" col-span-2 flex justify-end">
          <GroupButtonAdmin
            isAdd={isAdd}
            onCancel={goBack}
            onSubmit={formik.handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};
