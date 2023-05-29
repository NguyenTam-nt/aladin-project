import { Input } from "@components/Input";
import { ModalContext } from "@contexts/ModalContext";
import { PopUpContext } from "@contexts/PopupContext";
import { TranslateContext } from "@contexts/Translation";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { TitleForm } from "@features/dashboard/components/TitleForm";
import TitleInput from "@features/dashboard/components/TitleInput";
import { TranslateToKorean } from "@features/dashboard/manageCadres/hooks/useTranslate";
import { galleryService } from "@services/gallery";
import { uploadService } from "@services/uploadService";
import type { IGalleryPostCheck } from "@typeRules/gallery";
import { Field, Form, Formik, FormikProps } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
enum ImageForm {
  name = "name",
  nameKo = "nameKo",
  des = "des",
  desKo = "desKo",
  type = "type",
  files = "files",
}
const initialValue = {
  name: "",
  nameKo: "",
  des: "",
  desKo: "",
  type: "IMAGE",
  files: "",
};

export const ModalCreate = ({ callback} : { callback ? : () => void}) => {
  const formikRef = useRef<FormikProps<IGalleryPostCheck> | null>(null);
  const { isVn, t } = useContext(TranslateContext);
  const { hideModal } = useContext(ModalContext);
  const { showSuccess, showError } = useContext(PopUpContext);

  const postGallery = async (value: IGalleryPostCheck) => {
    const valueTranslate = await TranslateToKorean(value, formikRef);
    galleryService
      .post({
        ...value,
        ...valueTranslate,
        files: [],
      })
      .then(() => {
        showSuccess("message.success._success");
        callback?.()
        hideModal();
      })
      .catch(() => {
        showError("message.error._error");
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("validate.required")),
    des: Yup.string().required(t("validate.required")),
  });

  const onChangeValueInput = (value: string, key: string) => {
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
      TranslateToKorean(formikRef.current!.values, formikRef);
    }
  }, [isVn]);

  return (
    <div className="w-[800px] bg-white py-[40px] px-[24px]">
      <TitleForm title="image._form_create._title" />
      <Formik
        innerRef={formikRef}
        initialValues={initialValue}
        onSubmit={(value) => postGallery(value)}
        validationSchema={validationSchema}
      >
        <Form>
          <div>
            <div>
              <TitleInput
                forId={ImageForm.name}
                name="image._form_create._name._name"
              />
              <Field
                name={isVn ? ImageForm.name : ImageForm.nameKo}
                placeholder="image._form_create._name._placeholder"
                className="h-[44px]"
                onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                  onChangeValueInput(value.target.value, ImageForm.name);
                }}
                as={Input}
              />
            </div>
            <div>
              <div className="mt-[18px]">
                <TitleInput
                  forId={ImageForm.des}
                  name="image._form_create._describe._name"
                />
              </div>
              <Field
                name={isVn ? ImageForm.des : ImageForm.desKo}
                placeholder="image._form_create._describe._placeholder"
                className="h-[44px]"
                onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                  onChangeValueInput(value.target.value, ImageForm.des);
                }}
                as={Input}
              />
            </div>
            <div className="flex justify-center">
              <div className="col-span-2 mt-[40px] w-[264px]">
                <GroupButtonAdmin onSubmit={() => {}} />
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
