import React, { useContext } from "react";
import { SubHeaderTopic } from "./SubHeaderTopic";
import { Button } from "@components/Button";
import { ICPlus } from "@assets/icons/ICPlus";
import { Colors } from "@constants/color";
import { ModalHandlePost } from "./ModalHandlePost";
import { TranslateContext } from "@contexts/Translation";
import { ModalContext } from "@contexts/ModalContext";
import { CardContent } from "./CardContent";
import DialogConfirmDelete from "@components/DialogConfirmDelete";

export const TopicEvent = () => {
  const { setElementModal } = useContext(ModalContext);
  const { t } = useContext(TranslateContext);
  const onSubmit = () => {};
  const handleShowModal = () => {
    setElementModal(<ModalHandlePost onSubmit={onSubmit} />);
  };
  const handleShowModalEdit = () => {
    setElementModal(<ModalHandlePost onSubmit={onSubmit} type="EDIT" />);
  };

  const handleDelete = () => {
    setElementModal(
      <DialogConfirmDelete message={t("common._message_delete_post")} />
    );
  };
  return (
    <>
      <div className="flex items-center">
        <SubHeaderTopic title="admin._home._topic._event" />
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
      <div className="grid grid-cols-4 gap-[24px]">
        {[1, 2, 3, 4].map((_, index) => {
          return (
            <CardContent
              onActive={() => {}}
              onModalDelete={handleDelete}
              onModalEdit={handleShowModalEdit}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
};
