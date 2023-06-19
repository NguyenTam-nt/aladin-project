import TitleInput from '@components/TitleInput';
import { Button } from '@features/dashboard/components/Button';
import { Input } from '@features/dashboard/components/Input';
import { Textarea } from '@features/dashboard/components/Textarea';
import React from 'react'
import { useTranslation } from 'react-i18next';

type Props = {
  data: any
}

function ModalResponseContact({data}: Props) {
  const { t } = useTranslation();

  return (
    <div className="w-[1144px] h-auto bg-white py-10 px-6">
      <h2 className="text-_32 font-bold text-text_primary uppercase text-center mb-10">
        {t("adminContact.form.title") }
      </h2>
      <div className="">
        <h3 className="text-_20 font-bold text-text_primary uppercase text-left mb-3">
          {t("adminContact.form.customer_title") }
        </h3>
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <TitleInput isRequired={true} name={"form.name"} />
              <Input value={"Nguyễn Mạnh Cường"} />
            </div>
            <div className="col-span-1">
              <TitleInput isRequired={true} name={"form.phoneNumber"} />
              <Input  value={"0912345678"} />
            </div>
            <div className="col-span-1">
              <TitleInput isRequired={true} name={"form.email"} />
              <Input value={"cuongnm@aladintech.co"} />
            </div>
            <div className="col-span-1">
              <TitleInput isRequired={false} name={"form.address"} />
              <Input value={"Vĩnh Phúc"}  />
            </div>
            <div className="col-span-2">
              <TitleInput isRequired={true} name={"form.content"} />
              <Input value={"Tư vấn giúp tôi lên đơn tiệc cưới"} />
            </div>
          </div>
      </div>
      <div className="mt-6">
        <h3 className="text-_20 font-bold text-text_primary uppercase text-left mb-3">
          {t("adminContact.form.response_title") }
        </h3>

        <div className="">
          <TitleInput isRequired={true} name={"adminContact.form.response"} />
          <Textarea placeholder="adminContact.form.input_response" />
        </div>
      </div>
      {data && 
      <div className="flex justify-center items-center mt-[24px]">
        <Button
        type="button"
          // onClick={hideModal}
          text="button._cancel"
          color="empty"
          className="!w-[120px] border border-TrueBlue_500 mr-[24px]"
        />
        <Button type="submit" onClick={() => "onSubmit?.()"}  text={true ? "button._save" : "button._save"} color="primary" className="!w-[120px]" />
      </div>
      }
    </div>
  )
}

export default ModalResponseContact