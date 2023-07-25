import React from "react";
import { Header } from "./components/Header";
import { ProductItem } from "./components/ProductItem";
import { Pagination } from "@components/Paginnation";
import { Loading } from "../components/Loading";
import { useGetProduct } from "./components/useGetProduct";
import { SIZE_DATA } from "@constants/index"

export const ProductAdmin = () => {
  const {
    products,
    handleDelete,
    handleUpdateData,
    loading,
    handleChangeCategory,
    totalPages,
    currentPage,
    setCurrentPage,
    querySearch,
    handleSearch
  } = useGetProduct( SIZE_DATA, "id,desc", true);

  return (
    <>
      <Header query={querySearch} onSearch={handleSearch} onChange={handleChangeCategory} />
      {products?.list.length ? (
        <div className="grid grid-cols-4 gap-[24px]">
          {products.list.map((item) => {
            return (
              <ProductItem
                onUpdate={handleUpdateData}
                onDelete={handleDelete}
                data={item}
                key={item.id}
              />
            );
          })}
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      ) : null}
      {totalPages > 1 ? (
        <div className="flex justify-end">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      ) : null}
    </>
  );
};