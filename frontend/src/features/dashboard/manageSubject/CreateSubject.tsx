import Editor from "@components/Editor";
import { Input } from "@components/Input";
// import { TranslateContext } from "@contexts/Translation";
import TitleInput from "@features/dashboard/components/TitleInput";
import React, { useContext, useEffect, useRef } from "react";
import { ImagePreview } from "../components/ImagePreview";
import { useHandleImage } from "../hooks/useHandleImage";
import { Formik, FormikProps ,Form, Field, ErrorMessage } from "formik";
import type {  ISubjectPostCheck } from "@typeRules/subject";
import { subjectService } from "@services/subject";
import { uploadService } from "@services/uploadFile";
import {  useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { TranslateContext } from "@contexts/Translation";
import { TitleForm } from "../components/TitleForm";
import { GroupButtonAdmin } from "../components/GroupButtonAdmin";
import { TranslateToKorean } from "../manageCadres/hooks/useTranslate";
import { PopUpContext } from "@contexts/PopupContext";
import { InputUploadFileImage } from "../components/InputUploadFIleImage";
enum SubjectForm {
  name = "name",
  nameKo = "nameKo",
  description = "description",
  descriptionKo = "descriptionKo",
  title = "title",
  titleKo = "titleKo",
  content = "content",
  contentKo = "contentKo",
  files = "files",
}

const initialValue : ISubjectPostCheck = {
  name: "",
  nameKo: "",
  description: "",
  descriptionKo: "",
  title: "",
  titleKo: "",
  content: "",
  contentKo: "",
  files: "",
};


export const CreateSubject = () => {
  // const { t } = useContext(TranslateContext);
  const formikRef = useRef<FormikProps<ISubjectPostCheck> | null>(null);
  const { preViewImage , handleChange} =  useHandleImage()
  const { showSuccess, showError } = useContext(PopUpContext);
  const { t  ,isVn}  = useContext(TranslateContext)
  const navigate = useNavigate()
 
  const postSubject = async (value: ISubjectPostCheck) => {
    const valueTranslate =
      await TranslateToKorean(value , formikRef);

    const formData = new FormData();
    formData.append("file", formikRef.current!.values.files);
    const urlImage = await uploadService.postImage(formData);
    subjectService.post({
      ...value,
      ...valueTranslate,
      files: [
        {
          type: "image",
          link: urlImage,
          name: "urlImage",
        },
      ],
    }).then(() => {
      showSuccess("message.success._success");
      navigate(-1)
     }).catch(() => {
      showError("message.error._error");
     })
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("validate.required")),
    description: Yup.string().required(t("validate.required")),
    title: Yup.string().required(t("validate.required")),
    content: Yup.string().required(t("validate.required")),
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
    <div className=" bg-white py-[40px] px-[24px]">
      <TitleForm title="subject_manage._form_create._title" />
      <Formik
        innerRef={formikRef}
        initialValues={initialValue}
        onSubmit={(value) => postSubject(value)}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="grid grid-cols-1 gap-[24px]">
            <div>
              <TitleInput
                forId={SubjectForm.name}
                name="subject_manage._form_create._name._name"
              />
              <Field
                name={SubjectForm.name}
                placeholder="subject_manage._form_create._name._placeholder"
                className="h-[44px]"
                onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                  onChangeValueInput(value.target.value, SubjectForm.name);
                }}
                as={Input}
              />
              <ErrorMessage
                name={SubjectForm.name}
                component="div"
                className="text-red-500"
              />
            </div>

            <div>
              <TitleInput
                forId={SubjectForm.description}
                name="subject_manage._form_create._describe._name"
              />
              <Field
                name={SubjectForm.description}
                placeholder="subject_manage._form_create._describe._placeholder"
                className="h-[44px]"
                onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                  onChangeValueInput(value.target.value, SubjectForm.description);
                }}
                as={Input}
              />
              <ErrorMessage
                name={SubjectForm.description}
                component="div"
                className="text-red-500"
              />
            </div>
          </div>
          <div className="mt-[24px]">
            <TitleInput
              forId={SubjectForm.title}
              name="subject_manage._form_create._title_content._name"
            />
            <Field
              name={SubjectForm.title}
              placeholder="subject_manage._form_create._title_content._placeholder"
              className="h-[44px]"
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                onChangeValueInput(value.target.value, SubjectForm.title);
              }}
              as={Input}
            />
            <ErrorMessage
              name={SubjectForm.title}
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mt-[16px]">
            <TitleInput
              name="admin._about._general._form._content"
              forId={""}
            />
            <Field
              name={isVn ? SubjectForm.content : SubjectForm.contentKo}
              data={""}
          
              onBlur={(content: string) => {
                onChangeValueInput(content, SubjectForm.content);
              }}
              as={Editor}
            />
            <ErrorMessage
              name={SubjectForm.content}
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mt-[24px]">
            <TitleInput name="common.update_image" forId={""} />
          </div>
          <div className="mt-[16px] flex h-[168px]">
            <div className="w-[648px]">
            <Field
                type="file"
                id={SubjectForm.files}
                name={SubjectForm.files}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  formikRef.current?.setFieldValue(
                    SubjectForm.files,
                    e.target.files![0]
                  );
                }}
                as={InputUploadFileImage}
              />
               <ErrorMessage
              name={SubjectForm.files}
              component="div"
              className="text-red-500"
            />
            </div>
            <div className="flex-1 ml-3">
              <ImagePreview url={preViewImage} />
            </div>
          </div>

          <div className=" col-span-2 mt-[40px]">
            <GroupButtonAdmin onSubmit={() => {}} />
          </div>
        </Form>
      </Formik>
    </div>
  );
};
