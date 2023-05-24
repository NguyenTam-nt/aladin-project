import React, { ChangeEvent, useState } from "react";
import { SubHeaderTopic } from "./SubHeaderTopic";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";

export const TopicVideo = () => {
  const [linkVideo, setLinkVideo] = useState("");
  const onChangeVideo = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setLinkVideo(URL.createObjectURL(file));
  };

  const onPaseLink = (link: string) => {
    if(linkVideo) return
        setLinkVideo(link)
  };

  const handleDelete = () => {
    setLinkVideo("")
  }

  return (
    <>
      <SubHeaderTopic isPaddingTop={false} title="admin._home._topic._video" />
      <div className="flex items-center h-[168px]">
        <div className="w-[648px]">
          <InputUploadFile isVideos onPaseLink={onPaseLink} onChange={onChangeVideo}  />
        </div>
        {linkVideo ? (
          <div className="w-[395px] h-full ml-[24px]">
            <ImagePreview onDelete={handleDelete} url={linkVideo} isVideos />
          </div>
        ) : null}
      </div>
    </>
  );
};
