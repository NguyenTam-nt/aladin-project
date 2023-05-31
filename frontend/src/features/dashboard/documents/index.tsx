import React, {
  memo,
} from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { HeaderFilter } from "./components/HeaderFilter";
import { ListDocuments } from "./components/ListDocuments";
import { useHandleDocuments } from "./hooks/useHandleDocuments";

export const ManageDocuments = memo(() => {
const { loading,
  handleDeleteMany,
  handleChangeSearch,
  handleCheckAll,
  handleCheckedItem,
  handleDelete,
  refCheckboxAll,
  refCheckboxList,
  pushListFilter,
  clearListFilter,
  currenPage,
   setCurrentPage,
   listChecked,
   listFilter,
   listData,
   totalPage,
   searchQuery
  } = useHandleDocuments()
  return (
    <>
      <HeaderAdmin title="admin.documents.title" />
      <HeaderFilter searchQuery={searchQuery} onDelete={handleDeleteMany} listFilter={listFilter} onClear={clearListFilter} onPushListFilter={pushListFilter} onChange={handleChangeSearch} />
      <ListDocuments  loading={loading} refCheckboxAll={refCheckboxAll} refCheckboxList={refCheckboxList} onChangeAll={handleCheckAll} onChangeItem={handleCheckedItem} listChecked={listChecked}  onDeleteItem={handleDelete} data={listData} total={totalPage} currentPage={currenPage} setCurrentPage={setCurrentPage} />
    </>
  );
})
