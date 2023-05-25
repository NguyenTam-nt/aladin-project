import React, {
  memo,
  useContext,
  useMemo,
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
import { ModalCreate } from "./components/ModalCreate";
import DialogConfirmDelete from "@components/DialogConfirmDelete";
import { Colors } from "@constants/color";

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
  const { setElementModal } = useContext(ModalContext);
  const { t } = useContext(TranslateContext);
  const setElementModalDelete = useContext(ModalContext).setElementModal;
  const [selectAll, setSelectAll] = useState(false);
  const [cadresChoose, setCadresChoose] = useState<number[]>([]);
  const [data, setData] = useState<ICadresTableItem[]>(dummyData);
  const onSelectAllCadres = () => {
    if (selectAll) {
      setSelectAll(false);
      setCadresChoose([]);
    } else {
      setSelectAll(true);
      const idList = data.map((item) => item.id);
      setCadresChoose(idList);
    }
  };
  
  const onDeleteById = (id: number) => {
   
  }; 

  const setCadresChooseById = (id: number) => {
    const index = cadresChoose.indexOf(id);
    const newCadresChoose = [...cadresChoose];
    if (index === -1) {
      newCadresChoose.push(id);
    } else {
      newCadresChoose.splice(index, 1);
    }
    setCadresChoose(newCadresChoose);
  };

  const isSelectAll = useMemo(() => {
    if (data.length > 0 && data.length === cadresChoose.length) {
      return true;
    }
    return false;
  }, [data, cadresChoose]);

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
  const handleShowModal = () => {
    setElementModal(<ModalCreate />);
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
        <Button
          onClick={handleShowModal}
          color="primary"
          text="cadres_manage.title_create_new"
          className="bg-secondary  ml-[24px] !w-[200px] h-[48px]"
          imageLeft={<ICPlus />}
        />
      </div>
      <CadresTable
        onSelectAllCadres={onSelectAllCadres}
        isSelectAll={isSelectAll}
        data={data}
        cadresChoose={cadresChoose}
        setCadresChooseById={setCadresChooseById}
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
  onSelectAllCadres: () => void;
  isSelectAll: boolean;
  data: ICadresTableItem[];
  cadresChoose: number[];
  onDeleteById : (id : number) => void;
  setCadresChooseById: (id: number) => void;
};

const CadresTable = memo(
  ({
    onSelectAllCadres,
    isSelectAll,
    data,
    cadresChoose,
    setCadresChooseById,
    onDeleteById
  }: CadresTableProps) => {
    const { t } = useContext(TranslateContext);

    return (
      <>
        <div className="pb-[14px] grid  grid-cols-[1fr_1fr_3fr_5fr_3fr_2fr]  mt-[40px] text-_18 font-semibold text-text_primary border-b-[1px] border-solid border-br_E9ECEF">
          <button
            className="h-[24px] w-[24px] border-[3px] border-bg_272E35"
            onClick={onSelectAllCadres}
            style={{
              backgroundColor: isSelectAll ? Colors.secondary : "transparent",
            }}
          ></button>
          <div>{t("cadres_manage._form._number")}</div>
          <div>{t("cadres_manage._form._name")}</div>
          <div>{t("cadres_manage._form._specialized")}</div>
          <div>{t("cadres_manage._form._email")}</div>
          <div className="flex justify-end">
            {t("cadres_manage._form._function")}
          </div>
        </div>
        {data.map((item: ICadresTableItem, index: number) => {
          const selectItem = cadresChoose.includes(item.id);
          return (
            <CadresTableItem
              item={item}
              index={index}
              key={index}
              selectItem={selectItem}
              setCadresChooseById={setCadresChooseById}
              onDeleteById={onDeleteById}
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
  selectItem: boolean;
  setCadresChooseById: (id: number) => void;
  onDeleteById : (id: number) => void;
}

const CadresTableItem = ({
  item,
  index,
  selectItem,
  setCadresChooseById,
  onDeleteById
}: CadresTableItemProps) => {
  return (
    <div className="py-[16px] grid  grid-cols-[1fr_1fr_3fr_5fr_3fr_2fr]  text-_18 font-semibold text-text_primary border-b-[1px] border-solid border-br_E9ECEF">
      <button
        className="h-[24px] w-[24px] border-[3px] border-bg_272E35 "
        style={{
          backgroundColor: selectItem ? Colors.secondary : "transparent",
        }}
        onClick={() => {
          setCadresChooseById(item.id);
        }}
      ></button>
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
