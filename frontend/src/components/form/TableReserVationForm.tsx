import { ICArowDown } from "@assets/icons/ICArowDown";
import { Button } from "@components/Button";
import TitleInput from "@components/TitleInput";
import TitleOfContent from "@components/TitleOfContent";
import { Colors } from "@constants/color";
import { FomatDateYY_MM_DD } from "@constants/formatDateY_M_D";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { useClickOutItem } from "@hooks/useClickOutItem";
import PlaceService from "@services/PlaceService";
import { reservationTableSvice } from "@services/reservationTableSevice";
import type { PlaceSelectType, PlaceType } from "@typeRules/place";
import clsx from "clsx";
import { useFormik } from "formik";
import moment from "moment";
import { memo, useEffect, useRef, useState, UIEvent } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const TableReserVationForm = memo(
  ({ isPaddingBottom = true }: { isPaddingBottom?: boolean }) => {
    const { t } = useTranslation();
    const { showError, showSuccess } = useShowMessage();
    const { ref, isShow, handleToggleItem } = useClickOutItem();
    const [listPlaces, setListPlace] = useState<PlaceSelectType[]>([]);
    const [currenPage, setCurrenPage] = useState<number>(1);
    // const [totaPage, setTotaPages] = useState<number>(1);
    // const scroolRef = useRef<HTMLDivElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const hourRef = useRef<HTMLInputElement>(null);
    const formik = useFormik({
      initialValues: {
        name: "",
        phone: "",
        email: "",
        numGuest: "",
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
          .max(255, "Không được quá 255 kí tự"),
        phone: Yup.string()
          .trim()
          .required("Không được để trống số điện thoại")
          .matches(/([0-9]{10})\b/g, "Số điện thoại không phù hợp")
          .length(10, "Số điện thoại phải đủ 10 số.")
          .max(255, "Không được quá 255 kí tự"),
        email: Yup.string()
          .required("Không được để trống email.")
          .email("Không đúng định dạng email")
          .max(255, "Không được quá 255"),
        numGuest: Yup.string()
          .required("Không được để trống.")
          .matches(/^\d+$/, "Không phải là số.")
          .max(4, "Số lượng không được quá 4 chữ số."),
        chooseDate: Yup.date()
          .min(
            new Date(new Date(new Date()).setDate(new Date().getDate() - 1)),
            "Ngày phải tối thiểu từ hôm nay."
          )
          .required("Phải chọn ngày đặt bàn."),
        hour: Yup.string()
          .required("Phải chọn giờ đặt bàn.")
          .test(
            "hour",
            "Chưa chọn ngày hoặc thời gian đặt bàn tối thiểu phải lớn hơn hiện tại 10 phút.",
            function (value, props) {
              if (value && values.chooseDate) {
                const truThy: boolean = moment(
                  values.chooseDate + " " + value
                ).isSameOrAfter(moment(new Date()).add(10, "minutes"));

                if (truThy) return true;
                return false;
              } else {
                return false;
              }
            }
          ),
        chooseIdInfrastructure: Yup.number()
          .min(1, "Phải chọn cơ sở")
          .required("Phải chọn cơ sở."),
        chooseInfrastructure: Yup.string().trim().required("Phải chọn cơ sở."),
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
            numGuest: +values.numGuest,
            chooseDate: dateIso,
            chooseIdInfrastructure: values.chooseIdInfrastructure,
            chooseInfrastructure: values.chooseInfrastructure,
            note: values.note,
          };
          const resultOrder = await reservationTableSvice.reserTable(
            dataUpload
          );
          handleResetForm();
          showSuccess("tableReservation.status.success");
        } catch (error) {
          showError("message.actions.error.delete_banner");
          handleResetForm();
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
      validateField,
      setFieldValue,
      setFieldTouched,
      setValues,
      resetForm,
      handleSubmit,
    } = formik;

    const getListPlace = async (currenPage: number) => {
      try {
        const list = await PlaceService.get_select();
        setListPlace(list);
      } catch (error) {}
    };
    // const handleScroolGetPlace = (e: UIEvent<HTMLDivElement>) => {
    //   const scroolTop = e.currentTarget.scrollTop;
    //   const clientHeight = e.currentTarget.clientHeight;
    //   const scrollHeight = e.currentTarget.scrollHeight;
    //   if (scroolTop + clientHeight >= scrollHeight && totaPage < totaPage) {
    //     setCurrenPage((preState) => preState + 1);
    //   }
    // };
    const handleResetForm = () => {
      resetForm();
    };
    const showPicker = (ref: any) => {
      ref.current?.showPicker();
    };
    useEffect(() => {
      getListPlace(currenPage);
    }, [currenPage]);
    useEffect(() => {
      setFieldValue("hour", values.hour);
    }, [values]);
    return (
      <form onSubmit={handleSubmit}>
        <div
          className={clsx("lg:px-0 sm:px-5", {
            "pb-36": isPaddingBottom,
          })}
        >
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
                    className="w-full px-3 py-2 radius-tl-br16 text-sm leading-22  placeholder:text-sm placeholder:text-text_A1A0A3 outline-none border "
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
                    className="w-full px-3 py-2 radius-tl-br16  text-sm leading-22 placeholder:text-sm placeholder:text-text_A1A0A3 outline-none border  "
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
                    className="w-full px-3 py-2  text-sm leading-22 placeholder:text-sm placeholder:text-text_A1A0A3 radius-tl-br16 outline-none border "
                    placeholder={t("form.inputEmail") as string}
                  />
                  {errors.email && touched.email && (
                    <small className="text-red_error">{errors.email}</small>
                  )}
                </div>
                <div className="sm:col-span-1 col-span-2">
                  <TitleInput isRequired name="form.numberCustomers" />
                  <input
                    type="text"
                    name="numGuest"
                    value={values.numGuest}
                    onChange={handleChange}
                    className="w-full px-3 py-2 radius-tl-br16 text-sm leading-22 placeholder:text-sm placeholder:text-text_A1A0A3 outline-none border "
                    placeholder={t("form.inputNumberCustomers") as string}
                  />
                  {errors.numGuest && touched.numGuest && (
                    <small className="text-red_error">{errors.numGuest}</small>
                  )}
                </div>
                <div className="sm:col-span-1 col-span-2 ">
                  <TitleInput isRequired name="form.day" />
                  <div onClick={() => showPicker(dateRef)} className="relative">
                    <input
                      type="date"
                      name="chooseDate"
                      ref={dateRef}
                      value={FomatDateYY_MM_DD(values.chooseDate)}
                      onChange={handleChange}
                      className={
                        "w-full px-3 py-2 radius-tl-br16 bg-transparent text-sm leading-22 placeholder:text-sm  outline-none border " +
                        (values.chooseDate == "" && "text-text_A1A0A3")
                      }
                      placeholder={t("form.choseDayOder") as string}
                    />
                    {values.chooseDate == "" && (
                      <span className="absolute bg-white text-sm text-text_A1A0A3 top-[8%] left-[1px] rounded-tl-[50%] px-3 py-2">
                        {t("form.choseDayOder")}
                      </span>
                    )}
                  </div>
                  {errors.chooseDate && touched.chooseDate && (
                    <small className="text-red_error">
                      {errors.chooseDate}
                    </small>
                  )}
                </div>
                <div className="sm:col-span-1 col-span-2 relative">
                  <TitleInput isRequired name="form.hour" />
                  <div onClick={() => showPicker(hourRef)} className="relative">
                    <input
                      type="time"
                      name="hour"
                      ref={hourRef}
                      value={values.hour}
                      onChange={handleChange}
                      className={
                        "w-full px-3 py-2 radius-tl-br16 bg-transparent text-sm leading-22 placeholder:text-sm outline-none border " +
                        (values.hour == "" && "text-text_A1A0A3")
                      }
                      placeholder={t("form.choseHourOder") as string}
                    />
                    {values.hour == "" && (
                      <span className="absolute bg-white text-sm text-text_A1A0A3 top-[8%] left-[1px] rounded-tl-[50%] px-3 py-2">
                        {t("form.choseHourOder")}
                      </span>
                    )}
                  </div>

                  {errors.hour && touched.hour && (
                    <small className="text-red_error">{errors.hour}</small>
                  )}
                </div>
                <div
                  ref={ref}
                  onClick={handleToggleItem}
                  className="col-span-2 relative"
                >
                  <TitleInput isRequired name="form.place" />
                  <div className=" px-3 py-2 radius-tl-br16  text-sm leading-22 placeholder:text-sm placeholder:text-text_A1A0A3 outline-none border">
                    {
                      <div className="flex justify-between items-center">
                        {values.chooseInfrastructure == "" ? (
                          <p className="text-text_A1A0A3">
                            {t("form.chosePlace")}
                          </p>
                        ) : (
                          <p className="line-clamp-1">
                            {values.chooseInfrastructure}
                          </p>
                        )}

                        <ICArowDown color={Colors.Grey_Primary} />
                      </div>
                    }
                  </div>
                  {isShow && (
                    <div
                      // ref={scroolRef}
                      // onScroll={handleScroolGetPlace}
                      className="w-full absolute top-[105%] left-0 bg-white shadow-md px-5 z-[9] max-h-[200px] overflow-y-scroll"
                    >
                      {listPlaces.map((item, index) => {
                        {
                          return (
                            <div
                              onClick={() => {
                                setValues({
                                  ...values,
                                  chooseIdInfrastructure: item.id!,
                                  chooseInfrastructure: item.name,
                                });
                              }}
                              key={index}
                              className="flex h-[48px] items-center cursor-pointer"
                            >
                              <div
                                className={
                                  "w-3 h-3 rounded-[50%] " +
                                  (values.chooseIdInfrastructure === item.id
                                    ? "bg-bg_01A63E"
                                    : "")
                                }
                              ></div>
                              <span className="text-_14 text-GreyPrimary ml-[6px] line-clamp-2 max-w-[90%]">
                                {item.name}
                              </span>
                            </div>
                          );
                        }
                      })}
                    </div>
                  )}
                  {errors.chooseIdInfrastructure &&
                    touched.chooseIdInfrastructure && (
                      <small className="text-red_error">
                        {errors.chooseIdInfrastructure}
                      </small>
                    )}
                </div>

                <div className="col-span-2 ">
                  <TitleInput isRequired={false} name="form.note" />
                  <textarea
                    rows={6}
                    name="note"
                    value={values.note}
                    onChange={handleChange}
                    className="w-full px-3 py-2 radius-tl-br16 resize-none text-sm leading-22 placeholder:text-sm placeholder:text-text_A1A0A3 outline-none border "
                    placeholder={t("form.inputNote") as string}
                  />
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
  }
);

export default TableReserVationForm;
