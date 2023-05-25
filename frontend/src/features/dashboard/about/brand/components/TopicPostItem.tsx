import { ICDeleteImage } from "@assets/icons/ICDeleteImage";
import { ICSave } from "@assets/icons/ICSave";
import { Button } from "@components/Button";
import DialogConfirmDelete from "@components/DialogConfirmDelete";
import Editor from "@components/Editor";
import { Input } from "@components/Input";
import { Colors } from "@constants/color";
import { ModalContext } from "@contexts/ModalContext";
import { TranslateContext } from "@contexts/Translation";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import TitleInput from "@features/dashboard/components/TitleInput";
import React, { ChangeEvent, memo, useContext, useState } from "react";

type Props = {
  type?: "ADD" | "EDIT";
};

export const TopicPostItem = memo(({ type = "EDIT" }: Props) => {
  const { t } = useContext(TranslateContext);
  const { setElementModal } = useContext(ModalContext);
  const [image, setImage] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImage(URL.createObjectURL(file));
  };

  const onPaseLink = (link: string) => {
    setImage(link);
  };

  const handleShowModal = () => {
    setElementModal(
      <DialogConfirmDelete message={t("admin._notice._delete_history")} />
    );
  };
  console.log({type})
  return (
    <div>
      <div className="">
        <TitleInput name="admin._about._general._form._title" forId={""} />
        <Input placeholder="admin._about._general._form._title_placeholder" />
      </div>

      <div className="mt-[16px]">
        <TitleInput name="admin._about._general._form._content" forId={""} />
        <Editor content={""} onChange={() => {}} />
      </div>
      <div className="mt-[16px] flex h-[168px]">
        <div className="w-[648px]">
          <InputUploadFile onChange={onChange} onPaseLink={onPaseLink} />
        </div>
        <div className="flex-1 ml-3">
          <ImagePreview url={image} />
        </div>
      </div>
      <div className="mt-[24px] flex items-center">
        <Button
          onClick={handleShowModal}
          className="border border-text_C53434 text-text_C53434 w-[170px] mr-[24px]"
          imageLeft={
            <span className="mr-2">
              <ICDeleteImage color={Colors.text_C53434} />
            </span>
          }
          color="empty"
          text={"button._delete_paragral"}
        />

        <Button
          //   onClick={onSubmit}
          className="w-[170px]"
          imageLeft={
            <span className="mr-2">
              <ICSave />
            </span>
          }
          color="primary"
          text="button._save"
        />
      </div>
    </div>
  );
});
