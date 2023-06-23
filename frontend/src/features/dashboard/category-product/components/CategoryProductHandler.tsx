import { ICAdd } from "@assets/icons/ICAdd";
import { ICDeleteTrash } from "@assets/icons/ICDeleteTrash";
import { ICDeleteTrashLight } from "@assets/icons/ICDeleteTrashLight";
import { ICPlus } from "@assets/icons/ICPlus";
import { ICUploadImage } from "@assets/icons/ICUploadImage";
import TitleInput from "@components/TitleInput";
import { Colors } from "@constants/color";
import { useModalContext } from "@contexts/hooks/modal";
import { DiglogComfirmDelete } from "@features/dashboard/components/DiglogComfirmDelete";
import { useShowMessage } from "@features/dashboard/components/DiglogMessage";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { Input } from "@features/dashboard/components/Input";
import { useHandleLoading } from "@features/dashboard/components/Loading";
import { Radio } from "@features/dashboard/components/Radio";
import { TextError } from "@features/dashboard/components/TextError";
import { useHandleImage } from "@features/dashboard/home/useHandleImage";
import { categoryService } from "@services/category";
import { uploadService } from "@services/upload";
import {
  CategoryMenuType,
  CategoryType,
  ICategory,
  ICategoryItem,
} from "@typeRules/category";
import clsx from "clsx";
import { useFormik } from "formik";
import React, { ChangeEvent, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

type Props = {
  type?: "ADD" | "EDIT";
  onSubmit?: (data: ICategory) => void;
  dataCategory?: ICategory;
};

const data = {
  name: "",
  linkMedia: "",
  file: null,
};

export const CategoryProductHandler = ({
  type = "ADD",
  onSubmit,
  dataCategory,
}: Props) => {
  const { t } = useTranslation();
  const [listCategoryChild, setListCategoryChild] = useState<ICategoryItem[]>(
    []
  );

  const { showSuccess, showError } = useShowMessage();
  const { showLoading } = useHandleLoading();

  const fomick = useFormik<ICategory>({
    initialValues: {
      name: "",
      isHome: false,
      isMenu: CategoryMenuType.kitchen,
      // idParent: CategoryType.parent,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("message.form.required"),
      isHome: Yup.string().required("message.form.required"),
      isMenu: Yup.string().required("message.form.required"),
    }),
    onSubmit: async (values) => {
      try {
        showLoading();
        const newDataChild = listCategoryChild.filter((item) =>
          item.name.trim()
        );
        const listFile = newDataChild.filter((item) => !!item?.file);

        if (listFile.length) {
          const listRequest = listFile.map((item) => {
            const formData = new FormData();
            formData.append("file", item.file ? item.file : "");
            return uploadService.postImage(formData);
          });

          const listImage = await Promise.all(listRequest);
          listFile.forEach((item, index) => {
            console.log({ item });
            item.linkMedia = listImage?.[index].list?.[0].linkMedia || "";
          });
          let i = 0;
          newDataChild.forEach((item) => {
            if (item.file) {
              item.linkMedia = listFile?.[i]?.linkMedia;
              ++i;
            }
          });
        }
        onSubmit?.({
          id: type === "ADD" ? null : dataCategory?.id,
          ...values,
          listCategoryChild: newDataChild.map((item) => {
            return {
              id: type === "ADD" ? null : item?.id || null,
              name: item.name,
              linkMedia: item?.linkMedia,
            };
          }),
        });
      } catch (error) {
        console.log({ error });
      }
    },
  });

  useEffect(() => {
    if (type === "EDIT") {
      fomick.setFieldValue("name", dataCategory?.name || "");
      fomick.setFieldValue("isHome", dataCategory?.isHome);
      fomick.setFieldValue("isMenu", dataCategory?.isMenu);
      setListCategoryChild(dataCategory?.listCategoryChild || []);
    }
  }, [dataCategory, type]);

  const handleChaneCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    fomick.setFieldValue("isHome", value === "false" ? false : true);
  };

  const handleAddItem = () => {
    setListCategoryChild([
      ...listCategoryChild,
      {
        ...data,
      },
    ]);
  };

  const handleChangeItemChild = (
    name: keyof ICategoryItem,
    value: any,
    index: number,
    file?: File
  ) => {
    if (name === "id") return;
    const newChilds = [...listCategoryChild];
    //@ts-ignore
     newChilds![index][name] = value;
    if (file) {
      newChilds![index].file = file;
    }
    setListCategoryChild([...newChilds]);
  };

  const handleDeleteItem = (index: number) => {
    const newChilds = [...listCategoryChild];
    newChilds.splice(index, 1);
    setListCategoryChild([...newChilds]);
  };

  return (
    <div className="w-[1144px] h-auto bg-white py-[40px] px-[24px]">
      <h2 className="text-_32 font-bold text-text_primary uppercase text-center mb-[40px]">
        {type === "ADD"
          ? t("category.form.title_add")
          : t("category.form.title_edit")}
      </h2>
      <div className="grid grid-cols-1 gap-[24px]">
        <div className="">
          <TitleInput forId="name" name="category.form.name_parent" />
          <Input
            id="name"
            name="name"
            value={fomick.values.name}
            onChange={fomick.handleChange}
            onBlur={fomick.handleBlur}
            placeholder="category.form.name_parent_placeholder"
          />
          {fomick.errors.name && fomick.touched.name && (
            <TextError message={fomick.errors.name} />
          )}
        </div>
        <div>
          <div className="flex items-center">
            <span className="text-_14 text-text_primary block w-[189px]">
              {t("category.form.display_home")}{" "}
              <span className="text-text_red">*</span>
            </span>
            <div className="flex items-center gap-x-[24px]">
              <div className="flex items-center">
                <Radio
                  id="common.no"
                  value={"false"}
                  checked={fomick.values.isHome === false}
                  onChange={handleChaneCheckBox}
                  name="isHome"
                />{" "}
                <label
                  htmlFor="common.no"
                  className=" text-GreyPrimary text-_14 ml-[6px]"
                >
                  {t("common.no")}
                </label>
              </div>
              <div className="flex items-center">
                <Radio
                  value={"true"}
                  checked={fomick.values.isHome === true}
                  onChange={handleChaneCheckBox}
                  id="common.yes"
                  name="isHome"
                />{" "}
                <label
                  htmlFor="common.yes"
                  className="text-GreyPrimary text-_14 ml-[6px]"
                >
                  {t("common.yes")}
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-[20px]">
            <span className="text-_14 text-text_primary block w-[189px]">
              {t("category.form.type_menu")}{" "}
              <span className="text-text_red">*</span>
            </span>
            <div className="flex items-center gap-x-[24px]">
              <div className="flex items-center">
                <Radio
                  value={CategoryMenuType.kitchen}
                  checked={fomick.values.isMenu === CategoryMenuType.kitchen}
                  onChange={fomick.handleChange}
                  id="common.menu_type.kitchen"
                  name="isMenu"
                />{" "}
                <label
                  htmlFor="common.menu_type.kitchen"
                  className=" text-GreyPrimary text-_14 ml-[6px]"
                >
                  {t("common.menu_type.kitchen")}
                </label>
              </div>
              <div className="flex items-center">
                <Radio
                  value={CategoryMenuType.bar}
                  checked={fomick.values.isMenu === CategoryMenuType.bar}
                  onChange={fomick.handleChange}
                  id="common.menu_type.bar"
                  name="isMenu"
                />{" "}
                <label
                  htmlFor="common.menu_type.bar"
                  className="text-GreyPrimary text-_14 ml-[6px]"
                >
                  {t("common.menu_type.bar")}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <TitleInput isRequired={false} name="category.form.type_child" />
          <div className="flex flex-col gap-y-[16px]">
            {listCategoryChild.map((item, index) => {
              return (
                <CategoryItemChild
                  key={index}
                  data={item}
                  onChange={handleChangeItemChild}
                  index={index + 1}
                  onDelete={handleDeleteItem}
                />
              );
            })}
          </div>
          <div className="flex justify-end mt-[16px]">
            <button
              onClick={handleAddItem}
              className="w-[24px] h-[24px] rounded-[50%] hover:shadow-sm  hover:bg-slate-200"
            >
              <ICAdd color={Colors.bg_CBCBCB} />
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <GroupButtonAdmin
            isAdd={type === "ADD"}
            onSubmit={fomick.handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

type PropsCategoryItemChild = {
  data: ICategoryItem;
  onChange: (
    name: keyof ICategoryItem,
    value: any,
    index: number,
    file?: File
  ) => void;
  index: number;
  onDelete: (index: number) => void;
};

const CategoryItemChild = memo(
  ({ index, data, onChange, onDelete }: PropsCategoryItemChild) => {
    const { t } = useTranslation();
    const [isShowModal, setShowModal] = useState(false);

    // const handleDeleteModal = () => {
    //   setElementModal(<DiglogComfirmDelete onClick={handleDelete} message="category.message_delete" />);
    // };

    const handleChangeFile = (file: File) => {
      onChange("linkMedia", URL.createObjectURL(file), index - 1, file);
    };
    const { handleChange, preViewImage } = useHandleImage(
      data.linkMedia,
      handleChangeFile
    );

    const handleDelete = () => {
      if (data?.id) {
        categoryService
          .delete(Number(data.id))
          .then(() => {
            onDelete(index - 1);
          })
          .finally(() => {
            setShowModal(false);
          });
        return;
      }
      onDelete(index - 1);
    };

    const handleChangeItem = (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target;
      onChange(name as keyof ICategoryItem, value, index - 1);
    };

    const handleConfirmDelete = () => {
      if(data.id) {
        setShowModal(true)
        return
      }
      onDelete(index - 1);
    }

    return (
      <div className="flex gap-[16px]">
        <div className="">
          <p className=" text-GreyPrimary text-_14 ml-[6px]">
            {t("category.form.image_child", { index })}
          </p>
          <label
            id={`upload-file-category-child-${index}`}
            className={clsx(
              "flex flex-1  flex-col text-_14 rounded-[5px] mt-2  w-[200px] h-[48px] ",
              {
                "border-2 border-dashed border-text_A1A0A3  justify-center items-center":
                  !preViewImage,
              }
            )}
          >
            {!preViewImage ? (
              <div>
                <ICUploadImage />
              </div>
            ) : (
              <img
                src={preViewImage}
                className="w-[48px] h-[48px] object-cover"
              />
            )}
            <input
              onChange={handleChange}
              id={`upload-file-category-child-${index}`}
              type="file"
              accept="image/*"
              hidden
            />
          </label>
        </div>
        <div className="flex-1">
          <p className=" text-GreyPrimary mb-2 text-_14 ml-[6px]">
            {t("category.form.name_child_item", { index })}
          </p>
          <Input
            value={data.name}
            onChange={handleChangeItem}
            name="name"
            placeholder="category.form.name_child_item_placeholder"
          />
        </div>
        <button
          onClick={handleConfirmDelete}
          className="w-[48px] h-[48px] bg-bg_F1F1F1 hover:bg-bg_fafafa flex items-center justify-center"
        >
          <ICDeleteTrashLight />
        </button>
        {isShowModal ? (
          <div className=" fixed  flex items-center justify-center z-40 inset-0 bg-header_bg">
            <DiglogComfirmDelete
              onClear={() => setShowModal(false)}
              message="Bạn có chắc chắn xóa danh mục con này khỏi hệ thống?"
              onClick={handleDelete}
            />
          </div>
        ) : null}
      </div>
    );
  }
);
