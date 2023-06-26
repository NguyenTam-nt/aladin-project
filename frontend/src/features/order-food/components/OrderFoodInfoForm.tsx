import TitleInput from '@components/TitleInput';
import TitleOfContent from '@components/TitleOfContent';
import { useFormik } from 'formik';
import * as Yup from "yup";
import React, {useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next';
import { useModalContext } from '@contexts/hooks/modal';
import { ModalOrderFoodSuccess } from './ModalOrderFoodSuccess';
import BillService from '@services/BillService';
import { BillTypeContants, IBillVoucher, type IBill } from '@typeRules/bill';
import { TextError } from '@features/dashboard/components/TextError';
import { SIZE_DATA } from '@constants/index';
import type { IResponseData } from '@typeRules/index';
import type { PlaceType } from '@typeRules/place';
import PlaceService from '@services/PlaceService';

function OrderFoodInfoForm() {
  const { t } = useTranslation();
  const { setElementModal, hideModal } = useModalContext();
  const handleShowModal = () => {
    setElementModal(<ModalOrderFoodSuccess />);
  };

  const [isValidDate, setIsValidDate] = useState(true)
  const [place, setPlace] = useState<IResponseData<PlaceType>>();


  useEffect(() => {
    getPlaceData(1)
  }, [])
  


  const getPlaceData = async (page:number) => {
    try {
      PlaceService.get({page: page, size: 100000, sort: "id,desc"})
        .then(response => {
          setPlace(response)
        })
        .catch(error => {
        })
    } catch (error) {
    } 
  }

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      day: "",
      hour: "",
      place: -1,
      method: BillTypeContants.restaurant,
      note: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("message.form.required"),
      phoneNumber: Yup.string()
      .trim()
      .required("message.form.required")
      .matches(
        /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
        "message.form.phone"
      )
      .length(10, "message.form.phone-length"),
      email: Yup.string()
        .trim()
        .required("message.form.required")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "message.form.email"
        ),
      day: Yup.date().required("message.form.required"),
      hour: Yup.string().trim().required("message.form.required"),
      place: Yup.number().required("message.form.required"),
      note: Yup.string()
        .trim()
        .required("message.form.required")
    }),
    onSubmit: (values) => {
      console.log(values, "formik");

      let voucher: IBillVoucher = {
        code: "",
        price: 0
      }

      let resquest: IBill = {
        fullname: values.fullName,
        phone: values.phoneNumber,
        email: values.email,
        type: values.method,
        chooseDate: new Date(values.day + " " + values.hour).toISOString(),
        note: values.note,
        idInfrastructure: values.place,
        price: 0,
        listProduct: [],
        voucher: voucher
      }

      // console.log(resquest);
      
      // BillService.post(resquest)
      //   .then(res => {

      //   })

    },
  });
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = formik;

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="grid grid-cols-2 gap-x-5 gap-y-5">
        <div className="col-span-2 lg:col-span-1 flex flex-col">
          <TitleInput isRequired name="form.name" />
          <input
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange} 
            onBlur={handleBlur}
            className={"h-12 w-full px-3 py-2 radius-tl-br16 placeholder:text-sm outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent " +
            (errors.fullName && touched.fullName ? "!border-red_error" : "border-text_A1A0A3")
            }
            placeholder={t("form.inputName") as string} 
          />
          {errors.fullName && touched.fullName && (
            <TextError message={errors.fullName} />
          )}
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col">
          <TitleInput isRequired name="form.phoneNumber" />
          <input
            type="text"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className={"h-12 w-full px-3 py-2 radius-tl-br16 placeholder:text-sm outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent " + 
              (errors.phoneNumber && touched.phoneNumber ? "!border-red_error" : "border-text_A1A0A3")
            }
            placeholder={t("form.inputPhoneNumber") as string}
          />
           {errors.phoneNumber && touched.phoneNumber && (
            <TextError message={errors.phoneNumber} />
          )}
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col">
          <TitleInput isRequired name="form.email" />
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={"h-12 w-full px-3 py-2 placeholder:text-sm radius-tl-br16 outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent " +
              (errors.email && touched.email ? "!border-red_error" : "border-text_A1A0A3")
            }
            placeholder={t("form.inputEmail") as string}
          />
          {errors.email && touched.email && (
            <TextError message={errors.email} />
          )}
        </div>
        <div className="col-span-2 lg:col-span-1 grid grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1 flex flex-col">
            <TitleInput isRequired name="form.chooseDay" />
            <input
              type="date"
              name="day"
              value={values.day}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                "h-12 w-full px-3 py-2 radius-tl-br16  placeholder:text-sm radius-tl-br16 outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent " +
                (errors.day && touched.day  ? "!border-red_error" : "border-text_A1A0A3")
              }
              placeholder={t("form.choseDayOder") as string}
            />
            {errors.day && touched.day  && (
              <TextError message={errors.day} />
            )}
            {!isValidDate && <TextError message={"message.form.greaterNow"} />}
          </div>
          <div className="col-span-2 lg:col-span-1 flex flex-col">
            <TitleInput isRequired name="form.chooseHour" />
            <input
              type="time"
              name="hour"
              value={values.hour}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                "h-12 w-full px-3 py-2 radius-tl-br16  placeholder:text-sm radius-tl-br16 outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent  " +
                (errors.hour && touched.hour ? "!border-red_error" : "border-text_A1A0A3")
              }
              placeholder={t("form.choseHourOder") as string}
            />
            {errors.hour && touched.hour && (
              <TextError message={errors.hour} />
            )}
          </div>
        </div>
        <div className="col-span-2 flex flex-col">
          <TitleInput isRequired name="form.place" />
          <select
            value={values.place}
            name="place"
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              "h-12 w-full px-3 py-2 radius-tl-br16  placeholder:text-sm radius-tl-br16 outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent  " +
              (errors.place && touched.place ? "!border-red_error" : "border-br_E6E6E6")
            }
          >
            <option value="" disabled>
              {t("form.chosePlace")}
            </option>
            {
              place && place.list.map(p => {
                return <option value={p.id} key={p.id}>{p.name}</option>
              })
            }
          </select>
          {errors.place && touched.place && (
            <TextError message={errors.place} />
          )}
        </div>
        <div className="col-span-2 flex flex-col">
          <TitleInput isRequired name="form.method" />
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <input type='radio' id="person-radio" className='cursor-pointer'
                name="method"
                value={BillTypeContants.restaurant}
                onChange={handleChange}
                onBlur={handleBlur}
                defaultChecked={formik.values.method == BillTypeContants.restaurant}
              />
              <label
                htmlFor="person-radio" className='text-sm cursor-pointer'>
                  {t("form.method1") as string}
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input type='radio' id="gohome-radio" className='cursor-pointer'
                name="method"
                value={BillTypeContants.pack}
                onChange={handleChange}
                onBlur={handleBlur}
                defaultChecked={formik.values.method == BillTypeContants.pack}
              />
            <label
              htmlFor="gohome-radio" className='text-sm cursor-pointer'>
                {t("form.method2") as string}
            </label>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col">
          <TitleInput isRequired name="form.note" />
          <textarea
            rows={6}
            name="note"
            value={values.note}
            onChange={handleChange}
            onBlur={handleBlur}
            className={"w-full resize-none px-3 py-2 placeholder:text-sm radius-tl-br16 outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent " +
              (errors.note && touched.note  ? "!border-red_error" : "border-br_E6E6E6")
            }
            placeholder={t("form.inputNote") as string}
          />
          {errors.note && touched.note && (
            <TextError message={errors.note} />
          )}
        </div>
      </div>
      <div className="flex items-center justify-start mt-9">
        <button 
          type="submit"
          className="radius-tl-br16 w-spc167 py-3 text-center text-sm leading-5 font-bold bg-primary text-white">
          {t("order_food.order")}
        </button>
      </div>
    </form>
  );
}

export default OrderFoodInfoForm