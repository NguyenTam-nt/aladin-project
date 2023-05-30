import React, { useContext, useEffect, useState } from "react";
import { SubHeaderTopic } from "./SubHeaderTopic";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { bannerService } from "@services/banner";
import { BannerType, IBanner } from "@typeRules/banner";
import { useHandleImage } from "@features/dashboard/hooks/useHandleImage";
import { PopUpContext } from "@contexts/PopupContext";
import { uploadService } from "@services/uploadService";

export const TopicVideo = () => {
  const [video, setVideo] = useState<IBanner>();

  const hanldeChangeVideo = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    const image = await uploadService.postVideo(formData);
    handleSubmit(image);
  };

  const handleDeleteLogin = async () => {
    if (video) {
      bannerService
        .putBanner({
          ...video,
          link: "string",
        })
        .then(() => {
          setVideo({...video, link: "string"});
          showSuccess("message.success._success");
        })
        .catch(() => {
          showError("message.error._error");
        });
    }
  };

  const { preViewImage, handleChange, handleDelete } = useHandleImage(
    video?.link,
    hanldeChangeVideo,
    handleDeleteLogin
  );
  // const { t } = useContext(TranslateContext);
  const { showSuccess, showError } = useContext(PopUpContext);

  const onPaseLink = (link: string) => {
    if (!video) return;
    setVideo({ ...video, link });

    handleSubmit(link);
  };

  const handleSubmit = (link: string) => {
    if (video) {
      bannerService
        .putBanner({
          ...video,
          link: link ? link : video.link,
        })
        .then((data) => {
          setVideo(data);
          showSuccess("message.success._success");
        })
        .catch(() => {
          showError("message.error._error");
        });
    }
  };

  useEffect(() => {
    bannerService.getByType(BannerType.home).then((data) => {
      setVideo(data?.data?.[0]);
    });
  }, []);

  return (
    <>
      <SubHeaderTopic isPaddingTop={false} title="admin._home._topic._video" />
      <div className="flex items-center h-[168px]">
        <div className="w-[648px] h-full">
          <InputUploadFile
            isVideos
            onPaseLink={onPaseLink}
            onChange={handleChange}
          />
        </div>
        {preViewImage ? (
          <div className="w-[395px] h-full ml-[24px]">
            <ImagePreview onDelete={handleDelete} url={preViewImage} isVideos />
          </div>
        ) : null}
      </div>
    </>
  );
};
