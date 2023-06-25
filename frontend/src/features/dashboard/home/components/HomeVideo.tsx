import React from "react";
import { TitleTopic } from "./TitleTopic";
import TitleInput from "@components/TitleInput";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { useHandleImage } from "../useHandleImage";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { uploadService } from "@services/upload";
import { homeService } from "@services/home";
import { useGetTopic } from "./useGetTopic";
import { HomeTopicType } from "@typeRules/home";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { useHandleLoading } from "@features/dashboard/components/Loading";

export const HomeVideo = () => {
  const { listBanner, setListBanner } = useGetTopic(HomeTopicType.video);
  const { showError, showSuccess } = useShowMessage();
  const { showLoading } = useHandleLoading();

  const handleEditImage = async (file: File) => {
    try {
      showLoading();
      const formData = new FormData();
      formData.append("file", file);
      const images = await uploadService.postImage(formData);

      await handleSevice(images?.list?.[0].linkMedia || "");
    } catch (error) {
      showError("message.actions.error.update");
    }
  };

  const handleSevice = async (link: string, message?: string) => {
    try {
      const data = await homeService.updateHomeTopic({
        type: HomeTopicType.video,
        listBanner: [
          {
            id: listBanner?.listBanner?.[0].id,
            linkMedia: link,
          },
        ],
      });
      setListBanner(data);
      showSuccess(!message ? "message.actions.success.update" : message);
    } catch (error) {
      showError("message.actions.error.delete_banner");
    }
  };

  const { preViewImage, handleChange, handlePaste, isVideo, handleDelete } =
    useHandleImage(
      listBanner?.listBanner?.[0].linkMedia || "",
      handleEditImage,
      () => handleSevice("", "message.actions.success.delete_banner"),
      handleSevice
    );
  return (
    <div className="mt-[40px]">
      <TitleTopic name="adminHome.video.title" />
      <div>
        <TitleInput isRequired={true} name="adminHome.video.form.upload" />
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
