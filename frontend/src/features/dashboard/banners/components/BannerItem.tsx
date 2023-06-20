import TitleInput from "@components/TitleInput";
import React, { memo } from "react";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { useHandleImage } from "@features/dashboard/home/useHandleImage";
import { TitleTopic } from "@features/dashboard/home/components/TitleTopic";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { useHandleLoading } from "@features/dashboard/components/Loading";
import { useGetTopic } from "@features/dashboard/home/components/useGetTopic";
import { homeService } from "@services/home";
import { uploadService } from "@services/upload";
import type { HomeTopicType } from "@typeRules/home";

type Props = {
  type: HomeTopicType;
  name: string;
};

export const BannerItem = memo(({ type, name }: Props) => {
  const { listBanner, setListBanner } = useGetTopic(type);
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

  const handleSevice = async (link: string, message?:string) => {
    try {
     const data =  await homeService.updateHomeTopic({
        type: type,
        listBanner: [
          {
            id: listBanner?.listBanner?.[0].id,
            linkMedia: link,
          },
        ],
      });
      setListBanner(data)
      showSuccess( !message ? "message.actions.success.update" : message);
    } catch (error) {
      showError("message.actions.error.delete_banner");
    }
  };

  const { preViewImage, handleChange, handleDelete } = useHandleImage(listBanner?.listBanner?.[0].linkMedia, handleEditImage, () => {
    handleSevice("", "message.actions.success.delete_banner")
  });
  return (
    <div className="w-full">
      <TitleTopic name="adminBanner.title" subTranslattion={{ page: name }} />
      <div className="flex gap-x-[24px]">
        <div className=" w-[288px]">
          <TitleInput
            isRequired={false}
            name="adminBanner.upload_image_home"
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
            <div className="flex-1 max-h-[190px]">
              <ImagePreview onDelete={handleDelete} url={preViewImage} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
})
