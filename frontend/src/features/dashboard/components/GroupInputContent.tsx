import TitleInput from "@components/TitleInput";
import React, { memo, useEffect } from "react";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { useFormik } from "formik";
import { useGetTopic } from "../home/components/useGetTopic";
import { HomeTopicType, ITopicHome } from "@typeRules/home";
import { GroupButtonAdmin } from "./GroupButtonAdmin";
import * as Yup from "yup"
import { TextError } from "./TextError";
import { homeService } from "@services/home";
import { useShowMessage } from "./DiglogMessage";

export const GroupInputContent = memo(() => {
  const {listBanner} =  useGetTopic(HomeTopicType.sales)
  const {showSuccess, showError} = useShowMessage()
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
      formik.setSubmitting(true)
        homeService.updateHomeTopic({
          type: HomeTopicType.sales,
          listBanner: [{
            ...data,
            id: listBanner?.listBanner?.[0].id
          }]
        }).then(() => {
          showSuccess("message.actions.success.post")
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
    console.log({listBanner})
    if(listBanner) {
      formik.setFieldValue("title", listBanner.listBanner?.[0]?.title)
      formik.setFieldValue("content",  listBanner.listBanner?.[0]?.content || "")
    }
  }



  return (
    <>
      <div className="grid grid-cols-1 gap-y-[16px]">
        <div>
          <TitleInput isRequired={false} name={"adminHome.form.title"} />
          <Input value={formik.values.title} name="title" onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="adminHome.form.title_placeholder" maxLength={40} />
          {formik.errors.title && formik.touched.title && <TextError message={formik.errors.title} option={{max: 40}} />}
        </div>
        <div>
          <TitleInput isRequired={false} name={"adminHome.form.content"} />
          <Textarea name="content" value={formik.values.content} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="adminHome.form.content_placeholder" maxLength={350} />
          {formik.errors.content && formik.touched.content && <TextError message={formik.errors.content} option={{max: 350}} />}
        </div>
      </div>
      <GroupButtonAdmin isAdd={false} loading={formik.isSubmitting} onCacel={handleSetData} onSubmit={formik.handleSubmit} />
    </>
  );
})
