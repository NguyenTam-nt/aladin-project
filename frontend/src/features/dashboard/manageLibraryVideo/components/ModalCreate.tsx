import { Input } from "@components/Input";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { TitleForm } from "@features/dashboard/components/TitleForm";
import TitleInput from "@features/dashboard/components/TitleInput";
import React, { ChangeEvent, useState } from "react";

enum ImageForm {
  name = "name",
  describe ="describe"
}

export const ModalCreate = () => {

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
    <div className="w-[800px] bg-white py-[40px] px-[24px]">
      <TitleForm title="video._form_create._title" />
      <div >
        <div>
          <TitleInput
            forId={ImageForm.name}
            name="video._form_create._name._name"
          />
          <Input
            id={ImageForm.name}
            placeholder="video._form_create._name._placeholder"
            className="h-[44px]"
          />
        </div>
        <div>
          <div className="mt-[18px]">
            <TitleInput
              forId={ImageForm.describe}
              name="video._form_create.upload_video._name"
            />
          </div>
          <div className="w-[424px]">
          <InputUploadFile isVideos onPaseLink={onPaseLink} onChange={onChangeVideo}  />
        </div>
        {linkVideo ? (
          <div className="w-[395px] h-full ml-[24px]">
            <ImagePreview onDelete={handleDelete} url={linkVideo} isVideos />
          </div>
        ) : null}
        </div>

        <div className="flex justify-center">
        <div className="col-span-2 mt-[40px] w-[264px]">
          <GroupButtonAdmin onSubmit={() => {}} />
        </div>
        </div>
      </div>
    </div>
  );
};
