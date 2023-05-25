import { ICClear } from "@assets/icons/ICClear";
import { ICPlus } from "@assets/icons/ICPlus";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Colors } from "@constants/color";
import { GroupButtonAdmin } from "@features/dashboard/components/GroupButtonAdmin";
import { TitleForm } from "@features/dashboard/components/TitleForm";
import TitleInput from "@features/dashboard/components/TitleInput";
import React, { memo, useState } from "react";

type Props = {
  type?: "ADD" | "EDIT";
  onSubmit: () => void;
};

export const ModalCreateCategory = ({ type, onSubmit }: Props) => {
  const [listChild, setListChild] = useState([1]);
  const handleAddChild = () => {
    setListChild([...listChild, 2]);
  };
  const handleDeleteChild = (index: number) => {
    const newList = [...listChild];
    setListChild(newList.splice(index, 1));
  };
  return (
    <div className=" w-[800px] 2xl:w-[1144px] bg-white py-[40px] px-[24px]">
      <TitleForm
        title={
          type === "ADD"
            ? "admin.news._category._form.title_add"
            : "admin.news._category._form.title_edit"
        }
      />
      <div className="grid grid-cols-1 gap-[24px]">
        <div>
          <TitleInput
            forId="admin.news._category._form.name_parent"
            name="admin.news._category._form.name_parent"
          />
          <Input
            id="admin.news._category._form.name_parent"
            placeholder="admin.news._category._form.name_parent_placeholder"
          />
        </div>
        <div>
          <TitleInput
            forId="admin.news._category._form.name_child"
            name="admin.news._category._form.name_child"
          />
         <ListChildCategory data={listChild} onDeleteItem={handleDeleteChild} />
        </div>
        <div>
          <Button
            onClick={handleAddChild}
            text="admin.news._category._form.btn_create"
            className="max-w-[212px] border border-secondary"
            color="empty"
            imageLeft={
              <span className="mr-2">
                <ICPlus color={Colors.secondary} />
              </span>
            }
          />
        </div>
        <GroupButtonAdmin onSubmit={onSubmit} />
      </div>
    </div>
  );
};

type PropsListCategory = {
  data: number[];
  onDeleteItem: (index: number) => void;
};

const ListChildCategory = memo(
  ({ data, onDeleteItem }: PropsListCategory) => {
    return (
      <div className="grid grid-cols-1 gap-y-[24px]">
        {data.map((_, index) => {
          return (
            <div key={index} className="flex items-center gap-x-[24px] w-full">
              <div className="flex-1">
                <Input
                  id="admin.news._category._form.name_child"
                  placeholder="admin.news._category._form.name_child_placeholder"
                />
              </div>
              <button onClick={() =>  onDeleteItem(index)}>
                <ICClear />
              </button>
            </div>
          );
        })}
      </div>
    );
  }
);
