import React from "react";
import { TitleTopic } from "./TitleTopic";
import TitleInput from "@components/TitleInput";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { useHandleImage } from "../useHandleImage";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";

export const HomeVideo = () => {
  const { preViewImage, handleChange, handlePaste, isVideo, handleDelete } =
    useHandleImage();
  return (
    <div className="mt-[40px]">
      <TitleTopic name="adminHome.video.title" />
      <div>
        <TitleInput isRequired={false} name="adminHome.video.form.upload" />
        <div className="flex gap-x-[24px]  h-[168px]">
          <div className="w-[648px]">
            <InputUploadFile onPaseLink={handlePaste} onChange={handleChange} />
          </div>
          <div className=" w-[300px]">
            <ImagePreview
              onDelete={handleDelete}
              optionVideo={{
                width: 300,
                height: 168,
              }}
              isVideos={isVideo}
              url={preViewImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
