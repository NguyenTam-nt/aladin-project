import { Input } from "@components/Input";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { ImagePreview } from "@features/dashboard/components/ImagePreview";
import { InputUploadFile } from "@features/dashboard/components/InputUploadFIle";
import { TitleForm } from "@features/dashboard/components/TitleForm";
import TitleInput from "@features/dashboard/components/TitleInput";
import * as Yup from "yup";
import type { IGalleryPostCheck } from "@typeRules/gallery";
import { Formik ,Form, FormikProps, Field, ErrorMessage} from "formik";
import React, {  useContext, useEffect, useRef } from "react";
import { galleryService } from "@services/gallery";
import { TranslateToKorean } from "@features/dashboard/manageCadres/hooks/useTranslate";
import { uploadService } from "@services/uploadFile";
import { TranslateContext } from "@contexts/Translation";
import { useHandleImage } from "@features/dashboard/hooks/useHandleImage";
import { ModalContext } from "@contexts/ModalContext";
import { PopUpContext } from "@contexts/PopupContext";

enum VideoForm {
  name = "name" ,
  nameKo = "nameKo",
  type = "type",
  files = "files",
}

const initialValue = {
  name: "",
  nameKo: "",
  description: "",
  descriptionKo: "",
  type: "VIDEO",
  files: "",
};


export const ModalCreate = ( {callback} : { callback?: () => void}) => {
  const { preViewImage , handleChange ,handleDelete} =  useHandleImage()
  const formikRef = useRef<FormikProps<IGalleryPostCheck> | null>(null);
  const { isVn , t} = useContext(TranslateContext)
  const {hideModal} = useContext(ModalContext)
  const { showSuccess , showError } = useContext(PopUpContext)
 
  const postGallery = async (value: IGalleryPostCheck) => {
    const valueTranslate =
    await TranslateToKorean(value , formikRef);
    const formData = new FormData();
    formData.append("file", formikRef.current!.values.files);
    const urlImage = await uploadService.postVideo(formData);
    galleryService.post({
      ...value,
      ...valueTranslate,
      files: [
        {
          type: "video",
          link: urlImage,
          name: "urlVideo",
        },
      ],
    }).then(() => {
      showSuccess("message.success._success");
      callback?.()
      hideModal()
     }).catch(() => {
      showError("message.error._error");
     })
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("validate.required")),
    files: Yup.string().required(t("validate.required")),
  });

  const onChangeValueInput = (
    value: string,
    key: string ,
  ) => {
    if (isVn) {
      formikRef.current?.setFieldValue(key, value);
      if (formikRef.current?.values[key + "Ko"]) {
        formikRef.current?.setFieldValue(key + "Ko", "");
      }
    } else {
      formikRef.current?.setFieldValue(key + "Ko", value);
    }
  };

  useEffect(() => {
    if (!isVn) {
      TranslateToKorean(formikRef.current!.values , formikRef);
    }
  }, [isVn]);

 
  return (
    <div className="w-[800px] bg-white py-[40px] px-[24px]">
      <TitleForm title="video._form_create._title" />
      <div>
        <Formik
          innerRef={formikRef}
          initialValues={initialValue}
          onSubmit={(value) => postGallery(value)}
          validationSchema={validationSchema}
        >
          <Form>
            <div>
              <TitleInput
                forId={VideoForm.name}
                name="video._form_create._name._name"
              />
              <Field
                name={isVn ? VideoForm.name : VideoForm.nameKo}
                placeholder="video._form_create._name._placeholder"
                className="h-[44px]"
                onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                  onChangeValueInput(value.target.value, VideoForm.name);
                }}
                as={Input}
              />
                <ErrorMessage
                  name={VideoForm.name}
                  component="div"
                  className="text-red-500"
                />
            </div>
            <div>
              <div className="mt-[18px]">
                <TitleInput
                  forId={VideoForm.files}
                  name="video._form_create.upload_video._name"
                />
              </div>
              <div className="w-[424px]">
                <Field
                  type="file"
                  id={VideoForm.files}
                  name={VideoForm.files}
                  isVideos
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    formikRef.current?.setFieldValue(
                      VideoForm.files,
                      e.target.files![0]
                    );
                  }}
                  as={InputUploadFile}
                />
                <ErrorMessage
                  name={VideoForm.files}
                  component="div"
                  className="text-red-500"
                />
              </div>
              {preViewImage ? (
                <div className="mt-[40px] ml-[1px] w-[395px] h-full ml-[24px]">
                  <ImagePreview
                    onDelete={handleDelete}
                    url={preViewImage}
                    isVideos
                  />
                </div>
              ) : null}
            </div>
            <div className="flex justify-center">
              <div className="col-span-2 mt-[40px] w-[264px]">
                <GroupButtonAdmin onSubmit={() => {}} />
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
