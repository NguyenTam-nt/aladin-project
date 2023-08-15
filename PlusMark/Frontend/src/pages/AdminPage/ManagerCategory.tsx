import { CloseButtonIcon, CloseButtonIconGray } from "@assets/icons";
import CategoryItemView from "@components/AdminComponents/category/CategoryItemView";
import DeleteModal from "@components/Modal/DeleteModal";
import { ToastContex } from "@contexts/ToastContex";
import { ModalContext } from "@contexts/contextModal";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHook";
import TradeMarkServices from "@services/TradeMarkServices";
import categoryServices from "@services/categoryService";
import { ROUTES } from "@utility/constants";
import { RootCategory } from "commons/contannt";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setInital, setTradeMarkList } from "redux/reducer/categorySlice";
import {
  ThunkGetAllTradeMark,
  ThunkgetAllCategory,
} from "redux/thunk/categoryAction";
interface ItemProps {
  name: string;
  handleDelete: () => void;
  handleChange: () => void;
}
interface Props {}

const CategoryItem = (props: ItemProps) => {
  const { name, handleChange, handleDelete } = props;
  return (
    <div className="mt-10px flex items-center">
      <div
        onClick={() => handleChange()}
        className="textInput text-lg py-2 px-5 w-[290px] flex items-center justify-between mr-3 cursor-pointer"
      >
        <p className="text-lg leading-18 w-full line-clamp-1">{name}</p>
        <p className="text-gray-300">{0}/20</p>
      </div>
      <button
        className="rounded-md py-2 px-3 border border-main flex items-center text-main text-smal font-normal"
        onClick={() => handleDelete()}
      >
        <CloseButtonIcon className="text-main mr-3" />
        Xóa
      </button>
    </div>
  );
};

function ManagerCategory(props: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { onAddToast } = useContext(ToastContex);
  const { showModal, setShowModal, setContentModal } = useContext(ModalContext);
  const { categorylist, tradeMarkList, totalElement } = useAppSelector(
    (state) => state.categories
  );
  const [page, setPage] = useState<number>(0);
  const handleAdd = (path: string) => {
    if (path === ROUTES.admin.cartegory.tradeMarkAdd) {
      navigate(`/admin/${path}`);
      return;
    }
    navigate(path);
  };
  const handleChange = (path: string, id: string) => {
    if (path.includes("trade-mark")) {
      navigate(`/admin/${path}/${id}`);
      return;
    }
    navigate(`${path}/${id}`);
  };

  const handleDeleTrade = (id: string) => {
    setShowModal(true);
    const ondeleted = async () => {
      try {
        const deleted = await TradeMarkServices.deleteTradeMark(id);
        dispatch(setTradeMarkList(id));
        onAddToast({
          type: "success",
          message: "Xóa thương hiệu thành công",
        });
      } catch (error) {
        onAddToast({
          type: "error",
          message: "Có lỗi không thể xóa thương hiệu",
        });
      }
      setShowModal(false);
    };
    setContentModal(
      <DeleteModal
        text={"bạn có muốn xóa thương hiệu này không"}
        handleDelete={ondeleted}
      />
    );
  };
  const handleDeleteCategory = (item: RootCategory) => {
    const deleteCategory = async () => {
      try {
        if (item.hasChild || item.children.length > 0) {
          onAddToast({
            type: "error",
            message: "Không thể xóa danh mục đang sử dụng.",
          });
          return;
        }
        const deleted = await categoryServices.deleteCategory(item.categorySId);
        dispatch(setInital());
        if (page === 0) {
          dispatch(ThunkgetAllCategory({ page: page, size: 10, sort: null }));
        } else {
          setPage(0);
        }
        onAddToast({
          type: "success",
          message: "Xóa danh mục thành công",
        });
      } catch (error) {
        onAddToast({
          type: "error",
          message: "Có lỗi không thể xóa danh mục",
        });
      }
      setShowModal(false);
    };
    setShowModal(true);
    setContentModal(
      <DeleteModal
        text={"bạn có muốn xóa danh mục này không"}
        handleDelete={() => {
          deleteCategory();
        }}
      />
    );
  };

  const hadleScroolLoadmore = (
    event: React.UIEvent<HTMLDivElement, UIEvent>
  ) => {
    const scroolTop = event.currentTarget.scrollTop;
    const clientHeight = event.currentTarget.clientHeight;
    const scrollHeight = event.currentTarget.scrollHeight;
    if (
      scroolTop + clientHeight >= scrollHeight &&
      categorylist.length < totalElement
    ) {
      setPage((prevState) => prevState + 1);
    }
  };
  useEffect(() => {
    dispatch(ThunkGetAllTradeMark());
  }, []);
  useEffect(() => {
    if (page === 0) {
      dispatch(setInital());
    }
    dispatch(ThunkgetAllCategory({ page: page, size: 10, sort: null }));
  }, [page]);

  return (
    <div className=" pt-9 pb-10px">
      <h2 className="titlePage mb-9">Quản lý phân loại sản phẩm</h2>

      <div>
        <p className="text-small">
          Quản lý thương hiệu <span className="text-main">*</span>
        </p>

        {tradeMarkList.map((itemTrade, indexTrade) => {
          return (
            <CategoryItem
              key={indexTrade + "trade"}
              name={itemTrade.name}
              handleChange={() =>
                handleChange("trade-mark/edit", itemTrade.name)
              }
              handleDelete={() => handleDeleTrade(itemTrade.id.toString())}
            />
          );
        })}

        <button
          onClick={() => handleAdd(ROUTES.admin.cartegory.tradeMarkAdd)}
          className="textInput text-gray-300 flex items-center py-2 px-3 mt-10px"
        >
          <CloseButtonIconGray className="text-gray-300 mr-3" />
          Thêm
        </button>
      </div>
      <div className="mt-8">
        <p className="text-small mb-5">
          Quản lý danh mục <span className="text-main">*</span>
        </p>
        <div
          onScroll={(event) => hadleScroolLoadmore(event)}
          className="max-w-[26%] max-h-[200px] overflow-y-scroll"
        >
          {categorylist.map((item, index) => {
            return (
              <CategoryItemView
                handleDeteleC={handleDeleteCategory}
                key={index}
                item={item}
              />
            );
          })}
        </div>
        <button
          onClick={() => handleAdd("add")}
          className="textInput text-gray-300 flex items-center py-2 px-3 mt-3"
        >
          <CloseButtonIconGray className="text-gray-300 mr-3" />
          Thêm
        </button>
      </div>
    </div>
  );
}

export default ManagerCategory;
