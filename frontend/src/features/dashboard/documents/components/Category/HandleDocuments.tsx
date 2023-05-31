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
import { IFileList, useHandleCreateDocuments } from "../../hooks/useHandleCreateDocuments";
import { ICClear } from "@assets/icons/ICClear";
import { GetFileType } from "@commons/getTypeFile";

export const HandleDocuments = memo(() => {
  const {
    handleBlur,
    handleChange,
    handleChangeCheckbox,
    handleChangeEdit,
    handleChangeEditor,
    handleChangFile,
    handleDeleteFile,
    preViewImage,
    isAdd,
    isVn,
    message,
    formik,
    categories,
    t,
    fileList
  } = useHandleCreateDocuments();

 
  
  return (
    <>
      <TitleForm
        title={
          isAdd
            ? "admin.documents._form._title_add"
            : "admin.documents._form._title_edit"
        }
      />
      <div className="relative">
        <TitleInput
          forId="documents-parent-category"
          name="admin.documents._form._name_category_parent"
        />
        <SelectInput
          onBlur={formik.handleBlur}
          id="documents-parent-category"
          name="idParent"
          value={formik.values.idParent}
          onChange={handleChangeCheckbox}
        >
          <>
            <option value="" disabled>
              {t("admin.documents._form._name_parent_placeholder")}
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
      <div className="grid grid-cols-2 gap-[24px] text-_14px text-text_primary">
        <div className=" col-span-2 relative">
          <TitleInput forId={""} name="admin.documents._form._title" />
          <Input
            onBlur={handleBlur}
            onChange={formik.handleChange}
            value={isVn ? formik.values.title : formik.values.titleKo}
            name={isVn ? "title" : "titleko"}
            placeholder="admin.documents._form._title_placeholder"
          />
          {formik.errors.title && formik.touched.title && (
            <TextError message={formik.errors.title} />
          )}
        </div>
        <div className=" col-span-2 relative">
          <TitleInput forId={""} name="admin.documents._form._des" />
          <Input
            onBlur={handleBlur}
            onChange={formik.handleChange}
            value={
              isVn ? formik.values.description : formik.values.descriptionKo
            }
            name={isVn ? "description" : "descriptionKo"}
            placeholder="admin.documents._form._des_placeholder"
          />
          {formik.errors.description && formik.touched.description && (
            <TextError message={formik.errors.description} />
          )}
        </div>
        <div className=" col-span-2 relative">
          <TitleInput forId={""} name="admin.documents._form._content" />
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
          <TitleInput forId={""} name="admin.documents._form._upload" />
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
        <div className=" col-span-2 relative">
          <TitleInput
            forId={""}
            name="admin.documents._form._upload_file"
            isRequired={false}
          />
          <div className="flex gap-[24px] h-[168px]">
            <div className="w-[424px] h-full">
              <InputUploadFile accept={""} onChange={handleChangFile} />
            </div>
          </div>
        </div>
        <div className="flex  flex-1 flex-wrap">
          {fileList.map((file, index) => {
            return (
              <ItemFileRender
                key={index}
                file={file}
                index={index}
                deleteItem={handleDeleteFile}
              ></ItemFileRender>
            );
          })}
        </div>
        <div className=" col-span-2">
          <GroupButtonAdmin isAdd={isAdd} onSubmit={formik.handleSubmit} />
        </div>
      </div>
    </>
  );
})

const ItemFileRender = ({
  file,
  deleteItem,
  index 
}: {
  file: IFileList;
  deleteItem: (index : number) => void;
  index : number
}) => {


  return (
    <div className="relative w-[95%] mx-[12px]">
      <button
     
        onClick={() => {deleteItem(index)}}
      >
          <div className="absolute z-10 top-[50%] left-[80%] translate-x-[-30px] translate-y-[-37px]">
            <ICClear height={30} width={30}></ICClear>
          </div>
          </button>
        {GetFileType(file , 60)}
        <p>{file.name}</p>
    
    </div>
  );
};
