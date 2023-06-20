import React, { useState } from 'react'
import { TitleTopic } from '../home/components/TitleTopic'
import TitleInput from '@components/TitleInput'
import { Input } from '../components/Input'
import { useTranslation } from 'react-i18next';
import { Button } from '../components/Button';
import { Radio } from '../components/Radio';
import { SelectInput } from '@components/SelectInput';
import { UnitInput } from './components/UnitInput';

function VoucherAdd() {
  const VOUCHER_TYPE_PERCENT = "PERCENT"
  const VOUCHER_TYPE_MONEY = "MONEY"
  const { t } = useTranslation();

  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [type, setType] = useState(VOUCHER_TYPE_MONEY)
  const [valueDiscount, setvalueDiscount] = useState("")
  const [isLimit, setIsLimit] = useState(true)
  const [maxPriceLimit, setMaxPriceLimit] = useState("")
  const [minPriceOrder, setMinPriceOrder] = useState("")
  const [amount, setAmount] = useState("")

  return (
    <div>
      <div className="">
        <TitleTopic name="adminVoucher.add.title" isRequired={false} />
      </div>
      <div className="grid grid-cols-2 gap-4 -mt-4 ">
        <div className="col-span-2">
          <TitleInput isRequired={true} name={"adminVoucher.add.form.name"} />
          <Input placeholder="adminVoucher.add.form.inputName" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="col-span-1">
          <TitleInput isRequired={true} name={"adminVoucher.add.form.code"} />
          <Input placeholder="adminVoucher.add.form.inputCode"  maxLength={20} value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        <div className="col-span-1">
          <TitleInput isRequired={true} name={"adminVoucher.add.form.time"} />
          <div className="flex items-center gap-4">
            <div className="flex-1">
              {/* <Input placeholder="adminVoucher.form.inputName" /> */}
              <input
                type="datetime-local"
                name="start-datetime"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className={
                  "h-12 w-full px-3 py-2 placeholder:text-sm outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent " 
                }
              />
            </div>
            <div className="flex-1">
              <input
                type="datetime-local"
                name="end-datetime"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className={
                  "h-12 w-full px-3 py-2 placeholder:text-sm outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent " 
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <TitleTopic name="adminVoucher.add.secondTitle" isRequired={false}  />
      </div>

      <div className="-mt-4">
        <TitleInput isRequired={true} name={"adminVoucher.add.form.type"} />
        <div className="flex">
          <SelectInput className="h-[48px] w-[172px] !border-text_A1A0A3 !border-r-0" value={type}  onChange={(e) => setType(e.target.value)}>
            <>
              <option value={VOUCHER_TYPE_MONEY}>{t("adminVoucher.add.form.typeMoney")}</option>
              <option value={VOUCHER_TYPE_PERCENT}>{t("adminVoucher.add.form.typePercent")}</option>
            </>
          </SelectInput>
          {
            type == VOUCHER_TYPE_MONEY ? <UnitInput placeholder="adminVoucher.add.form.inputTypeMoney" unit="VNĐ" />
              : <UnitInput placeholder="adminVoucher.add.form.inputTypePercent" unit="%" />
          }
          
        </div>
      </div>

        {
          type == VOUCHER_TYPE_PERCENT && 
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="col-span-1">
            <TitleInput isRequired={true} name={"adminVoucher.add.form.maxDiscount.title"} />
            <div className="flex items-center gap-x-[24px] mb-4 mt-4">
              <div className="flex items-center">
                <Radio checked={isLimit} id="max-price-voucher-limit" name="type-max-discount" onChange={() => ""}  onClick={() => setIsLimit(true)}/>{" "}
                <label
                  htmlFor="max-price-voucher-limit"
                  className=" text-GreyPrimary text-_14 ml-[6px]"
                >
                  {t("adminVoucher.add.form.maxDiscount.limit")}
                </label>
              </div>
              <div className="flex items-center">
                <Radio checked={!isLimit} id="max-price-voucher-nolimit" name="type-max-discount" onChange={() => ""}   onClick={() => setIsLimit(false)} />{" "}
                <label
                  htmlFor="max-price-voucher-nolimit"
                  className="text-GreyPrimary text-_14 ml-[6px]"
                >
                  {t("adminVoucher.add.form.maxDiscount.noLimit")}
                </label>
              </div>
            </div>
            {isLimit && <Input placeholder="adminVoucher.add.form.maxDiscount.inputLimit" />}
          </div>
        </div> 
        }
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="col-span-1">
          <TitleInput isRequired={true} name={"adminVoucher.add.form.minPrice.title"} />
          <Input placeholder="adminVoucher.add.form.minPrice.input" value={minPriceOrder} onChange={(e) => setMinPriceOrder(e.target.value)}  />
        </div>
        <div className="col-span-1">
          <TitleInput isRequired={true} name={"adminVoucher.add.form.amount"} />
          <Input placeholder="adminVoucher.add.form.inputAmount" value={amount} onChange={(e) => setAmount(e.target.value)}  />
        </div>
      </div>

      <div className="flex justify-end items-center mt-[24px]">
        <Button
        type="button"
          // onClick={hideModal}
          text="button._cancel"
          color="empty"
          className="!w-[120px] border border-TrueBlue_500 mr-[24px]"
        />
        <Button type="submit" onClick={() => "onSubmit?.()"}  text={true ? "common.add" : "button._save"} color="primary" className="!w-[120px]" />
      </div>
    </div>
  )
}

export default VoucherAdd