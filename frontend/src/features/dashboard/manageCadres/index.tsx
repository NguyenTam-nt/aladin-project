import React, { memo, useContext, useEffect, useState } from "react";
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
import { cadresService } from "@services/cadres";
import type { ICadres } from "@typeRules/cadres";
import { PAGE_SIZE } from "@constants/contain";



export const ManageCadres = () => {
  const [currenPage, setCurrentPage] = useState(1);
  const { t } = useContext(TranslateContext);
  const setElementModalDelete = useContext(ModalContext).setElementModal;
  const [data, setData] = useState<ICadres[]>([]);
  const [totalPage , setTotalPage] = useState(0)
  const {
    refCheckboxAll,
    refCheckboxList,
    handleCheckAll,
    handleCheckedItem,
    listChecked,
    setListChecked
  } = useHandleCheckbox(data.map((item) => item.id));

   const getCadres = (page: number) => {
     cadresService
       .get({ page: page , size: PAGE_SIZE, sort: "createdDate,desc" })
       .then((data) => {
         setData(data.data);
         setTotalPage(Math.ceil(data.total / PAGE_SIZE));
       });
   };

   const onDeleteById = (id?: number) => {
    cadresService
      .delete(id ? id!.toString() : listChecked.join(","))
      .then(() => {
     
        if (currenPage === totalPage && totalPage !== 1) {
          if ((id && data.length === 1) || listChecked.length === data.length) {
            getCadres(currenPage - 1);
            setCurrentPage(currenPage - 1);
          }
        } else {
          getCadres(currenPage);
        }
        setListChecked([])
      });
  };

   const changePage = (page: number) => { 
      setCurrentPage(page)
      getCadres(page -1)
   }

  useEffect(() => {
    setCurrentPage(1)
    getCadres(0)
  }, []); 

  const handleShowModalDelete = (id?: number) => {
    setElementModalDelete(
      <DialogConfirmDelete
        message={
          id
            ? t("cadres_manage.delete_cadres", {
                name: data.filter((item) => item.id === id)?.[0]?.fullname,
              })
            : t("cadres_manage.delete_all_cadres")
        }
        onClick={() => onDeleteById(id)}
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
            className="bg-secondary  ml-[24px] !w-[200px] h-[48px] "
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
          setCurrentPage={changePage}
          total={totalPage}
        />
      </div>
    </div>
  );
};

type CadresTableProps = {
  onSelectAllCadres: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data: ICadres[];
  refCheckboxAll: React.RefObject<HTMLInputElement>;
  refCheckboxList: React.MutableRefObject<HTMLInputElement[]>;
  onDeleteById: (id: number) => void;
  setCadresChooseById: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
};

const CadresTable = memo(
  ({
    onSelectAllCadres,
    data,
    setCadresChooseById,
    onDeleteById,
    refCheckboxAll,
    refCheckboxList,
  }: CadresTableProps) => {
    const { t , isVn } = useContext(TranslateContext);

    return (
      <>
        <div  className=" mt-[40px] items-center gap-x-[24px] grid grid-cols-[30px_30px_1fr_1fr_20%_12%] font-semibold text-_14 text-text_primary py-[16px] border-b border-br_E9ECEF">
          <button>
            <Checkbox
              id="news_check"
              onChange={onSelectAllCadres}
              ref={refCheckboxAll}
            />
          </button>
          <div>{t("cadres_manage._form._number")}</div>
          <div>{t("cadres_manage._form._name")}</div>
          <div>{t("cadres_manage._form._specialized")}</div>
          <div>{t("cadres_manage._form._email")}</div>
          <div className="flex justify-end">
            {t("cadres_manage._form._function")}
          </div>
        </div>
        {data.map((item: ICadres, index: number) => {
          return (
            <CadresTableItem
              item={item}
              index={index}
              key={item.id}
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
  item: ICadres;
  index: number;
  setCadresChooseById: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  onDeleteById: (id: number) => void;
  refCheckboxList: React.MutableRefObject<HTMLInputElement[]>;
}

const CadresTableItem = ({
  item,
  index,
  setCadresChooseById,
  onDeleteById,
  refCheckboxList,
}: CadresTableItemProps) => {
  const {  isVn } = useContext(TranslateContext);
  return (
    <div  className=" items-center gap-x-[24px]  grid grid-cols-[30px_30px_1fr_1fr_20%_12%]  font-semibold text-_14 text-text_primary py-[16px] border-b border-br_E9ECEF">
      <button>
        <Checkbox
          onChange={(event) => setCadresChooseById(event, index)}
          ref={(ref: HTMLInputElement) =>
            (refCheckboxList.current[index] = ref)
          }
        />
      </button>
      <div>
      <p className="text-_14 font-semibold text-text_black  text-justify ">
        {index + 1}
      </p>
      </div>
      <div>
      <p className="text-_14 font-semibold text-text_black">{ isVn ? item.fullname : item.fullnameKo}</p>
      </div>
      <p className="text-_14 font-semibold text-text_black">
        {isVn ? item.position  : item.positionKo}
      </p>
      <p className="text-_14 font-semibold text-text_black">{ item.email }</p>
      <div className="flex justify-end">
        <button
          onClick={() => {
            onDeleteById(item.id );
          }}
        >
          <ICClear />
        </button>
      </div>
    </div>
  );
};
