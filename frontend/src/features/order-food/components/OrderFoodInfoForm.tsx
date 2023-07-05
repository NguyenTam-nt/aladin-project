import TitleInput from '@components/TitleInput';
import TitleOfContent from '@components/TitleOfContent';
import { useFormik } from 'formik';
import * as Yup from "yup";
import React, {UIEvent, useEffect, useMemo, useRef, useState} from 'react'
import { useTranslation } from 'react-i18next';
import { useModalContext } from '@contexts/hooks/modal';
import { ModalOrderFoodSuccess } from './ModalOrderFoodSuccess';
import BillService from '@services/BillService';
import { BillTypeContants, IBillVoucher, type IBill } from '@typeRules/bill';
import { TextError } from '@features/dashboard/components/TextError';
import { SIZE_DATA } from '@constants/index';
import type { IResponseData } from '@typeRules/index';
import type { PlaceSelectType, PlaceType } from '@typeRules/place';
import PlaceService from '@services/PlaceService';
import { useCartContext } from '@contexts/hooks/order';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { useShowMessage } from '@features/dashboard/components/DiglogMessage';
import { useClickOutItem } from '@hooks/useClickOutItem';
import { ICArowDown } from '@assets/icons/ICArowDown';
import { Colors } from '@constants/color';

function OrderFoodInfoForm() {
  const { t } = useTranslation();
  const { showError, showSuccess } = useShowMessage();
  const { ref, isShow, handleToggleItem } = useClickOutItem();
  const { setElementModal, hideModal } = useModalContext();
  const  { listOrder, handleDeleteCart, handleMinusCart, handleDeleteAll } = useCartContext()
  const { state } = useLocation();
  // console.log(state);
  
  const totalPrice = useMemo(() => {
    return listOrder.reduce((currentValue, data) => {
      return (
        currentValue +
        Number(data?.pricePromotion ?? 0) * Number(data.quantity ?? 0)
      );
    }, 0);
  }, [listOrder]);

  const handleShowModal = () => {
    setElementModal(<ModalOrderFoodSuccess />);
  };

  const [isValidDate, setIsValidDate] = useState(true)
  const [place, setPlace] = useState<PlaceSelectType[]>();


  useEffect(() => {
    getPlaceData()
  }, [])
  


  const getPlaceData = async () => {
    try {
      PlaceService.get_select()
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
      place: "",
      placeName: "",
      method: BillTypeContants.restaurant,
      note: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().trim().required("message.form.required")
        .max(70, "message.form.max"),
      phoneNumber: Yup.string()
      .trim()
      .required("message.form.required")
      .matches(
        /([0-9]{10})\b/g,
        "message.form.phone"
      )
      .length(10, "message.form.phone-length"),
      email: Yup.string()
        .trim().email("message.form.email")
        .required("message.form.required"),
      day: Yup.date().required("message.form.required"),
      hour: Yup.string().trim().required("message.form.required"),
      place: Yup.number().required("message.form.required"),
      placeName: Yup.string(),
      note: Yup.string()
        .trim()
    }),
    onSubmit: (values) => {
      if(!listOrder || listOrder.length == 0) return
      let voucher: IBillVoucher = state.voucher

      let orderDate = new Date(values.day + " " + values.hour)
      if(moment(orderDate).isBefore(new Date)) {
        setIsValidDate(false)
        return 
      }
      
      let resquest: IBill = {
        id: null,
        fullname: values.fullName.trim(),
        phone: values.phoneNumber.trim(),
        email: values.email.trim(),
        type: values.method,
        chooseDate: orderDate.toISOString(),
        note: values.note.trim(),
        idInfrastructure: +values.place,
        price: (totalPrice - (voucher ? voucher.price : 0)) < 0 ? 0 : (totalPrice - (voucher ? voucher.price : 0)),
        listProduct: listOrder.map(p => {
          return {
            id: Number(p.id),
            name: p.name,
            num: Number(p.quantity),
            price: Number(p.price),
            pricePromotion: Number(p.pricePromotion),
            linkMedia: p.linkMedia || ""
          }
        }),
        voucher: voucher ? voucher : null
      }

      // console.log(resquest);
      
      BillService.post(resquest)
        .then(res => {
          handleShowModal()
          formik.resetForm()
          setIsValidDate(true)
          handleDeleteAll()
        })
        .catch(() => {
          showError("order_food.error");
        })

    },
  });
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = formik;


  useEffect(() => {
    if(values.day && values.hour) {
      let orderDate = new Date(values.day + " " + values.hour)
      if(moment(orderDate).isBefore(new Date)) {
        setIsValidDate(false)
        return 
      }else {
        setIsValidDate(true)
      }
    }
  }, [values.day, values.hour])
// console.log(place);
// console.log(values);

  return (
    <form onSubmit={handleSubmit} className="" autoComplete='off'>
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
            <TextError message={errors.fullName} option={{max: 70}} />
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
                "h-12 w-full px-3 py-2 radius-tl-br16  placeholder:text-sm radius-tl-br16 outline-none border !border-text_A1A0A3  bg-transparent " +
                (errors.day && touched.day  ? " !border-red_error " : " border-text_A1A0A3 ") + 
                (values.day && values.day.length > 0 ? " text-text_primary " : " text-text_A1A0A3 ")
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
                "h-12 w-full px-3 py-2 radius-tl-br16  placeholder:text-sm radius-tl-br16 outline-none border !border-text_A1A0A3  bg-transparent  " +
                (errors.hour && touched.hour ? " !border-red_error " : " border-text_A1A0A3 ") + 
                (values.hour && values.hour.length > 0 ? " text-text_primary " : " text-text_A1A0A3 ")
              }
              placeholder={t("form.choseHourOder") as string}
            />
            {errors.hour && touched.hour && (
              <TextError message={errors.hour} />
            )}
          </div>
        </div>
        <div
          ref={ref}
          onClick={handleToggleItem}
          className="col-span-2 w-full relative"
        >
          <TitleInput isRequired name="form.place" />
          <div className={
              "flex items-center   h-12 w-full px-3 py-2 radius-tl-br16  placeholder:text-sm radius-tl-br16 outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent  " +
              (errors.place && touched.place ? "!border-red_error" : "border-br_E6E6E6")
            }>
            {
              <div className="flex-1 flex justify-between gap-4 items-center">
                {values.placeName == "" ? (
                  <p className="text-text_A1A0A3">
                    {t("form.chosePlace")}
                  </p>
                ) : (
                  <p className='line-clamp-1'>{values.placeName}</p>
                )}

                <ICArowDown className='flex-shrink-0' color={Colors.Grey_Primary} />
              </div>
            }
          </div>
          {isShow && (
            <div
              className="w-full absolute top-[105%] left-0 bg-white shadow-md px-5 z-[9] max-h-[200px] overflow-y-scroll"
            >
              {place && place.map((item, index) => {
                {
                  return (
                    <div
                      onClick={() => {
                        formik.setValues({
                          ...values,
                          place: item.id + "",
                          placeName: item.name,
                        });
                      }}
                      key={index}
                      className="flex h-[48px] items-center cursor-pointer"
                    >
                      <div
                        className={
                          "w-3 h-3 rounded-[50%] flex-shrink-0" +
                          (values.place == (item.id + "")
                            ? "bg-bg_01A63E"
                            : "")
                        }
                      ></div>
                        <span className="text-_14 text-GreyPrimary ml-[6px] line-clamp-1">
                          {item.name}
                        </span>
                    </div>
                  );
                }
              })}
            </div>
          )}
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
          <TitleInput isRequired={false} name="form.note" />
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