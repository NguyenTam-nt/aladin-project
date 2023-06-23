import TitleInput from "@components/TitleInput";
import { useAuthContext } from "@contexts/hooks/auth";
import { useModalContext } from "@contexts/hooks/modal";
import { Button } from "@features/dashboard/components/Button";
import { TextError } from "@features/dashboard/components/TextError";
import { Textarea } from "@features/dashboard/components/Textarea";
import { commentService } from "@services/comment";
import type { IComment, ICommentChild } from "@typeRules/comment";
import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

type Props = {
  data: IComment
  onUpdate: (data:IComment) => void

}

export const ReplyModal = ({data, onUpdate}:Props) => {
  const {user} = useAuthContext()
    const {hideModal} = useModalContext()
    const {t} = useTranslation()
    const formik = useFormik<ICommentChild>({
      initialValues: {
        id: data.id,
        content: "",
        fullname: user?.fullname
      },
      validationSchema: Yup.object({
        content: Yup.string().trim().required("message.form.required"),
      }),
      onSubmit: (values) => {
        commentService.update(values).then((data) => {
          console.log({data})
        })
      }
    })
  return (
    <form onSubmit={formik.handleSubmit} className="w-[800px] bg-white py-[40px] px-[24px]">
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
          <Textarea name="content" value={formik.values.content} onChange={formik.handleChange} onBlur={formik.handleBlur} className="h-[192px]" placeholder="adminComment.modal.content_placeholder" />
         {formik.errors.content && formik.touched.content && <TextError message={formik.errors.content} />}  
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
