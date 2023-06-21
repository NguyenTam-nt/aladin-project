import TitleInput from '@components/TitleInput'
import { ImagePreview } from '@features/dashboard/components/ImagePreview';
import { InputUploadFile } from '@features/dashboard/components/InputUploadFIle';
import { useHandleImage } from '@features/dashboard/home/useHandleImage';
import clsx from 'clsx'
import React, { useEffect } from 'react'

function UploadInput({id, link, setFiles}: any) {
  const { preViewImage, handleChange, refInput, handleDelete, file } = useHandleImage(link || "");
  
  useEffect(() => {
    if(file) {
      setFiles(file)
    }
  }, [file])
  

  return (
    <div className="">
      <TitleInput isRequired={false} forId="" name="button._upload_image" />
      <div className="h-[187px]">
        <div className={clsx("h-full", { hidden: !!preViewImage.trim() })}>
          <InputUploadFile ref={refInput} onChange={handleChange} />
        </div>
        <div
          className={clsx("h-full w-full object-cover", {
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