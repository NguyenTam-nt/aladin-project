import TitleInput from '@components/TitleInput';
import { InputUploadFile } from '@features/dashboard/components/InputUploadFIle';
import React, { ChangeEvent, memo } from 'react'
import { useTranslation } from 'react-i18next';
import { useHandleMultiImage } from '../useHandleMultiImage';
import { ImagePreview } from '@features/dashboard/components/ImagePreview';

type Props = {
  listImage: {
    preViewImage: string[],
    handleChange: (event:ChangeEvent<HTMLInputElement>) => void,
    handleDelete : () => void,
    file: FileList | undefined,
    handleMessageFile: () => void,
    message: string,
    // handlePaste,
    isVideo : boolean,
  }
}

export const ProductHandlerImages = memo(({listImage}:Props) => {
    const { t } = useTranslation();
  return (
    <div className="col-span-2 flex gap-[24px]">
    <div className="w-[288px]">
      <div className="flex items-baseline">
        {" "}
        <TitleInput name="adminProduct.form.upload_product" />{" "}
        <span className="text-_12 italic ml-2">
          {t("adminProduct.form.maxItem")}
        </span>
      </div>
      <div className="w-[288px] h-[190px]">
        <InputUploadFile
          disabled={listImage.preViewImage.length >= 5}
          multiple
          onChange={listImage.handleChange}
        />
      </div>
    </div>
    {listImage.preViewImage.length ? (
      <div className="flex-1">
        <TitleInput name="common.image_uploaded" />{" "}
        <div className=" w-full grid grid-cols-3 gap-[16px] flex-wrap">
          {listImage.preViewImage.map((item) => {
            return (
              <div className="h-[190px]">
                <ImagePreview url={item} onDelete={() => {}} />
              </div>
            );
          })}
        </div>
      </div>
    ) : null}
  </div>
  )
})
