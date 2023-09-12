import Pagination from "@components/Pagination";
import { ToastContex } from "@contexts/ToastContex";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHook";
import ProductServices from "@services/ProductServices";
import InputTextElement from "commons/components/InputComponent/InputTextElement";
import debounce from "lodash/debounce";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  setCurrenPage,
  setFilter,
  setLisProduct,
} from "redux/reducer/productSlice";
import {
  ThunkProduclist,
  ThunkProduclistFilter,
} from "redux/thunk/productAction";
import ProducSizeItem from "../ProducSizeItem";
import { some } from "@utility/helper";
import LinearButton from "@components/Buttons/LinearButton";
import PlusLinerIcon from "@assets/iconElements/PlusLinerIcon";
import ManyfingIcon from "@assets/iconElements/ManyfingIcon";

interface ButtonFilterProps {
  name: string;
  isActive: boolean;
  className?: string;
  handleSubmit: () => void;
}

const nameList = [
  "Hàng hóa",
  "Thuộc tính",
  "Giá bán",
  "Tồn kho tại",
  "Tồn kho",
  "Doanh số",
];

export const ButtonFilter = (props: ButtonFilterProps) => {
  const { name, isActive, className = "", handleSubmit } = props;
  return (
    <button
      className={
        "text-small font-semibold " +
        (isActive ? "text-main border-b-[3px] border-main mt-[1px]" : "") +
        " " +
        className
      }
      onClick={handleSubmit}
    >
      {name}
    </button>
  );
};

function ManageProduct() {
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { onAddToast } = useContext(ToastContex);
  const { isloading, currentPage, totalElement, listProducts, filter, error } =
    useAppSelector((state) => state.products);

  const [itemDeletes, setItemDeletes] = useState<string[]>([]);
  const [keySearch, setKeySearch] = useState<string>("");
  const sizing = 5;
  const handleFilter = (filter: boolean) => {
    navigator("");
    setKeySearch("");
    dispatch(setFilter(filter));
  };
  const getProductByKeySearch = async (params: { [key: string]: any }) => {
    try {
      const result = await ProductServices.searchProducts({
        page: params.page,
        size: sizing,
        keyword: params.keySearch,
      });
      if (result) {
        dispatch(setLisProduct(result));
        return;
      }
    } catch (error) {
      onAddToast({
        type: "error",
        message: `Có lỗi không thể lấy danh sách sản phẩm`,
      });
    }
  };
  const debounceSearch = useCallback(
    debounce((value: any) => getProductByKeySearch(value), 1500),
    []
  );

  const handleSearch = (inputSearch: { name: string; value: string }) => {
    setKeySearch(inputSearch.value);
    navigator("");
    dispatch(setFilter(true));
    dispatch(setCurrenPage(1));
  };
  
  const handleChoseIdDelete = (idProduct: string) => {
    const checkId = itemDeletes.includes(idProduct);
    let newItemDelete = [...itemDeletes];
    if (checkId) {
      newItemDelete = newItemDelete.filter((item) => {
        return item != idProduct;
      });
    } else {
      newItemDelete.push(idProduct);
    }
    setItemDeletes(newItemDelete);
  };

  const handleDeleteProducts = async () => {
    try {
      if (itemDeletes.length > 0) {
        await ProductServices.deleteProducts(itemDeletes).then((res) => {
          if (res) {
            dispatch(
              ThunkProduclist({
                page: currentPage - 1,
                size: sizing,
                sort: ["createAt", "desc"],
              })
            );
            onAddToast({
              type: "success",
              message: `Xóa thành công ${itemDeletes.length} sản phẩm`,
            });
            navigator("");
            setItemDeletes([]);
          }
        });
      }
    } catch (error) {
      onAddToast({
        type: "warn",
        message: "Có lỗi không xóa được sản phẩm",
      });
    }
  };
  useEffect(() => {
    if (keySearch != "") {
      if (currentPage == 1) {
        debounceSearch({
          page: currentPage - 1,
          size: sizing,
          keySearch: keySearch,
        });
      } else {
        getProductByKeySearch({
          page: currentPage - 1,
          size: sizing,
          keySearch: keySearch,
        });
      }
      return;
    } else {
      debounceSearch.cancel();
      if (filter) {
        dispatch(
          ThunkProduclist({
            page: currentPage - 1,
            size: sizing,
            sort: ["createAt", "desc"],
          })
        );
      } else {
        dispatch(
          ThunkProduclistFilter({
            page: currentPage - 1,
            size: sizing,
            remaining: false,
          })
        );
      }
    }

    return () => { };
  }, [filter, currentPage, keySearch]);

  useEffect(() => {
    if (searchParams.get("page")) {
      const numberPage = Number(searchParams.get("page"));
      setCurrenPage(numberPage);
    }
    setItemDeletes([]);
  }, [searchParams]);
  return (
    <div className=" pt-9 pb-10px">
      <h2 className="titlePage mb-5">Tất cả sản phẩm</h2>
      <div className="mb-5 flex items-start flex-col gap-5">
        <div className="flex items-center gap-4">
          <ButtonFilter
            name="Tất cả"
            isActive={filter}
            handleSubmit={() => handleFilter(true)}
          />
          <ButtonFilter
            name="Hết hàng"
            isActive={!filter}
            handleSubmit={() => handleFilter(false)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-normal font-medium">{totalElement} sản phẩm</p>
        <div className="flex items-center justify-end gap-6">
          <div className="bg-btn p-[1px] h-10 rounded w-[300px]">
            <InputTextElement
              icon={<ManyfingIcon />}
              name="keySearch"
              value={keySearch}
              placehoderText="Tìm kiếm sản phẩm"
              classWidth="w-full w-[300px] "
              onChangeInput={handleSearch}
              className="py-[9px] px-5 rounded"
            />
          </div>
          <LinearButton
            text="button.add_product"
            iconLeft={<PlusLinerIcon />}
            className="w-[170px] h-10 !rounded !text-sm overflow-hidden"
            className_child="rounded !text-sm "
            onClick={() => navigator("add")}
          />
        </div>
      </div>
      <div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="textInput font-normal">
              {nameList.map((item, index) => {
                return (
                  <th className="textInput font-normal px-7 py-3" key={index}>
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {listProducts.length > 0 &&
              listProducts.map((product, indexP) => {
                return (
                  <ProducSizeItem
                    key={product.id}
                    item={product}
                    isCheck={itemDeletes.includes(product.id!)}
                    handleDelete={handleChoseIdDelete}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
      {itemDeletes.length > 0 && (
        <button
          className="rounded-md py-2 px-3 mt-4 border border-main flex items-center text-main text-small font-normal bg-icon"
          onClick={handleDeleteProducts}
        >
          Xóa
        </button>
      )}

      <div className="p-8 flex justify-end">
        <Pagination
          currenPage={currentPage}
          setCurrentPage={(page: number) => dispatch(setCurrenPage(page))}
          total={Math.ceil(totalElement / 5)}
        />
      </div>
    </div>
  );
}

export default ManageProduct;
