import React from "react";
import { SubHeaderTopic } from "./SubHeaderTopic";
import { Button } from "@components/Button";
import { ICPlus } from "@assets/icons/ICPlus";
import { Colors } from "@constants/color";
import { CardContent } from "./CardContent";
import { useHandlePost } from "@features/dashboard/hooks/useHandlePost";
import { PostType } from "@typeRules/post";

export const TopicEvent = () => {
  const {
    handleDelete,
    handleShowModal,
    handleShowModalEdit,
    listPost,
    onSubmitEdit,
  } = useHandlePost(PostType.postEvent);
  return (
    <>
      <div className="flex items-center">
        <SubHeaderTopic title="admin._home._topic._event" />
        {listPost.length < 4 ? (
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
        ) : null}
      </div>
      <div className="grid grid-cols-4 gap-[24px]">
        {listPost.map((data, index) => {
          return (
            <CardContent
              onActive={() =>
                onSubmitEdit({ ...data, outstanding: !data.outstanding })
              }
              onModalDelete={() => handleDelete(Number(data.id))}
              onModalEdit={() => handleShowModalEdit(data)}
              data={data}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
};
