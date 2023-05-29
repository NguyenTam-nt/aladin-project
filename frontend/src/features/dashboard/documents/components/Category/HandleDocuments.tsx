import Editor from "@components/Editor";
import { Input } from "@components/Input";
import { SelectInput } from "@components/SelectInput";
import { pathDocumentsHandle } from "@constants/contain";
import { TranslateContext } from "@contexts/Translation";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { TitleForm } from "@features/dashboard/components/TitleForm";
import TitleInput from "@features/dashboard/components/TitleInput";
import { useHandleImage } from "@features/dashboard/hooks/useHandleImage";
import React, { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";

export const HandleDocuments = () => {
  const params = useParams();
  const { t } = useContext(TranslateContext);
  const isAdd = useMemo(() => {
    return params?.type === pathDocumentsHandle.add;
  }, [params?.type]);
  const { preViewImage, handleChange } = useHandleImage();
  return (
    <>
      <TitleForm
        title={
          isAdd ? "admin.documents._form._title_add" : "admin.documents._form._title_edit"
        }
      />
      <div className="grid grid-cols-2 gap-[24px] text-_14px text-text_primary">
        <div>
          <TitleInput
            forId={""}
            name="admin.documents._form._name_category_parent"
          />
          <SelectInput>
            <>
              <option selected disabled>
                {t("admin.documents._form._name_parent_placeholder")}
              </option>
            </>
          </SelectInput>
        </div>
        <div>
          <TitleInput forId={""} name="admin.documents._form._name_category_child" />
          <SelectInput>
            <>
              <option selected disabled>
                {t("admin.documents._form._name_category_child_placeholder")}
              </option>
            </>
          </SelectInput>
        </div>
        <div className=" col-span-2">
          <TitleInput forId={""} name="admin.documents._form._title" />
          <Input placeholder="admin.documents._form._title_placeholder" />
        </div>
        <div className=" col-span-2">
          <TitleInput forId={""} name="admin.documents._form._des" />
          <Input placeholder="admin.documents._form._des_placeholder" />
        </div>
        <div className=" col-span-2">
          <TitleInput forId={""} name="admin.documents._form._content" />
          <Editor onChange={() => {}} content="" />
        </div>
        <div className=" col-span-2">
          <TitleInput forId={""} name="admin.documents._form._upload" />
          <div className="flex gap-[24px] h-[168px]">
            <div className="w-[424px] h-full">
              <InputUploadFile onChange={handleChange} />
            </div>
            <div className="flex-1">
              <ImagePreview url={preViewImage} />
            </div>
          </div>
        </div>
        <div className=" col-span-2">
          <GroupButtonAdmin onSubmit={() => {}} />
        </div>
      </div>
    </>
  );
};
