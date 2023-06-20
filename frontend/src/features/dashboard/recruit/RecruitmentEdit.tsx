import TitleOfContentManage from "@components/TitleOfContentManage";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHandleImage } from "../home/useHandleImage";
import TitleInput from "@components/TitleInput";
import { InputUploadFile } from "../components/InputUploadFIle";
import { ImagePreview } from "../components/ImagePreview";
import { Input } from "../components/Input";
import Editor from "@components/Editor";
import { GroupButtonAdmin } from "../components/GroupButtonAdmin";

const RecruitmentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { preViewImage, handleChange } = useHandleImage();
  return (
    <div>
      <TitleOfContentManage
        name={id ? "recruit.update" : "recruit.create"}
        className="mb-8"
      />
      <div>
        <div className="grid grid-cols-2 gap-[24px]">
          <div className="col-span-2 flex items-center gap-x-[24px]">
            <div>
              <TitleInput name="news.uploadImage" />
              <div className="w-[288px] h-[190px]">
                <InputUploadFile onChange={handleChange} />
              </div>
            </div>
            {!!preViewImage ? (
              <div className="w-[288px] flex flex-col">
                <div className="flex-1 w-full">
                  <TitleInput
                    isRequired={false}
                    forId=""
                    name="common.image_uploaded"
                  />
                  <div className=" w-full h-[190px]">
                    <ImagePreview url={preViewImage} onDelete={() => {}} />
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="col-span-2">
            <TitleInput name="news.form.title" />
            <Input placeholder="recruit.form.title" />
          </div>

          <div>
            <TitleInput name="recruit.salary" />
            <Input placeholder="recruit.form.salary" />
          </div>
          <div>
            <TitleInput name="recruit.timeEndRecruit" />
            <input
              type="date"
              placeholder=""
              className="h-[48px] placeholder:text-text_A1A0A3 placeholder:text-_14 w-full flex items-center py-[13px] px-[16px] border-[1px] border-solid border-text_A1A0A3 focus-within:!border-TrueBlue_500"
            />
          </div>
          <div className="col-span-2">
            <TitleInput name="timeEndRecruit" />
            <Input placeholder="recruit.form.salary" />
          </div>

          <div className=" col-span-2">
            <TitleInput name="recruit.form.content" />
            <Editor />
          </div>

          <div className=" col-span-2 flex justify-end">
            <GroupButtonAdmin
              onCacel={() => navigate(-1)}
              isAdd={id ? false : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentEdit;
