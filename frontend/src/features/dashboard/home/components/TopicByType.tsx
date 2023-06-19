import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import React from "react";
import { HomeTopicType, ITopicHome } from "@typeRules/home";
import { useHandleImage } from "../useHandleImage";
import TitleInput from "@components/TitleInput";
import { ICDeleteTrashLight } from "@assets/icons/ICDeleteTrashLight";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import clsx from "clsx";
import { useFormik } from "formik";
import { Input } from "@features/dashboard/components/Input";
import { Textarea } from "@features/dashboard/components/Textarea";
import { useGetTopic } from "./useGetTopic";

type Props = {
  type: HomeTopicType;
};

export const TopicByType = ({ type }: Props) => {
  const {listBanner} =  useGetTopic(type)
  const formik = useFormik<ITopicHome>({
    initialValues: {
      title: "",
      content: "",
      linkMedia: ""
    },
    onSubmit: () => {},
  });

  const { preViewImage, handleChange, refInput, handleDelete } =
    useHandleImage();

    const handleSetData = (listBanner:ITopicHome[]) => {

    }

  return (
    <>
      <div
        className={clsx("grid grid-cols-1 relative gap-x-[24px]", {
          "grid-cols-[288px_1fr]": type !== HomeTopicType.sales,
        })}
      >
        {type !== HomeTopicType.sales ? (
          <div className="flex flex-col">
            <TitleInput
              isRequired={false}
              forId=""
              name="button._upload_image"
            />
            <div className="flex-1">
              <div
                className={clsx("h-full", { hidden: !!preViewImage.trim() })}
              >
                <InputUploadFile ref={refInput} onChange={handleChange} />
              </div>
              <div
                //   onClick={handleClickInput}
                className={clsx("h-full w-full", {
                  hidden: !preViewImage.trim(),
                })}
              >
                <ImagePreview onDelete={handleDelete} url={preViewImage} />
              </div>
            </div>
          </div>
        ) : null}
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-y-[16px]">
            <div>
              <TitleInput isRequired={false} name={"adminHome.form.title"} />
              <Input
                placeholder="adminHome.form.title_placeholder"
                maxLength={40}
              />
            </div>
            <div>
              <TitleInput isRequired={false} name={"adminHome.form.content"} />
              <Textarea
                placeholder="adminHome.form.content_placeholder"
                maxLength={350}
              />
            </div>
          </div>
        </div>
        {type !== HomeTopicType.sales ? (
          <button className=" absolute bottom-0 flex items-center justify-center right-[-64px] h-[190px] w-[40px] bg-bg_F1F1F1">
            <ICDeleteTrashLight />
          </button>
        ) : null}
      </div>
      <GroupButtonAdmin />
    </>
  );
};
