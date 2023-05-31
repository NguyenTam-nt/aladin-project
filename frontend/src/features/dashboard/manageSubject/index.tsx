import React, { ChangeEvent, memo, useCallback, useContext, useEffect, useRef, useState } from "react";
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
import { Link, useSearchParams } from "react-router-dom";
import { pathsAdmin } from "@constants/routerAdmin";
import type { ISubject } from "@typeRules/subject";
import { subjectService } from "@services/subject";
import { PAGE_SIZE } from "@constants/contain";
import moment from "moment";
import { debounce } from "lodash";
import { PopUpContext } from "@contexts/PopupContext";



export const ManageSubject = () => {
  const [currenPage, setCurrentPage] = useState(1);

  const { t } = useContext(TranslateContext);
  const setElementModalDelete = useContext(ModalContext).setElementModal;
  const [data, setData] = useState<ISubject[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const { showSuccess } = useContext(PopUpContext)
  const {
    refCheckboxAll,
    refCheckboxList,
    handleCheckAll,
    handleCheckedItem,
    listChecked,
    setListChecked
  } = useHandleCheckbox(data.map((item) => item.id));
  const [_, setSearchParam] = useSearchParams()
  const debounceFuc = useRef<ReturnType<typeof debounce>>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleChangeSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      setSearchQuery(query);
      if (query.trim()) {
        setCurrentPage(1);
        setSearchParam({ page: `1` });
      }
    },
    []
  );

  const getSubject = useCallback((page: number , query?: string) => {
    subjectService
      .get({ page: page, size: PAGE_SIZE, sort: "createdDate,desc" } , query)
      .then((data) => {
        setData(data.data);
        setTotalPage(Math.ceil(data.total / PAGE_SIZE));
      });
  } , []);

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
        showSuccess("message.success._success");
      });
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
    getSubject(page - 1);
  };
  const handleGetDataBySearch = useCallback(
    (page: number, query: string) => {
      if (debounceFuc.current) debounceFuc.current.cancel();
      debounceFuc.current = debounce(() => {
        getSubject(page, query)
      }, 300);
      debounceFuc.current();
    },
    [getSubject]
  );


  useEffect(() => {
    if (!searchQuery.trim()) {
      if (debounceFuc.current) debounceFuc.current.cancel();
      getSubject(Number(currenPage - 1 ?? 0), searchQuery);
    } else {
      handleGetDataBySearch(Number(currenPage - 1 ?? 0), searchQuery);
    }
  }, [searchQuery, currenPage]);

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
      <InputAdmin searchQuery={searchQuery} onChange={handleChangeSearch} />
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
        onDeleteById={handleShowModalDelete}
        listChecked={listChecked}
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
  ) => void ,
  listChecked : number[]
};

const SubjectTable = memo(
  ({
    onSelectAllsubject,
    data,
    setsubjectChooseById,
    onDeleteById,
    refCheckboxAll,
    refCheckboxList,
    listChecked
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
              listChecked={listChecked}
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
  listChecked : number[]
}

const SubjectTableItem = ({
  item,
  index,
  setsubjectChooseById,
  onDeleteById,
  refCheckboxList,listChecked
}: subjectTableItemProps) => {
  const { isVn} = useContext(TranslateContext)
  return (
    <div className="py-[16px] grid  grid-cols-[1fr_1fr_3fr_6fr_2fr_2fr]  text-_18 font-semibold text-text_primary border-b-[1px] border-solid border-br_E9ECEF">
      <button>
        <Checkbox
          checked={listChecked.some((_item) => _item === item?.id)}
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
