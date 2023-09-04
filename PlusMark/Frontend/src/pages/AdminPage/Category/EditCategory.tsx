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
import { CategoryType, ImageType } from "@services/Types/category";
import UploadImage from "@services/UploadImage";
import categoryServices from "@services/categoryService";
import clsx from "clsx";
import { TextError } from "commons/TextError";
import TitlePage from "commons/TitlePage";
import { useFormik } from "formik";
import { ChangeEvent, useEffect } from "react";
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
    hanldeDelete: handleDeletedImage,
    handleDeleteImgPreview,
    resetImage,
    handleRemoveByIndex,
    handleChangeImages,
  } = useHandleListImage();
  const fomik = useFormik<FormikProps>({
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
          file: undefined,
        },
      ],
      imagesCategory: [],
    },
    validationSchema: isVn
      ? Yup.object({
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
          subCategoryList: Yup.array().of(
            Yup.object().shape({
              subCategoryNameVn: Yup.string().required(
                "Không được để trống tên danh mục con"
              ),
            })
          ),
        })
      : Yup.object({
          categoryNameEn: Yup.string()
            .required("Không được để trống tên phân loại")
            .max(40, "Không được nhập quá 40 kí tự"),
          imagesCategory: Yup.array()
            .min(1, "Không được để trống ảnh")
            .of(
              Yup.object().shape({
                url: Yup.string().required("Không được để trống ảnh"),
              })
            ),
          subCategoryList: Yup.array().of(
            Yup.object().shape({
              subCategoryNameEn: Yup.string().required(
                "Không được để trống tên danh mục con"
              ),
            })
          ),
        }),
    onSubmit: async (value) => {
      try {
        if (file) {
          const categoryFormData = new FormData();
          categoryFormData.append("file", file);
          // const imageCate = await UploadImage.uploadImage(categoryFormData);
          // console.log(imageCate);
        }
        let subCategoryData;
        subCategoryData = value.subCategoryList.map((item, index) => {
          if (item.file) {
            const imageForm = new FormData();
            imageForm.append("file", item.file);
            console.log(imageForm, "formdata");
            item.imagesSubcategory = [{ url: `anhrminh hoaj ${index + 1}` }];
          }
          return {
            id: item.id,
            subCategoryNameVn: item.subCategoryNameVn,
            subCategoryNameKr: item.subCategoryNameKr,
            noteSubVn: item.noteSubVn,
            noteSubKr: item.noteSubKr,
            imagesSubcategory: item.imagesSubcategory,
          };
        });
        console.log(subCategoryData, "dataMois");

        // const result = await categoryServices.addOrEditCategory(value);
        // console.log(result, "keets quar");
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
    const newSub = [...values.subCategoryList];
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
    // setFieldValue("subCategoryList", [
    //   ...values.subCategoryList,
    //   {
    //     id: undefined,
    //     subCategoryNameVn: "",
    //     subCategoryNameKr: "",
    //     noteSubVn: "",
    //     noteSubKr: "",
    //     imagesSubcategory: [],
    //   },
    // ]);
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
  console.log(errors, "error");
  return (
    <div className="w-[50vw] max-h-[70vh] min-h-[50vh] overflow-y-scroll hidden_scroll bg-white p-10">
      <TitlePage
        text={isVn ? "text.title.add_category" : "text.title.edit_category"}
      />
      <div className="py-10 flex flex-col gap-3">
        <div>
          <TitleInput isRequired name="form.lable.category_name" />
          <InputComponent
            name={isVn ? "categoryNameVn" : "categoryNameEn"}
            onChange={handleChangFormik}
            placeholder="form.placeholder.category_name"
            rounded={false}
          />
          {isVn && errors.categoryNameVn && touched.categoryNameVn && (
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
          {/* {values.subCategoryList.map((item, index) => {
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
                        hidden: files[index] && files[index]!.imagePrev,
                      })}
                    />
                    <ImagePreview
                      url={files[index] ? files[index]!.imagePrev! : ""}
                      // url=""
                      position={true}
                      onDelete={() => handleDeleteImgPreview(index)}
                      className={clsx("!h-12", {
                        hidden: files[index] && !files[index]!.imagePrev,
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
                  onClick={() => {
                    handleDeleteSub(index);
                    handleDeletedImage(index);
                  }}
                >
                  <ICDeleteTrashLight />
                </div>
              </div>
            );
          })}
          {messageError && <TextError message={messageError} />} */}

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
                      isRequired={false}
                      name="form.lable.detail_sub_category"
                      option={index + 1}
                    />
                    <InputComponent
                      name={"subCategoryNameVn"}
                      value={item.subCategoryNameVn}
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
                        <TextError
                          message={`Không được để trống tên danh mục con ${
                            index + 1
                          }`}
                        />
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
                      name={"noteSubVn"}
                      value={item.noteSubVn}
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
          <GroupButton onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
