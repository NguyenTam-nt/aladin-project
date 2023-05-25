import React from "react";
import { HeaderAdmin } from "@features/dashboard/components/HeaderAdmin";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { useHandleImage } from "@features/dashboard/hooks/useHandleImage";

export const Brochure = () => {
   const {preViewImage, handleChange, handleDelete} = useHandleImage()
  return (
    <>
      <HeaderAdmin title="admin._about._brochure._title" />
      <div className="flex items-center h-[168px]">
        <div className="w-[312px] h-full">
          <InputUploadFile onChange={handleChange} />
        </div>
        <div className="w-[312px] h-full ml-[24px]">
        {preViewImage ? (
            <div className="w-[312px] h-[168px]">
              <ImagePreview onDelete={handleDelete} url={preViewImage} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
