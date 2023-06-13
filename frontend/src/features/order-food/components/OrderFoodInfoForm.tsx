import TitleInput from '@components/TitleInput';
import TitleOfContent from '@components/TitleOfContent';
import { useFormik } from 'formik';
import * as Yup from "yup";
import React, {useState} from 'react'
import { useTranslation } from 'react-i18next';
import { useModalContext } from '@contexts/hooks/modal';
import { ModalOrderFoodSuccess } from './ModalOrderFoodSuccess';

function OrderFoodInfoForm() {
  const { t } = useTranslation();
  const { setElementModal, hideModal } = useModalContext();
  const handleShowModal = () => {
    setElementModal(<ModalOrderFoodSuccess />);
  };

  const [isDisable, setDisable] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      day: "",
      hour: "",
      place: "",
      method: "Trực tiếp",
      note: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .trim()
        .required("Không được để trống họ tên.")
        .min(5, "Họ tên phải tối thiểu 5 kí tự."),
      phoneNumber: Yup.string()
        .trim()
        .required("Không được để trống số điện thoại")
        .matches(
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
          "Số điện thoại không phù hợp"
        )
        .length(10, "Số điện thoại phải đủ 10 số."),
      email: Yup.string()
        .trim()
        .required("Không được để trống email.")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email không đúng định dạng."
        ),
      day: Yup.date()
        .min(new Date().toLocaleDateString(), "Ngày phải tối thiểu từ hôm nay.")
        .required("Phải chọn ngày đặt bàn."),
      hour: Yup.string().trim().required("Phải chọn khung giờ đặt bàn."),
      place: Yup.string().trim().required("Phải chọn cơ sở."),
      note: Yup.string()
        .trim()
        .required("Không được để trống")
        .min(20, "Ghi chú tối thiểu 20 kí tự."),
    }),
    onSubmit: (values) => {
      console.log(values, "formik");
    },
  });
  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-x-5 gap-y-5">
        <div className="col-span-1">
          <TitleInput isRequired name="form.name" />
          <input
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange} 
            className={"h-12 w-full px-3 py-2 radius-tl-br16 placeholder:text-sm outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent " +
            (errors.fullName && touched.fullName ? "!border-red_error" : "border-text_A1A0A3")
            }
            placeholder={t("form.inputName") as string} 
          />
          {errors.fullName && touched.fullName && (
            <small className="text-red_error">{errors.fullName}</small>
          )}
        </div>
        <div className="col-span-1">
          <TitleInput isRequired name="form.phoneNumber" />
          <input
            type="text"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            className={"h-12 w-full px-3 py-2 radius-tl-br16 placeholder:text-sm outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent " + 
              (errors.phoneNumber && touched.phoneNumber ? "!border-red_error" : "border-text_A1A0A3")
            }
            placeholder={t("form.inputPhoneNumber") as string}
          />
           {errors.phoneNumber && touched.phoneNumber && (
            <small className="text-red_error">{errors.phoneNumber}</small>
          )}
        </div>
        <div className="col-span-1">
          <TitleInput isRequired name="form.email" />
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            className={"h-12 w-full px-3 py-2 placeholder:text-sm radius-tl-br16 outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent " +
              (errors.email && touched.email ? "!border-red_error" : "border-text_A1A0A3")
            }
            placeholder={t("form.inputEmail") as string}
          />
          {errors.email && touched.email && (
            <small className="text-red_error">{errors.email}</small>
          )}
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <TitleInput isRequired name="form.chooseDay" />
            <input
              type="date"
              name="day"
              value={values.day}
              onChange={handleChange}
              className={
                "h-12 w-full px-3 py-2 radius-tl-br16  placeholder:text-sm radius-tl-br16 outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent " +
                (errors.day && touched.day  ? "!border-red_error" : "border-text_A1A0A3")
              }
              placeholder={t("form.choseDayOder") as string}
            />
            {errors.day && touched.day  && (
              <small className="text-red_error">{errors.day}</small>
            )}
          </div>
          <div className="col-span-1">
            <TitleInput isRequired name="form.chooseHour" />
            <input
              type="time"
              name="hour"
              value={values.hour}
              onChange={handleChange}
              className={
                "h-12 w-full px-3 py-2 radius-tl-br16  placeholder:text-sm radius-tl-br16 outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent  " +
                (errors.hour && touched.hour ? "!border-red_error" : "border-text_A1A0A3")
              }
              placeholder={t("form.choseHourOder") as string}
            />
            {errors.hour && touched.hour && (
              <small className="text-red_error">{errors.hour}</small>
            )}
          </div>
        </div>
        <div className="col-span-2 ">
          <TitleInput isRequired name="form.place" />
          <select
            value={values.place}
            name="place"
            onChange={handleChange}
            className={
              "h-12 w-full px-3 py-2 radius-tl-br16  placeholder:text-sm radius-tl-br16 outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent  " +
              (errors.place && touched.place ? "!border-red_error" : "border-br_E6E6E6")
            }
          >
            <option value="" disabled>
              {t("form.chosePlace")}
            </option>
            <option value="cs1">cơ sở 1</option>
            <option value="cs1">cơ sở 2</option>
            <option value="2">cơ sở 3</option>
            <option value="3">cơ sở 4</option>
          </select>
          {errors.place && touched.place && (
            <small className="text-red_error">{errors.place}</small>
          )}
        </div>
        <div className="col-span-2 ">
          <TitleInput isRequired name="form.method" />
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <input type='radio' id="person-radio" className='cursor-pointer'
                name="method"
                value="Trực tiếp"
                onChange={handleChange}
                defaultChecked={formik.values.method == "Trực tiếp"}
              />
              <label
                htmlFor="person-radio" className='text-sm cursor-pointer'>
                  {t("form.method1") as string}
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input type='radio' id="gohome-radio" className='cursor-pointer'
                name="method"
                value="Mang về"
                onChange={handleChange}
                defaultChecked={formik.values.method == "Mang về"}
              />
            <label
              htmlFor="gohome-radio" className='text-sm cursor-pointer'>
                {t("form.method2") as string}
            </label>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <TitleInput isRequired name="form.note" />
          <textarea
            rows={6}
            name="note"
            value={values.note}
            onChange={handleChange}
            className={"w-full resize-none px-3 py-2 placeholder:text-sm radius-tl-br16 outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent " +
              (errors.note && touched.note  ? "!border-red_error" : "border-br_E6E6E6")
            }
            placeholder={t("form.inputNote") as string}
          />
          {errors.note && touched.note && (
            <small className="text-red_error">{errors.note}</small>
          )}
        </div>
      </div>
      <div className="flex items-center justify-start mt-9">
        <button 
          type="submit"
          onClick={handleShowModal}
          className="radius-tl-br16 w-spc167 py-3 text-center text-sm leading-5 font-bold bg-primary text-white">
          Gửi đơn hàng
        </button>
      </div>
    </div>
  );
}

export default OrderFoodInfoForm