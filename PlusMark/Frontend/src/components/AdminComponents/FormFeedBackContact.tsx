import { CancelWhite } from "@assets/icons";
import { ModalContext } from "@contexts/contextModal";
import React, { useContext, useState } from "react";
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
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      reply: item.reply || "",
      fullName: item.fullName,
      phoneNumber: item.phoneNumber,
      email: item.email,
      content: item.content,
    },
    validationSchema: yup.object({
      reply: yup.string().trim().required("Vui lòng nhập nội dung tư vấn"),
    }),
    onSubmit: async (values) => {
      try {
        if (item.status) {
          onAddToast({ type: "warn", message: "Mục đã phản hồi" });
          setShowModal(false);
          return;
        }
        const newValue = {
          ...item,
          status: true,
          reply: values.reply,
        };
        setDisable(true);
        const responsed = await ContactServices.put(item.id, newValue);
        if (responsed.data) {
          handleForm(responsed.data);
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[752px] rounded-lg bg-white h-auto p-6 pb-5 relative">
        <CancelWhite
          className="absolute bottom-[100%] -right-3 z-10 cursor-pointer"
          onClick={() => setShowModal(false)}
        />
        <h3 className="text-main text-center text-2xl font-semibold l tracking-[.03] mb-9">
          PHẢN HỒI YÊU CẦU TƯ VẤN
        </h3>

        <div className="w-full flex items-center justify-between gap-6 mb-6">
          <input
            type="fullName"
            value={values.fullName}
            readOnly
            className="textInput py-3 font-normal px-5 w-2/4"
          />
          <input
            type="phoneNumber"
            value={values.phoneNumber}
            readOnly
            className="textInput py-3 font-normal px-5 w-2/4"
          />
        </div>
        <div className="mb-6">
          <input
            type="email"
            value={values.email}
            readOnly
            className="textInput py-3 font-normal px-5 w-full"
          />
        </div>
        <div className="mb-6">
          <textarea
            rows={5}
            name="content"
            value={values.content}
            readOnly
            className="textInput py-3 px-5 w-full font-normal resize-none"
          ></textarea>
        </div>
        <div className="mb-6">
          <textarea
            name="reply"
            value={values.reply}
            readOnly={item.status}
            onChange={handleChange}
            placeholder="Nhập nội dung tư vấn khách hàng"
            rows={8}
            className={
              "textInput py-3 px-5 w-full resize-none font-normal placeholder:text-gray-300 " +
              (errors.reply && "border-main")
            }
          ></textarea>
          {errors.reply && <small className="text-main">{errors.reply}</small>}
        </div>

        {!item.status && (
          <div className="flex items-center justify-end gap-10px">
            <button
              onClick={() => setShowModal(false)}
              className="rounded-md py-2 px-3 border border-main flex items-center text-main text-small font-normal bg-icon"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isDisable}
              className={"btn-normal text-sm leading-18 "}
            >
              Phản hồi
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default FormFeedBackContact;
