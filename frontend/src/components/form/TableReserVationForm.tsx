import { Button } from "@components/Button";
import TitleInput from "@components/TitleInput";
import TitleOfContent from "@components/TitleOfContent";
import { FomatDateYY_MM_DD } from "@constants/formatDateY_M_D";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import PlaceService from "@services/PlaceService";
import { reservationTableSvice } from "@services/reservationTableSevice";
import type { PlaceType } from "@typeRules/place";
import { useFormik } from "formik";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const TableReserVationForm = memo(() => {
  const { t } = useTranslation();
  const { showError, showSuccess } = useShowMessage();
  const [listPlaces, setListPlace] = useState<PlaceType[]>([]);
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      numGuest: 0,
      chooseDate: "",
      chooseIdInfrastructure: 0,
      hour: "",
      chooseInfrastructure: "",
      note: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .required("Không được để trống họ tên.")
        .min(5, "Họ tên phải tối thiểu 5 kí tự."),
      phone: Yup.string()
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
      numGuest: Yup.number()
        .min(1, "Tối thiểu 1 khách hàng.")
        .required("Không được để trống khách hàng."),
      chooseDate: Yup.date()
        .min(new Date().toLocaleDateString(), "Ngày phải tối thiểu từ hôm nay.")
        .required("Phải chọn ngày đặt bàn."),
      hour: Yup.string().trim().required("Phải chọn khung giờ đặt bàn."),
      chooseIdInfrastructure: Yup.number()
        .min(1, "Phải chọn cơ sở")
        .required("Phải chọn cơ sở."),
      chooseInfrastructure: Yup.string().trim().required("Phải chọn cơ sở."),
      note: Yup.string()
        .trim()
        .required("Không được để trống")
        .min(20, "Ghi chú tối thiểu 20 kí tự."),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const stringDate = values.chooseDate
          .split("-")
          .concat(values.hour.split(":"));
        const dateIso = new Date(
          +stringDate[0],
          +stringDate[1] - 1,
          +stringDate[2],
          +stringDate[3],
          +stringDate[4]
        ).toISOString();
        const dataUpload = {
          name: values.name,
          phone: values.phone,
          email: values.email,
          numGuest: 0,
          // numGuest: values.numGuest,
          chooseDate: dateIso,
          chooseIdInfrastructure: values.chooseIdInfrastructure,
          chooseInfrastructure: values.chooseInfrastructure,
          note: values.note,
        };
        const resultOrder = await reservationTableSvice.reserTable(dataUpload);
        handleResetForm();
        showSuccess("tableReservation.status.success");
      } catch (error) {
        showError("message.actions.error.delete_banner");
        setSubmitting(false);
      }
    },
  });
  const {
    values,
    errors,
    isSubmitting,
    touched,
    handleChange,
    setFieldValue,
    resetForm,
    handleSubmit,
  } = formik;

  const getListPlace = async () => {
    try {
      const { list, totalElement, totalElementPage } = await PlaceService.get({
        page: 0,
        size: 20,
        sort: "id,desc",
      });
      setListPlace(list);
    } catch (error) {}
  };
  const handleResetForm = () => {
    resetForm();
  };

  useEffect(() => {
    getListPlace();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <div className="pb-36 lg:px-0 sm:px-5">
        <div className="h-auto md:radius-tl-br bg-text_white py-16 2xl:px-28 lg:px-24 px-5">
          <TitleOfContent
            name="titleofcontent.tableReserVationForm"
            className="w-full text-center mb-4 "
          />
          <p className="lg:text-2xl lg:leading-9 text-sm leading-22 text-center font-normal text-text_secondary">
            {t("form.timeOrder")}
          </p>
          <div className="mt-12">
            <div className="grid grid-cols-2 sm:gap-x-5 gap-y-5">
              <div className="sm:col-span-1 col-span-2">
                <TitleInput isRequired name="form.name" />
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 radius-tl-br16 text-sm leading-22  placeholder:text-sm outline-none border "
                  placeholder={t("form.inputName") as string}
                />
                {errors.name && touched.name && (
                  <small className="text-red_error">{errors.name}</small>
                )}
              </div>
              <div className="sm:col-span-1 col-span-2">
                <TitleInput isRequired name="form.phoneNumber" />
                <input
                  type="text"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 radius-tl-br16  text-sm leading-22 placeholder:text-sm outline-none border  "
                  placeholder={t("form.inputPhoneNumber") as string}
                />
                {errors.phone && touched.phone && (
                  <small className="text-red_error">{errors.phone}</small>
                )}
              </div>
              <div className="sm:col-span-1 col-span-2">
                <TitleInput isRequired name="form.email" />
                <input
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2  text-sm leading-22 placeholder:text-sm radius-tl-br16 outline-none border "
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
                  name="numGuest"
                  value={values.numGuest}
                  onChange={handleChange}
                  className="w-full px-3 py-2 radius-tl-br16  text-sm leading-22 placeholder:text-sm outline-none border "
                  placeholder={t("form.inputNumberCustomers") as string}
                />
                {errors.numGuest && touched.numGuest && (
                  <small className="text-red_error">{errors.numGuest}</small>
                )}
              </div>
              <div className="sm:col-span-1 col-span-2 relative">
                <TitleInput isRequired name="form.day" />
                <input
                  type="date"
                  name="chooseDate"
                  value={FomatDateYY_MM_DD(values.chooseDate)}
                  onChange={handleChange}
                  className="w-full px-3 py-2 radius-tl-br16  text-sm leading-22 placeholder:text-sm outline-none border "
                  placeholder={t("form.choseDayOder") as string}
                />
                {errors.chooseDate && (
                  <small className="text-red_error">{errors.chooseDate}</small>
                )}
              </div>
              <div className="sm:col-span-1 col-span-2">
                <TitleInput isRequired name="form.hour" />
                <input
                  type="time"
                  name="hour"
                  value={values.hour}
                  onChange={handleChange}
                  className="w-full px-3 py-2 radius-tl-br16  text-sm leading-22 placeholder:text-sm outline-none border "
                  placeholder={t("form.choseHourOder") as string}
                />
                {errors.hour && (
                  <small className="text-red_error">{errors.hour}</small>
                )}
              </div>
              <div className="col-span-2">
                <TitleInput isRequired name="form.place" />
                <select
                  value={+values.chooseIdInfrastructure}
                  name="chooseIdInfrastructure"
                  onChange={(e) => {
                    setFieldValue(
                      "chooseIdInfrastructure",
                      Number(e.target.value)
                    );
                    setFieldValue(
                      "chooseInfrastructure",
                      listPlaces.find(
                        (item) => item.id === Number(e.target.value)
                      )?.name
                    );
                  }}
                  className="w-full px-3 py-2 radius-tl-br16  text-sm leading-22 placeholder:text-sm outline-none border "
                >
                  <option value="" disabled>
                    {t("form.chosePlace")}
                  </option>
                  {listPlaces.length > 0 &&
                    listPlaces.map((itemPlace, indexPlace) => {
                      return (
                        <option key={indexPlace} value={itemPlace.id}>
                          {itemPlace.name}
                        </option>
                      );
                    })}
                </select>
                {errors.chooseIdInfrastructure &&
                  touched.chooseIdInfrastructure && (
                    <small className="text-red_error">
                      {errors.chooseIdInfrastructure}
                    </small>
                  )}
              </div>
              <div className="col-span-2">
                <TitleInput isRequired name="form.note" />
                <textarea
                  rows={6}
                  name="note"
                  value={values.note}
                  onChange={handleChange}
                  className="w-full px-3 py-2 radius-tl-br16 resize-none text-sm leading-22 placeholder:text-sm outline-none border "
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
});

export default TableReserVationForm;
