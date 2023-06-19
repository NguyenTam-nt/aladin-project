import React, { memo } from "react";
import { TitleTopic } from "./TitleTopic";
import TitleInput from "@components/TitleInput";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { useHandleImage } from "../useHandleImage";
import { GroupInputContent } from "@features/dashboard/components/GroupInputContent";
import clsx from "clsx";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { useTranslation } from "react-i18next";
import { ICDeleteTrashLight } from "@assets/icons/ICDeleteTrashLight";
import { useModalContext } from "@contexts/hooks/modal";
import { DiglogMessage } from "@features/dashboard/components/DiglogMessage";
import { TopicByType } from "./TopicByType";
import { HomeTopicType } from "@typeRules/home";

export const HomePost = () => {
  const { t } = useTranslation();
  const {setElementModal} = useModalContext()

  const handleShowModal = () => {
    setElementModal(<DiglogMessage message="Cập nhật  bài viết thành công!" />)
  }

  return (
    <div className="mt-[40px]">
      <div className="flex items-baseline">
        <TitleTopic name="adminHome.post.title" />
        <span className="text-_14 text-text_A1A0A3 italic ml-2">
          {t("adminHome.post.maxPost")}
        </span>
      </div>
     <TopicByType type={HomeTopicType.post} />
    </div>
  );
};


