import { ICDeleteTrashLight } from "@assets/iconElements/ICDeleteTrashLight";
import DynamicButton from "@components/Buttons/DynamicButton";
import GroupButton from "@components/Buttons/GroupButton";
import { useShowMessage } from "@components/Modal/DialogMessage";
import { ImagePreview } from "@components/input/ImagePreview";
import { InputComponent } from "@components/input/InputComponent";
import { InputUploadFile } from "@components/input/InputUploadFile";
import TitleInput from "@components/input/TitleInput";
import { useHandleImage } from "@hooks/useHandleImage";
import { useHandleListImage } from "@hooks/useHandleListImage";
import useI18n from "@hooks/useI18n";
import TranslateService from "@services/TranslateService";
import { CategoryType, ImageType } from "@services/Types/category";
import UploadImage from "@services/UploadImage";
import categoryServices from "@services/categoryService";
import clsx from "clsx";
import { TextError } from "commons/TextError";
import TitlePage from "commons/TitlePage";
import { useFormik } from "formik";
import { ChangeEvent, memo, useEffect } from "react";
import * as Yup from "yup";

type FormikProps = {
  id?: number;
  categoryNameVn: string;
  categoryNameKr?: string;
  subCategoryList: {
    id?: number;
    subCategoryNameVn?: string;
    subCategoryNameKr?: string;
    noteSubVn: string;
    noteSubKr?: string;
    imagesSubcategory: ImageType[];
    file?: File;
  }[];
  imagesCategory: ImageType[];
};
interface Props {
  onCreated?: () => void;
  onEdit?: () => void;
  item?: CategoryType;
}
const EditCategory = memo(({ onCreated, onEdit, item }: Props) => {
  const { isVn, t } = useI18n();
  const { showError } = useShowMessage();
  const { preViewImage, file, message, handleChange, handleDelete } =
    useHandleImage(item?.imagesCategory[0].url || "");
  const fomik = useFormik<FormikProps>({
    initialValues: {
      id: undefined,
      categoryNameVn: "",
      categoryNameKr: "",
      subCategoryList: [
        {
          id: undefined,
          subCategoryNameVn: "",
          subCategoryNameKr: "",
          noteSubVn: "",
          noteSubKr: "",
          imagesSubcategory: [],
          file: undefined,
        },
      ],
      imagesCategory: [],
    },
    validationSchema: isVn
      ? Yup.object({
          categoryNameVn: Yup.string()
            .required("error.require.category_name")
            .max(40, "error.max.max_40"),
          imagesCategory: Yup.array()
            .min(1, "error.require.image_category")
            .of(
              Yup.object().shape({
                url: Yup.string().required("error.require.image_category"),
              })
            ),
          subCategoryList: Yup.array().of(
            Yup.object().shape({
              subCategoryNameVn: Yup.string().required(
                "error.require.subcategory_name"
              ),
              noteSubVn: Yup.string().max(255, "error.max.max"),
            })
          ),
        })
      : Yup.object({
          categoryNameKr: Yup.string()
            .required("error.require.category_name")
            .max(40, "error.max.max_40"),
          imagesCategory: Yup.array()
            .min(1, "error.require.image_category")
            .of(
              Yup.object().shape({
                url: Yup.string().required("error.require.image_category"),
              })
            ),
          subCategoryList: Yup.array().of(
            Yup.object().shape({
              subCategoryNameKr: Yup.string().required(
                "error.require.subcategory_name"
              ),
              noteSubKr: Yup.string().max(255, "error.max.max"),
            })
          ),
        }),
    onSubmit: async (value) => {
      setSubmitting(true);
      try {
        if (file) {
          const categoryFormData = new FormData();
          categoryFormData.append("file", file);
          const imageCate = await UploadImage.uploadImage(categoryFormData);
          value.imagesCategory = [imageCate];
        }
        const PromiseModifySub = Promise.all(
          value.subCategoryList.map(async (item, index) => {
            if (item.file) {
              const imageForm = new FormData();
              imageForm.append("file", item.file);
              const paths = await UploadImage.uploadImage(imageForm);
              item.imagesSubcategory = [paths];
            }
            return {
              id: item.id,
              subCategoryNameVn: item.subCategoryNameVn,
              subCategoryNameKr: item.subCategoryNameKr,
              noteSubVn: item.noteSubVn,
              noteSubKr: item.noteSubKr,
              imagesSubcategory: item.imagesSubcategory,
            };
          })
        );
        const subCategoryData = await PromiseModifySub;

        let dataUpload = { ...value, subCategoryList: subCategoryData };
        const translated = isVn
          ? await TranslateService.tranSlateKr(dataUpload)
          : await TranslateService.tranSlateVn(dataUpload);
        translated.id = value.id;
        translated.subCategoryList = translated.subCategoryList.map(
          (item: any, index: number) => {
            return { ...item, id: subCategoryData[index].id };
          }
        );
        const result = await categoryServices.addOrEditCategory(
          translated,
          value?.id
        );
        if (value.id) {
          onEdit!();
        } else {
          onCreated!();
        }
        setSubmitting(false);
      } catch (error) {
        if (value.id) {
          showError("error.update_error");
        } else {
          showError("error.post_error");
        }
        setSubmitting(false);
      }
    },
  });
  const {
    isSubmitting,
    setSubmitting,
    handleChange: handleChangFormik,
    setFieldValue,
    setValues,
    handleSubmit,
    handleReset,
    values,
    errors,
    touched,
  } = fomik;

  const handleChangeSubCategory = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    type: "name" | "note"
  ) => {
    const newValue = [...values.subCategoryList];
    if (type == "name") {
      if (isVn) {
        newValue[index].subCategoryNameVn = e.target.value;
      } else {
        newValue[index].subCategoryNameKr = e.target.value;
      }
    } else {
      if (isVn) {
        newValue[index].noteSubVn = e.target.value;
      } else {
        newValue[index].noteSubKr = e.target.value;
      }
    }
    setFieldValue("subCategoryList", newValue);
  };
  const handleAddSub = () => {
    setFieldValue("subCategoryList", [
      ...values.subCategoryList,
      {
        id: undefined,
        subCategoryNameVn: "",
        subCategoryNameKr: "",
        noteSubVn: "",
        noteSubKr: "",
        imagesSubcategory: [],
        file: null,
      },
    ]);
  };
  const handleChangeFile = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newArr = values.subCategoryList;
    const file = e.target.files![0];

    newArr[index].file = file;
    newArr[index].imagesSubcategory = [{ url: URL.createObjectURL(file) }];
    setFieldValue("subCategoryList", newArr);
  };
  const handleDeleteSubItem = (index: number, type: "item" | "img") => {
    const newArr = [...values.subCategoryList];
    newArr[index].imagesSubcategory[0] &&
      URL.revokeObjectURL(newArr[index].imagesSubcategory[0].url);
    if (type == "item") {
      newArr.splice(index, 1);
    } else {
      newArr[index].file = undefined;
      newArr[index].imagesSubcategory = [];
    }
    setFieldValue("subCategoryList", newArr);
  };
  useEffect(() => {
    if (preViewImage != "") {
      setFieldValue("imagesCategory", [
        {
          url: preViewImage,
        },
      ]);
    } else {
      setFieldValue("imagesCategory", []);
    }
  }, [preViewImage]);
  useEffect(() => {
    if (item) {
      setValues(item);
    }
  }, [item]);
  return (
    <div className="w-[50vw] max-h-[70vh] min-h-[50vh] overflow-y-scroll hidden_scroll bg-white p-10">
      <TitlePage
        text={!item ? "text.title.add_category" : "text.title.edit_category"}
      />
      <div className="py-10 flex flex-col gap-3">
        <div>
          <TitleInput isRequired name="form.lable.category_name" />
          <InputComponent
            name={isVn ? "categoryNameVn" : "categoryNameKr"}
            value={isVn ? values.categoryNameVn : values.categoryNameKr}
            onChange={handleChangFormik}
            placeholder="form.placeholder.category_name"
            rounded={false}
          />
          {isVn && errors.categoryNameVn && touched.categoryNameVn && (
            <TextError message={errors.categoryNameVn} />
          )}
          {!isVn && errors.categoryNameKr && touched.categoryNameKr && (
            <TextError message={errors.categoryNameKr} />
          )}
        </div>
        <div>
          <TitleInput isRequired name="form.lable.banner_category" />
          <div className="w-[178px] h-[135px]">
            <InputUploadFile
              onChange={handleChange}
              justImage={true}
              className={clsx("", { hidden: preViewImage.trim() })}
            />
            <ImagePreview
              url={preViewImage}
              onDelete={handleDelete}
              className={clsx("", { hidden: !preViewImage.trim() })}
            />
          </div>
          {errors.imagesCategory && touched.imagesCategory && (
            <TextError message={errors.imagesCategory.toString()} />
          )}
        </div>
        <TitleInput isRequired={false} name="form.lable.detail_category" />
        <div className="flex flex-col gap-6">
          {values.subCategoryList.map((item, index) => {
            return (
              <div key={index} className="grid grid-cols-[1fr_35px] gap-5">
                <div className="grid grid-cols-[200px_1fr] gap-6">
                  <div>
                    <TitleInput
                      isNormal={true}
                      isRequired={false}
                      name="form.lable.imageNumber"
                    />
                    <InputUploadFile
                      onChange={(e) => handleChangeFile(e, index)}
                      justImage={true}
                      className={clsx("!h-12", {
                        hidden:
                          item.imagesSubcategory[0] &&
                          item.imagesSubcategory[0].url!,
                      })}
                    />
                    <ImagePreview
                      url={
                        item.imagesSubcategory[0]
                          ? item.imagesSubcategory[0].url!
                          : ""
                      }
                      position={true}
                      onDelete={() => handleDeleteSubItem(index, "img")}
                      className={clsx("!h-12", {
                        hidden: !item.imagesSubcategory[0],
                      })}
                    />
                  </div>
                  <div>
                    <TitleInput
                      isNormal={true}
                      isRequired
                      name="form.lable.detail_sub_category"
                      option={index + 1}
                    />
                    <InputComponent
                      name={isVn ? "subCategoryNameVn" : "subCategoryNameKr"}
                      value={
                        isVn ? item.subCategoryNameVn : item.subCategoryNameKr
                      }
                      onChange={(e) =>
                        handleChangeSubCategory(e, index, "name")
                      }
                      placeholder="form.placeholder.detail_sub_category"
                      rounded={false}
                    />
                  </div>
                  {errors.subCategoryList?.[index]! &&
                    touched.subCategoryList?.[index] && (
                      <div className="col-span-full">
                        <TextError message={`error.require.subcategory_name`} />
                      </div>
                    )}
                  <div className="col-span-full">
                    <TitleInput
                      isNormal={true}
                      isRequired={false}
                      name="form.lable.category_note"
                      option={index + 1}
                    />
                    <InputComponent
                      name={isVn ? "noteSubVn" : "noteSubKr"}
                      value={isVn ? item.noteSubVn : item.noteSubKr}
                      onChange={(e) =>
                        handleChangeSubCategory(e, index, "note")
                      }
                      placeholder="form.placeholder.category_note"
                      rounded={false}
                    />
                  </div>
                </div>
                <div
                  className="flex items-center justify-center mt-7 bg-[#DAF1E7] cursor-pointer"
                  onClick={() => handleDeleteSubItem(index, "item")}
                >
                  <ICDeleteTrashLight />
                </div>
              </div>
            );
          })}
        </div>
        <DynamicButton
          text={"button.add_sub_cate"}
          onClick={handleAddSub}
          className="mt-2 w-fit !text-[10px]"
        />

        <div className="flex items-center justify-center mt-16">
          <GroupButton isLoading={isSubmitting} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
});

export default EditCategory;
