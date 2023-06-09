// import { CalendarIcon } from "@assets/icons/iconComponent";
import { Button } from "@components/Button";
import TitleInput from "@components/TitleInput";
import TitleOfContent from "@components/TitleOfContent";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const TableReserVationForm = () => {
  const { t } = useTranslation();
  const [isDisable, setDisable] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      numberCustomers: "",
      day: "",
      hour: "",
      place: "",
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
      numberCustomers: Yup.number()
        .min(1, "Tối thiểu 1 khách hàng.")
        .required("Không được để trống khách hàng."),
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
    <form onSubmit={handleSubmit}>
      <div className="pb-36">
        <div className="h-auto radius-tl-br bg-text_white py-16 2xl:px-28 lg:px-24 sm:px-11 px-8">
          <TitleOfContent
            name="titleofcontent.tableReserVationForm"
            className="w-full text-center mb-4 "
          />
          <p className="text-2xl leading-9 text-center font-normal text-text_secondary">
            {t("form.timeOrder")}
          </p>
          <div className="mt-12">
            <div className="grid grid-cols-2 sm:gap-x-5 gap-y-5">
              <div className="sm:col-span-1 col-span-2">
                <TitleInput isRequired name="form.name" />
                <input
                  type="text"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  className={
                    "w-full px-3 py-2 radius-tl-br16 text-sm leading-22  placeholder:text-sm outline-none border " +
                    (errors.fullName ? "border-red_error" : "border-br_E6E6E6")
                  }
                  placeholder={t("form.inputName") as string}
                />
                {errors.fullName && touched.fullName && (
                  <small className="text-red_error">{errors.fullName}</small>
                )}
              </div>
              <div className="sm:col-span-1 col-span-2">
                <TitleInput isRequired name="form.phoneNumber" />
                <input
                  type="text"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  className={
                    "w-full px-3 py-2 radius-tl-br16  text-sm leading-22 placeholder:text-sm outline-none border  " +
                    (errors.phoneNumber
                      ? "border-red_error"
                      : "border-br_E6E6E6")
                  }
                  placeholder={t("form.inputPhoneNumber") as string}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <small className="text-red_error">{errors.phoneNumber}</small>
                )}
              </div>
              <div className="sm:col-span-1 col-span-2">
                <TitleInput isRequired name="form.email" />
                <input
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className={
                    "w-full px-3 py-2  text-sm leading-22 placeholder:text-sm radius-tl-br16 outline-none border " +
                    (errors.email ? "border-red_error" : "border-br_E6E6E6")
                  }
                  placeholder={t("form.inputEmail") as string}
                />
                {errors.email && touched.email && (
                  <small className="text-red_error">{errors.email}</small>
                )}
              </div>
              <div className="sm:col-span-1 col-span-2">
                <TitleInput isRequired name="form.numberCustomers" />
                <input
                  type="number"
                  name="numberCustomers"
                  value={values.numberCustomers}
                  onChange={handleChange}
                  className={
                    "w-full px-3 py-2 radius-tl-br16  text-sm leading-22 placeholder:text-sm outline-none border " +
                    (errors.numberCustomers
                      ? "border-red_error"
                      : "border-br_E6E6E6")
                  }
                  placeholder={t("form.inputNumberCustomers") as string}
                />
                {errors.numberCustomers && touched.numberCustomers && (
                  <small className="text-red_error">
                    {errors.numberCustomers}
                  </small>
                )}
              </div>
              <div className="sm:col-span-1 col-span-2 relative">
                <TitleInput isRequired name="form.day" />
                <input
                  type="date"
                  name="day"
                  value={values.day}
                  onChange={handleChange}
                  className={
                    "w-full px-3 py-2 radius-tl-br16  text-sm leading-22 placeholder:text-sm outline-none border " +
                    (errors.day ? "border-red_error" : "border-br_E6E6E6")
                  }
                  placeholder={t("form.choseDayOder") as string}
                />
                {errors.day && (
                  <small className="text-red_error">{errors.day}</small>
                )}
              </div>
              <div className="sm:col-span-1 col-span-2">
                <TitleInput isRequired name="form.hour" />
                <input
                  type="time"
                  name="hour"
                  value={values.hour}
                  onChange={handleChange}
                  className={
                    "w-full px-3 py-2 radius-tl-br16  text-sm leading-22 placeholder:text-sm outline-none border " +
                    (errors.hour ? "border-red_error" : "border-br_E6E6E6")
                  }
                  placeholder={t("form.choseHourOder") as string}
                />
                {errors.hour && (
                  <small className="text-red_error">{errors.hour}</small>
                )}
              </div>
              <div className="col-span-2">
                <TitleInput isRequired name="form.place" />
                <select
                  value={values.place}
                  name="place"
                  onChange={handleChange}
                  className={
                    "w-full px-3 py-2 radius-tl-br16  text-sm leading-22 placeholder:text-sm outline-none border " +
                    (errors.place ? "border-red_error" : "border-br_E6E6E6")
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
              <div className="col-span-2">
                <TitleInput isRequired name="form.note" />
                <textarea
                  rows={6}
                  name="note"
                  value={values.note}
                  onChange={handleChange}
                  className={
                    "w-full px-3 py-2 radius-tl-br16  text-sm leading-22 placeholder:text-sm outline-none border " +
                    (errors.note ? "border-red_error" : "border-br_E6E6E6")
                  }
                  placeholder={t("form.inputNote") as string}
                />
                {errors.note && touched.note && (
                  <small className="text-red_error">{errors.note}</small>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center mt-9">
              <Button
                type="submit"
                color="primary"
                text="form.tableReser"
                className="radius-tl-br16 w-spc167 py-3 text-center text-sm leading-5 font-bold"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TableReserVationForm;
