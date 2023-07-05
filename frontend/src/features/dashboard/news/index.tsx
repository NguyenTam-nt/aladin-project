import { ICAdd } from "@assets/icons/ICAdd";
import { ICAsc } from "@assets/icons/ICAsc";
import { ICDesc } from "@assets/icons/ICDesc";
import MagnifyingGlass from "@assets/icons/MagnifyingGlass";
import { Pagination } from "@components/Paginnation";
import TitleOfContentManage from "@components/TitleOfContentManage";
import { pathsAdmin } from "@constants/routerManager";
import { Button } from "@features/dashboard/components/Button";
import { newService } from "@services/newService";
import type { IParams } from "@typeRules/index";
import type { newItem_type } from "@typeRules/new";
import { debounce } from "lodash";
import React, {
  ButtonHTMLAttributes,
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import NewItem from "./component/NewItem";
type Props = {
  name: string;
  icon?: React.ReactNode;
  className?: string;
  handleClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ManageNews = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [listNews, setListNews] = useState<newItem_type[]>([]);
  const [filter, setFilter] = useState<"desc" | "asc">("desc");
  const [keySearch, setKeySearch] = useState<string>("");
  const handleAddNew = () => {
    navigate(pathsAdmin.news.add);
  };
  const defaultParams = {
    page: currentPage - 1,
    size: 12,
    sort: `id,${filter}`,
  };
  const searchParams = {
    query: `"${keySearch}"`,
    page: currentPage - 1,
    size: 12,
    sort: `id,${filter}`,
  };
  const getListNew = async (params: IParams) => {
    try {
      const { list, totalElement, totalElementPage } = await newService.getNews(
        params
      );
      setListNews(list);
      setTotalPages(Math.ceil(totalElementPage / 12));
    } catch (error) {
      console.log("Không thể lấy dánh sách tin tức");
    }
  };
  const searchListNew = async (params: IParams) => {
    try {
      const { list, totalElement, totalElementPage } =
        await newService.searchNews(params);
      setListNews(list);
      setTotalPages(Math.ceil(totalElementPage / 12));
    } catch (error) {
      console.log("Không thể tìm thấy danh sách tin tức.");
    }
  };
  const deleteItemNew = () => {
    if (currentPage === 1) {
      getListNew(keySearch != "" ? searchParams : defaultParams);
    } else {
      setCurrentPage(1);
    }
    navigate("");
  };
  const debounceDropDown = useCallback(
    debounce((params) => searchListNew(params), 700),
    []
  );
  const handleInputSerch = (e: ChangeEvent<HTMLInputElement>) => {
    setKeySearch(e.target.value);
    navigate("");
    setCurrentPage(1);
  };
  useEffect(() => {
    if (keySearch != "") {
      debounceDropDown(searchParams);
      return;
    }
    debounceDropDown.cancel();
    getListNew(defaultParams);
  }, [currentPage, filter, keySearch]);
  return (
    <div>
      <TitleOfContentManage name="news.listNew" />
      <div className="mt-10 pb-6">
        <div className="flex items-center gap-6 justify-between">
          <div className="w-[800px] relative">
            <input
              type="text"
              value={keySearch}
              onChange={handleInputSerch}
              className="w-full border border-[#CFCFCF] bg-transparent py-3 pl-12  font-normal text-sm leading-22"
              placeholder={t("news.search_placehoder") as string}
            />
            <div className="absolute left-5 top-2/4 -translate-y-2/4">
              <MagnifyingGlass color="#A1A0A3" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Button
              onClick={handleAddNew}
              text="news.add"
              className="max-w-[177px] whitespace-nowrap"
              imageLeft={
                <span className="mr-2">
                  <ICAdd />
                </span>
              }
              color={"empty"}
            />
            <div className="flex gap-6 justify-between">
              <Button
                onClick={() => {
                  setFilter("desc");
                }}
                text="common.desc"
                className="max-w-[177px] whitespace-nowrap"
                imageLeft={
                  <span className="mr-2">
                    <ICDesc />
                  </span>
                }
                color={"empty"}
              />
              <Button
                onClick={() => {
                  setFilter("asc");
                }}
                text="common.asc"
                className="max-w-[177px] whitespace-nowrap"
                imageLeft={
                  <span className="mr-2">
                    <ICAsc />
                  </span>
                }
                color={"empty"}
              />
            </div>
          </div>
        </div>
      </div>
      {listNews.length > 0 && (
        <div className="grid grid-cols-4 gap-x-6 gap-y-10">
          {listNews.map((itemNew, indexNew) => {
            return (
              <NewItem
                itemNew={itemNew}
                key={indexNew}
                handleDelete={deleteItemNew}
              />
            );
          })}
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-end">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default ManageNews;
