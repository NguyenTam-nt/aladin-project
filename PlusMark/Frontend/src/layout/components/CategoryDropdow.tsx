import { NextArrowIcon } from "@assets/icons";
import { firstUpper, some } from "@utility/helper";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { ROUTES } from "@utility/constants";
import { CategoryHeaderItem } from "./Header";
import { ProductCategoryHeader } from "@services/CategoryProductServices";

type Props = {
  items: CategoryHeaderItem[];
  name: string;
};

const CategoryDropdown = ({ items, navbar }: some) => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [navbarParam, setNavbarParam] = useState<string>("");
  const [categoryParam, setCategoryParam] = useState<string>("");
  const [detailParam, setDetailParam] = useState<string>("");

  useEffect(() => {
    setNavbarParam(searchParams.get("navbar") || "");
    setCategoryParam(searchParams.get("category") || "");
    setDetailParam(searchParams.get("detail") || "");
  }, [searchParams]);

  // console.log(items);

  return (
    <div className="header__dropdown min-h-fit">
      <div className="container px-8 py-5 flex gap-8 h-full w-full flex-wrap max-h-[50vh] overflow-auto header-scrollbar">
        {items.map((item: CategoryHeaderItem, i: any) => {
          return (
            <div className="flex flex-col" key={i}>
              <Link
                to={`${ROUTES.search.filter}?navbar=${navbar}&category=${
                  item.id ? item.id : item.title
                }`}
                className={clsx(
                  "text-normal1 hover:text-main  font-bold mb-1 whitespace-nowrap",
                  {
                    "text-main":
                      categoryParam == (item.id ? item.id : item.title) &&
                      navbar == navbarParam,
                    "text-text":
                      categoryParam != (item.id ? item.id : item.title) ||
                      navbar != navbarParam,
                  }
                )}
              >
                {firstUpper(item.title)}
              </Link>
              {item.items &&
                item.items.map((it: CategoryHeaderItem, idx: any) => (
                  <Link
                    key={idx}
                    to={`${ROUTES.search.filter}?navbar=${navbar}&category=${
                      item.id ? item.id : item.title
                    }&detail=${it.id ? it.id : it.title}`}
                    className={clsx("text-normal1 hover:text-main  py-2", {
                      "text-main":
                        detailParam == (it.id ? it.id : it.title) &&
                        categoryParam == (item.id ? item.id : item.title) &&
                        navbar == navbarParam,
                      "text-text":
                        detailParam != (it.id ? it.id : it.title) ||
                        categoryParam != (item.id ? item.id : item.title) ||
                        navbar != navbarParam,
                    })}
                  >
                    {firstUpper(it.title)}
                  </Link>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryDropdown;
