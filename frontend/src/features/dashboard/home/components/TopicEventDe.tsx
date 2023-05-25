import React, { useContext } from "react";
import { SubHeaderTopic } from "./SubHeaderTopic";
import { Button } from "@components/Button";
import { ICPlus } from "@assets/icons/ICPlus";
import { Colors } from "@constants/color";
import { ModalHandlePost } from "./ModalHandlePost";
// import { TranslateContext } from "@contexts/Translation";
import { ModalContext } from "@contexts/ModalContext";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";

export const TopicEventDe = () => {
  const { setElementModal } = useContext(ModalContext);
  // const { t } = useContext(TranslateContext);
  const onSubmit = () => {};
  const handleShowModal = () => {
    setElementModal(<ModalHandlePost onSubmit={onSubmit} />);
  };
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
      <div className=" grid grid-cols-2 gap-[24px] h-[168px]">
          <ImagePreview
            onActive={() => {}}
            onDelete={() => {}}
            url="https://s3-alpha-sig.figma.com/img/99c0/338a/07677e5dd438dea1db51a6cbb8cadb7d?Expires=1685923200&Signature=lu9~VVU4OhFeL-WoLLVyzxkG21m61QsyF3Bkc5K0aoegYvh9DdbR9TRTZlxpf9RlrAQ7SJkiIrqM9Va4moq09hvJsfBeuYvSfB44eLMMHjOpMeTVDegBOigVDtCgT7g84f02tAmcO3vrKSmzkloUtjqElh1GSG6p0Uxe9wRdw63w-5S8LFM~4~0f2e9e64UoGUAUYTc0ltFyu1Vobgvi-JERmgpMVm7iJHf2MdJui0xxVyWApOKeSD~snViwj4FKgQJsm39UjSxNuHGtiI2Qvhcr0xpXJhPD9WvQZ4NMEAxb3qACbJuwdRwTyJpajOxGe~PBj7vNHnzFEHML5fk7rQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          />
          <ImagePreview
            onActive={() => {}}
            onDelete={() => {}}
            isVideos
            url="https://www.w3schools.com/html/mov_bbb.mp4"
          />
      </div>
    </>
  );
};
