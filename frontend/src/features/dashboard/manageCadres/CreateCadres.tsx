import Editor from "@components/Editor";
import { Input } from "@components/Input";
import { SelectInput } from "@components/SelectInput";
import { TranslateContext } from "@contexts/Translation";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { TitleForm } from "@features/dashboard/components/TitleForm";
import TitleInput from "@features/dashboard/components/TitleInput";
import React, {   useContext, useEffect, useRef, useState } from "react";
import { ImagePreview } from "../components/ImagePreview";
import { useHandleImage } from "../hooks/useHandleImage";
import { cadresService } from "@services/cadres";
import { Formik, Form, Field, ErrorMessage,  FormikProps } from "formik";
import type { ICadresPostCheck, ICategotiesCadres } from "@typeRules/cadres";
import * as Yup from "yup";
import { uploadService } from "@services/uploadFile";
import { useNavigate } from "react-router-dom";
import { TranslateToKorean } from "./hooks/useTranslate";
import { PopUpContext } from "@contexts/PopupContext";
import { InputUploadFileImage } from "../components/InputUploadFIleImage";
enum CadresForm {
  fullname = "fullname",
  fullnameKo = "fullnameKo" ,
  position = "position",
  positionKo = "positionKo",
  email = "email",
  major = "major",
  majorKo = "majorKo" ,
  workResponsibility = "workResponsibility",
  workResponsibilityKo = "workResponsibilityKo" ,
  title = "title",
  titleKo = "titleKo",
  files = "files",
  cadresCategory = "cadresCategory",
  content = "content",
  contentKo = "contentKo"
}

const initialValue: ICadresPostCheck = {
  fullname: "",
  fullnameKo: "",
  position: "",
  positionKo: "",
  email: "",
  major: "",
  majorKo: "",
  workResponsibility: "",
  workResponsibilityKo: "",
  title: "",
  titleKo: "",
  content: "",
  contentKo: "",
  files: "",
  cadresCategory: 0,
};


export const CreateCadres = () => {
  const { t , isVn} = useContext(TranslateContext);
  const { preViewImage, handleChange } = useHandleImage();
  const formikRef = useRef<FormikProps<ICadresPostCheck> | null>(null);
  const { showSuccess, showError } = useContext(PopUpContext);
  const [cadresCategoryValue , setCadresCategoryValue] = useState<ICategotiesCadres[]>([])
  const navigate = useNavigate();
  const postCadres = async (value: ICadresPostCheck) => {
    const translateValue = await TranslateToKorean(value , formikRef);
    const formData = new FormData();
    formData.append("file", formikRef.current!.values.files);
    const urlImage = await uploadService.postImage(formData);

    cadresService
      .post({
        ...value,
        ...translateValue,
        files: [
          {
            type: "image",
            link: urlImage,
            name: "urlImage",
          },
        ],
        cadresCategory: {
          id: formikRef.current!.values.cadresCategory,
        },
      })
      .then(() => {
        showSuccess("message.success._success");
        navigate(-1);
      }).catch(() => {
        showError("message.error._error");
      });
  };

  const validationSchema = Yup.object().shape({
    cadresCategory: Yup.string().required(t("validate.required")),
    position: Yup.string().required(t("validate.required")),
    fullname: Yup.string().required(t("validate.required")),
    email: Yup.string()
      .email(t("validate.wrong_format"))
      .required(t("validate.required")),
    major: Yup.string().required(t("validate.required")),
    workResponsibility: Yup.string().required(t("validate.required")),
    title: Yup.string().required(t("validate.required")),
    content: Yup.string().required(t("validate.required")),
    files: Yup.string().required(t("validate.required")),
  });

  useEffect(() => {
    cadresService.getCadresCategories().then((res) => {
      setCadresCategoryValue(res.data);
      formikRef.current?.setFieldValue(
        CadresForm.cadresCategory,
        res.data[0].id
      );
    });
  }, []);

  useEffect(() => {
    if (!isVn) {
      TranslateToKorean(formikRef.current!.values, formikRef);
    }
  }, [isVn]);

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

  return (
    <div className=" bg-white py-[40px] px-[24px]">
      <TitleForm title="cadres_manage._form_create._title" />
      <Formik
        innerRef={formikRef}
        initialValues={initialValue}
        onSubmit={(value) => postCadres(value)}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="grid grid-cols-2 gap-[24px]">
            <div>
              <TitleInput
                forId={CadresForm.cadresCategory}
                name="cadres_manage._form_create._category._name"
              />
              <Field
                type="value"
                name={CadresForm.cadresCategory}
                id={CadresForm.cadresCategory}
                className="text-_14 !text-bg_7E8B99"
                as={SelectInput}
              >
                <>
                  <option selected disabled >
                    {t("cadres_manage._form_create._category._placeholder")}
                  </option>
                  {cadresCategoryValue.map((value) => (
                    <option value={value.id} key={value.id}>
                      {isVn ? value.name : value.nameKo}
                    </option>
                  ))}
                </>
              </Field>
              <ErrorMessage
                name={CadresForm.cadresCategory}
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <TitleInput
                forId={CadresForm.position}
                name="cadres_manage._form_create._position._name"
              />
              <Field
                name={isVn ? CadresForm.position : CadresForm.positionKo}
                onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                  onChangeValueInput(value.target.value, CadresForm.position);
                }}
                placeholder="cadres_manage._form_create._position._placeholder"
                className="h-[44px]"
                as={Input}
              />
              <ErrorMessage
                name={isVn ? CadresForm.position : CadresForm.positionKo}
                component="div"
                className="text-red-500"
              />
            </div>

            <div>
              <TitleInput
                forId={CadresForm.fullname}
                name="cadres_manage._form_create._name._name"
              />
              <Field
                name={isVn ? CadresForm.fullname : CadresForm.fullnameKo}
                onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                  onChangeValueInput(value.target.value, CadresForm.fullname);
                }}
                placeholder="cadres_manage._form_create._name._placeholder"
                className="h-[44px]"
                as={Input}
              />
              <ErrorMessage
                name={isVn ? CadresForm.fullname : CadresForm.fullnameKo}
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <TitleInput
                forId={CadresForm.email}
                name="cadres_manage._form_create._email._name"
              />
              <Field
                name={CadresForm.email}
                id={CadresForm.email}
                placeholder="cadres_manage._form_create._email._placeholder"
                className="h-[44px]"
                as={Input}
              />
              <ErrorMessage
                name={CadresForm.email}
                component="div"
                className="text-red-500"
              />
            </div>
          </div>
          <div className="mt-[24px]">
            <TitleInput
              forId={CadresForm.major}
              name="cadres_manage._form_create._specialized._name"
            />
            <Field
              name={isVn ? CadresForm.major : CadresForm.majorKo}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                onChangeValueInput(value.target.value, CadresForm.major);
              }}
              placeholder="cadres_manage._form_create._specialized._placeholder"
              className="h-[44px]"
              as={Input}
            />
            <ErrorMessage
              name={CadresForm.major}
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mt-[24px]">
            <TitleInput
              forId={CadresForm.workResponsibility}
              name="cadres_manage._form_create._job._name"
            />
            <Field
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                onChangeValueInput(
                  value.target.value,
                  CadresForm.workResponsibility
                );
              }}
              name={
                isVn
                  ? CadresForm.workResponsibility
                  : CadresForm.workResponsibilityKo
              }
              placeholder="cadres_manage._form_create._job._placeholder"
              className="h-[44px]"
              as={Input}
            />
            <ErrorMessage
              name={CadresForm.workResponsibility}
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mt-[24px]">
            <TitleInput
              forId={CadresForm.title}
              name="cadres_manage._form_create._title_content._name"
            />
            <Field
              name={isVn ? CadresForm.title : CadresForm.titleKo}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                onChangeValueInput(value.target.value, CadresForm.title);
              }}
              placeholder="cadres_manage._form_create._title_content._placeholder"
              className="h-[44px]"
              as={Input}
            />
            <ErrorMessage
              name={CadresForm.title}
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mt-[16px]">
            <TitleInput
              name="admin._about._general._form._content"
              forId={CadresForm.content}
            />
            <Field
              name={isVn ? CadresForm.content : CadresForm.contentKo}
              // editor={ClassicEditor}
              data={""}
              onBlur={(content: string) => {
                onChangeValueInput(content, CadresForm.content);
              }}
              as={Editor}
            />
            <ErrorMessage
              name={CadresForm.content}
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mt-[24px]">
            <TitleInput name="common.update_image" forId={CadresForm.files} />
          </div>
          <div className="mt-[16px] flex h-[168px]">
            <div className="w-[648px]">
              <Field
                type="file"
                // id={CadresForm.files}  
                name={CadresForm.files}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  formikRef.current?.setFieldValue(
                    CadresForm.files,
                    e.target.files![0] 
                  );
                }
              }
                as={InputUploadFileImage}
              />
              <ErrorMessage
                name={CadresForm.files}
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
