import TitleInput from '@components/TitleInput';
import TitleOfContent from '@components/TitleOfContent';
import React from 'react'
import { useTranslation } from 'react-i18next';

function ContactForm() {
  const { t } = useTranslation();
  return (
    <div className="mt-10">
      <div className="grid grid-cols-2 gap-x-5 gap-y-5">
        <div className="col-span-1">
          <TitleInput isRequired name="form.name" />
          <input
            type="text"
            className="w-full px-3 py-2 radius-tl-br16 placeholder:text-sm outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent"
            placeholder={t("form.inputName") as string}
          />
        </div>
        <div className="col-span-1">
          <TitleInput isRequired name="form.phoneNumber" />
          <input
            type="text"
            className="w-full px-3 py-2 radius-tl-br16 placeholder:text-sm outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent"
            placeholder={t("form.inputPhoneNumber") as string}
          />
        </div>
        <div className="col-span-1">
          <TitleInput isRequired name="form.email" />
          <input
            type="text"
            className="w-full px-3 py-2 placeholder:text-sm radius-tl-br16 outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent"
            placeholder={t("form.inputEmail") as string}
          />
        </div>
        <div className="col-span-1">
          <TitleInput isRequired={false} name="form.address" />
          <input
            type="text"
            className="w-full px-3 py-2 radius-tl-br16 placeholder:text-sm outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent"
            placeholder={t("form.inputAddress") as string}
          />
        </div>
        <div className="col-span-2">
          <TitleInput isRequired name="form.content" />
          <textarea
            rows={6}
            className="w-full resize-none px-3 py-2 placeholder:text-sm radius-tl-br16 outline-none border !border-text_A1A0A3 text-text_primary placeholder:text-text_A1A0A3 bg-transparent"
            placeholder={t("form.inputContent") as string}
          />
        </div>
      </div>
      <div className="flex items-center justify-start mt-9">
        <button className="radius-tl-br16 w-spc167 py-3 text-center text-sm leading-5 font-bold bg-primary text-white">
          Liên hệ
        </button>
      </div>
    </div>
  );
}

export default ContactForm