import { SubHeaderTopic } from "@features/dashboard/home/components/SubHeaderTopic";
import TitleInput from "../../TitleInput";
import { ICArrowDown } from "@assets/icons/ICArrowDown";
import clsx from "clsx";
import { Checkbox } from "@components/Checkbox";
import { ChangeEvent, useContext, useState } from "react";
import { TranslateContext } from "@contexts/Translation";
import { ICDelele } from "@assets/icons/ICDelele";
import type { IFooter } from "@typeRules/footer";
import { footerService } from "@services/footer";
import { PopUpContext } from "@contexts/PopupContext";
import type { ICategory } from "@typeRules/news";

export const FooterGroup = ({ data, categories }: { data: IFooter, categories:ICategory[] }) => {
  const { t, isVn } = useContext(TranslateContext);
  const [listFilter, setListFilter] = useState<IFooter[]>(data.items ?? []);
  const { showError, showSuccess } = useContext(PopUpContext);

  const [isShow, setIsShow] = useState(false);
  const handleShow = () => {
    setIsShow(!isShow);
  };

  const handleChecked = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const isChecked = event.target.checked;
    const newList = [...listFilter];
    if (isChecked) {
      newList.push({
        name: categories[index].name,
        nameKo: categories[index].nameKo,
        path: Number(categories[index].id) ?? 0,
        parentId: data.id,
      });
      setListFilter([...newList]);
    } else {
      const _i = newList.findIndex((item) => item.id === categories[index].id);
      newList.splice(_i, 1);
      setListFilter([...newList]);
    }
    handlePutItem([...newList])
  };

  const handlePutItem = (dataItem: IFooter[]) => {
    footerService
      .put(dataItem, Number(data.id))
      .then((data) => {
        setListFilter([...data]);
        showSuccess("message.success._success");
      })
      .catch(() => {
        showError("message.error._error");
      });
  };

  const handleDeleteByName = (id: number) => {
    const _i = listFilter.findIndex((item) => item.id === id);
    const newList = [...listFilter];
    newList.splice(_i, 1);
    setListFilter([...newList]);
    handlePutItem([...newList])
  };

  return (
    <div className="mt-2">
      <SubHeaderTopic
        isPaddingTop={false}
        title={isVn ? data?.name ?? "" : data?.nameKo ?? ""}
      />
      <div>
        <TitleInput forId="" name="admin._footer._choose" />
        <div className="">
          <div className="w-full min-h-[44px] h-auto border border-br_E9ECEF text-_14 text-bg_7E8B99 flex  justify-between items-center py-[4px] px-[16px]">
            <div className="h-full flex-1 flex flex-wrap items-center gap-[12px]">
              {!listFilter.length
                ? t("admin._footer._choose_placeholder")
                : listFilter.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="w-max line-clamp-1 flex items-center border border-br_E9ECEF gap-x-2 px-1 py-1 h-full"
                      >
                        {isVn ? item?.name : item?.nameKo}{" "}
                        <button
                          onClick={() => handleDeleteByName(Number(item.id))}
                        >
                          <ICDelele />
                        </button>
                      </div>
                    );
                  })}
            </div>
            <button onClick={handleShow}>
              <ICArrowDown />
            </button>
          </div>
          <ul
            className={clsx(
              "h-0  overflow-hidden ease-in duration-300 text-_14 text-text_primary",
              { "footer-animation-list": isShow }
            )}
            style={{
              ["--footer-size" as string]: categories.length,
              ["--height-li" as string]: "44px",
            }}
          >
            {categories.map((item, index) => {
              const isChecked = listFilter.some((_item) => Number(_item.path) === item.id);
              return (
                <li
                  key={index}
                  className="h-[44px] flex items-center gap-x-[20px] border border-br_E9ECEF px-[16px] py-2"
                >
                  <Checkbox
                    checked={isChecked}
                    onChange={(event) => handleChecked(event, index)}
                  />
                  <label htmlFor="">{isVn ? item.name : item.nameKo}</label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
