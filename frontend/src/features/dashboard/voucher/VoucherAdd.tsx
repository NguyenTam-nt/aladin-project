import React from 'react'
import { TitleTopic } from '../home/components/TitleTopic'
import TitleInput from '@components/TitleInput'
import { Input } from '../components/Input'
import { useTranslation } from 'react-i18next';
import { Button } from '../components/Button';
import { Radio } from '../components/Radio';

function VoucherAdd() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="">
        <TitleTopic name="adminVoucher.add.title" isRequired={false} />
      </div>
      <div className="grid grid-cols-2 gap-4 -mt-4 ">
        <div className="col-span-2">
          <TitleInput isRequired={true} name={"adminVoucher.add.form.name"} />
          <Input placeholder="adminVoucher.add.form.inputName" />
        </div>
        <div className="col-span-1">
          <TitleInput isRequired={true} name={"adminVoucher.add.form.code"} />
          <Input placeholder="adminVoucher.add.form.inputCode" />
        </div>
        <div className="col-span-1">
          <TitleInput isRequired={true} name={"adminVoucher.add.form.time"} />
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input placeholder="adminVoucher.form.inputName" />
            </div>
            <div className="flex-1">
              <Input placeholder="adminVoucher.form.inputName" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <TitleTopic name="adminVoucher.add.secondTitle" isRequired={false} />
      </div>

      <div className="-mt-4">
        <TitleInput isRequired={true} name={"adminVoucher.add.form.type"} />
        <Input placeholder="adminVoucher.add.form.inputName" />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="col-span-1">
          <TitleInput isRequired={true} name={"adminVoucher.add.form.maxDiscount.title"} />
          <div className="flex items-center gap-x-[24px] mb-4 mt-4">
            <div className="flex items-center">
              <Radio checked={true} id="max-price-voucher-limit" name="type-max-discount" />{" "}
              <label
                htmlFor="max-price-voucher-limit"
                className=" text-GreyPrimary text-_14 ml-[6px]"
              >
                {t("adminVoucher.add.form.maxDiscount.limit")}
              </label>
            </div>
            <div className="flex items-center">
              <Radio id="max-price-voucher-nolimit" name="type-max-discount" />{" "}
              <label
                htmlFor="max-price-voucher-nolimit"
                className="text-GreyPrimary text-_14 ml-[6px]"
              >
                {t("adminVoucher.add.form.maxDiscount.noLimit")}
              </label>
            </div>
          </div>
          <Input placeholder="adminVoucher.add.form.maxDiscount.inputLimit" />
        </div>
      </div> 

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="col-span-1">
          <TitleInput isRequired={true} name={"adminVoucher.add.form.minPrice.title"} />
          <Input placeholder="adminVoucher.add.form.minPrice.input" />
        </div>
        <div className="col-span-1">
          <TitleInput isRequired={true} name={"adminVoucher.add.form.amount"} />
          <Input placeholder="adminVoucher.add.form.inputAmount" />
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