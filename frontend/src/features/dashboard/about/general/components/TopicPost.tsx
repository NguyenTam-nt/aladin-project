import { ICPlus } from "@assets/icons/ICPlus";
import { Button } from "@components/Button";
import { Colors } from "@constants/color";
import { SubHeaderTopic } from "@features/dashboard/home/components/SubHeaderTopic";
import React from "react";
import { TopicPostItem } from "./TopicPostItem";
import { useHandlePost } from "../../hooks/useHandlePost";
import { ContentType } from "@typeRules/content";

export const TopicPost = () => {
  const {
    listContent,
    handlePostContent,
    handlePutContent,
    handleDeleteContent,
    isShow,
    handShow,
  } = useHandlePost(ContentType.general);
  return (
    <>
      <div className="flex items-center">
        <SubHeaderTopic title="admin._about._general._topic._paragraph" />
        <Button
          onClick={handShow}
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
      {isShow ? <TopicPostItem onSubmit={handlePostContent} type="ADD" /> : null}
      {
        listContent.map((item) => {
          return <TopicPostItem key={item.id} data={item} onSubmit={handlePutContent} onDelete={handleDeleteContent} />
        })
      }
    </>
  );
};
