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

  const {listBanner} = useGetTopic(HomeTopicType.video)
  const {showError, showSuccess} = useShowMessage()
  const {showLoading} = useHandleLoading()

  const handleEditImage = async (file:File) => {
    try {
      showLoading()
      const formData = new FormData()
      formData.append("file", file)
      const images = await uploadService.postImage(formData)
      await homeService.updateHomeTopic({type: HomeTopicType.video, listBanner: [{
        id: listBanner?.listBanner?.[0].id,
        linkMedia: images?.list?.[0].linkMedia
      }]})
      showSuccess("message.actions.success.update")
    } catch (error) {
      showError("message.actions.error.update")
    }
   
  }

  const handleSevice = async (link:string) => {
    try {

      await homeService.updateHomeTopic({type: HomeTopicType.video, listBanner: [{
        id: listBanner?.listBanner?.[0].id,
        linkMedia: link
      }]})
      showSuccess("message.actions.success.update")
    } catch (error) {
      showError("message.actions.error.update")
    }
   
  }
  

  const { preViewImage, handleChange, handlePaste, isVideo, handleDelete } =
    useHandleImage(listBanner?.listBanner?.[0].linkMedia || "", handleEditImage);
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
