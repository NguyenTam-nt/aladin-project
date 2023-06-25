import React from "react";
import { Header } from "./components/Header";
import { ProductItem } from "./components/ProductItem";
import { Pagination } from "@components/Paginnation";
import { Loading } from "../components/Loading";
import { useGetProduct } from "./components/useGetProduct";

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
  } = useGetProduct();

  return (
    <>
      <Header onChange={handleChangeCategory} />
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
      <div className="flex justify-end">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};
