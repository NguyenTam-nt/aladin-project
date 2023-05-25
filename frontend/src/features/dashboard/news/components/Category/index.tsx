import { ICClear } from "@assets/icons/ICClear";
import { ICEdit } from "@assets/icons/ICEdit";
import { ICPlus } from "@assets/icons/ICPlus";
import { Button } from "@components/Button";
import { InputSwitch } from "@components/InputSwitch";
import { Colors } from "@constants/color";
import { ModalContext } from "@contexts/ModalContext";
import { TranslateContext } from "@contexts/Translation";
import { HeaderAdmin } from "@features/dashboard/components/HeaderAdmin";
import { SubHeaderTopic } from "@features/dashboard/home/components/SubHeaderTopic";
import React, { memo, useContext } from "react";
import { ModalCreateCategory } from "./ModalCreateCategory";
import DialogConfirmDelete from "@components/DialogConfirmDelete";

const data = [
  {
    name: "Tin tức",
    child: ["Đào tạo", "Sự kiên"],
  },
  {
    name: "Đào tạo",
    child: ["Hệ chính quy", "Hệ sau đại học"],
  },
];

export const CategoryNews = () => {
  const { t } = useContext(TranslateContext);
  const { setElementModal } = useContext(ModalContext);
  const handleShowModal = () => {
    setElementModal(<ModalCreateCategory type="ADD" onSubmit={() => {}} />);
  };
  return (
    <>
      <HeaderAdmin title="admin.news._category.title" />
      <div className="flex items-center">
        <SubHeaderTopic title="admin.news._category.title" />
        <Button
          onClick={handleShowModal}
          imageLeft={
            <span className="mr-2">
              <ICPlus color={Colors.secondary} />
            </span>
          }
          className="max-w-[180px] border border-secondary"
          text="admin.news._category._btn_create"
          color="empty"
        />
      </div>

      <div>
        <div className=" grid grid-cols-[25%_1fr_145px] items-center text-_18 font-semibold text-text_primary pb-[16px] border-b border-br_E9ECEF ">
          <div>{t("admin.news._category._table._name")}</div>
          <div>{t("admin.news._category._table._name_child")}</div>
          <div>{t("admin.news._category._table._func")}</div>
        </div>
        {data.map((item, index) => {
          return <CategoryItem value={item} key={index} />;
        })}
      </div>
    </>
  );
};
type Props = {
  value: {
    name: string;
    child: string[];
  };
};

const CategoryItem = memo(({ value }: Props) => {
  const { t } = useContext(TranslateContext);
  const { setElementModal } = useContext(ModalContext);
  const handleShowModal = () => {
    setElementModal(
      <DialogConfirmDelete message={t("admin._notice._delete_category")} />
    );
  };

  const handleShowModalEdit = () => {
    setElementModal(<ModalCreateCategory type="EDIT" onSubmit={() => {}} />);
  };

  return (
    <div className=" grid grid-cols-[25%_1fr_145px] items-center text-_14 text-text_primary py-[28px] border-b border-br_E9ECEF ">
      <div>{value.name}</div>
      <div>{value.child.join(", ")}</div>
      <div className="flex items-center gap-x-[12px]">
        <InputSwitch />
        <button onClick={handleShowModalEdit}>
          <ICEdit />
        </button>
        <button onClick={handleShowModal}>
          <ICClear />
        </button>
      </div>
    </div>
  );
});
