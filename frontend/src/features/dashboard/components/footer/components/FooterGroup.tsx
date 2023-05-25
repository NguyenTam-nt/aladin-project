import { SubHeaderTopic } from "@features/dashboard/home/components/SubHeaderTopic";
import TitleInput from "../../TitleInput";
import { ICArrowDown } from "@assets/icons/ICArrowDown";
import clsx from "clsx";
import { Checkbox } from "@components/Checkbox";
import { ChangeEvent, useContext, useState } from "react";
import { TranslateContext } from "@contexts/Translation";
import { ICDelele } from "@assets/icons/ICDelele";

const dataChildren = [
  "Đào tạo",
  "Nghiên cứu khoa học",
  "Sinh viên",
  "Tài liệu văn bản",
  "Đào tạo1",
  "Nghiên cứu khoa học1",
  "Sinh viên1",
  "Tài liệu văn bản1 Tài liệu văn bản1 Tài liệu văn bản1 Tài liệu văn bản1",
  "Đào tạo2",
  "Nghiên cứu khoa học2",
  "Sinh viên2",
  "Tài liệu văn bản2",
];

export const FooterGroup = ({ data }: { data: string }) => {
  const { t } = useContext(TranslateContext);
  const [listFilter, setListFilter] = useState<string[]>([]);
  const [isShow, setIsShow] = useState(false);
  const handleShow = () => {
    setIsShow(!isShow);
  };

  const handleChecked = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setListFilter([...listFilter, dataChildren[index]]);
    } else {
      const _i = listFilter.findIndex((item) => item === dataChildren[index]);
      const newList = listFilter;
      newList.splice(_i, 1);
      setListFilter([...newList]);
    }
  };

  const handleDeleteByName = (name: string) => {
    const _i = listFilter.findIndex((item) => item === name);
    const newList = listFilter;
    newList.splice(_i, 1);
    setListFilter([...newList]);
  };

  return (
    <div className="mt-2">
      <SubHeaderTopic isPaddingTop={false} title={data} />
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
                        {item}{" "}
                        <button onClick={() => handleDeleteByName(item)}>
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
              ["--footer-size" as string]: dataChildren.length,
              ["--height-li" as string]: "44px",
            }}
          >
            {dataChildren.map((item, index) => {
              const isChecked = listFilter.some((_item) => _item === item);
              return (
                <li
                  key={index}
                  className="h-[44px] flex items-center gap-x-[20px] border border-br_E9ECEF px-[16px] py-2"
                >
                  <Checkbox
                    checked={isChecked}
                    onChange={(event) => handleChecked(event, index)}
                  />
                  <label htmlFor="">{item}</label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
