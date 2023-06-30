import React, { useEffect } from "react";
import { TitleTopic } from "./TitleTopic";
import { GroupInputContent } from "@features/dashboard/components/GroupInputContent";
import { useFormik } from "formik";
import { HomeTopicType, ITopicHome } from "@typeRules/home";
import * as Yup from "yup"
import { homeService } from "@services/home";
import { useGetTopic } from "./useGetTopic";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { useHandleLoading } from "@features/dashboard/components/Loading";

export const HomeSales = () => {
  const {listBanner} =  useGetTopic(HomeTopicType.sales)
  const {showSuccess, showError} = useShowMessage()
  const {showLoading} = useHandleLoading()
  const formik = useFormik({
    initialValues: {
      title: "",
      content: ""
    },
    validationSchema: Yup.object({
      title: Yup.string().required("message.form.required").max(40, "message.form.max"),
      content: Yup.string().required("message.form.required").max(350, "message.form.max"),
    })
    ,
    onSubmit: (data) => {
      showLoading()
      formik.setSubmitting(true)
        homeService.updateHomeTopic({
          type: HomeTopicType.sales,
          listBanner: [{
            ...data,
            id: listBanner?.listBanner?.[0].id
          }]
        }).then(() => {
          showSuccess("message.actions.success.update")
        }).catch(() => {
          showError("message.actions.error.post")
        }).finally(() => {
          formik.setSubmitting(false)
        })
    }
  })

  useEffect(() => {
    handleSetData()
}, [listBanner])


const handleSetData = () => {
  if(listBanner) {
    formik.setFieldValue("title", listBanner?.listBanner?.[0].title || "")
    formik.setFieldValue("content",   listBanner?.listBanner?.[0].content || "")
  }
}

  return (
    <>
      <TitleTopic name="adminHome.sales.title"/>
      <GroupInputContent title={formik.values.title} content={formik.values.content} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      <GroupButtonAdmin isAdd={false} loading={formik.isSubmitting} onCancel={handleSetData} onSubmit={formik.handleSubmit} />
    </>
  );
};
