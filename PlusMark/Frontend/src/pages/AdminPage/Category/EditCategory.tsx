import { ICDeleteTrashLight } from "@assets/iconElements/ICDeleteTrashLight";
import DynamicButton from "@components/Buttons/DynamicButton";
import GroupButton from "@components/Buttons/GroupButton";
import { ImagePreview } from "@components/input/ImagePreview";
import { InputComponent } from "@components/input/InputComponent";
import { InputUploadFile } from "@components/input/InputUploadFile";
import TitleInput from "@components/input/TitleInput";
import { useHandleImage } from "@hooks/useHandleImage";
import { useHandleListImage } from "@hooks/useHandleListImage";
import useI18n from "@hooks/useI18n";
import { CategoryType } from "@services/Types/category";
import UploadImage from "@services/UploadImage";
import categoryServices from "@services/categoryService";
import clsx from "clsx";
import { TextError } from "commons/TextError";
import TitlePage from "commons/TitlePage";
import { useFormik } from "formik";
import { ChangeEvent, useEffect } from "react";
import * as Yup from "yup";

type P = {
  id?: number;
  subCategoryNameVn: string;
  subCategoryNameKr?: string;
  // imagesSubcategory: Image[];
};
const EditCategory = () => {
  const { isVn, t } = useI18n();
  const {
    preViewImage,
    file,
    listPreviewImage,
    message,
    handleChange,
    handleDelete,
  } = useHandleImage();
  const {
    files,
    messageError,
    handleDelete: deleteImage,
    resetImage,
    handleRemoveByIndex,
    handleChangeImages,
  } = useHandleListImage();
  const fomik = useFormik<CategoryType>({
    initialValues: {
      id: undefined,
      categoryNameVn: "",
      categoryNameKr: "",
      subCategoryList: [
        {
          id: undefined,
          subCategoryNameVn: "buithitao",
          subCategoryNameKr: "kho",
          noteSubVn: "",
          noteSubKr: "",
          imagesSubcategory: [],
        },
      ],
      imagesCategory: [],
    },
    validationSchema: Yup.object({
      categoryNameVn: Yup.string()
        .required("Không được để trống tên phân loại")
        .max(40, "Không được nhập quá 40 kí tự"),
      imagesCategory: Yup.array()
        .min(1, "Không được để trống ảnh")
        .of(
          Yup.object().shape({
            url: Yup.string().required("Không được để trống ảnh"),
          })
        ),
    }),
    onSubmit: async (value) => {
      try {
        if (file) {
          const categoryFormData = new FormData();
          categoryFormData.append("file", file);
          const imageCate = await UploadImage.uploadImage(categoryFormData);
          console.log(imageCate);
        }
        const result = await categoryServices.addOrEditCategory(value);
        console.log(result, "keets quar");
      } catch (error) {}
    },
  });
  const {
    isSubmitting,
    setSubmitting,
    handleChange: handleChangFormik,
    setFieldValue,
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
      newValue[index].subCategoryNameVn = e.target.value;
    } else {
      newValue[index].noteSubVn = e.target.value;
    }
    setFieldValue("subCategoryList", newValue);
  };
  const handleDeleteSub = (index: number) => {
    const newValue = [...values.subCategoryList];
    newValue.splice(index, 1);
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
      },
    ]);
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
  console.log(files, "jkhasdjkf");
  return (
    <div className="w-[50vw] max-h-[70vh] min-h-[50vh] overflow-y-scroll hidden_scroll bg-white p-10">
      <TitlePage
        text={isVn ? "text.title.add_category" : "text.title.edit_category"}
      />
      <div className="py-10 flex flex-col gap-3">
        <div>
          <TitleInput isRequired name="form.lable.category_name" />
          <InputComponent
            name="categoryNameVn"
            onChange={handleChangFormik}
            placeholder="form.placeholder.category_name"
            rounded={false}
          />
          {errors.categoryNameVn && touched.categoryNameVn && (
            <TextError message={errors.categoryNameVn} />
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
                      onChange={(e) => {
                        handleChangeImages(e, index);
                      }}
                      justImage={true}
                      className={clsx("!h-12", {
                        hidden: files.length > 0 && files[index].imagePrev,
                      })}
                    />
                    <ImagePreview
                      url={listPreviewImage[index]}
                      position={true}
                      onDelete={handleDelete}
                      className={clsx("!h-12", {
                        hidden: files.length > 0 && !files[index].imagePrev,
                      })}
                    />
                  </div>
                  <div>
                    <TitleInput
                      isNormal={true}
                      isRequired={false}
                      name="form.lable.detail_sub_category"
                      option={index + 1}
                    />
                    <InputComponent
                      onChange={(e) =>
                        handleChangeSubCategory(e, index, "name")
                      }
                      placeholder="form.placeholder.detail_sub_category"
                      rounded={false}
                    />
                  </div>
                  <div className="col-span-full">
                    <TitleInput
                      isNormal={true}
                      isRequired={false}
                      name="form.lable.category_note"
                      option={index + 1}
                    />
                    <InputComponent
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
                  onClick={() => handleDeleteSub(index)}
                >
                  <ICDeleteTrashLight />
                </div>
              </div>
            );
          })}
          {messageError && <TextError message={messageError} />}
        </div>
        <DynamicButton
          text={"button.add_sub_cate"}
          onClick={handleAddSub}
          className="mt-2 w-fit !text-[10px]"
        />

        <div className="flex items-center justify-center mt-16">
          <GroupButton onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
