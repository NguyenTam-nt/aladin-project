import React from "react";
import { SubHeaderTopic } from "./SubHeaderTopic";
import { Button } from "@components/Button";
import { ICPlus } from "@assets/icons/ICPlus";
import { Colors } from "@constants/color";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { useHandlePost } from "@features/dashboard/hooks/useHandlePost";
import { PostType } from "@typeRules/post";

export const TopicEventDe = () => {
  const { handleShowModal, handleDelete, listPost, onSubmitEdit } =
    useHandlePost(PostType.postCenter);
  return (
    <>
      <div className="flex items-center">
        <SubHeaderTopic title="admin._home._topic._event_def" />
        <Button
          onClick={handleShowModal}
          imageLeft={
            <span className="mr-[12px]">
              <ICPlus color={Colors.secondary} />
            </span>
          }
          className="max-w-[170px] border border-secondary"
          text="button._create_post"
          color="empty"
        />
      </div>
      {listPost.length ? (
        <div className=" grid grid-cols-2 gap-[24px] h-[168px]">
          {listPost.map((data) => {
            return (
              <ImagePreview
                key={data.id}
                onActive={() =>
                  onSubmitEdit({ ...data, outstanding: !data.outstanding })
                }
                onDelete={() => handleDelete(Number(data.id))}
                isVideos
                url={data.image ?? ""}
              />
            );
          })}
        </div>
      ) : null}
    </>
  );
};
