import { useGetCategory } from "@features/dashboard/category-product/useGetCategory";
import { useSearchParamHook } from "@hooks/useSearchParam";
import { useCallback, useEffect, useState } from "react";

type Props = {
  onChange: (id: number | undefined) => void;
  isAll?: boolean;
};
export const useCategoryFilter = ({ onChange, isAll = false }: Props) => {
  const [indexParent, setIndexParent] = useState(-1);
  const [indexChild, setIndexChild] = useState(-1);

  const { searchParams, setSearchParam, setQueries, deleteParam } = useSearchParamHook();

  const { categories, fechData } = useGetCategory(isAll);

  useEffect(() => {
    if (categories.length) {
      const categoryParent = searchParams.get("category");
      if (categoryParent) {
        let indexP = -1;
        const listCategory = categoryParent.split("-");
        if (typeof Number(listCategory[0]) === "number") {
          indexP = categories.findIndex(
            (i) => i.id === Number(listCategory[0])
          );
          const id = document.getElementById(`category-${indexP}`);
          if (id) {
            id.scrollIntoView({
              behavior: "smooth",
            });
          }
          setIndexParent(indexP);
        }
        if (listCategory.length >= 2) {
          if (typeof Number(listCategory[1]) === "number") {
            if (indexP !== -1) {
              const indexC =
                categories[indexP].listCategoryChild?.findIndex(
                  (i) => i.id === Number(listCategory[1])
                ) ?? -1;

              const idChild = document.getElementById(
                `category-child-${indexC}`
              );
              if (idChild) {
                idChild.scrollIntoView({
                  behavior: "smooth",
                });
              }

              setIndexChild(indexC);
            }
          }
        }
      }else {
        setIndexParent(-1)
        setIndexChild(-1)
      }
    }
  }, [searchParams, categories]);

  const handleChangeCategoryParent = (id: number) => {
    const index = categories.findIndex((i) => i.id === id);
    setIndexChild(-1);
    // if (indexParent !== index) {
      setIndexParent(index);
      onChange(id);
      setQueries("category", id + "");
      setQueries("page", '1');
    // } else {
    //   setIndexChild(-1);
    //   onChange(id);
    // }
  };

  const handleSelectCategorySub = (index: number, idParent: Number) => {
    setIndexChild(index);
    const parent = categories?.find((i) => i.id === idParent);
    if (parent) {
      const id = parent?.listCategoryChild?.[index]?.id;
      onChange(Number(id));
      setQueries("category", `${parent.id}-${id}`);
      setQueries("page", '1');
      setSearchParam(searchParams);
    }
  };

  const handleClear = useCallback(() => {
    setIndexParent(-1)
    setIndexChild(-1);
    onChange(undefined);
    deleteParam("category");
  }, [deleteParam, onChange]);

  return {
    indexChild,
    indexParent,
    handleChangeCategoryParent,
    handleSelectCategorySub,
    categories,
    fechData,
    handleClear
  };
};
