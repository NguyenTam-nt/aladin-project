import Editor from "@components/Editor";
import { Input } from "@components/Input";
import { SelectInput } from "@components/SelectInput";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { TitleForm } from "@features/dashboard/components/TitleForm";
import TitleInput from "@features/dashboard/components/TitleInput";
import React, { memo } from "react";
import { TextError } from "@features/dashboard/components/TextError";
import { useHandleCreateNews } from "../../hooks/useHandleCreateNews";

export const HandleNews = memo(() => {
  const {
    handleBlur,
    handleChange,
    handleChangeCheckbox,
    handleChangeEdit,
    handleChangeEditor,
    currentCategory,
    preViewImage,
    isAdd,
    isVn,
    message,
    formik,
    categories,
    t,
  } = useHandleCreateNews();
  return (
    <>
      <TitleForm
        title={
          isAdd ? "admin.news._form._title_add" : "admin.news._form._title_edit"
        }
      />
      <div className="grid grid-cols-2 gap-[24px] text-_14px text-text_primary">
        <div className="relative">
          <TitleInput
            forId="news-parent-category"
            name="admin.news._form._name_category_parent"
          />
          <SelectInput
            onBlur={formik.handleBlur}
            id="news-parent-category"
            name="idParent"
            value={formik.values.idParent}
            onChange={handleChangeCheckbox}
          >
            <>
              <option value="" disabled>
                {t("admin.news._form._name_parent_placeholder")}
              </option>
              {categories.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {isVn ? item.name : item.nameKo}
                  </option>
                );
              })}
            </>
          </SelectInput>
          {formik.errors.idParent && formik.touched.idParent && (
            <TextError message={formik.errors.idParent} />
          )}
        </div>
        <div>
          <TitleInput
            isRequired={false}
            forId={""}
            name="admin.news._form._name_category_child"
          />
          <SelectInput
            onBlur={formik.handleBlur}
            name="idChild"
            value={formik.values.idChild}
            onChange={formik.handleChange}
          >
            <>
              <option value="" disabled>
                {t("admin.news._form._name_category_child_placeholder")}
              </option>
              {currentCategory.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {isVn ? item.name : item.nameKo}
                  </option>
                );
              })}
            </>
          </SelectInput>
        </div>
        <div className=" col-span-2 relative">
          <TitleInput forId={""} name="admin.news._form._title" />
          <Input
            onBlur={handleBlur}
            onChange={formik.handleChange}
            value={isVn ? formik.values.title : formik.values.titleKo}
            name={isVn ? "title" : "titleko"}
            placeholder="admin.news._form._title_placeholder"
          />
          {formik.errors.title && formik.touched.title && (
            <TextError message={formik.errors.title} />
          )}
        </div>
        <div className=" col-span-2 relative">
          <TitleInput forId={""} name="admin.news._form._des" />
          <Input
            onBlur={handleBlur}
            onChange={formik.handleChange}
            value={
              isVn ? formik.values.description : formik.values.descriptionKo
            }
            name={isVn ? "description" : "descriptionKo"}
            placeholder="admin.news._form._des_placeholder"
          />
          {formik.errors.description && formik.touched.description && (
            <TextError message={formik.errors.description} />
          )}
        </div>
        <div className=" col-span-2 relative">
          <TitleInput forId={""} name="admin.news._form._content" />
          <Editor
            content={isVn ? formik.values.content : formik.values.contentKo}
            onBlur={handleChangeEditor}
            onChange={handleChangeEdit}
          />
          {formik.errors.description && formik.touched.description && (
            <TextError message={formik.errors.description} />
          )}
        </div>
        <div className=" col-span-2 relative">
          <TitleInput forId={""} name="admin.news._form._upload" />
          <div className="flex gap-[24px] h-[168px]">
            <div className="w-[424px] h-full">
              <InputUploadFile onChange={handleChange} />
            </div>
            <div className="flex-1">
              <ImagePreview url={preViewImage} />
            </div>
          </div>
          <TextError message={message} />
        </div>
        <div className=" col-span-2">
          <GroupButtonAdmin isAdd={isAdd} onSubmit={formik.handleSubmit} />
        </div>
      </div>
    </>
  );
})
