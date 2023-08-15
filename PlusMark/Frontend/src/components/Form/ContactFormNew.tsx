import SendContactModal from "@components/Modal/SentContactModal";
import BtnLoading from "@components/btn-loading/BtnLoading";
import InputPayment from "@components/common/InputPayment";
import TextareaPayment from "@components/common/TextareaPayment";
import { ToastContex } from "@contexts/ToastContex";
import { ModalContext } from "@contexts/contextModal";
import useI18n from "@hooks/useI18n";
import ContactServices from "@services/ContactServices";
import { some } from "@utility/helper";
import clsx from "clsx";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
export default function FormContactNew() {
  const {t} = useI18n()
  const [isLoading, setisLoading] = useState(false)
  const { listToast, onAddToast } = useContext(ToastContex);
  const [contentLength, setContentLength] = useState(0) 
  const { setContentModal, setShowModal } = useContext(ModalContext);

  const formik = useFormik({
    initialValues: {
      customerName: "",
      phone: "",
      email: "",
      content: "",
      status: false,
    },
    validationSchema: Yup.object({
      customerName: Yup.string().required("Vui lòng điền họ và tên."),
      phone: Yup.string()
        .required("Vui lòng điền số điện thoại.")
        .matches(/^[0-9]{10}$/, "Vui lòng nhập số điện thoại."),
      email: Yup.string().required("Vui lòng điền email.")
        .matches(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Vui lòng nhập đúng email."
        ),
      content: Yup.string().required("Vui lòng điền nội dung."),
    }),
    onSubmit: (values) => {
      if (
        values.customerName.trim() !== "" &&
        values.content.trim() !== "" &&
        values.email.trim() !== "" &&
        values.phone.trim() !== "" && !isLoading 
      ) {
        console.log(values);
        const data = {
          fullName:  values.customerName,
          phoneNumber: values.phone,
          email: values.email,
          content: values.content,
        }

        try {
          setisLoading(true)
          ContactServices.post(data)
            .then(data => {
              setisLoading(false)
              resetForm()
              setContentModal(<SendContactModal/>);
              setShowModal(true);
            })
        } catch (error) {
          setisLoading(false)
          onAddToast({ type: "error", message: `Có lỗi xảy ra khi gửi tư vấn!` });
        }
        
      } else {

      }
    },
  });
  
  const contentHandleChange = (e: some) => {
    formik.handleChange(e);
    setContentLength(e.target.value.length)
  }


  const resetForm = () => {
    formik.resetForm();
  };
  
  return (
    <div className="">

      <form onSubmit={formik.handleSubmit} className=" ">
        <div className="h-auto mb-4">
          <InputPayment 
            name="customerName" 
            value={formik.values.customerName} 
            setValue={formik.handleChange} 
            onBlur={formik.handleBlur}
            label={t("about_us.contact.form.name") || "Họ và tên"} required  
            background="bg-gray-100"
            className="px-4 lg:px-8 py-3 text-background-100  border-2 border-gray-200"
            error={formik.touched.customerName && formik.errors.customerName}
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="h-auto flex-1">
            <InputPayment 
              name="phone" 
              value={formik.values.phone} 
              setValue={formik.handleChange} 
              onBlur={formik.handleBlur}
              label={t("about_us.contact.form.phone") || "Số điện thoại"} required  
              background="bg-gray-100"
              className="px-4 lg:px-8 py-3 text-background-100  border-2 border-gray-200"
              error={formik.touched.phone && formik.errors.phone}
            />
          </div>

          <div className="h-auto flex-1">
            <InputPayment 
              name="email" 
              value={formik.values.email} 
              setValue={formik.handleChange} 
              onBlur={formik.handleBlur}
              label={t("about_us.contact.form.email") || "Email"} required  
              background="bg-gray-100"
              className="px-4 lg:px-8 py-3 text-background-100  border-2 border-gray-200"
              error={formik.touched.email && formik.errors.email}
            />
          </div>
        </div>

        <div className="">
          <TextareaPayment
            name="content" 
            value={formik.values.content} 
            setValue={contentHandleChange} 
            onBlur={formik.handleBlur}
            label={t("about_us.contact.form.content") || "Nội dung"} required  
            background="bg-gray-100"
            className="px-4 lg:px-8 py-3 text-background-100  border-2 border-gray-200"
            error={formik.touched.content && formik.errors.content}
            maxLength={3000}
            contentLength={contentLength}
          />
        </div>

        <div className="flex justify-start items-center text-white">
          <BtnLoading
            isLoading={isLoading}
            type="submit"
            className={clsx("bg-main text-normal lg:text-normal1 font-semibold flex justify-center items-center uppercase px-6 lg:px-12 py-3 lg:py-5 rounded-md", {
              "opacity-70 cursor-default": isLoading
            })}
          > {t("about_us.contact.form.btn")}</BtnLoading>
        </div>
      </form>
    </div>
  );
}
