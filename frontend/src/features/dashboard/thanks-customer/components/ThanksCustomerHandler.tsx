import Editor from "@components/Editor";
import TitleInput from "@components/TitleInput";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { Input } from "@features/dashboard/components/Input";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { Textarea } from "@features/dashboard/components/Textarea";
import { TitleTopic } from "@features/dashboard/home/components/TitleTopic";
import { useHandleImage } from "@features/dashboard/home/useHandleImage";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

export const ThanksCustomerHandler = () => {
  const params = useParams();
  const isAdd = useMemo(() => {
    return !params.id;
  }, []);
  const imageProduct = useHandleImage();
  const imageAvatar = useHandleImage();
  return (
    <div>
      <TitleTopic
        name={isAdd ? "customer.form.title_add" : "customer.form.title_edit"}
        isRequired={false}
      />
      <div className="grid grid-cols-2 gap-[24px]">
        <div className=" col-span-2 flex items-center gap-x-[24px]">
          <div>
            <TitleInput name="customer.form.upload_image_product" />
            <div className="w-[288px] h-[190px]">
              {!imageProduct.preViewImage ? (
                <InputUploadFile onChange={imageProduct.handleChange} />
              ) : (
                <ImagePreview
                  url={imageProduct.preViewImage}
                  onDelete={imageProduct.handleDelete}
                />
              )}
            </div>
          </div>
          <div>
            <TitleInput name="customer.form.upload_avatar" />
            <div className="w-[288px] h-[190px]">
              {!imageAvatar.preViewImage ? (
                <InputUploadFile onChange={imageAvatar.handleChange} />
              ) : (
                <ImagePreview
                  url={imageAvatar.preViewImage}
                  onDelete={imageAvatar.handleDelete}
                />
              )}
            </div>
          </div>
        </div>
        <div>
          <TitleInput name="customer.form.name" />
          <Input placeholder="customer.form.name_placeholder" />
        </div>
        <div>
          <TitleInput name="customer.form.job" />
          <Input placeholder="customer.form.job_placeholder" />
        </div>

        <div className=" col-span-2">
          <TitleInput name="customer.form.comment" />
          <Textarea maxLength={180} placeholder="customer.form.comment_placeholder" />
        </div>

        <div className=" col-span-2 flex justify-end">
          <GroupButtonAdmin />
        </div>
      </div>
    </div>
  );
};
