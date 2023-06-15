import TitleInput from "@components/TitleInput";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { useHandleImage } from "@features/dashboard/home/useHandleImage";
import React from "react";
import { BannerHomeItem } from "./BannerHomeItem";

export const BannerHome = () => {
  const { preViewImage, handleChange } = useHandleImage();
  return (
    <>
    <div>
      <TitleInput isRequired={false} name="adminBanner.upload_banner_home" />
      <div className="w-[288px] h-[190px]">
        <InputUploadFile onChange={handleChange} />
      </div>
    </div>
    <BannerHomeItem data={{preViewImage}} />
   
    </>
  );
};
