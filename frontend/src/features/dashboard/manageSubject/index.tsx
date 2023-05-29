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
import type { ISubject } from "@typeRules/subject";
import { subjectService } from "@services/subject";
import { PAGE_SIZE } from "@constants/contain";
import moment from "moment";


export const ManageSubject = () => {
  const [currenPage, setCurrentPage] = useState(1);

  const { t } = useContext(TranslateContext);
  const setElementModalDelete = useContext(ModalContext).setElementModal;
  const [data, setData] = useState<ISubject[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const {
    refCheckboxAll,
    refCheckboxList,
    handleCheckAll,
    handleCheckedItem,
    listChecked,
    setListChecked
  } = useHandleCheckbox(data.map((item) => item.id));

  const getSubject = (page: number) => {
    subjectService
      .get({ page: page, size: PAGE_SIZE, sort: "createdDate,desc" })
      .then((data) => {
        setData(data.data);
        setTotalPage(Math.ceil(data.total / PAGE_SIZE));
      });
  };

  const onDeleteById = (id?: number) => {
 
    subjectService
      .delete(id ? id!.toString() : listChecked.join(","))
      .then(() => {
        if (currenPage === totalPage && totalPage !== 1) {
          if ((id && data.length === 1) || listChecked.length === data.length) {
            getSubject(currenPage - 2);
            setCurrentPage(currenPage - 1);
          }
        } else {
          getSubject(currenPage -1);
        }
        setListChecked([])
      });
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
    getSubject(page - 1);
  };

  useEffect(() => {
    getSubject(0);
  }, []);

  const handleShowModalDelete = (id?: number) => {
    setElementModalDelete(
      <DialogConfirmDelete
        message={
          id
            ? t("subject_manage.delete_subject", {
                name: data.filter((item) => item.id === id)?.[0]?.name,
              })
            : t("subject_manage.delete_all_subject")
        }
        onClick={() => onDeleteById(id)}
      />
    );
  };

  return (
    <div className="px-[24px]">
      <HeaderAdmin title="subject_manage._title" />
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
        <Link to={pathsAdmin.subject.create_subject}>
          <Button
            color="primary"
            text="subject_manage.title_create_new"
            className="bg-secondary  ml-[24px] !w-[200px] h-[48px]"
            imageLeft={<ICPlus />}
          />
        </Link>
      </div>
      <SubjectTable
        onSelectAllsubject={handleCheckAll}
        data={data}
        refCheckboxAll={refCheckboxAll}
        refCheckboxList={refCheckboxList}
        setsubjectChooseById={handleCheckedItem}
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

type subjectTableProps = {
  onSelectAllsubject: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data: ISubject[];
  refCheckboxAll: React.RefObject<HTMLInputElement>;
  refCheckboxList: React.MutableRefObject<HTMLInputElement[]>;
  onDeleteById: (id: number) => void;
  setsubjectChooseById: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
};

const SubjectTable = memo(
  ({
    onSelectAllsubject,
    data,
    setsubjectChooseById,
    onDeleteById,
    refCheckboxAll,
    refCheckboxList,
  }: subjectTableProps) => {
    const { t } = useContext(TranslateContext);

    return (
      <>
        <div className="pb-[14px] grid  grid-cols-[1fr_1fr_3fr_6fr_2fr_2fr]  mt-[40px] text-_18 font-semibold text-text_primary border-b-[1px] border-solid border-br_E9ECEF">
          <button>
            <Checkbox
               ref={refCheckboxAll}
              id="subjects_check"
              onChange={onSelectAllsubject}
        
            />
          </button>
          <div>{t("subject_manage._form._number")}</div>
          <div>{t("subject_manage._form._name")}</div>
          <div>{t("subject_manage._form._title")}</div>
          <div>{t("subject_manage._form._date")}</div>
          <div className="flex justify-end">
            {t("subject_manage._form._function")}
          </div>
        </div>
        {data.map((item: ISubject, index: number) => {
          return (
            <SubjectTableItem
              item={item}
              index={index}
              key={item.id}
              setsubjectChooseById={setsubjectChooseById}
              onDeleteById={onDeleteById}
              refCheckboxList={refCheckboxList}
            />
          );
        })}
      </>
    );
  }
);

interface subjectTableItemProps {
  item: ISubject;
  index: number;
  setsubjectChooseById: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  onDeleteById: (id: number) => void;
  refCheckboxList: React.MutableRefObject<HTMLInputElement[]>;
}

const SubjectTableItem = ({
  item,
  index,
  setsubjectChooseById,
  onDeleteById,
  refCheckboxList,
}: subjectTableItemProps) => {
  const { isVn} = useContext(TranslateContext)
  return (
    <div className="py-[16px] grid  grid-cols-[1fr_1fr_3fr_6fr_2fr_2fr]  text-_18 font-semibold text-text_primary border-b-[1px] border-solid border-br_E9ECEF">
      <button>
        <Checkbox
          onChange={(event) => setsubjectChooseById(event, index)}
          ref={(ref: HTMLInputElement) =>
            (refCheckboxList.current[index] = ref)
          }
        />
      </button>
      <div>
        <p className="text-_14 font-semibold text-text_black">{index + 1}</p>
      </div>
      <div>
        <p className="text-_14 font-semibold text-text_black">{isVn ? item.name : item.nameKo}</p>
      </div>
      <div>
        <p className="text-_14 font-semibold text-text_black">
          { isVn ? item.description : item.descriptionKo}
        </p>
      </div>
      <div>
        <p className="text-_14 font-semibold text-text_black">
          {moment(item.createdDate).format("DD/MM/YY")}
        </p>
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
