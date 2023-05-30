import { ICEdit } from "@assets/icons/ICEdit";
import { InputSwitch } from "@components/InputSwitch";
import { PopUpContext } from "@contexts/PopupContext";
import { TranslateContext } from "@contexts/Translation";
import { HeaderAdmin } from "@features/dashboard/components/HeaderAdmin";
import { SubHeaderTopic } from "@features/dashboard/home/components/SubHeaderTopic";
import { headerService } from "@services/header";
import { translateService } from "@services/translate";
import type { IHeader } from "@typeRules/footer";
import React, {
  ChangeEvent,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const data = [
  "Tổng quan",
  "Thương hiệu",
  "Cơ cấu tổ chức - nhân sự",
  "Broucher",
];

export const Categories = () => {
  const { t } = useContext(TranslateContext);
  const [data, setData] = useState<IHeader>();
  useEffect(() => {
    headerService.getHeadetByLink("/gioi-thieu").then((data) => {
      if (!data.length) return;
      setData(data[0]);
    });
  }, []);
  return (
    <>
      <HeaderAdmin title="admin._about._category._title" />
      <SubHeaderTopic title="admin._about._category._title_post" />
      <div>
        <div className="flex items-center text-_18 font-semibold text-text_primary pb-[16px] border-b border-br_E9ECEF ">
          <div className="flex-1">
            {t("admin._about._category._table.name")}
          </div>
          <div className="w-[90px]">
            {t("admin._about._category._table._func")}
          </div>
        </div>
        {data?.items &&
          data?.items.map((item, index) => {
            return <CategoryItem value={item} key={index} />;
          })}
      </div>
    </>
  );
};

type Props = {
  value: IHeader;
};

const CategoryItem = memo(({ value }: Props) => {
  const [data, setData] = useState<IHeader>(value);
  const { isVn } = useContext(TranslateContext);
  const {showSuccess, showError} = useContext(PopUpContext)
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        name: event.target.value,
      });
    },
    [data]
  );
  const handleBlur = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (isVn) {
        const content = await translateService.post(value);
        setData({
          ...data,
          nameKo: content,
        });
      }
    },
    [data, isVn]
  );

  const handleEdit = () => {
      if(data.name !== value.name || data.nameKo !== value.nameKo) {
          headerService.put(data).then(() => {
            showSuccess("message.success._success")
          }).catch(() => {
            showError("message.error._error")
          })
      }
  }

  return (
    <div className="flex items-center text-_14 text-text_primary py-[28px] border-b border-br_E9ECEF ">
      <div className="flex-1">
        <input
          className=" border-transparent w-full"
          value={isVn ? data.name : data.nameKo}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="flex items-center">
        <InputSwitch />
        <button onClick={handleEdit} className="ml-[24px]">
          <ICEdit />
        </button>
      </div>
    </div>
  );
});
