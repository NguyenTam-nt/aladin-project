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
import DialogConfirmDelete from "@components/DialogConfirmDelete";

import { useHandleCheckbox } from "../hooks/useHandleCheckbox";
import { Checkbox } from "@components/Checkbox";
import { Link } from "react-router-dom";
import { pathsAdmin } from "@constants/routerAdmin";

const dummyData = [
  {
    id: 1,
    name: "Bộ môn 1",
    specialized: "Egestas lorem proin vitae enim netus egestas in nunc felis.",
    email: "24/12/2023",
  },
  {
    id: 2,
    name: "Bộ môn 1",
    specialized: "Egestas lorem proin vitae enim netus egestas in nunc felis.",
    email: "24/12/2023",
  },
  {
    id: 3,
    name: "Bộ môn 1",
    specialized: "Egestas lorem proin vitae enim netus egestas in nunc felis.",
    email: "24/12/2023",
  },
];
interface IsubjectTableItem {
  id: number;
  name: string;
  specialized: string;
  email: string;
}

export const ManageSubject = () => {
  const [currenPage, setCurrentPage] = useState(1);

  const { t } = useContext(TranslateContext);
  const setElementModalDelete = useContext(ModalContext).setElementModal;
  const [data, setData] = useState<IsubjectTableItem[]>(dummyData);

  const {refCheckboxAll, refCheckboxList, handleCheckAll, handleCheckedItem} = useHandleCheckbox(data.map((item) => item.id))
 
  const onDeleteById = (id: number) => { 
  }; 

 
  const handleShowModalDelete = (name?: string) => {
    setElementModalDelete(
      <DialogConfirmDelete
        message={
          name
            ? t("subject_manage.delete_subject", { name: name })
            : t("subject_manage.delete_all_subject")
        }
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
          setCurrentPage={setCurrentPage}
          total={10}
        />
      </div>
    </div>
  );
};

type subjectTableProps = {
  onSelectAllsubject:(event: React.ChangeEvent<HTMLInputElement>) => void
  data: IsubjectTableItem[];
  refCheckboxAll : React.RefObject<HTMLInputElement> ;
  refCheckboxList : React.MutableRefObject<HTMLInputElement[]> ;
  onDeleteById : (id : number) => void;
  setsubjectChooseById: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
};

const SubjectTable = memo(
  ({
    onSelectAllsubject,
    data,
    setsubjectChooseById,
    onDeleteById ,
    refCheckboxAll ,
    refCheckboxList
  }: subjectTableProps) => {
    const { t } = useContext(TranslateContext);

    return (
      <>
        <div className="pb-[14px] grid  grid-cols-[1fr_1fr_3fr_6fr_2fr_2fr]  mt-[40px] text-_18 font-semibold text-text_primary border-b-[1px] border-solid border-br_E9ECEF">
        <button>
          <Checkbox id="news_check" onChange={onSelectAllsubject} ref={refCheckboxAll} />
        </button>
          <div>{t("subject_manage._form._number")}</div>
          <div>{t("subject_manage._form._name")}</div>
          <div>{t("subject_manage._form._title")}</div>
          <div>{t("subject_manage._form._date")}</div>
          <div className="flex justify-end">
            {t("subject_manage._form._function")}
          </div>
        </div>
        {data.map((item: IsubjectTableItem, index: number) => {
          return (
            <SubjectTableItem
              item={item}
              index={index}
              key={index}
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
  item: IsubjectTableItem;
  index: number;
  setsubjectChooseById: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void ;
  onDeleteById : (id: number) => void;
  refCheckboxList : React.MutableRefObject<HTMLInputElement[]>;
}

const SubjectTableItem = ({
  item,
  index,
  setsubjectChooseById,
  onDeleteById ,
  refCheckboxList
}: subjectTableItemProps) => {
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
