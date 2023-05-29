import React, {
  memo,
} from "react";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { HeaderFilter } from "./components/HeaderFilter";
import { ListNews } from "./components/ListNews";
import { useHandleNews } from "./hooks/useHandleNews";

export const News = memo(() => {
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
  } = useHandleNews()

  return (
    <>
      <HeaderAdmin title="admin.news.title" />
      <HeaderFilter searchQuery={searchQuery} onDelete={handleDeleteMany} listFilter={listFilter} onClear={clearListFilter} onPushListFilter={pushListFilter} onChange={handleChangeSearch} />
      <ListNews  loading={loading} refCheckboxAll={refCheckboxAll} refCheckboxList={refCheckboxList} onChangeAll={handleCheckAll} onChangeItem={handleCheckedItem} listChecked={listChecked}  onDeleteItem={handleDelete} data={listData} total={totalPage} currentPage={currenPage} setCurrentPage={setCurrentPage} />
    </>
  );
})
