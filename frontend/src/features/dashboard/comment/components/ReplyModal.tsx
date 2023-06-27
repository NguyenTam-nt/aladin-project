import TitleInput from "@components/TitleInput";
import { useAuthContext } from "@contexts/hooks/auth";
import { useModalContext } from "@contexts/hooks/modal";
import { Button } from "@features/dashboard/components/Button";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { TextError } from "@features/dashboard/components/TextError";
import { Textarea } from "@features/dashboard/components/Textarea";
import { commentService } from "@services/comment";
import type { IComment, ICommentChild } from "@typeRules/comment";
import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

type Props = {
  data: IComment;
  onUpdate: (data: ICommentChild) => void;
};

export const ReplyModal = ({ data, onUpdate }: Props) => {
  const { user } = useAuthContext();
  const { hideModal } = useModalContext();
  const { showSuccess, showError } = useShowMessage();
  const { t } = useTranslation();
  const formik = useFormik<ICommentChild>({
    initialValues: {
      id: null,
      content: "",
      idParent: Number(data.id),
    },
    validationSchema: Yup.object({
      content: Yup.string().trim().required("message.form.required").max(2000, "Nội dung trả lời tối đa 2000 ký tự."),
    }),
    onSubmit: (values) => {
      commentService
        .post(values)
        .then((data) => {
          onUpdate(data);
          showSuccess("message.actions.success.update");
        })
        .catch((error) => {
          console.log({error})
          showError("message.actions.error.delete_banner");
        });
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-[800px] bg-white py-[40px] px-[24px]"
    >
      <h3 className="text-_20 text-center mb-[40px] font-bold  text-GreyPrimary">
        {t("adminComment.modal.title")}
      </h3>
      <div className=" grid grid-cols-1 gap-y-4">
        <div className="flex items-baseline gap-x-6">
          <TitleInput name="adminComment.modal.position" isRequired={false} />
          <span className="text-_14 text-GreyPrimary">{user?.fullname}</span>
        </div>
        <div>
          <TitleInput forId="content" name="adminComment.modal.content" />
          <Textarea
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[192px]"
            placeholder="adminComment.modal.content_placeholder"
            maxLength={2000}
          />
          {formik.errors.content && formik.touched.content && (
            <TextError message={formik.errors.content} />
          )}
        </div>
      </div>
      <div className="flex justify-center items-center  mt-[40px]">
        <Button
          type="button"
          onClick={hideModal}
          text="button._cancel"
          color="empty"
          className="!w-[120px] mr-[24px]"
        />
        <Button
          type="submit"
          // onClick={formik.handleSubmit}
          text="button._send"
          color="primary"
          className="!w-[120px]"
        />
      </div>
    </form>
  );
};
