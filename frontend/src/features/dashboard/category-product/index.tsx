import React from "react";
import { TitleTopic } from "../home/components/TitleTopic";
import { Button } from "../components/Button";
import { ICAdd } from "@assets/icons/ICAdd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { prefixRootRoute } from "@constants/index";
import { pathsAdmin } from "@constants/routerManager";
import { ListCategory } from "./components/ListCategory";
import { useModalContext } from "@contexts/hooks/modal";
import { CategoryProductHandler } from "./components/CategoryProductHandler";

export const CategoryProduct = () => {
    const { t } = useTranslation();
    const {setElementModal} = useModalContext()
    const handleNavigation = () => {
      setElementModal(<CategoryProductHandler />)
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
      <ListCategory />
    </>
  );
};
