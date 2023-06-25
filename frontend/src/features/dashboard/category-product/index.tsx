import React, { useCallback, useEffect, useMemo, useState } from "react";
import { TitleTopic } from "../home/components/TitleTopic";
import { Button } from "../components/Button";
import { ICAdd } from "@assets/icons/ICAdd";
import { SIZE_DATA } from "@constants/index";
import { ListCategory } from "./components/ListCategory";
import { useModalContext } from "@contexts/hooks/modal";
import { CategoryProductHandler } from "./components/CategoryProductHandler";
import type { ICategory } from "@typeRules/category";
import { categoryService } from "@services/category";
import { useShowMessage } from "../components/DiglogMessage";
import { useGetCategory } from "./useGetCategory";

export const CategoryProduct = () => {
    const {setElementModal} = useModalContext()
    const handleNavigation = () => {
      setElementModal(<CategoryProductHandler onSubmit={handleSubmit} />)
    };

    const { showSuccess, showError } = useShowMessage()


  const {loading, categories, fechData, setCategories, totalPages} = useGetCategory()
  

    const handleSubmit = (data: ICategory) => {
      categoryService
        .post(data)
        .then((data) => {
          setCategories([data, ...categories]);
          showSuccess("message.actions.success.update");
        })
        .catch(() => {
          showError("message.error._error");
        })
    };
  
    const handleSubmitEdit = (data: ICategory) => {
      categoryService
        .update(data)
        .then((data) => {
          const newCategory = [...categories];
          const index = newCategory.findIndex((item) => item.id === data.id);
          newCategory.splice(index, 1, data);
          setCategories([...newCategory]);
          showSuccess("message.actions.success.update");
        })
        .catch(() => {
          showError("message.error._error");
        })
    };
  
    const handleDelete = (id: number) => {
      categoryService
        .delete(id)
        .then(() => {
          const index = categories.findIndex((item) => item.id === id);
          const newlist = [...categories];
          newlist.splice(index, 1);
          setCategories([...newlist]);
          showSuccess("category.message_delete_success");
        })
        .catch((error) => {
          showError(error?.response?.data?.message || "category.message_delete_error");
        });
    };
  
  return (
    <>
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline">
          <TitleTopic name="category.title" isRequired={false} />
        </div>
        <Button
          onClick={handleNavigation}
          className="max-w-[177px]"
          text="category.add"
          imageLeft={
            <span className="mr-2">
              <ICAdd />
            </span>
          }
          color={"empty"}
        />
      </div>
      <ListCategory onEdit={handleSubmitEdit} data={categories} loading={loading} onDelete={handleDelete} total={totalPages} fechData={fechData} />
    </>
  );
};