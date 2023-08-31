import { CancelWhite } from "@assets/icons";
import { ModalContext } from "@contexts/contextModal";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import yup from "custom/yup/yupInstance";
import { ContactType } from "commons/contannt";
import ContactServices from "@services/ContactServices";
import { ToastContex } from "@contexts/ToastContex";

interface Props {
  item: ContactType;
  handleForm: (value: ContactType) => void;
}
function FormFeedBackContact(props: Props) {
  const { item, handleForm } = props;
  const { onAddToast } = useContext(ToastContex);
  const { setShowModal } = useContext(ModalContext);
  const [isDisable, setDisable] = useState<boolean>(false);
  const { handleSubmit, handleChange, values, errors, setValues } = useFormik({
    initialValues: {
      reply: item.replyContent || "",
      fullName: item.fullName,
      phoneNumber: item.phoneNumber,
      email: item.email,
      content: item.content,
      address: item.address
    },
    validationSchema: yup.object({
      reply: yup.string().trim().required("Vui lòng nhập nội dung tư vấn"),
    }),
    onSubmit: async (values) => {
      try {
        if (item.status === "REPLIED") {
          onAddToast({ type: "warn", message: "Mục đã phản hồi" });
          setShowModal(false);
          return;
        }

        const newValue = {
          ...item,
          status: "REPLIED",
          replyContent: values.reply,
          id: item.id
        };
        const { id, ...requestData } = newValue;
        setDisable(true);
        const responsed : any = await ContactServices.put(item.id, requestData);
        if (responsed) {
          handleForm(responsed);
          onAddToast({ type: "success", message: "Gửi phản hồi thành công." });
        }
        setDisable(false);
        setShowModal(false);
      } catch (error) {
        onAddToast({ type: "error", message: "Có lỗi thử lại sau" });
        setDisable(false);
        setShowModal(false);
      }
    },
  });

  useEffect(() => {
    // Update form values when the "item" prop changes
    setValues({
      reply: item.replyContent || "",
      fullName: item.fullName,
      phoneNumber: item.phoneNumber,
      email: item.email,
      content: item.content,
      address: item.address
    });
  }, [item]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[888px]  bg-white h-auto p-6 pb-5 relative">
        {/* <CancelWhite
          className="absolute bottom-[100%] -right-3 z-10 cursor-pointer"
          onClick={() => setShowModal(false)}
        /> */}
        <h3 className="text-main text-center text-2xl font-semibold l tracking-[.03] mb-9">
          PHẢN HỒI YÊU CẦU TƯ VẤN
        </h3>

        <h4 className="font-bold py-4">Nội dung khách hàng yêu cầu tư vấn</h4>
        <div className="w-full flex items-center justify-between gap-6 mb-6">
          <div className="flex flex-col  items-start w-1/2">
            <label className="font-bold mb-2">Họ và tên <span className="text-[#C53434]">*</span></label>
            <input
              type="fullName"
              value={values.fullName}
              readOnly
              className="border py-3 font-normal px-5 w-full"
            />
          </div>
          <div className="flex flex-col items-start w-1/2">
            <label className="font-bold mb-2">Số điện thoại <span className="text-[#C53434]">*</span></label>
            <input
              type="phoneNumber"
              value={values.phoneNumber}
              readOnly
              className="border py-3 font-normal px-5 w-full"
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-between gap-6 mb-6">
          <div className="flex flex-col  items-start w-1/2">
            <label className="font-bold mb-2">Email <span className="text-[#C53434]">*</span></label>
            <input
              type="email"
              value={values.email}
              readOnly
              className="border py-3 font-normal px-5 w-full"
            />
          </div>
          <div className="flex flex-col items-start w-1/2">
            <label className="font-bold mb-2">Địa chỉ <span className="text-[#C53434]">*</span></label>
            <input
              type="address"
              value={values.address}
              readOnly
              className="border py-3 font-normal px-5 w-full"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="font-bold">Nội dung <span className="text-[#C53434]">*</span></label>
          <input
            name="content"
            value={values.content}
            readOnly
            className="border py-3 px-5 w-full font-normal"
          />
        </div>
        <h4 className="font-bold py-4">Nội dung phản hồi tới khách hàng</h4>
        <div className="my-6">
          <label className="font-bold">Phản hồi khách hàng <span className="text-[#C53434]">*</span></label>
          <textarea
            name="reply"
            value={values.reply}
            readOnly={item.status === "REPLIED"}
            onChange={handleChange}
            placeholder="Nhập nội dung tư vấn khách hàng"
            rows={8}
            className={
              "border py-3 px-5 w-full resize-none font-normal placeholder:text-gray-300 " +
              (errors.reply && "border-main")
            }
          ></textarea>
          {errors.reply && <small className="text-main">{errors.reply}</small>}
        </div>

        {!(item.status === "REPLIED") && (
          <div className="flex items-center justify-center gap-10px">
            <button
              onClick={() => setShowModal(false)}
              className="py-3 px-10 border border-main flex items-center text-main text-small font-bold bg-inherit"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isDisable}
              className={"py-3 px-10 bg-header text-white font-bold "}
            >
              Gửi
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default FormFeedBackContact;
