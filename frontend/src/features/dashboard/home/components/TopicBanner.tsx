import React, { ChangeEvent, memo, useContext, useState } from "react";
import { SubHeaderTopic } from "./SubHeaderTopic";
import { Button } from "@components/Button";
import { ICPlus } from "@assets/icons/ICPlus";
import { Colors } from "@constants/color";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { TranslateContext } from "@contexts/Translation";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { CardContent } from "./CardContent";
import { ModalContext } from "@contexts/ModalContext";
import { ModalHandlePost } from "./ModalHandlePost";
import DialogConfirmDelete from "@components/DialogConfirmDelete";

export const TopicBanner = () => {
  const { t } = useContext(TranslateContext);
  const [preViewImage, setPreViewImage] = useState<string>(
    "https://s3-alpha-sig.figma.com/img/968d/c70b/c6cac33f1cd2ca478db3b9f0575b7b0a?Expires=1685923200&Signature=htLYrPDTyGzA6Mg0tYLGNhWI~LiGkh8COZ-~I~P3RaMqNjG78zuzLz1PKV~a7dyj1M4BHUI77HBVMGmmNkRx1zepOBI1K2sfWK3Hc9cY1~bGgZrofppXRmzA1HFzZhfVxZArK3hzPBzvstuyEvxNZJibEvIfDReDolCz1gLeI2MKHDz87QEMBNXr9EMBhNWZO7hs6usMpnepg-8W1obUD3JmOdFa3ihschWQJdl7cerDuKGGth3PqDUCknaytw-VcXevUy7-PSuMDjbsbQ2m7ceU-CQHluNXQvTsva03YlDrt9vMumIzc0nc8p4iUpJh-BrIn9445734slg-6AtZCQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const link = URL.createObjectURL(file);
    setPreViewImage(link);
  };

  const handleDelete = () => {
    setPreViewImage("");
  };
  return (
    <>
      <SubHeaderTopic title="admin._home._topic._banner" />
      <div>
        <div className="flex items-center h-[168px] ">
          <InputUploadFile onChange={handleChange} />
          {preViewImage ? (
            <div className="w-[312px] h-[168px]">
              <ImagePreview onDelete={handleDelete} url={preViewImage} />
            </div>
          ) : null}
        </div>
      </div>
      <BannerContent />
    </>
  );
};

const BannerContent = memo(() => {
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
        <SubHeaderTopic title="admin._home._topic._content_banner" />
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
      <div className="grid grid-cols-4 2xl:grid-cols-5 gap-[24px]">
        {[1, 2, 3, 4, 5].map((_, index) => {
          return (
            <CardContent
              onModalDelete={handleDelete}
              onModalEdit={handleShowModalEdit}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
});
