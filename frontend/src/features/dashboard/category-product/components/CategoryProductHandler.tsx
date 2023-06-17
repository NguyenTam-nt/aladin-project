import { ICAdd } from "@assets/icons/ICAdd";
import { ICPlus } from "@assets/icons/ICPlus";
import { ICUploadImage } from "@assets/icons/ICUploadImage";
import TitleInput from "@components/TitleInput";
import { Colors } from "@constants/color";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { Input } from "@features/dashboard/components/Input";
import { Radio } from "@features/dashboard/components/Radio";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
    type?: "ADD" | "EDIT"
}

export const CategoryProductHandler = ({type = "ADD"}: Props) => {
  const { t } = useTranslation();
  return (
    <div className="w-[1144px] h-auto bg-white py-[40px] px-[24px]">
      <h2 className="text-_32 font-bold text-text_primary uppercase text-center mb-[40px]">
        {type === "ADD" ?  t("category.form.title_add") :t("category.form.title_edit") }
      </h2>
      <div className="grid grid-cols-1 gap-[24px]">
        <div className="">
          <TitleInput name="category.form.name_parent" />
          <Input placeholder="category.form.name_parent_placeholder" />
        </div>
        <div>
          <div className="flex items-center">
            <span className="text-_14 text-text_primary block w-[189px]">
              {t("category.form.display_home")}{" "}
              <span className="text-text_red">*</span>
            </span>
            <div className="flex items-center gap-x-[24px]">
              <div className="flex items-center">
                <Radio id="common.no" name="active-home" />{" "}
                <label
                  htmlFor="common.no"
                  className=" text-GreyPrimary text-_14 ml-[6px]"
                >
                  {t("common.no")}
                </label>
              </div>
              <div className="flex items-center">
                <Radio id="common.yes" name="active-home" />{" "}
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
                <Radio id="common.menu_type.kitchen" name="type-menu" />{" "}
                <label
                  htmlFor="common.menu_type.kitchen"
                  className=" text-GreyPrimary text-_14 ml-[6px]"
                >
                  {t("common.menu_type.kitchen")}
                </label>
              </div>
              <div className="flex items-center">
                <Radio id="common.menu_type.bar" name="type-menu" />{" "}
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
            <CategoryItemChild index={1} />
          </div>
          <div className="flex justify-end mt-[16px]">
            <button className="w-[24px] h-[24px] rounded-[50%] hover:shadow-sm  hover:bg-slate-200">
              <ICAdd color={Colors.bg_CBCBCB} />
            </button>
          </div>
        </div>
        <div className="flex justify-end">
            <GroupButtonAdmin />
        </div>
      </div>
    </div>
  );
};

const CategoryItemChild = ({ index }: { index: number }) => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-[16px]">
      <div className="">
        <p className=" text-GreyPrimary text-_14 ml-[6px]">
          {t("category.form.image_child", { index })}
        </p>
        <label
          htmlFor="upload-file-category-child"
          className="flex flex-1  flex-col text-_14 rounded-[5px] mt-2 items-center w-[200px] h-[48px] border-2 border-dashed border-text_A1A0A3  justify-center"
        >
          <div>
            <ICUploadImage />
          </div>
          <input
            id="upload-file-category-child"
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
        <Input placeholder="category.form.name_child_item_placeholder" />
      </div>
    </div>
  );
};
