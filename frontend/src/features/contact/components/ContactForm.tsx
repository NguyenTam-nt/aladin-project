import TitleInput from '@components/TitleInput';
import TitleOfContent from '@components/TitleOfContent';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik'
import * as Yup from "yup";
import type { IContact } from '@typeRules/contact';
import ContactService from '@services/ContactService';
import { TextError } from '@features/dashboard/components/TextError';
import { useHandleLoading } from '@features/dashboard/components/Loading';
import { useShowMessage } from '@features/dashboard/components/DiglogMessage';

function ContactForm() {
  const { t } = useTranslation();
  const { showLoading , hideLoading} = useHandleLoading();
  const { showError, showSuccess, showWarning } = useShowMessage();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      phone: "",
      email: "",
      address: "",
      content: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().trim().required("message.form.required")
        .max(70, "message.form.max"),
      phone: Yup.string()
      .trim()
      .required("message.form.required")
      .matches(
        /([0-9]{10})\b/g,
        "message.form.phone"
      )
      .length(10, "message.form.phone-length"),
      email: Yup.string()
        .trim().email("message.form.email")
        .required("message.form.required"),
      address: Yup.string().trim().max(256, "message.form.max"),
      content: Yup.string().trim().required("message.form.required").max(2000, "message.form.max"),
    }),
    onSubmit: async (data) => {
      try {
        showLoading();
        let request: IContact = {
          fullname: data.fullname,
          phone: data.phone,
          email: data.email,
          address: data.address,
          content: data.content
        }
      
          ContactService
            .post(request)
            .then(() => {
              showSuccess("contact.send_success");
              // goBack();
              formik.resetForm();
              // hideLoading()
            })
            .catch(() => {
              showError("contact.send_fail");
            });
        
      } catch (error) {}
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-6 lg:mt-10">
      <div className="grid grid-cols-2 gap-x-5 gap-y-5">
        <div className="col-span-2 lg:col-span-1 flex flex-col">
          <TitleInput isRequired name="form.name" />
          <input
            type="text"
            className="w-full px-3 py-2 radius-tl-br16 placeholder:text-sm outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent"
            placeholder={t("form.inputName") as string}
            name="fullname"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.fullname && formik.touched.fullname && (
            <TextError message={formik.errors.fullname} option={{max: 70}}/>
          )}
        </div>
        <div className="col-span-2 lg:col-span-1  flex flex-col">
          <TitleInput isRequired name="form.phoneNumber" />
          <input
            type="text"
            className="w-full px-3 py-2 radius-tl-br16 placeholder:text-sm outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent"
            placeholder={t("form.inputPhoneNumber") as string}
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <TextError message={formik.errors.phone} />
          )}
        </div>
        <div className="col-span-2 lg:col-span-1  flex flex-col">
          <TitleInput isRequired name="form.email" />
          <input
            type="text"
            className="w-full px-3 py-2 placeholder:text-sm radius-tl-br16 outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent"
            placeholder={t("form.inputEmail") as string}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <TextError message={formik.errors.email} />
          )}
        </div>
        <div className="col-span-2 lg:col-span-1  flex flex-col">
          <TitleInput isRequired={false} name="form.address" />
          <input
            type="text"
            className="w-full px-3 py-2 radius-tl-br16 placeholder:text-sm outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent"
            placeholder={t("form.inputAddress") as string}
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.address && formik.touched.address && (
            <TextError message={formik.errors.address} option={{max: 256}} />
          )}
        </div>
        <div className="col-span-2  flex flex-col">
          <TitleInput isRequired name="form.content" />
          <textarea
            rows={6}
            className="w-full resize-none px-3 py-2 placeholder:text-sm radius-tl-br16 outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent"
            placeholder={t("form.inputContent") as string}
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.content && formik.touched.content && (
            <TextError message={formik.errors.content} option={{max: 2000}}/>
          )}
        </div>
      </div>
      <div className="flex items-center justify-start mt-9">
        <button type="submit" className="radius-tl-br16 w-spc167 py-3.5 text-center text-sm leading-5 font-bold bg-primary text-white">
          {t("contact.contactBtn")}
        </button>
      </div>
    </form>
  );
}

export default ContactForm