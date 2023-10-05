import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TitleTopic } from '../home/components/TitleTopic'
import TitleInput from '@components/TitleInput'
import { Input } from '../components/Input'
import { useTranslation } from 'react-i18next';
import { Button } from '../components/Button';
import { Radio } from '../components/Radio';
import { SelectInput } from '@components/SelectInput';
import { UnitInput } from './components/UnitInput';
import { useNavigate, useParams } from 'react-router';
import { IVoucher, VOUCHER_PERCENT_TYPE, VOUCHER_TYPE, VoucherType } from '@typeRules/voucher';
import { GroupButtonAdmin } from '../components/GroupButtonAdmin';
import { TextError } from '../components/TextError';
import { useFormik } from 'formik'
import * as Yup from "yup";
import VoucherService from '@services/VoucherService';
import { useShowMessage } from '../components/DiglogMessage';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';
import { FomatDateDDMMYYHHMM } from '@constants/formatDateY_M_D'

function VoucherAdd() {
  const { t } = useTranslation();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navigation = useNavigate();

  const { showError, showSuccess } = useShowMessage();
  const [type, setType] = useState(VOUCHER_TYPE.money)
  const [isLimit, setIsLimit] = useState(true)

  const [voucher, setVoucher] = useState<IVoucher>();
  const [isVoucherExisted, setIsVoucherExisted] = useState<boolean>(false);
  const [greater100, setGreater100] = useState(false)

  const isAdd = useMemo(() => {
    return !params.id;
  }, []);
  
  const isView = useMemo(() => {
    return searchParams.get('view') == "true";
  }, []);

  useEffect(() => {
    if (!isAdd) {
      VoucherService.getById(Number(params.id)).then((data) => {
        setVoucher(data);
        formik.setFieldValue("name", data.name);
        formik.setFieldValue("code", data.code);
        formik.setFieldValue("start", FomatDateDDMMYYHHMM(data.startDate));
        formik.setFieldValue("endDate", FomatDateDDMMYYHHMM(data.endDate));
        formik.setFieldValue("valueDiscount", data.value);
        formik.setFieldValue("minPriceOrder", data.minBill);
        formik.setFieldValue("amount", data.numBill);
        formik.setFieldValue("maxPriceLimit", data.typePercent == VOUCHER_PERCENT_TYPE.limit ? data.minPrice : 1);

        setType(data.typeVoucher)
        setIsLimit(data.typePercent == VOUCHER_PERCENT_TYPE.limit)
      });
    }
  }, [isAdd]);

  


  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      start: "",
      endDate: "",
      valueDiscount: "",
      minPriceOrder: "",
      maxPriceLimit: "",
      amount: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required("message.form.required"),
      code: Yup.string().trim().required("message.form.required"),
      start: Yup.date().required("message.form.required"),
      endDate: Yup.date().required("message.form.required").test(
        "endDate",
        "message.form.enddateGreaterThanStartdate",
        function (value) {
          const { start } = this.parent
          return !moment(value).isBefore(moment(start).add(1, "minutes"));
        }
      ),
      valueDiscount: Yup.number().required("message.form.required").typeError('message.form.number').min(1, "message.form.minNum"),
      minPriceOrder: Yup.number().required("message.form.required").typeError('message.form.number').min(1, "message.form.minNum"),
      maxPriceLimit: Yup.number().typeError('message.form.number').min(1, "message.form.minNum"),
      amount: Yup.number().required("message.form.required").typeError('message.form.number').min(voucher?.used ? voucher.used  : 1, "message.form.minNumEqual"),
    }),
    onSubmit: async (data) => {
      console.log({data});
      
      try {

        let request: IVoucher = {
          id: !isAdd ?  voucher?.id : undefined,
          name: data.name.trim(),
          code: data.code.trim(),
          startDate: new Date(data.start).toISOString(),
          endDate: new Date(data.endDate).toISOString(),
          value: +`${data.valueDiscount}`.trim(),
          typeVoucher: type,
          typePercent: type == VOUCHER_TYPE.money ? VOUCHER_PERCENT_TYPE.none : isLimit ? VOUCHER_PERCENT_TYPE.limit : VOUCHER_PERCENT_TYPE.unlimit,
          minBill: +`${data.minPriceOrder}`.trim(),
          numBill: +`${data.amount}`.trim(),
          minPrice: type == VOUCHER_TYPE.percent && isLimit ? + data.maxPriceLimit : 0
        }
        // console.log(request);
        if(isVoucherExisted || greater100) return
      
        if (isAdd) {

          callApiAddVoucher(request)
          
        } else {
          VoucherService
            .update(request)
            .then(() => {
              showSuccess("adminVoucher.notification.updateSuccess");
              goBack();
            })
            .catch(() => {
              showError("adminVoucher.notification.updateError");
            });
        }
      } catch (error) {
        // console.log({error});
      }
    },
  });

  const callApiAddVoucher = (request: IVoucher) => {
    VoucherService
      .post(request)
      .then(() => {
        showSuccess("adminVoucher.notification.addSuccess");
        goBack();
        formik.resetForm();
      })
      .catch((error) => {
        showError("adminVoucher.notification.addError");
      });
  }
  
  
  const debounceDropDownVoucher = useCallback(
    debounce((code: any) => callCheckVoucher(code), 300),
    []
  );

  const callCheckVoucher = (code: any) => {
    VoucherService
      .checkExist(code)
      .then(() => {
        setIsVoucherExisted(false)
      })
      .catch((error) => {
        setIsVoucherExisted(true)
      });
  }

  useEffect(() => {
    if(!isView && isAdd) {
      if(formik.values.code.length > 0) {
       debounceDropDownVoucher(formik.values.code)
      } else  {
       setIsVoucherExisted(false)
      }
    }

  }, [formik.values.code])

  const goBack = () => {
    navigation(-1);
  };

  useEffect(() => {
    if(type == VOUCHER_TYPE.percent) {
      setGreater100(Number(formik.values.valueDiscount) > 100)
    }

  }, [formik.values.valueDiscount, type])

  // console.log(formik.errors)


  return (
    <div>
      <div className="">
        <TitleTopic name="adminVoucher.add.title" isRequired={false} />
      </div>
      <div className="grid grid-cols-2 gap-4 -mt-4 ">
        <div className="col-span-2">
          <TitleInput isRequired={true} name={"adminVoucher.add.form.name"} />
          <Input placeholder="adminVoucher.add.form.inputName" 
             name="name"
             value={formik.values.name}
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             disabled={isView}
          />
          {formik.errors.name && formik.touched.name && (
            <TextError message={formik.errors.name} />
          )}
        </div>
        <div className="col-span-1">
          <TitleInput isRequired={true} name={"adminVoucher.add.form.code"} />
          <Input placeholder="adminVoucher.add.form.inputCode"  maxLength={20}  name="code"
             value={formik.values.code}
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             disabled={isView || !isAdd}
          />
          {formik.errors.code && formik.touched.code &&  (
            <TextError message={formik.errors.code} />
          )}
          {isVoucherExisted && <TextError message={"adminVoucher.add.errorCode"} />}
        </div>
        <div className="col-span-1">
          <TitleInput isRequired={true} name={"adminVoucher.add.form.time"} />
          <div className="flex items-center gap-4">
            <div className="flex-1">
              {/* <Input placeholder="adminVoucher.form.inputName" /> */}
              <input
                type="datetime-local"
                name="start"
                value={formik.values.start}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isView}
                className={
                  "h-12 w-full px-3 py-2 placeholder:text-sm outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent " 
                }
              />
            </div>
            <div className="flex-1">
              <input
                type="datetime-local"
                name="endDate"
                min={formik.values.start}
                value={formik.values.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isView}
                className={
                  "h-12 w-full px-3 py-2 placeholder:text-sm outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent " 
                }
              />
            </div>
          </div>
          {formik.errors.start && formik.touched.start && (
            <TextError message={formik.errors.start} />
          )}
          {formik.errors.endDate && formik.touched.endDate && (
            <TextError message={formik.errors.endDate} />
          )}
        </div>
      </div>

      <div className="mt-10">
        <TitleTopic name="adminVoucher.add.secondTitle" isRequired={false}  />
      </div>

      <div className="-mt-4">
        <TitleInput isRequired={true} name={"adminVoucher.add.form.type"} />
        <div className="flex">
          <SelectInput className="h-[48px] !w-[172px] !border-text_A1A0A3 !border-r-0" value={type} 
           onChange={(e) => setType(e.target.value as VoucherType)}
           disabled={isView || !isAdd}
           >
            <>
              <option value={VOUCHER_TYPE.money}>{t("adminVoucher.add.form.typeMoney")}</option>
              <option value={VOUCHER_TYPE.percent}>{t("adminVoucher.add.form.typePercent")}</option>
            </>
          </SelectInput>
          {
            type == VOUCHER_TYPE.money ? 
              <UnitInput placeholder="adminVoucher.add.form.inputTypeMoney" unit="VNĐ" name="valueDiscount"
                value={formik.values.valueDiscount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} disabled={isView}/>
              : <UnitInput placeholder="adminVoucher.add.form.inputTypePercent" unit="%" name="valueDiscount"
                value={formik.values.valueDiscount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} disabled={isView}
              />
          }
          {formik.errors.valueDiscount && formik.touched.valueDiscount && (
            <TextError message={formik.errors.valueDiscount} option={{min: 0}} />
          )}
          {
            type == VOUCHER_TYPE.percent && greater100 && <TextError message={"message.form.maxEqualNum"} option={{max: 100}} />
          }
          
        </div>
      </div>

        {
          type == VOUCHER_TYPE.percent && 
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="col-span-1">
            <TitleInput isRequired={true} name={"adminVoucher.add.form.maxDiscount.title"} />
            <div className="flex items-center gap-x-[24px] mb-4 mt-4">
              <div className="flex items-center">
                <Radio checked={isLimit} id="max-price-voucher-limit" disabled={isView} name="type-max-discount" onChange={() => ""}  onClick={() => setIsLimit(true)}/>{" "}
                <label
                  htmlFor="max-price-voucher-limit"
                  className=" text-GreyPrimary text-_14 ml-[6px]"
                >
                  {t("adminVoucher.add.form.maxDiscount.limit")}
                </label>
              </div>
              <div className="flex items-center">
                <Radio checked={!isLimit} id="max-price-voucher-nolimit" disabled={isView} name="type-max-discount" onChange={() => ""}   onClick={() => setIsLimit(false)} />{" "}
                <label
                  htmlFor="max-price-voucher-nolimit"
                  className="text-GreyPrimary text-_14 ml-[6px]"
                >
                  {t("adminVoucher.add.form.maxDiscount.noLimit")}
                </label>
              </div>
            </div>
            {isLimit && <UnitInput placeholder="adminVoucher.add.form.maxDiscount.inputLimit" unit="VNĐ" name="maxPriceLimit"
                value={formik.values.maxPriceLimit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} disabled={isView}/>}
            {formik.errors.maxPriceLimit && formik.touched.maxPriceLimit && isLimit && (
              <TextError message={formik.errors.maxPriceLimit} option={{min: 1}} />
            )}
          </div>
        </div> 
        }
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="col-span-1">
          <TitleInput isRequired={true} name={"adminVoucher.add.form.minPrice.title"} />
          <UnitInput placeholder={"adminVoucher.add.form.inputTypeMoney"} 
            unit={"VNĐ"} name="minPriceOrder"
            value={formik.values.minPriceOrder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} disabled={isView} />
          {formik.errors.minPriceOrder && formik.touched.minPriceOrder && (
            <TextError message={formik.errors.minPriceOrder} option={{min: 1}} />
          )}
        </div>
        <div className="col-span-1">
          <TitleInput isRequired={true} name={"adminVoucher.add.form.amount"} />

          <Input placeholder="adminVoucher.add.form.inputAmount" name="amount"
             value={formik.values.amount}
             onChange={formik.handleChange}
             onBlur={formik.handleBlur} disabled={isView}
          />
          {formik.errors.amount && formik.touched.amount && (
            <TextError message={formik.errors.amount} option={{min: voucher?.used ? voucher.used : 1}}/>
          )}
        </div>
      </div>

          {
            !isView && 
            <div className="flex justify-end items-center mt-[24px]">
              <GroupButtonAdmin
                isAdd={isAdd}
                onCancel={goBack}
                onSubmit={formik.handleSubmit}
              />
            </div>
          }
    </div>
  )
}

export default VoucherAdd