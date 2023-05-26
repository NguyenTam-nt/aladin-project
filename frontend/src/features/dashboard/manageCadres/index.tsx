import React, {
  memo,
  useContext,
  useEffect,
  useState,
} from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { TranslateContext } from "@contexts/Translation";
// import { ModalContext } from "@contexts/ModalContext";
import Pagination from "../components/Pagination";
import { Button } from "@components/Button";
import { ICPlus } from "@assets/icons/ICPlus";
import { InputAdmin } from "../components/InputAdmin";
import { ICClear } from "@assets/icons/ICClear";
import { ModalContext } from "@contexts/ModalContext";
import DialogConfirmDelete from "@components/DialogConfirmDelete";

import { useHandleCheckbox } from "../hooks/useHandleCheckbox";
import { Checkbox } from "@components/Checkbox";
import { Link } from "react-router-dom";
import { pathsAdmin } from "@constants/routerAdmin";
import CadresAPI from "@services/cadres";

const dummyData = [
  {
    id: 1,
    name: "TS. Nguyễn Thị Phương Mai",
    specialized: "Giáo dục tiếng Hàn - Đại học quốc gia Seoul, Hàn Quốc",
    email: "nguyenthiphuongmai@gmail.com",
  },
  {
    id: 2,
    name: "TS. Nguyễn Thị Phương Mai",
    specialized: "Giáo dục tiếng Hàn - Đại học quốc gia Seoul, Hàn Quốc",
    email: "nguyenthiphuongmai@gmail.com",
  },
  {
    id: 3,
    name: "TS. Nguyễn Thị Phương Mai",
    specialized: "Giáo dục tiếng Hàn - Đại học quốc gia Seoul, Hàn Quốc",
    email: "nguyenthiphuongmai@gmail.com",
  },
];
interface ICadresTableItem {
  id: number;
  name: string;
  specialized: string;
  email: string;
}

export const ManageCadres = () => {
  const [currenPage, setCurrentPage] = useState(1);

  const { t } = useContext(TranslateContext);
  const setElementModalDelete = useContext(ModalContext).setElementModal;
  const [data] = useState<ICadresTableItem[]>(dummyData);

  const {refCheckboxAll, refCheckboxList, handleCheckAll, handleCheckedItem} = useHandleCheckbox(data.map((item) => item.id))
 
  const onDeleteById = (_: number) => { 
  }; 

  useEffect(() => {
   CadresAPI.getAll().then((data) => { console.log(data);
   })
  } , [])

 
  const handleShowModalDelete = (name?: string) => {
    setElementModalDelete(
      <DialogConfirmDelete
        message={
          name
            ? t("cadres_manage.delete_cadres", { name: name })
            : t("cadres_manage.delete_all_cadres")
        }
      />
    );
  };


  return (
    <div className="px-[24px]">
      <HeaderAdmin title="cadres_manage._title" />
      <div className="flex items-center h-[48px]">
        <InputAdmin />
        <Button
          onClick={() => {
            handleShowModalDelete();
          }}
          color="empty"
          text="button._delete"
          className=" text-text_C53434 border-[2px] border-text_C53434  ml-[24px] !w-[93px] h-[48px]"
          imageLeft={
            <div className="mr-[11px]">
              <ICClear />
            </div>
          }
        />
        <Link to={pathsAdmin.cadres.create_cadres}>
          <Button
            color="primary"
            text="cadres_manage.title_create_new"
            className="bg-secondary  ml-[24px] !w-[200px] h-[48px]"
            imageLeft={<ICPlus />}
          />
        </Link>
      </div>
      <CadresTable
        onSelectAllCadres={handleCheckAll}
        data={data}
        refCheckboxAll={refCheckboxAll}
        refCheckboxList={refCheckboxList}
        setCadresChooseById={handleCheckedItem}
        onDeleteById={onDeleteById}
      />
      <div className="mt-[120px] flex justify-end">
        <Pagination
          currenPage={currenPage}
          setCurrentPage={setCurrentPage}
          total={10}
        />
      </div>
    </div>
  );
};

type CadresTableProps = {
  onSelectAllCadres:(event: React.ChangeEvent<HTMLInputElement>) => void
  data: ICadresTableItem[];
  refCheckboxAll : React.RefObject<HTMLInputElement> ;
  refCheckboxList : React.MutableRefObject<HTMLInputElement[]> ;
  onDeleteById : (id : number) => void;
  setCadresChooseById: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
};

const CadresTable = memo(
  ({
    onSelectAllCadres,
    data,
    setCadresChooseById,
    onDeleteById ,
    refCheckboxAll ,
    refCheckboxList
  }: CadresTableProps) => {
    const { t } = useContext(TranslateContext);

    return (
      <>
        <div className="pb-[14px] grid  grid-cols-[1fr_1fr_3fr_5fr_3fr_2fr]  mt-[40px] text-_18 font-semibold text-text_primary border-b-[1px] border-solid border-br_E9ECEF">
        <button>
          <Checkbox id="news_check" onChange={onSelectAllCadres} ref={refCheckboxAll} />
        </button>
          <div>{t("cadres_manage._form._number")}</div>
          <div>{t("cadres_manage._form._name")}</div>
          <div>{t("cadres_manage._form._specialized")}</div>
          <div>{t("cadres_manage._form._email")}</div>
          <div className="flex justify-end">
            {t("cadres_manage._form._function")}
          </div>
        </div>
        {data.map((item: ICadresTableItem, index: number) => {
          return (
            <CadresTableItem
              item={item}
              index={index}
              key={index}
              setCadresChooseById={setCadresChooseById}
              onDeleteById={onDeleteById}
              refCheckboxList={refCheckboxList}
            />
          );
        })}
      </>
    );
  }
);

interface CadresTableItemProps {
  item: ICadresTableItem;
  index: number;
  setCadresChooseById: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void ;
  onDeleteById : (id: number) => void;
  refCheckboxList : React.MutableRefObject<HTMLInputElement[]>;
}

const CadresTableItem = ({
  item,
  index,
  setCadresChooseById,
  onDeleteById ,
  refCheckboxList
}: CadresTableItemProps) => {
  return (
    <div className="py-[16px] grid  grid-cols-[1fr_1fr_3fr_5fr_3fr_2fr]  text-_18 font-semibold text-text_primary border-b-[1px] border-solid border-br_E9ECEF">
      <button>
        <Checkbox
          onChange={(event) => setCadresChooseById(event, index)}
          ref={(ref: HTMLInputElement) =>
            (refCheckboxList.current[index] = ref)
          }
        />
      </button>

      <div>
        <p className="text-_14 font-semibold text-text_black">{index + 1}</p>
      </div>
      <div>
        <p className="text-_14 font-semibold text-text_black">{item.name}</p>
      </div>
      <div>
        <p className="text-_14 font-semibold text-text_black">
          {item.specialized}
        </p>
      </div>
      <div>
        <p className="text-_14 font-semibold text-text_black">{item.email}</p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => {
            onDeleteById(item.id);
          }}
        >
          <ICClear />
        </button>
      </div>
    </div>
  );
};
