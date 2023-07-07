import TitleInput from '@components/TitleInput';
import { Button } from '@features/dashboard/components/Button';
import { Input } from '@features/dashboard/components/Input';
import { Textarea } from '@features/dashboard/components/Textarea';
import type { IContact } from '@typeRules/contact';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik'
import * as Yup from "yup";
import ContactService from '@services/ContactService';
import { useShowMessage } from '@features/dashboard/components/DiglogMessage';
import { useModalContext } from '@contexts/hooks/modal';
import { TextError } from '@features/dashboard/components/TextError';
import { useHandleLoading } from '@features/dashboard/components/Loading';

type Props = {
  data: IContact,
  loadData: any
}

function ModalResponseContact({data, loadData}: Props) {
  const { t } = useTranslation();
  const { hideModal } = useModalContext();
  const { showLoading } = useHandleLoading();
  const { showError, showSuccess, showWarning } = useShowMessage();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      phone: "",
      email: "",
      address: "",
      content: "",
      feedback: ""
    },
    validationSchema: Yup.object({
      fullname: Yup.string().trim().required("message.form.required"),
      phone: Yup.string()
        .trim()
        .required("message.form.required")
        .matches(
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
          "message.form.phone"
        )
        .length(10, "message.form.phone-length"),
      email: Yup.string()
        .trim()
        .required("message.form.required")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "message.form.email"
        ),
      address: Yup.string().trim(),
      content: Yup.string().trim().required("message.form.required"),
      feedback: Yup.string().trim().required("message.form.required")
    }),
    onSubmit: async (values) => {
      try {
        showLoading()
        let request: IContact = {
          id: data?.id,
          fullname: values.fullname,
          phone: values.phone,
          email: values.email,
          address: values.address,
          content: values.content,
          feedback: values.feedback.trim()
        }
      
          ContactService
            .update(request)
            .then(() => {
              if(loadData) loadData()
              // showSuccess("adminContact.message.response_success");
              hideModal()
            })
            .catch(() => {
              showError("adminContact.message.response_fail");
            });
        
      } catch (error) {}
    },
  });

  useEffect(() => {
    if(data) {
      formik.setFieldValue("fullname", data.fullname);
      formik.setFieldValue("phone", data.phone);
      formik.setFieldValue("email", data.email);
      formik.setFieldValue("address", data.address);
      formik.setFieldValue("content", data.content);
      formik.setFieldValue("feedback", data.feedback);
    }
  }, [data])
  

  return (
    <form onSubmit={formik.handleSubmit} className=" w-[90vw] md:w-[600px] xl:w-[1144px] h-auto bg-white py-10 px-6">
      <h2 className="text-_24 xl:text-_32 font-bold text-text_primary uppercase text-center mb-10">
        {t("adminContact.form.title") }
      </h2>
      <div className="">
        <h3 className="text-_14 xl:text-_20 font-bold text-text_primary uppercase text-left mb-3">
          {t("adminContact.form.customer_title") }
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <TitleInput isRequired={true} name={"form.name"} />
              <Input name="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
              />
            </div>
            <div className="col-span-1">
              <TitleInput isRequired={true} name={"form.phoneNumber"} />
              <Input  name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
              />
            </div>
            <div className="col-span-1">
              <TitleInput isRequired={true} name={"form.email"} />
              <Input name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
              />
            </div>
            <div className="col-span-1">
              <TitleInput isRequired={false} name={"form.address"} />
              <Input name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
              />
            </div>
            <div className="md:col-span-2">
              <TitleInput isRequired={true} name={"form.content"} />
              {/* <Input name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
              /> */}
              <Textarea 
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
              />
            </div>
          </div>
      </div>
      <div className="mt-6">
        <h3 className="text-_20 font-bold text-text_primary uppercase text-left mb-3">
          {t("adminContact.form.response_title") }
        </h3>

        <div className="">
          <TitleInput isRequired={true} name={"adminContact.form.response"} />
          <Textarea placeholder="adminContact.form.input_response"
              name="feedback"
              value={formik.values.feedback}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={data.status}
            />
            {!data.status && formik.errors.feedback && formik.touched.feedback && (
              <TextError message={formik.errors.feedback} />
            )}
        </div>
      </div>
      {!data.status && 
      <div className="flex justify-center items-center mt-[24px]">
        <Button
        type="button"
          onClick={hideModal}
          text="button._cancel"
          color="empty"
          className="!w-[120px] border border-TrueBlue_500 mr-[24px]"
        />
        <Button type="submit" onClick={() => "onSubmit?.()"}  text={true ? "button._save" : "button._save"} color="primary" className="!w-[120px]" />
      </div>
      }
    </form>
  )
}

export default ModalResponseContact