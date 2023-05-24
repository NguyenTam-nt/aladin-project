import { Input } from "@components/Input";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { TitleForm } from "@features/dashboard/components/TitleForm";
import TitleInput from "@features/dashboard/components/TitleInput";
import React, { ChangeEvent, useState } from "react";

enum BannerForm {
  name = "name",
  des = "description",
  path = "path",
}

type Props = {
    type?: "ADD" | "EDIT",
    onSubmit: () => void
}

export const ModalHandlePost = ({type = "ADD", onSubmit}:Props) => {
  const [linkVideo, setLinkVideo] = useState("");
  const onChangeVideo = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setLinkVideo(URL.createObjectURL(file));
  };

  const handleDelete = () => {
    setLinkVideo("");
  };

  return (
    <div className="w-[788px] bg-white py-[40px] px-[24px]">
      <TitleForm title={type === "ADD" ? "admin._home._banner._form._title" : "admin._home._banner._form._title_edit"} />
      <div className="grid grid-cols-1 gap-[24px]">
        <div>
          <TitleInput
            forId={BannerForm.name}
            name="admin._home._banner._form._name"
          />
          <Input
            id={BannerForm.name}
            placeholder="admin._home._banner._form._name_placeholder"
          />
        </div>

        <div>
          <TitleInput
            forId={BannerForm.des}
            name="admin._home._banner._form._des"
          />
          <Input
            id={BannerForm.des}
            placeholder="admin._home._banner._form._des_placeholder"
          />
        </div>

        <div>
          <TitleInput
            forId={BannerForm.des}
            name="admin._home._banner._form._upload"
          />
          <div className="flex items-center h-[168px]">
            <div className="h-full mr-[24px]">
              <InputUploadFile onChange={onChangeVideo} />
            </div>
            {linkVideo ? (
              <div className="w-auto max-w-[250px] h-full">
                <ImagePreview onDelete={handleDelete} url={linkVideo} />
              </div>
            ) : null}
          </div>
        </div>
        <div>
          <TitleInput
            forId={BannerForm.des}
            name="admin._home._banner._form._path"
          />
          <Input
            id={BannerForm.des}
            placeholder="admin._home._banner._form._path_placeholder"
          />
        </div>
        <div>
          <GroupButtonAdmin onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};
