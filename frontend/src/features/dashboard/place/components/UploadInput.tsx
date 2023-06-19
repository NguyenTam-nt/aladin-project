import TitleInput from '@components/TitleInput'
import { ImagePreview } from '@features/dashboard/components/ImagePreview';
import { InputUploadFile } from '@features/dashboard/components/InputUploadFIle';
import { useHandleImage } from '@features/dashboard/home/useHandleImage';
import clsx from 'clsx'
import React from 'react'

function UploadInput() {
  const { preViewImage, handleChange, refInput, handleDelete } = useHandleImage();

  return (
    <div className="flex flex-col min-h-[187px]">
      <TitleInput isRequired={false} forId="" name="button._upload_image" />
      <div className="flex-1">
        <div className={clsx("h-full", { hidden: !!preViewImage.trim() })}>
          <InputUploadFile ref={refInput} onChange={handleChange} />
        </div>
        <div
          //   onClick={handleClickInput}
          className={clsx("h-full w-full", {
            hidden: !preViewImage.trim(),
          })}
        >
          <ImagePreview onDelete={handleDelete} url={preViewImage} />
        </div>
      </div>
    </div>
  )
}

export default UploadInput