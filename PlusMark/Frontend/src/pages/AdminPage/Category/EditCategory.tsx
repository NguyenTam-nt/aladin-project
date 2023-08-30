import { ImagePreview } from "@components/input/ImagePreview";
import { InputComponent } from "@components/input/InputComponent";
import { InputUploadFile } from "@components/input/InputUploadFile";
import TitleInput from "@components/input/TitleInput";
import useI18n from "@hooks/useI18n";
import clsx from "clsx";
import TitlePage from "commons/TitlePage";
import React, { memo } from "react";

const EditCategory = () => {
  const { isVn, t } = useI18n();
  return (
    <div className="w-[50vw] max-h-screen min-h-[70vh] overflow-y-scroll hidden_scroll bg-white p-10">
      <TitlePage
        text={isVn ? "text.title.add_category" : "text.title.edit_category"}
      />
      <div className="py-10 flex flex-col gap-3">
        <div>
          <TitleInput isRequired name="form.lable.category_name" />
          <InputComponent
            placeholder="form.placeholder.category_name"
            rounded={false}
          />
        </div>
        <div>
          <TitleInput isRequired name="form.lable.banner_category" />
          <div className="w-[178px] h-[135px]">
            <InputUploadFile
              onChange={() => {}}
              justImage={true}
              className=""
            />
            {/* <ImagePreview url="" /> */}
          </div>
        </div>
        <div>
          <div>
            <TitleInput name="form.lable.detail_category" />
            <div className="grid grid-cols-[200px_1fr] gap-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
