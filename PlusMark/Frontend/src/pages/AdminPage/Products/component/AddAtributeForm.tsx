import GroupButton from "@components/Buttons/GroupButton";
import { useShowMessage } from "@components/Modal/DialogMessage";
import { InputComponent } from "@components/input/InputComponent";
import TitleInput from "@components/input/TitleInput";
import { ModalContext } from "@contexts/contextModal";
import useI18n from "@hooks/useI18n";
import TranslateService from "@services/TranslateService";
import { ListAtribuite } from "@services/Types/product";
import { TextError } from "commons/TextError";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";

interface Props {
  attibute?: ListAtribuite;
  indexEdit?: number;
  handleEdit: (data: ListAtribuite, index: number) => void;
}
const AddAtributeForm = ({ attibute, indexEdit, handleEdit }: Props) => {
  const { isVn } = useI18n();
  const { closeModal } = useContext(ModalContext);
  const { showError } = useShowMessage();
  const formik = useFormik<ListAtribuite>({
    initialValues: {
      valueKr: attibute?.valueKr || [],
      valueVn: attibute?.valueVn || [],
      attributeNameVn: attibute?.attributeNameVn || "",
      attributeNameKr: attibute?.attributeNameKr || "",
    },
    validationSchema: Yup.object(
      isVn
        ? {
            attributeNameVn: Yup.string()
              .required("Không được để trống tên thuộc tính.")
              .max(20, "Không được quá 20 kí tụ"),
          }
        : {
            attributeNameKr: Yup.string()
              .required("Không được để trống tên thuộc tính.")
              .max(20, "Không được quá 20 kí tụ"),
          }
    ),
    onSubmit: async (value) => {
      try {
        const translated = isVn
          ? await TranslateService.tranSlateKr({
              attributeNameVn: value.attributeNameVn,
              attributeNameKr: value.attributeNameKr,
            })
          : await TranslateService.tranSlateVn({
              attributeNameVn: value.attributeNameVn,
              attributeNameKr: value.attributeNameKr,
            });
        handleEdit(
          {
            ...value,
            attributeNameVn: translated.attributeNameVn,
            attributeNameKr: translated.attributeNameKr,
          },
          indexEdit!
        );
      } catch (error) {
        showError("Có lỗi không thể dịch");
      }
    },
  });
  const {
    values,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    handleChange,
    handleSubmit,
  } = formik;
  return (
    <div className="flex items-center flex-col bg-white justify-center md:w-[600px] lg:w-[800px] h-auto py-10 px-16 relative">
      <h3 className="text-main text-2xl font-semibold text-center">
        {attibute ? "Sửa thuộc tính" : "Thêm thuộc tính"}
      </h3>
      <div className="my-12 w-full">
        <TitleInput isNormal={true} isRequired={false} name="Tên thuộc tính" />
        <InputComponent
          name={isVn ? "attributeNameVn" : "attributeNameKr"}
          value={isVn ? values.attributeNameVn : values.attributeNameKr}
          onChange={handleChange}
          className="!rounded-sm"
        />
        {errors.attributeNameVn && touched.attributeNameVn && (
          <TextError message={errors.attributeNameVn} />
        )}
        {errors.attributeNameKr && touched.attributeNameKr && (
          <TextError message={errors.attributeNameKr} />
        )}
        <div className="mt-spc50 flex justify-end">
          <GroupButton onSubmit={handleSubmit} onCancel={() => closeModal()} />
        </div>
      </div>
    </div>
  );
};

export default AddAtributeForm;
