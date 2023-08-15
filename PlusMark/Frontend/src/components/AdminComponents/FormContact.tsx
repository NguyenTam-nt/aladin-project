import BtnLoading from "@components/btn-loading/BtnLoading";
import { ModalContext } from "@contexts/contextModal";
import { ToastContex } from "@contexts/ToastContex";
import SupportOnlineServices, {
  SupportOnlineInfo,
} from "@services/SupportOnlineServices";
import { SUPPORT_ONLINE } from "@utility/constants";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as yup from "yup";

function FormContact({
  id,
  appName,
  script,
  fullname,
  valueContact,
  setValueContact,
}: {
  id?: string;
  appName?: string;
  script?: string;
  fullname?: string;
  valueContact: Array<SupportOnlineInfo>;
  setValueContact: React.Dispatch<React.SetStateAction<SupportOnlineInfo[]>>;
}) {
  const { setShowModal } = useContext(ModalContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onAddToast } = useContext(ToastContex);

  const { handleSubmit, handleChange, resetForm, values, errors, touched } =
    useFormik({
      initialValues: {
        appName: appName || SUPPORT_ONLINE.PHONE,
        script: script || "",
        fullname: fullname || "",
      },
      enableReinitialize: true,
      validationSchema: yup.object().shape(
        {
          script: yup
            .string()
            .trim()
            .required("Vui lòng điền thông tin liên hệ.")
            .when("appName", {
              is: (appName: string) => appName == SUPPORT_ONLINE.PHONE,
              then: (schema) =>
                schema.matches(
                  /^[0-9]{10}$/,
                  "Vui lòng nhập đúng định dạng số điện thoại."
                ),
            }),
          fullname: yup
            .string()
            .trim()
            .required("Vui lòng điền tên người hỗ trợ."),
        },
        [["script", "appName"]]
      ),
      onSubmit: async (values) => {
        try {
          setIsLoading(true);
          const dataSubmit = {
            appName: values.appName,
            script: values.script,
            fullname: values.fullname,
          };
          let response;
          if (id) {
            response = await SupportOnlineServices.put(id, dataSubmit);
          } else {
            response = await SupportOnlineServices.post(dataSubmit);
          }
          if (response.status == 200) {
            const data = response.data;
            let contacts;
            if (id) {
              contacts = valueContact.map((item) =>
                item.id == data.id ? data : item
              );
            } else {
              contacts = [...valueContact, data];
            }
            setValueContact(contacts);
            return onAddToast({ type: "success", message: `Lưu thành công` });
          }
          return onAddToast({ type: "error", message: `Có lỗi xảy ra` });
        } catch (ex) {
          console.log(ex);
          onAddToast({ type: "error", message: `Có lỗi xảy ra` });
        } finally {
          setIsLoading(false);
          setShowModal(false);
          resetForm();
        }
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[465px] h-auto px-11 pt-18px p-6 bg-white rounded-md">
        <p className="text-2xl font-semibold text-[#F45538] mb-6 text-center">
          {id ? "Sửa thông tin liên hệ" : "Thêm thông tin liên hệ"}
        </p>
        <div className="flex flex-col gap-7 mb-[18px]">
          <div className="flex flex-col gap-[10px]">
            <label className="text-lg text-[#F45538]">
              Phương thức liên hệ*
            </label>
            <select
              name="appName"
              className="textInput p-3 w-full"
              value={values.appName}
              onChange={handleChange}
            >
              <option value={SUPPORT_ONLINE.PHONE}>Số điện thoại</option>
              <option value={SUPPORT_ONLINE.ZALO}>Zalo</option>
              <option value={SUPPORT_ONLINE.FACEBOOK}>Messenger</option>
            </select>
          </div>

          <div className="flex flex-col gap-[10px]">
            <label className="text-lg text-[#F45538]">Thông tin liên hệ*</label>
            <div>
              <input
                name="script"
                value={values.script}
                placeholder="Nhập thông tin liên hệ"
                className="py-3 px-5 w-full textInput"
                onChange={handleChange}
              />
              {errors.script && touched.script && (
                <small className="text-[14px] leading-3 mt-1 text-[#F31A1A]">
                  {errors.script}
                </small>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <label className="text-lg text-[#F45538]">Tên người hỗ trợ*</label>
            <div>
              <input
                name="fullname"
                value={values.fullname}
                placeholder="Nhập tền người hỗ trợ"
                className="py-3 px-5 w-full textInput"
                onChange={handleChange}
              />
              {errors.fullname && touched.fullname && (
                <small className="text-[14px] leading-3 mt-1 text-[#F31A1A]">
                  {errors.fullname}
                </small>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="text-normal font-normal py-10px px-5 mr-5 rounded-md text-gray-300 border border-gray-300"
            onClick={() => {
              setShowModal(false);
              resetForm();
            }}
          >
            Hủy
          </button>
          <BtnLoading
            isLoading={isLoading}
            type="submit"
            className={
              "text-normal font-bold py-10px px-5 rounded-md text-white border border-gray-100 bg-buttonSucces"
            }
          >
            Xác nhận
          </BtnLoading>
        </div>
      </div>
    </form>
  );
}

export default FormContact;
