import SendContactModal from "@components/Modal/SentContactModal";
import BtnLoading from "@components/btn-loading/BtnLoading";
import ShadowButton from "@components/common/ShadowButton";
import UnderlineInput from "@components/common/UnderlineInput";
import { ToastContex } from "@contexts/ToastContex";
import { ModalContext } from "@contexts/contextModal";
import useI18n from "@hooks/useI18n";
import ContactServices from "@services/ContactServices";
import clsx from "clsx";
import { useFormik } from "formik";
import { FormEvent, useContext, useState } from "react";
import * as Yup from "yup";

const ContactFooterForm = () => {
  const {t} = useI18n()
  const [isLoading, setisLoading] = useState(false)
  const { setContentModal, setShowModal } = useContext(ModalContext);
  const { listToast, onAddToast } = useContext(ToastContex);

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

  const resetForm = () => {
    formik.resetForm();
  };

  return (
    <div>
      <h1 className=" text-normal1 font-semibold text-white">
        {t("footer.form.contact_title")}
      </h1>
      {/* <p className="text-white py-1">
        Thông tin khách hàng sẽ được tuyệt đối bảo mật
      </p> */}

      <form className="py-2" onSubmit={formik.handleSubmit}>
        <UnderlineInput
          className="my-2"
          placeholder="Họ và tên"
          name="customerName"
          value={formik.values.customerName}
          onBlur={formik.handleBlur}
          error={formik.touched.customerName && formik.errors.customerName}
          onChange={formik.handleChange}
        />
        <UnderlineInput
          className="my-2"
          placeholder="Số điện thoại"
          name="phone"
          value={formik.values.phone}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && formik.errors.phone}
          onChange={formik.handleChange}
        />
        <UnderlineInput
          className="my-2"
          placeholder="Email"
          name="email"
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <UnderlineInput
          className="my-2"
          placeholder="Nội dung cần được tư vấn"
          name="content"
          value={formik.values.content}
          onBlur={formik.handleBlur}
          error={formik.touched.content && formik.errors.content}
          onChange={formik.handleChange}
        />
        <BtnLoading
            isLoading={isLoading}
            type="submit"
            className={clsx("btn-footer flex justify-center items-center text-wap-regular2 text-white mt-4", {
              "opacity-70 cursor-default": isLoading
            })}
          > {t("footer.form.contact_button")}</BtnLoading>
        
      </form>
    </div>
  );
};

export default ContactFooterForm;
