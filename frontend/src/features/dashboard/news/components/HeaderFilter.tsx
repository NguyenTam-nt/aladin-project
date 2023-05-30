import { ICCategory } from "@assets/icons/ICCategory";
import { ICClear } from "@assets/icons/ICClear";
import { ICFilter } from "@assets/icons/ICFilter";
import { ICPlus } from "@assets/icons/ICPlus";
import { Button } from "@components/Button";
import { Checkbox } from "@components/Checkbox";
import { prefixRootRoute } from "@configs/index";
import { Colors } from "@constants/color";
import { pathNewsHandle } from "@constants/contain";
import { pathsAdmin } from "@constants/routerAdmin";
import { TranslateContext } from "@contexts/Translation";
import { InputAdmin } from "@features/dashboard/components/InputAdmin";
import clsx from "clsx";
import React, {
  ChangeEvent,
  memo,
  useCallback,
  useContext,
  useState,
} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { useGetCategory } from "../hooks/useGetCategory";

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onPushListFilter: (ids: number[]) => void;
  listFilter: number[];
  searchQuery: string;
  onDelete: () => void;
};

export const HeaderFilter = memo(
  ({
    onChange,
    onPushListFilter,
    onClear,
    listFilter,
    searchQuery,
    onDelete,
  }: Props) => {
    const navigation = useNavigate();
    const handleNavigateCategory = () => {
      navigation(
        `${prefixRootRoute.admin}/${pathsAdmin.news.prefix}/${pathsAdmin.news_category.prefix}`
      );
    };

    const handleNavigateCreateNews = () => {
      navigation(
        `${prefixRootRoute.admin}/${pathsAdmin.news.prefix}/${pathNewsHandle.add}`
      );
    };

    return (
      <div className="flex items-center gap-x-[12px] 2xl:gap-x-[24px] h-[48px]">
        <InputAdmin searchQuery={searchQuery} onChange={onChange} />
        <Button
          onClick={onDelete}
          text="button._delete"
          imageLeft={
            <span className="mr-2">
              <ICClear />
            </span>
          }
          color="empty"
          className="border border-text_C53434 text-text_C53434 h-full max-w-[93px]"
        />
        <ListFilter
          listFilter={listFilter}
          onClear={onClear}
          onPushListFilter={onPushListFilter}
        />
        <Button
          onClick={handleNavigateCategory}
          text="admin.news.btn_category"
          imageLeft={
            <span className="mr-2">
              <ICCategory />
            </span>
          }
          color="empty"
          className="h-full max-w-[197px] border border-secondary text-secondary"
        />
        <Button
          onClick={handleNavigateCreateNews}
          imageLeft={
            <span className="mr-2">
              <ICPlus color={Colors.text_white} />
            </span>
          }
          className="max-w-[170px] h-full"
          text="admin.news.btn_create"
          color="primary"
        />
      </div>
    );
  }
);

type PropsListFilter = {
  onClear: () => void;
  onPushListFilter: (ids: number[]) => void;
  listFilter: number[];
};

const ListFilter = memo(({ onClear, onPushListFilter }: PropsListFilter) => {
  const [isShow, setIsShow] = useState(false);
  const { categories, fechData } = useGetCategory(6);
  const { isVn } = useContext(TranslateContext);
  const [listFilterCurrent, setListFilterCurrent] = useState<number[]>([]);
  const handleShow = () => {
    setIsShow(!isShow);
  };

  const handleChangeCheckBox = useCallback(
    (id: number) => {
      const newList = [...listFilterCurrent];
      const index = newList.findIndex((item) => item === id);
      if (index >= 0) {
        newList.splice(index, 1);
        setListFilterCurrent(newList);
        return;
      }
      newList.push(id);
      setListFilterCurrent(newList);
    },
    [listFilterCurrent]
  );

  const handleChange = useCallback(() => {
    if (listFilterCurrent.length) {
      onPushListFilter([...listFilterCurrent]);
    }
  }, [listFilterCurrent, onPushListFilter]);

  const handleClearFilter = useCallback(() => {
    if (listFilterCurrent.length) {
      onClear();
      setListFilterCurrent([]);
    }
  }, [listFilterCurrent.length, onClear]);

  return (
    <div className=" relative h-full">
      <Button
        onClick={handleShow}
        text="button._filter"
        imageLeft={
          <span className="mr-2">
            <ICFilter />
          </span>
        }
        color="empty"
        className="border border-secondary text-secondary h-full max-w-[110px]"
      />
      <div
        id="filter-news"
        className={clsx(
          "absolute bg-white z-[5] h-0 w-[227px]  overflow-y-scroll shadow-lg ease-in duration-300 top-[100%] left-0 text-_14 text-text_primary mt-[12px]",
          { "footer-animation-list": isShow }
        )}
        style={{
          ["--footer-size" as string]:
            categories.length > 6 ? 8 : categories.length + 2,
          ["--height-li" as string]: "40px",
        }}
      >
        <InfiniteScroll
          scrollableTarget="filter-news"
          hasMore
          next={fechData}
          dataLength={categories.length}
          // style={{
          //   maxHeight: "240px",
          // }}
          loader={<></>}
        >
          <ul className="border-b border-br_E9ECEF px-[16px]">
            {categories.map((item, index) => {
              const id = `${item}_${index}`;
              return (
                <li key={index} className="flex items-center h-[40px]">
                  <span>
                    <Checkbox
                      onChange={() => handleChangeCheckBox(Number(item.id))}
                      id={id}
                      checked={listFilterCurrent.some((_i) => _i === item.id)}
                    />
                  </span>
                  <label htmlFor={id} className="ml-[19px] line-clamp-1">
                    {isVn ? item.name : item.nameKo}
                  </label>
                </li>
              );
            })}
          </ul>
        </InfiniteScroll>
        <div className="h-[80px] bg-white sticky bottom-0 left-0 right-0  justify-between px-[16px]  flex items-center">
          <Button
            onClick={handleClearFilter}
            text="button._reset"
            color="empty"
            className=" text-text_primary w-fit h-[32px]"
          />
          <Button
            onClick={handleChange}
            text="button._accept"
            color="primary"
            className="w-[88px] h-[32px]"
          />
        </div>
      </div>
    </div>
  );
});
