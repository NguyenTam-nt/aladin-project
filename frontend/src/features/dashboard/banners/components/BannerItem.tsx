import TitleInput from "@components/TitleInput";
import React from "react";
import type { BannerType } from "..";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { useHandleImage } from "@features/dashboard/home/useHandleImage";
import { TitleTopic } from "@features/dashboard/home/components/TitleTopic";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";

type Props = {
  type: BannerType;
  name: string;
};

export const BannerItem = ({ type, name }: Props) => {
  const { preViewImage, handleChange } = useHandleImage();
  return (
    <div className="w-full">
      <TitleTopic name="adminBanner.title" subTranslattion={{ page: name }} />
      <div className="flex gap-x-[24px]">
        <div className=" w-[288px]">
          <TitleInput
            isRequired={false}
            name="adminBanner.upload_banner_home"
          />
          <div className="h-[190px]">
            <InputUploadFile onChange={handleChange} />
          </div>
        </div>
        {!!preViewImage ? (
          <div className="w-[288px] flex flex-col">
            <TitleInput
              isRequired={false}
              forId=""
              name="common.image_uploaded"
            />
            <div className="flex-1">
              <ImagePreview url={preViewImage} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
